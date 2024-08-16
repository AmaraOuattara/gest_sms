const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Region = require('../models/Region');

const Localite = sequelize.define('t_localite', {
 ID_localite: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  loc_reference: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  rg_reference: {
    type: DataTypes.STRING(50),
    foreignKey: true,
    allowNull: false
  },
  loc_libelle: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  loc_statut: {
    type: DataTypes.BOOLEAN,
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
  tableName: 't_localite'
});

//Localite.belongsTo(Region, { foreignKey: 'rg_reference' });
//Region.hasMany(Localite, { foreignKey: 'rg_reference' });

module.exports = Localite;
