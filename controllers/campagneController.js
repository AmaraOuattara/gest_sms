const Campagne = require('../models/campagne');

// Obtenir la liste de toutes les Campagnes
exports.getAllCampagne = async (req, res) => {
  try {
    const campagne = await Campagne.findAll();
    res.status(200).json({code: '201',content: campagne});
  } catch (error) {
    res.status(500).json({ code: '500',content: 'Erreur serveur', error });
  }
};

// Obtenir une Campagne de diffusion  par ID
exports.getCampagneById = async (req, res) => {
  try {
    const campagne = await Campagne.findByPk(req.params.id);
    if (!campagne) {
      return res.status(404).json({ code: '404',content: 'Campagne de diffusion non trouvé' });
    }
    res.status(200).json({ code: '201',content: campagne});
  } catch (error) {
    res.status(500).json({code: '404', content: 'Erreur serveur', error });
  }
};

// Obtenir une Campagne par statut
exports.getCampagneByStatut = async (req, res) => {
  try {
    const cmg_statut = req.params.statut; // Récupère le statut depuis les paramètres de la requête
    const campagne = await Campagne.findAll({
      where: {
        cmg_statut: cmg_statut
      }
    });
    if (!campagne) {
      return res.status(404).json({ code: '404',content: 'Aucune Campagne trouvée avec ce statut' });
    }
    res.status(200).json({code: '201',content: campagne});
  } catch (error) {
    res.status(500).json({ code: '500',content: 'Erreur serveur', error });
  }
};

// Obtenir une Campagne  par statut et par entreprise
exports.getCampagneByStatutAndEnt = async (req, res) => {
  try {
    const { statut, Entreprise } = req.params; // Récupère le statut et l'entreprise depuis les paramètres de la requête
    const campagne = await Campagne.findAll({
      where: {
        cmg_statut: statut,
        ent_reference: Entreprise
      }
    });
    if (!campagne) {
      return res.status(404).json({code:'404', content: 'Aucune Campagne de diffusion trouvée avec ce statut et cette entreprise' });
    }
    res.status(200).json({code:'201',content: campagne});
  } catch (error) {
    res.status(500).json({code:'500', content: 'Erreur serveur', error });
  }
};

// Ajouter un nouvelle Campagne de diffusion
exports.createCampagne = async (req, res) => {
  try {
    const { cmg_reference, cmg_libelle,cmg_statut,ent_reference,cmg_description} = req.body;
    if (!cmg_reference ||  !cmg_libelle || !cmg_statut || !ent_reference) {
      return res.status(400).json({code:'500', content: 'Les champs obligatoires sont requis' });
    }
    const newCampagne = await Campagne.create({
      cmg_reference, 
      cmg_libelle,
      cmg_statut,
      ent_reference,
      cmg_description,
      date_creation: new Date(),
      date_modification: new Date(),
    });
    res.status(201).json({code:'201',content: newCampagne});
  } catch (error) {
    res.status(500).json({ code:'500', content: 'Erreur serveur', error });
  }
};

// Mettre à jour une Campagne de diffusion
exports.updateCampagne = async (req, res) => {
  try {
    const campagne = await Campagne.findByPk(req.params.id);
    if (!campagne) {
      return res.status(404).json({ code:'404',content: 'Campagne de diffusion non trouvé' });
    }
    await campagne.update(req.body);
    res.status(200).json(campagne);
  } catch (error) {
    res.status(400).json({code:'400', content: 'Erreur de validation', error });
  }
};

// Supprimer une Campagne de diffusion par ID
exports.deleteCampagne = async (req, res) => {
  try {
    const campagne = await Campagne.findByPk(req.params.id);
    if (!campagne) {
      return res.status(404).json({ code:'404', content: 'Campagne de diffusion non trouvé' });
    }
    await Campagne.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ code:'500',content: 'Erreur serveur', error });
  }
};



