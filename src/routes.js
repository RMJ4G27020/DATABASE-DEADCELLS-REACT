const express = require('express');
const { User, Game, TierList, Item, TierListItem } = require('./associations');
const { sequelize } = require('./db');

const router = express.Router();

// Helper functions
const serializeUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
});

const serializeGame = (game) => ({
  id: game.id,
  name: game.name,
  description: game.description,
});

const serializeItem = (item) => ({
  id: item.id,
  name: item.name,
  description: item.description,
  imageUrl: item.imageUrl,
});

const serializeTierList = (tierList) => ({
  id: tierList.id,
  title: tierList.title,
  description: tierList.description,
  isPublic: tierList.isPublic,
  userId: tierList.userId,
  gameId: tierList.gameId,
});

const serializeTierListItem = (tierListItem) => ({
  id: tierListItem.id,
  rank: tierListItem.rank,
  position: tierListItem.position,
  itemId: tierListItem.itemId,
  item: tierListItem.item ? serializeItem(tierListItem.item) : null,
});

// User routes
router.post('/users/register', async (req, res, next) => {
  try {
    const { username, email, password, role = 'user' } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    const user = await User.create({
      username,
      email,
      passwordHash: password, // In real app, hash this
      role,
    });

    res.status(201).json(serializeUser(user));
  } catch (error) {
    next(error);
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users.map(serializeUser));
  } catch (error) {
    next(error);
  }
});

// Game routes
router.get('/games', async (req, res, next) => {
  try {
    const games = await Game.findAll();
    res.json(games.map(serializeGame));
  } catch (error) {
    next(error);
  }
});

router.post('/games', async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    const game = await Game.create({ name, description });
    res.status(201).json(serializeGame(game));
  } catch (error) {
    next(error);
  }
});

router.put('/games/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found.' });
    }

    const { name, description } = req.body;
    
    // Only update fields that are provided
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;

    await game.update(updates);
    res.json(serializeGame(game));
  } catch (error) {
    next(error);
  }
});

router.delete('/games/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedCount = await Game.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Game not found.' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Item routes
router.get('/items', async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items.map(serializeItem));
  } catch (error) {
    next(error);
  }
});

router.post('/items', async (req, res, next) => {
  try {
    const { name, description, imageUrl } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    const item = await Item.create({ name, description, imageUrl });
    res.status(201).json(serializeItem(item));
  } catch (error) {
    next(error);
  }
});

router.put('/items/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found.' });
    }

    const { name, description, imageUrl } = req.body;
    
    // Only update fields that are provided
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;

    await item.update(updates);
    res.json(serializeItem(item));
  } catch (error) {
    next(error);
  }
});

router.delete('/items/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedCount = await Item.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Tier List routes
router.get('/tierlists', async (req, res, next) => {
  try {
    const tierLists = await TierList.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Game, as: 'game' },
        { model: TierListItem, as: 'tierListItems', include: [{ model: Item, as: 'item' }] },
      ],
    });
    res.json(tierLists.map(serializeTierList));
  } catch (error) {
    next(error);
  }
});

router.post('/tierlists', async (req, res, next) => {
  try {
    const { title, description, isPublic = true, userId, gameId } = req.body;

    if (!title || !userId || !gameId) {
      return res.status(400).json({ error: 'Title, userId, and gameId are required.' });
    }

    // Validate that user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Validate that game exists
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found.' });
    }

    const tierList = await TierList.create({ title, description, isPublic, userId, gameId });
    res.status(201).json(serializeTierList(tierList));
  } catch (error) {
    next(error);
  }
});

router.put('/tierlists/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const tierList = await TierList.findByPk(id);
    if (!tierList) {
      return res.status(404).json({ error: 'Tier list not found.' });
    }

    const { title, description, isPublic } = req.body;
    
    // Only update fields that are provided
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (isPublic !== undefined) updates.isPublic = isPublic;

    await tierList.update(updates);
    res.json(serializeTierList(tierList));
  } catch (error) {
    next(error);
  }
});

router.delete('/tierlists/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedCount = await TierList.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Tier list not found.' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Tier List Item routes
router.get('/tierlists/:tierListId/items', async (req, res, next) => {
  try {
    const tierListId = parseInt(req.params.tierListId, 10);
    
    // Validate that tier list exists
    const tierList = await TierList.findByPk(tierListId);
    if (!tierList) {
      return res.status(404).json({ error: 'Tier list not found.' });
    }

    const tierListItems = await TierListItem.findAll({
      where: { tierListId },
      include: [{ model: Item, as: 'item' }],
      order: [['rank', 'ASC'], ['position', 'ASC']],
    });
    res.json(tierListItems.map(serializeTierListItem));
  } catch (error) {
    next(error);
  }
});

router.post('/tierlists/:tierListId/items', async (req, res, next) => {
  try {
    const { itemId, rank, position } = req.body;
    const tierListId = parseInt(req.params.tierListId, 10);

    if (!itemId || !rank) {
      return res.status(400).json({ error: 'itemId and rank are required.' });
    }

    // Validate rank
    const validRanks = ['S', 'A', 'B', 'C', 'D'];
    if (!validRanks.includes(rank)) {
      return res.status(400).json({ error: 'Invalid rank. Must be S, A, B, C, or D.' });
    }

    // Validate that tier list exists
    const tierList = await TierList.findByPk(tierListId);
    if (!tierList) {
      return res.status(404).json({ error: 'Tier list not found.' });
    }

    // Validate that item exists
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found.' });
    }

    // Check if item already exists in this tier list
    const existingItem = await TierListItem.findOne({
      where: { tierListId, itemId },
    });
    if (existingItem) {
      return res.status(409).json({ error: 'Item already exists in this tier list.' });
    }

    const tierListItem = await TierListItem.create({
      tierListId,
      itemId,
      rank,
      position,
    });

    // Load the item relation for serialization
    await tierListItem.reload({ include: [{ model: Item, as: 'item' }] });

    res.status(201).json(serializeTierListItem(tierListItem));
  } catch (error) {
    next(error);
  }
});

router.put('/tierlists/:tierListId/items/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const tierListItem = await TierListItem.findByPk(id, {
      include: [{ model: Item, as: 'item' }],
    });
    
    if (!tierListItem) {
      return res.status(404).json({ error: 'Tier list item not found.' });
    }

    const { rank, position } = req.body;

    // Validate rank if provided
    if (rank) {
      const validRanks = ['S', 'A', 'B', 'C', 'D'];
      if (!validRanks.includes(rank)) {
        return res.status(400).json({ error: 'Invalid rank. Must be S, A, B, C, or D.' });
      }
    }

    await tierListItem.update({ rank, position });
    res.json(serializeTierListItem(tierListItem));
  } catch (error) {
    next(error);
  }
});

router.delete('/tierlists/:tierListId/items/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const tierListId = parseInt(req.params.tierListId, 10);
    
    const deletedCount = await TierListItem.destroy({ 
      where: { id, tierListId } 
    });
    
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Tier list item not found.' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
