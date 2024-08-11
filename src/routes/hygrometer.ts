import express from 'express';
const router = express.Router();

import { querydb } from '../database.js';

/**
 * @swagger
 * tags:
 *   name: Hygrometer
 *   description: API endpoints for managing temerature and humidity sensor data
 */

/**
 * @swagger
 * /hygrometer/{id}:
 *   get:
 *     summary: adfGet a humidity reading by ID
 *     tags: [Hygrometer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The humidity reading ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Humidity reading not found
 */
router.get('/:id', async (req, res) => {
  try {
    const query = 'SELECT humidity FROM DHT11 WHERE id = ?';
    let id = req.params.id;
    // Ausführen der SQL-Abfrage
    const result = await querydb(query,[id]);
    console.log(result);
    res.json(result);
} catch (error) {
}
});

module.exports = router;