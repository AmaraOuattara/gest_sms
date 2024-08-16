const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const entrepriseController = require('../controllers/entrepriseController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Entreprise:
 *       type: object
 *       required:
 *         - ent_reference
 *         - ent_nomcommercial
 *         - ent_domaine
 *       properties:
 *         ent_reference:
 *           type: string
 *           description: la reference de la entreprise
 *         ent_nomcommercial:
 *           type: string
 *           description: le libelle de la entreprise
 *         ent_domaine:
 *           type: integer
 *           description: la statut de la entreprise actif ou non
 *         ent_email:
 *           type: string
 *           description: email de l'entreprise
 *         ent_telephone:
 *           type: string
 *           description: le numero de téléphone de l'entreprise
 *         ent_statut:
 *           type: booleen
 *           description: le statut de l'entreprise
 *         date_creation:
 *           type: string
 *           format: date-time
 *           description: La date et l'heure à laquelle la entreprise  a été créé
 *         date_modification:
 *           type: string
 *           format: date-time
 *           description: La date et l'heure à laquelle la entreprise a été modifié
 *       example:
 *         ID_entreprise: 1
 *         ent_reference: ENT_001
 *         ent_nomcommercial: DIATA GROUP
 *         ent_domaine: COMMERCE GENERAL
 *         ent_email: Ahmedamara@diatagroup.com 
 *         ent_telephone: +2250768070259
 *         ent_statut: 1        
 *         date_creation: 2023-01-01T00:00:00Z
 *         date_modification: 2023-01-01T00:00:00Z
 */

/**
 * @swagger
 * tags:
 *   name: Entreprise
 *   description: API pour gerer les entreprise
 */

/**
 * @swagger
 * /entreprise:
 *  get:
 *    summary: obtenir la liste de touts les entreprise
 *    tags: [Entreprise]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *              schema:
 *                 type: array
 *                 items:
 *                    $ref: '#/components/schemas/Entreprise'
 *      404:
 *        sdescription: entreprise non trouvé
 */ 

router.get('/entreprise',entrepriseController.getAllEntreprise);

/**
 * @swagger
 * /entreprise/{id}:
 *   get:
 *     summary: obtenir les informations d'un entreprise par ID
 *     tags: [Entreprise]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'entreprise
 *     responses:
 *       200:
 *         description: Les détails de l'entreprise
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entreprise'
 *       404:
 *         description: entreprise non trouvée
 */

 router.get('/entreprise/:id',authMiddleware,entrepriseController.getEntrepriseById);

 /**
 * @swagger
 * /entreprise/statut/{statut}:
 *   get:
 *     summary: obtenir les informations d'un entreprise par statut
 *     tags: [Entreprise]
 *     parameters:
 *       - in: path
 *         name: statut
 *         schema:
 *           type: string
 *         required: true
 *         description: Le statut de l'entreprise
 *     responses:
 *       200:
 *         description: Les détails de l 'entreprise
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entreprise'
 *       404:
 *         description: entreprise non trouvée
 */

 router.get('/entreprise/statut/:statut',entrepriseController.getEntrepriseByStatut);

/**
 * @swagger
 * /entreprise:
 *   post:
 *     summary: ajouter un nouveau entreprise
 *     tags: [Entreprise]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Entreprise'
 *     responses:
 *       201:
 *         description: entreprise créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entreprise'
 *       400:
 *         description: Erreur de validation
 */
router.post('/entreprise', authMiddleware, entrepriseController.createEntreprise);



/**
 * @swagger
 * /entreprise:
 *   put:
 *     summary: Mettre à jour un entreprise  par ID
 *     tags: [Entreprise]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true 
 *         description: l'ID de l'entreprise
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Entreprise'
 *     responses:
 *       200:
 *         description: L'entreprise a été mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entreprise'
 *       404:
 *         description: entreprise non trouvé
 *       400:
 *         description: Erreur de validation
 */
router.put('/entreprise/:id', authMiddleware, entrepriseController.updateEntreprise);

/**
 * @swagger
 * /entreprise/{id}:
 *   delete:
 *     summary: Supprimer un entreprise par ID
 *     tags: [Entreprise]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'entreprise
 *     responses:
 *       204:
 *         description: L'entreprise a été supprimé avec succès
 *       404:
 *         description: entreprise non trouvé
 */
router.delete('/entreprise/:id', authMiddleware, entrepriseController.deleteEntreprise);
module.exports = router;