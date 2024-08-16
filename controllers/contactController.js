const Contact = require('../models/Contact');

// Obtenir la liste de tous les localités
exports.getAllContact = async (req, res) => {
  try {
    const contact = await Contact.findAll();
    res.status(200).json({code: '201',content:contact});
  } catch (error) {
    res.status(500).json({ code: '500',content: 'Erreur serveur', error });
  }
};

// Obtenir une Contact par ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ code: '404',content: 'Contact non trouvé' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({code: '404', content: 'Erreur serveur', error });
  }
};

// Obtenir une Contact par statut
exports.getContactsByStatut = async (req, res) => {
  try {
    const cnt_statut = req.params.statut; // Récupère le statut depuis les paramètres de la requête
    const contacts = await Contact.findAll({
      where: {
        cnt_statut: cnt_statut
      }
    });
    if (!contacts) {
      return res.status(404).json({ code: '404',content: 'Aucune localité trouvée avec ce statut' });
    }
    res.status(200).json({code: '201',content: contacts});
  } catch (error) {
    res.status(500).json({ code: '500',content: 'Erreur serveur', error });
  }
};

// Obtenir une Contact par statut et par Entreprise
exports.getContactsByStatutAndEnt = async (req, res) => {
  try {
    const { statut, Ent } = req.params; // Récupère le statut et l'entreprise depuis les paramètres de la requête
    const contacts = await Contact.findAll({
      where: {
        cnt_statut: statut,
        ent_reference: Ent
      }
    });
    if (!contacts) {
      return res.status(404).json({code:'404', content: 'Aucun contact trouvée avec ce statut et cette entreprise' });
    }
    res.status(200).json({code:'201',content: contacts});
  } catch (error) {
    res.status(500).json({code:'500', content: 'Erreur serveur', error });
  }
};

// Ajouter un nouveau Contact
exports.createContact = async (req, res) => {
  try {
    const { cnt_reference, cnt_nomprenom,cnt_statut,ent_reference,cnt_contact,cnt_email,lst_reference,cnt_civilite } = req.body;
    if (!cnt_reference ||  !ent_reference || !cnt_statut || !cnt_contact || !lst_reference) {
      return res.status(400).json({code:'500', content: 'Les champs obligatoires sont requis' });
    }
    const newContact = await Contact.create({
      cnt_reference, 
      cnt_nomprenom,
      cnt_statut,
      ent_reference,
      cnt_contact,
      cnt_email,
      lst_reference,
      cnt_civilite,
      date_creation: new Date(),
      date_modification: new Date(),
    });
    res.status(201).json({code:'201',content:newContact});
  } catch (error) {
    res.status(500).json({ code:'500', content: 'Erreur serveur', error });
  }
};

// Mettre à jour une Contact
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ code:'404',content: 'Contact non trouvé' });
    }
    await Contact.update(req.body);
    res.status(200).json({code : '204', content: contact});
  } catch (error) {
    res.status(400).json({code:'400', content: 'Erreur de validation', error });
  }
};

// Supprimer une Contact par ID
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ code:'404', content: 'Contact non trouvé' });
    }
    await Contact.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ code:'500',content: 'Erreur serveur', error });
  }
};



