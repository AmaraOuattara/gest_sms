const Entreprise = require('../models/Entreprise');

// Obtenir la liste de toutes les entreprises
exports.getAllEntreprise = async (req, res) => {
  try {
    const entreprise = await Entreprise.findAll();
    res.status(200).json({code: '201',content: entreprise});
  } catch (error) {
    res.status(500).json({ code: '500',content: 'Erreur serveur', error });
  }
};

// Obtenir une entreprise par ID
exports.getEntrepriseById = async (req, res) => {
  try {
    const entreprise= await Entreprise.findByPk(req.params.id);
    if (!entreprise) {
      return res.status(404).json({ code: '404',content: 'entreprise non trouvé' });
    }
    res.status(200).json({code: '201',content: entreprise});
  } catch (error) {
    res.status(500).json({code: '500', content: 'Erreur serveur', error });
  }
};

// Obtenir un entreprise par statut
exports.getEntrepriseByStatut = async (req, res) => {
  try {
    const _statut = req.params.statut; // Récupère le statut depuis les paramètres de la requête
    const entreprise = await Entreprise.findAll({
      where: {
        ent_statut: _statut
      }
    });
    if (!entreprise) {
      return res.status(404).json({ code: '404',content: 'Aucune entreprise trouvée avec ce statut' });
    }
    res.status(200).json({code: '201',content: entreprise});
  } catch (error) {
    res.status(500).json({ code: '500',content: 'Erreur serveur', error });
  }
};



// Ajouter une nouvelle Entreprise
exports.createEntreprise = async (req, res) => {
  try {
    const { ent_reference, ent_nomcommercial,ent_domaine,ent_email,ent_telephone,ent_statut} = req.body;
    if (!ent_reference ||  !ent_nomcommercial || !ent_telephone || !ent_domaine) {
      return res.status(400).json({ code: '500',content: 'Les champs obligatoires sont requis' });
    }
    const newEntreprise = await Entreprise.create({
      ent_reference, 
      ent_nomcommercial,
      ent_domaine,
      ent_email,
      ent_telephone,
      ent_statut,
      date_creation: new Date(),
      date_modification: new Date(),
    });
    res.status(201).json({code: '201',content: newEntreprise});
  } catch (error) {
    res.status(500).json({ code: '500',content: 'Erreur serveur', error });
  }
};

// Mettre à jour une Entreprise
exports.updateEntreprise = async (req, res) => {
  try {
    const entreprise = await Entreprise.findByPk(req.params.id);
    if (!entreprise) {
      return res.status(404).json({ code: '500',content: 'Entreprise non trouvé' });
    }
    await entreprise.update(req.body);
    res.status(200).json({code: '201', content: entreprise});
  } catch (error) {
    res.status(400).json({code: '500', content: 'Erreur de validation', error });
  }
};

// Supprimer une entreprise par ID
exports.deleteEntreprise = async (req, res) => {
  try {
    const entreprise = await Entreprise.findByPk(req.params.id);
    if (!entreprise) {
      return res.status(404).json({code: '404', content: 'entreprise non trouvé' });
    }
    await Entreprise.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ code: '500',content: 'Erreur serveur', error });
  }
};



