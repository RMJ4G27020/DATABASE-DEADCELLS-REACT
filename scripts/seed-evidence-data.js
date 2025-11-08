/**
 * Sample Data for Evidence Screenshots
 * Run this to populate the database with realistic data for the assignment
 */

const { initDatabase, sequelize } = require('../src/db');
require('../src/associations');

const seedSampleData = async () => {
  const { User, Game, TierList, Item, TierListItem } = require('../src/associations');

  console.log('🌱 Seeding sample data for evidence...');

  // Create user
  const [user] = await User.findOrCreate({
    where: { username: 'student' },
    defaults: {
      username: 'student',
      email: 'student@university.com',
      passwordHash: '$2b$10$dummyhash',
      role: 'user',
    },
  });
  console.log('✅ User created');

  // Create games
  const [deadCells] = await Game.findOrCreate({
    where: { name: 'Dead Cells' },
    defaults: {
      name: 'Dead Cells',
      description: 'Roguelike metroidvania action platformer game',
    },
  });

  const [hollowKnight] = await Game.findOrCreate({
    where: { name: 'Hollow Knight' },
    defaults: {
      name: 'Hollow Knight',
      description: 'Metroidvania action-adventure platformer',
    },
  });

  const [hades] = await Game.findOrCreate({
    where: { name: 'Hades' },
    defaults: {
      name: 'Hades',
      description: 'Roguelike dungeon crawler with greek mythology',
    },
  });
  console.log('✅ Games created');

  // Create Dead Cells items (weapons)
  const deadCellsItems = [
    { name: 'Electric Whip', description: 'Fast melee weapon with shock effect' },
    { name: 'Assassin\'s Dagger', description: 'Critical hits from behind enemies' },
    { name: 'Broadsword', description: 'Slow but powerful balanced sword' },
    { name: 'Bow and Arrows', description: 'Classic ranged weapon' },
    { name: 'Ice Shards', description: 'Freeze enemies with ice projectiles' },
    { name: 'Flamethrower', description: 'Burn everything in your path' },
    { name: 'Sword Shield', description: 'Defensive melee option with parry' },
    { name: 'Throwing Knife', description: 'Quick ranged attack weapon' },
  ];

  const createdItems = [];
  for (const itemData of deadCellsItems) {
    const [item] = await Item.findOrCreate({
      where: { name: itemData.name },
      defaults: itemData,
    });
    createdItems.push(item);
  }
  console.log('✅ Items created');

  // Create tier list for Dead Cells
  const [weaponTierList] = await TierList.findOrCreate({
    where: { title: 'Best Weapons Tier List' },
    defaults: {
      userId: user.id,
      gameId: deadCells.id,
      title: 'Best Weapons Tier List',
      description: 'Dead Cells weapon ranking - my personal favorites',
      isPublic: true,
    },
  });
  console.log('✅ Tier List created');

  // Add items to tier list with different ranks
  const tierAssignments = [
    { itemName: 'Electric Whip', rank: 'S' },
    { itemName: 'Assassin\'s Dagger', rank: 'S' },
    { itemName: 'Broadsword', rank: 'A' },
    { itemName: 'Ice Shards', rank: 'A' },
    { itemName: 'Bow and Arrows', rank: 'B' },
    { itemName: 'Flamethrower', rank: 'B' },
    { itemName: 'Sword Shield', rank: 'C' },
    { itemName: 'Throwing Knife', rank: 'D' },
  ];

  for (let i = 0; i < tierAssignments.length; i++) {
    const assignment = tierAssignments[i];
    const item = createdItems.find(it => it.name === assignment.itemName);
    
    if (item) {
      await TierListItem.findOrCreate({
        where: { tierListId: weaponTierList.id, itemId: item.id },
        defaults: {
          tierListId: weaponTierList.id,
          itemId: item.id,
          rank: assignment.rank,
          position: i + 1,
        },
      });
    }
  }
  console.log('✅ Tier List Items added');

  // Create a second tier list (empty for demonstration)
  await TierList.findOrCreate({
    where: { title: 'Skills and Mutations' },
    defaults: {
      userId: user.id,
      gameId: deadCells.id,
      title: 'Skills and Mutations',
      description: 'Ranking of best skills to unlock',
      isPublic: true,
    },
  });

  console.log('\n✨ Sample data seeding complete!');
  console.log('📊 Summary:');
  console.log(`   - Games: ${await Game.count()}`);
  console.log(`   - Items: ${await Item.count()}`);
  console.log(`   - Tier Lists: ${await TierList.count()}`);
  console.log(`   - Tier List Items: ${await TierListItem.count()}`);
  console.log('\n🎯 Ready for screenshots!');
};

const main = async () => {
  try {
    console.log('🔧 Initializing database...');
    await initDatabase();
    
    await seedSampleData();
    
    await sequelize.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

main();
