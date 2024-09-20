import express from 'express';
const router = express.Router();

import pool from '../database.js';


/**
 * @swagger
 * tags:
 *  name: Hygrometer
 *  description: API endpoints for managing hygrometer sensor data
*/

/**
 * @swagger
 * /hygrometer:
 *   get:
 *     tags: [Hygrometer]
 *     summary: Get all Hygrometers 
 *     description: Displays latest hygrometer sensors data 
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 */
router.get('/', (req, res) => {
  res.send('Test route das ein test');
});

/**
 * @swagger
 * /hygrometer/{id}:
 *  get:
 *     tags: [Hygrometer]
 *     summary: Get all Hygrometers 
 *     description: Displays latest hygrometer sensors data 
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: The hygrometer sensor ID
 * 
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 * 
 */
router.get('/:id',async(req, res) => {
  res.send("hymudity id")
})

router.use((req, res) => {
  res.status(404).json({ message: 'Route nicht gefunden - route' });
});

export default router;
