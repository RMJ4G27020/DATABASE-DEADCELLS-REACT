const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db');

class TierListItem extends Model {}

TierListItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rank: {
      type: DataTypes.ENUM('S', 'A', 'B', 'C', 'D'),
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'TierListItem',
    tableName: 'tier_list_items',
    timestamps: true,
  }
);

module.exports = TierListItem;