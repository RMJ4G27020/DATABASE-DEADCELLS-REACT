const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db');

class TierItem extends Model {}

TierItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rank: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['S', 'A', 'B', 'C', 'D']],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'TierItem',
    tableName: 'tier_items',
    timestamps: false,
  }
);

module.exports = TierItem;
