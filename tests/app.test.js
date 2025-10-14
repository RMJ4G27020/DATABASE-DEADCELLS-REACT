process.env.SQLITE_STORAGE = ':memory:';

const request = require('supertest');
const createApp = require('../src/app');
const { sequelize } = require('../src/db');
const { User, Game, Item, TierList, TierListItem } = require('../src/associations');

describe('Game Tier List API', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });

    // Seed test data
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      passwordHash: 'hashedpassword',
      role: 'user',
    });

    const game = await Game.create({
      name: 'Test RPG',
      description: 'A test role-playing game.',
    });

    const item1 = await Item.create({
      name: 'Fire Sword',
      description: 'Blazing blade of champions.',
    });

    const item2 = await Item.create({
      name: 'Silver Dagger',
      description: 'Fast and reliable weapon.',
    });

    const tierList = await TierList.create({
      title: 'Test Tier List',
      description: 'A test tier list.',
      isPublic: true,
      userId: user.id,
      gameId: game.id,
    });

    await TierListItem.create({
      tierListId: tierList.id,
      itemId: item1.id,
      rank: 'S',
      position: 1,
    });

    await TierListItem.create({
      tierListId: tierList.id,
      itemId: item2.id,
      rank: 'A',
      position: 1,
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('Games API', () => {
    it('returns all games', async () => {
      const response = await request(app).get('/api/games');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({
        name: 'Test RPG',
        description: 'A test role-playing game.',
      });
    });

    it('creates a new game', async () => {
      const payload = {
        name: 'Fantasy Adventure',
        description: 'An epic fantasy game.',
      };

      const response = await request(app).post('/api/games').send(payload);

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject(payload);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('Items API', () => {
    it('returns all items', async () => {
      const response = await request(app).get('/api/items');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
      expect(response.body).toHaveLength(2);
    });

    it('creates a new item', async () => {
      const payload = {
        name: 'Crystal Bow',
        description: 'Light bow with penetrating shots.',
      };

      const response = await request(app).post('/api/items').send(payload);

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject(payload);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('Tier Lists API', () => {
    it('returns all tier lists with associations', async () => {
      const response = await request(app).get('/api/tierlists');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({
        title: 'Test Tier List',
        description: 'A test tier list.',
        isPublic: true,
      });
    });

    it('creates a new tier list', async () => {
      const user = await User.findOne();
      const game = await Game.findOne();

      const payload = {
        title: 'New Tier List',
        description: 'Another test tier list.',
        isPublic: false,
        userId: user.id,
        gameId: game.id,
      };

      const response = await request(app).post('/api/tierlists').send(payload);

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject({
        title: payload.title,
        description: payload.description,
        isPublic: payload.isPublic,
      });
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('Tier List Items API', () => {
    it('returns items for a specific tier list', async () => {
      const tierList = await TierList.findOne();

      const response = await request(app).get(`/api/tierlists/${tierList.id}/items`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('item');
      expect(response.body[0].item).toHaveProperty('name');
    });

    it('creates a new tier list item', async () => {
      const tierList = await TierList.findOne();
      // Create a new item that doesn't exist in the tier list yet
      const newItem = await Item.create({
        name: 'Magic Staff',
        description: 'Powerful magic weapon',
      });

      const payload = {
        itemId: newItem.id,
        rank: 'B',
        position: 2,
      };

      const response = await request(app)
        .post(`/api/tierlists/${tierList.id}/items`)
        .send(payload);

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject(payload);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('item');
    });

    it('returns 404 when tier list does not exist', async () => {
      const response = await request(app).get('/api/tierlists/99999/items');
      
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'Tier list not found.');
    });

    it('returns 400 for invalid rank', async () => {
      const tierList = await TierList.findOne();
      const item = await Item.findOne();

      const payload = {
        itemId: item.id,
        rank: 'Z',
        position: 1,
      };

      const response = await request(app)
        .post(`/api/tierlists/${tierList.id}/items`)
        .send(payload);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('returns 404 when item does not exist', async () => {
      const tierList = await TierList.findOne();

      const payload = {
        itemId: 99999,
        rank: 'A',
        position: 1,
      };

      const response = await request(app)
        .post(`/api/tierlists/${tierList.id}/items`)
        .send(payload);

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'Item not found.');
    });

    it('returns 409 when adding duplicate item to tier list', async () => {
      const tierList = await TierList.findOne();
      const item = await Item.findOne();

      const payload = {
        itemId: item.id,
        rank: 'S',
        position: 1,
      };

      const response = await request(app)
        .post(`/api/tierlists/${tierList.id}/items`)
        .send(payload);

      expect(response.statusCode).toBe(409);
      expect(response.body).toHaveProperty('error', 'Item already exists in this tier list.');
    });

    it('updates a tier list item', async () => {
      const tierListItem = await TierListItem.findOne();

      const payload = {
        rank: 'D',
        position: 3,
      };

      const response = await request(app)
        .put(`/api/tierlists/${tierListItem.tierListId}/items/${tierListItem.id}`)
        .send(payload);

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(payload);
      expect(response.body).toHaveProperty('item');
    });

    it('deletes a tier list item', async () => {
      const tierListItem = await TierListItem.findOne();

      const response = await request(app)
        .delete(`/api/tierlists/${tierListItem.tierListId}/items/${tierListItem.id}`);

      expect(response.statusCode).toBe(204);

      const deleted = await TierListItem.findByPk(tierListItem.id);
      expect(deleted).toBeNull();
    });
  });

  describe('Validation Tests', () => {
    it('returns 400 when creating tier list without required fields', async () => {
      const payload = {
        title: 'Incomplete Tier List',
      };

      const response = await request(app).post('/api/tierlists').send(payload);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('returns 404 when creating tier list with non-existent user', async () => {
      const game = await Game.findOne();

      const payload = {
        title: 'Invalid User Tier List',
        userId: 99999,
        gameId: game.id,
      };

      const response = await request(app).post('/api/tierlists').send(payload);

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'User not found.');
    });

    it('returns 404 when creating tier list with non-existent game', async () => {
      const user = await User.findOne();

      const payload = {
        title: 'Invalid Game Tier List',
        userId: user.id,
        gameId: 99999,
      };

      const response = await request(app).post('/api/tierlists').send(payload);

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'Game not found.');
    });

    it('returns 400 when creating game without name', async () => {
      const payload = {
        description: 'Game without name',
      };

      const response = await request(app).post('/api/games').send(payload);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('returns 400 when creating item without name', async () => {
      const payload = {
        description: 'Item without name',
      };

      const response = await request(app).post('/api/items').send(payload);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
