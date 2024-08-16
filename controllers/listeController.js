const Listediffusion = require('../models/Listediffusion');

// Obtenir la liste de toutes les listes de diffusion
exports.getAllListe = async (req, res) => {
  try {
    const listediffusion = await Listediffusion.findAll();
    res.status(200).json({code: '201',content:listediffusion});
  } catch (error) {
    res.status(500).json({ code: '500',content: 'Erreur serveur', error });
  }
};

// Obtenir une liste de diffusion  par ID
exports.getListeById = async (req, res) => {
  try {
    const listediffusion = await Listediffusion.findByPk(req.params.id);
    if (!listediffusion) {
      return res.status(404).json({ code: '404',content: 'Liste de diffusion non trouvé' });
    }
    res.status(200).json(listediffusion);
  } catch (error) {
    res.status(500).json({code: '404', content: 'Erreur serveur', error });
  }
};

// Obtenir une liste de diffusion par statut
exports.getListeByStatut = async (req, res) => {
  try {
    const lst_statut = req.params.statut; // Récupère le statut depuis les paramètres de la requête
    const listediffusion = await Listediffusion.findAll({
      where: {
        lst_statut: lst_statut
      }
    });
    if (!listediffusion) {
      return res.status(404).json({ code: '404',content: 'Aucune liste trouvée avec ce statut' });
    }
    res.status(200).json({code: '201',content: listediffusion});
  } catch (error) {
    res.status(500).json({ code: '500',content: 'Erreur serveur', error });
  }
};

// Obtenir une liste de diffusion par statut et par entreprise
exports.getListeByStatutAndEnt = async (req, res) => {
  try {
    const { statut, Entreprise } = req.params; // Récupère le statut et l'entreprise depuis les paramètres de la requête
    const listediffusion = await Listediffusion.findAll({
      where: {
        lst_statut: statut,
        ent_reference: Entreprise
      }
    });
    if (!listediffusion) {
      return res.status(404).json({code:'404', content: 'Aucune liste de diffusion trouvée avec ce statut et cette entreprise' });
    }
    res.status(200).json({code:'201',content: listediffusion});
  } catch (error) {
    res.status(500).json({code:'500', content: 'Erreur serveur', error });
  }
};

// Ajouter un nouvelle liste de diffusion
exports.createListe = async (req, res) => {
  try {
    const { lst_reference, lst_libelle,lst_statut,ent_reference,lst_description} = req.body;
    if (!lst_reference ||  !lst_libelle || !lst_statut || !ent_reference) {
      return res.status(400).json({code:'500', content: 'Les champs obligatoires sont requis' });
    }
    const newlistediffusion = await Listediffusion.create({
      lst_reference, 
      lst_libelle,
      lst_statut,
      ent_reference,
      lst_description,
      date_creation: new Date(),
      date_modification: new Date(),
    });
    res.status(201).json({code:'201',content: newlistediffusion});
  } catch (error) {
    res.status(500).json({ code:'500', content: 'Erreur serveur', error });
  }
};

// Mettre à jour une liste de diffusion
exports.updateListe = async (req, res) => {
  try {
    const listediffusion = await Listediffusion.findByPk(req.params.id);
    if (!listediffusion) {
      return res.status(404).json({ code:'404',content: 'Liste de diffusion non trouvé' });
    }
    await listediffusion.update(req.body);
    res.status(200).json(listediffusion);
  } catch (error) {
    res.status(400).json({code:'400', content: 'Erreur de validation', error });
  }
};

// Supprimer une liste de diffusion par ID
exports.deleteListe = async (req, res) => {
  try {
    const listediffusion = await Listediffusion.findByPk(req.params.id);
    if (!listediffusion) {
      return res.status(404).json({ code:'404', content: 'Liste de diffusion non trouvé' });
    }
    await listediffusion.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ code:'500',content: 'Erreur serveur', error });
  }
};



