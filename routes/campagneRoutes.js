const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const campagneController = require('../controllers/campagneController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Campagne:
 *       type: object
 *       required:
 *         - cmg_reference
 *         - cmg_libelle
 *         - cmg_statut
 *         - ent_reference
 *       properties:
 *         cmg_reference:
 *           type: string
 *           description: la reference de la campagne
 *         cmg_libelle:
 *           type: string
 *           description: le libelle de la campagne
 *         cmg_statut:
 *           type: integer
 *           description: la statut de la campagne actif ou non
 *         ent_reference:
 *           type: string
 *           description: l'entreprise de la campagne
 *         cmg_description:
 *           type: string
 *           description: la description de la campagne
 *         date_creation:
 *           type: string
 *           format: date-time
 *           description: La date et l'heure à laquelle la campagne  a été créé
 *         date_modification:
 *           type: string
 *           format: date-time
 *           description: La date et l'heure à laquelle la campagne a été modifié
 *       example:
 *         ID_campagne: 1
 *         cmg_reference: cmg_001
 *         cmg_libelle: PROSPECT
 *         cmg_stat: 1
 *         ent_reference: ENT_001
 *         cmg_description: campagne de diffusion des prospects à convertir en client
 *         date_creation: 2023-01-01T00:00:00Z
 *         date_modification: 2023-01-01T00:00:00Z
 */

/**
 * @swagger
 * tags:
 *   name: Campagne
 *   description: API pour gerer les campagnes
 */

/**
 * @swagger
 * /campagne:
 *  get:
 *    summary: obtenir la campagne de toutes les campagnes
 *    tags: [Campagne]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *              schema:
 *                 type: array
 *                 items:
 *                    $ref: '#/components/schemas/Campagne'
 *      404:
 *        sdescription: campagne non trouvé
 */ 

router.get('/campagne',campagneController.getAllCampagne);

/**
 * @swagger
 * /campagne/{id}:
 *   get:
 *     summary: obtenir les informations d'une campagne par ID
 *     tags: [Campagne]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de la campagne
 *     responses:
 *       200:
 *         description: Les détails de la campagne
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campagne'
 *       404:
 *         description: campagne non trouvée
 */

 router.get('/campagne/:id',authMiddleware,campagneController.getCampagneById);

 /**
 * @swagger
 * /campagne/statut/{statut}:
 *   get:
 *     summary: obtenir les informations d'une campagne par statut
 *     tags: [Campagne]
 *     parameters:
 *       - in: path
 *         name: statut
 *         schema:
 *           type: string
 *         required: true
 *         description: Le statut de la campagne
 *     responses:
 *       200:
 *         description: Les détails de la campagne
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campagne'
 *       404:
 *         description: campagne non trouvée
 */

 router.get('/campagne/statut/:statut',campagneController.getCampagneByStatut);

/**
 * @swagger
 * /campagne:
 *   post:
 *     summary: ajouter une nouvelle campagne
 *     tags: [Campagne]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campagne'
 *     responses:
 *       201:
 *         description: campagne créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campagne'
 *       400:
 *         description: Erreur de validation
 */
router.post('/campagne', authMiddleware, campagneController.createCampagne);

//obtenir la campagne des lstalités par Entreprise
/**
 * @swagger
 * /campagne/Entreprise:
 *   get:
 *     summary: obtenir la campagne des campagnes par Entreprise et par statut
 *     tags: [Campagne]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campagne'
 *     responses:
 *       201:
 *         description: campagne créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campagne'
 *       400:
 *         description: Erreur de validation
 */
router.get('/campagne/Entreprise', campagneController.getCampagneByStatutAndEnt);

/**
 * @swagger
 * /campagne/Entreprise:
 *   get:
 *     summary: obtenir les informations d'une campagne par statut et par Entreprise
 *     tags: [Campagne]
 *     parameters:
 *       - in: path
 *         name: statut
 *         schema:
 *           type: string
 *         required: true
 *         description: Le statut de la campagne
 *       - in: path
 *         name: Entreprise
 *         schema:
 *           type: string
 *         required: true
 *         description: La Entreprise de la campagne
 *     responses:
 *       200:
 *         description: Les détails de la campagne
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campagne'
 *       404:
 *         description: campagne non trouvée
 */
 
router.put('/campagne/:id', authMiddleware, campagneController.updateCampagne);

/**
 * @swagger
 * /campagne/{id}:
 *   delete:
 *     summary: Supprimer une campagne par ID
 *     tags: [Campagne]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de la campagne
 *     responses:
 *       204:
 *         description: La campagne a été supprimé avec succès
 *       404:
 *         description: campagne non trouvé
 */
router.delete('/campagne/:id', authMiddleware, campagneController.deleteCampagne);
module.exports = router;