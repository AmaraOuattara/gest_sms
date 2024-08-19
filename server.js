const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/database');
const userRoutes = require('./routes/UsersRoutes');
const authRoutes = require ('./routes/authRoutes');
const deviceRoutes = require ('./routes/DeviceRoutes');
const localiteRoutes = require('./routes/localiteRoutes');
const etatRoutes = require('./routes/etatRoutes');
const entrepriseRoutes = require('./routes/entrepriseRoutes');
const listediffusionRoutes = require('./routes/listeRoutes');
const contactRoutes = require('./routes/contactRoutes');
const campagneRoutes = require('./routes/campagneRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./SwaggerConfig');

// Middleware pour parser les corps de requêtes JSON
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', deviceRoutes);
app.use('/api', localiteRoutes);
app.use('/api', etatRoutes);
app.use('/api', entrepriseRoutes);
app.use('api',listediffusionRoutes);
app.use('/api', contactRoutes);
app.use('/api', campagneRoutes);

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Démarrer le serveur
app.listen(port, async () => {
  try {
    await sequelize.sync();
    console.log(`Serveur démarré sur http://localhost:${port}`);
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
});
