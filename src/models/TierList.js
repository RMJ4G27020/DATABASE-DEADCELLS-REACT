const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db');

class TierList extends Model {}

TierList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'TierList',
    tableName: 'tier_lists',
    timestamps: true,
  }
);

module.exports = TierList;