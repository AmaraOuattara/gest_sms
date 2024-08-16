const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Listediffusion = sequelize.define('t_listediffusion', {
 ID_Liste: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  lst_reference: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  lst_libelle: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  lst_descritpion: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: true
  },
  lst_statut: {
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
  tableName: 't_listediffusion'
});

module.exports = Listediffusion;
