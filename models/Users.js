// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('t_user',{
  ID_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Usr_reference: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  Usr_Email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  Usr_Password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Usr_Nom: {
    type: DataTypes.STRING
  },
  Usr_Prenom: {
    type: DataTypes.STRING
  },
  Usr_Contact: {
    type: DataTypes.STRING
  },
  // Clé étrangère
  ent_reference: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Ref_TypeCompte: {
    type: DataTypes.STRING,
    defaultValue: 'TCPT_001'
  },
  date_creation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  date_modification: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  Usr_statut: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false,
  tableName: 't_user'
});


module.exports = User;
