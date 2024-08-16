const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gest_sms', 'root', '', {
  host: 'localhost',
  dialect: 'mysql' // ou 'mysql', 'sqlite', etc.
});

// Importer les modèles
//const Entreprise = require('../models/Entreprise');
//const User = require('../models/Users');

// Synchroniser les modèles
sequelize.sync();

module.exports = sequelize;
