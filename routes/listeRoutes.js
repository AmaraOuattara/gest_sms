const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const listeController = require('../controllers/listeController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Liste:
 *       type: object
 *       required:
 *         - lst_reference
 *         - lst_libelle
 *         - lst_statut
 *         - ent_reference
 *       properties:
 *         lst_reference:
 *           type: string
 *           description: la reference de la Liste
 *         lst_libelle:
 *           type: string
 *           description: le libelle de la Liste
 *         lst_statut:
 *           type: integer
 *           description: la statut de la Liste actif ou non
 *         ent_reference:
 *           type: string
 *           description: l'entreprise de la Liste
 *         lst_description:
 *           type: string
 *           description: la description de la Liste
 *         date_creation:
 *           type: string
 *           format: date-time
 *           description: La date et l'heure à laquelle la Liste  a été créé
 *         date_modification:
 *           type: string
 *           format: date-time
 *           description: La date et l'heure à laquelle la Liste a été modifié
 *       example:
 *         ID_Liste: 1
 *         lst_reference: lst_001
 *         lst_libelle: PROSPECT
 *         lst_stat: 1
 *         ent_reference: ENT_001
 *         lst_description: Liste de diffusion des prospects à convertir en client
 *         date_creation: 2023-01-01T00:00:00Z
 *         date_modification: 2023-01-01T00:00:00Z
 */

/**
 * @swagger
 * tags:
 *   name: Liste
 *   description: API pour gerer les Listes
 */

/**
 * @swagger
 * /Liste:
 *  get:
 *    summary: obtenir la liste de toutes les Listes
 *    tags: [Liste]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *              schema:
 *                 type: array
 *                 items:
 *                    $ref: '#/components/schemas/Liste'
 *      404:
 *        sdescription: Liste non trouvé
 */ 

router.get('/Liste',listeController.getAllListe);

/**
 * @swagger
 * /Liste/{id}:
 *   get:
 *     summary: obtenir les informations d'une Liste par ID
 *     tags: [Liste]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de la Liste
 *     responses:
 *       200:
 *         description: Les détails de la Liste
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Liste'
 *       404:
 *         description: Liste non trouvée
 */

 router.get('/Liste/:id',authMiddleware,listeController.getListeById);

 /**
 * @swagger
 * /Liste/statut/{statut}:
 *   get:
 *     summary: obtenir les informations d'une Liste par statut
 *     tags: [Liste]
 *     parameters:
 *       - in: path
 *         name: statut
 *         schema:
 *           type: string
 *         required: true
 *         description: Le statut de la Liste
 *     responses:
 *       200:
 *         description: Les détails de la Liste
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Liste'
 *       404:
 *         description: Liste non trouvée
 */

 router.get('/Liste/statut/:statut',listeController.getListeByStatut);

/**
 * @swagger
 * /Liste:
 *   post:
 *     summary: ajouter une nouvelle Liste
 *     tags: [Liste]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Liste'
 *     responses:
 *       201:
 *         description: Liste créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Liste'
 *       400:
 *         description: Erreur de validation
 */
router.post('/Liste', authMiddleware, listeController.createListe);

//obtenir la liste des lstalités par Entreprise
/**
 * @swagger
 * /Liste/Entreprise:
 *   get:
 *     summary: obtenir la liste des Listes par Entreprise et par statut
 *     tags: [Liste]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Liste'
 *     responses:
 *       201:
 *         description: Liste créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Liste'
 *       400:
 *         description: Erreur de validation
 */
router.get('/Liste/Entreprise', listeController.getListeByStatutAndEnt);

/**
 * @swagger
 * /Liste/Entreprise:
 *   get:
 *     summary: obtenir les informations d'une Liste par statut et par Entreprise
 *     tags: [Liste]
 *     parameters:
 *       - in: path
 *         name: statut
 *         schema:
 *           type: string
 *         required: true
 *         description: Le statut de la Liste
 *       - in: path
 *         name: Entreprise
 *         schema:
 *           type: string
 *         required: true
 *         description: La Entreprise de la Liste
 *     responses:
 *       200:
 *         description: Les détails de la Liste
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Liste'
 *       404:
 *         description: Liste non trouvée
 */
 
router.put('/Liste/:id', authMiddleware, listeController.updateListe);

/**
 * @swagger
 * /Liste/{id}:
 *   delete:
 *     summary: Supprimer une Liste par ID
 *     tags: [Liste]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de la Liste
 *     responses:
 *       204:
 *         description: La Liste a été supprimé avec succès
 *       404:
 *         description: Liste non trouvé
 */
router.delete('/Liste/:id', authMiddleware, listeController.deleteListe);
module.exports = router;