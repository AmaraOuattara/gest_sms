const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Campagne = sequelize.define('t_campagne', {
 ID_Campagne: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cmg_reference: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  cmg_libelle: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  cmg_descritpion: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: true
  },
  cmg_statut: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  ent_reference: {
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
  tableName: 't_campagne'
});

module.exports = Campagne;
