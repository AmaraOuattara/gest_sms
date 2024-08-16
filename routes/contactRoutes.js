const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const contactController = require('../controllers/contactController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - cnt_reference
 *         - cnt_contact
 *         - cnt_statut
 *         - ent_reference
 *         - lst_reference
 *       properties:
 *         cnt_reference:
 *           type: string
 *           description: la reference du contact
 *         cnt_nomprenom:
 *           type: string
 *           description: le nom du contact
 *         cnt_contact:
 *           type: string
 *           description: le numero du contact
 *         cnt_email:
 *           type: string
 *           description: l'email du contact
 *         cnt_statut:
 *           type: integer
 *           description: la statut du contact actif ou non
 *         ent_reference:
 *           type: string
 *           description: l'entreprise du contact
 *         cnt_civilite:
 *           type: string
 *           description: la civilité du contact
 *         lst_reference:
 *           type: string
 *           description: la reference de la liste de diffusion
 *         date_creation:
 *           type: string
 *           format: date-time
 *           description: La date et l'heure à laquelle la contact  a été créé
 *         date_modification:
 *           type: string
 *           format: date-time
 *           description: La date et l'heure à laquelle la contact a été modifié
 *       example:
 *         ID_contact: 1
 *         cnt_reference: cnt_001
 *         cnt_nomprenom: OUATTARA AMARA AHMED
 *         cnt_statut: 1
 *         ent_reference: ENT_001
 *         lst_reference: LST_001
 *         cnt_email: ""
 *         cnt_civilite: 1
 *         cnt_contact: +2250768070259
 *         cnt_description: contact de diffusion des prospects à convertir en client
 *         date_creation: 2023-01-01T00:00:00Z
 *         date_modification: 2023-01-01T00:00:00Z
 */

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: API pour gerer les contacts
 */

/**
 * @swagger
 * /contact:
 *  get:
 *    summary: obtenir la contact de toutes les contacts
 *    tags: [Contact]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *              schema:
 *                 type: array
 *                 items:
 *                    $ref: '#/components/schemas/contact'
 *      404:
 *        sdescription: contact non trouvé
 */ 

router.get('/contact',contactController.getAllContact);

/**
 * @swagger
 * /contact/{id}:
 *   get:
 *     summary: obtenir les informations d'une contact par ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du contact
 *     responses:
 *       200:
 *         description: Les détails du contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: contact non trouvée
 */

 router.get('/contact/:id',authMiddleware,contactController.getContactById);

 /**
 * @swagger
 * /contact/statut/{statut}:
 *   get:
 *     summary: obtenir les informations d'une contact par statut
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: statut
 *         schema:
 *           type: string
 *         required: true
 *         description: Le statut du contact
 *     responses:
 *       200:
 *         description: Les détails du contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: contact non trouvée
 */

 router.get('/contact/statut/:statut',contactController.getContactsByStatut);

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: ajouter une nouvelle contact
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: contact créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Erreur de validation
 */
router.post('/contact', authMiddleware, contactController.createContact);

//obtenir la contact des lstalités par Entreprise
/**
 * @swagger
 * /contact/Entreprise:
 *   get:
 *     summary: obtenir la contact des contacts par Entreprise et par statut
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: contact créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/contact'
 *       400:
 *         description: Erreur de validation
 */
router.get('/contact/Entreprise', contactController.getContactsByStatutAndEnt);

/**
 * @swagger
 * /contact/Entreprise:
 *   get:
 *     summary: obtenir les informations d'une contact par statut et par Entreprise
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: statut
 *         schema:
 *           type: string
 *         required: true
 *         description: Le statut du contact
 *       - in: path
 *         name: Entreprise
 *         schema:
 *           type: string
 *         required: true
 *         description: La Entreprise du contact
 *     responses:
 *       200:
 *         description: Les détails du contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/contact'
 *       404:
 *         description: contact non trouvée
 */
 
router.put('/contact/:id', authMiddleware, contactController.updateContact);

/**
 * @swagger
 * /contact/{id}:
 *   delete:
 *     summary: Supprimer une contact par ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du contact
 *     responses:
 *       204:
 *         description: La contact a été supprimé avec succès
 *       404:
 *         description: contact non trouvé
 */
router.delete('/contact/:id', authMiddleware, contactController.deleteContact);
module.exports = router;