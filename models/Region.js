const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Region = sequelize.define('t_region', {
 ID_region: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  rg_reference: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  rg_libelle: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  rg_statut: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  pay_reference: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  
  date_creation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  date_modification: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
  
}, {
  timestamps: false,
  tableName: 't_region'
});

module.exports = Region;
