// models/entreprise.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Entreprise = sequelize.define('t_entreprise', {
  ID_entreprise: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ent_reference: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  ent_nomcommercial: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  ent_domaine: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ent_email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ent_telephone: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ent_statut: {
    type: DataTypes.BOOLEAN,
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
  tableName: 't_entreprise'
});

module.exports = Entreprise;
