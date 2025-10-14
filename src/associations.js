const User = require('./models/User');
const Game = require('./models/Game');
const TierList = require('./models/TierList');
const Item = require('./models/Item');
const TierListItem = require('./models/TierListItem');

// Asociaciones
User.hasMany(TierList, { foreignKey: 'userId', as: 'tierLists' });
TierList.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Game.hasMany(TierList, { foreignKey: 'gameId', as: 'tierLists' });
TierList.belongsTo(Game, { foreignKey: 'gameId', as: 'game' });

TierList.hasMany(TierListItem, { foreignKey: 'tierListId', as: 'tierListItems' });
TierListItem.belongsTo(TierList, { foreignKey: 'tierListId', as: 'tierList' });

Item.hasMany(TierListItem, { foreignKey: 'itemId', as: 'tierListItems' });
TierListItem.belongsTo(Item, { foreignKey: 'itemId', as: 'item' });

module.exports = {
  User,
  Game,
  TierList,
  Item,
  TierListItem,
};