const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Contact = sequelize.define('t_contact', {
 ID_contact: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cnt_reference: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  
  cnt_civilite: {
    type: DataTypes.STRING(2),
    unique: true,
    allowNull: false
  },
  cnt_nomprenom: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  cnt_contact: {
    type: DataTypes.STRING(16),
    allowNull: false
  },
  cnt_email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  cnt_statut: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  lst_reference: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ent_reference: {
    type: DataTypes.STRING(100),
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
  tableName: 't_contact'
});

//Localite.belongsTo(Region, { foreignKey: 'rg_reference' });
//Region.hasMany(Localite, { foreignKey: 'rg_reference' });

module.exports = Contact;
