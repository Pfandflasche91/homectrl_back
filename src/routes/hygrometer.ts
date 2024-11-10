import express from 'express';
const router = express.Router();

import database from '../database.js';


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
router.get('/:id', async (req, res) => {
  try {
    const query = 'SELECT temperature,humidity,sensornr FROM DHT11 WHERE id = ?';
    let id = req.params.id;
    // Ausführen der SQL-Abfrage
    const result = await database.query(query,[id]);
    console.log(result);
    res.json(result);
} catch (error) {
}
});

/**
 * @swagger
 * /hygrometer:
 *   post:
 *     summary: Create a new Sensor reading
 *     tags: [Hygrometer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *             properties:
 *               value:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Sensor reading created successfully
 */
router.post('/', async (req, res) => {
  try {
    const query ='INSERT INTO DHT11 (Temperature,Humidity,Sensornr,DATETIME) VALUES (?,?)';
    const { Temperature, Humidity, Sensornr } = req.body;
    
    let datetime = new Date(); 
    console.log(datetime);
    const result = await database.query(query, [Temperature, Humidity, Sensornr, datetime]);
    //res.json({ message: 'Temperature added successfully', result });
    console.log(result);
    res.status(201).json({
      message: `Temperature: ${Temperature}°, Humidity: ${Humidity}%, Sensor number: ${Sensornr}, Timestamp: ${datetime} added successfully.`,
      insertId: result.insertId
    });
}catch(error) {
    res.status(500).json({ error: error.message });
}

});

router.use((req, res) => {
  res.status(404).json({ message: 'Route nicht gefunden - route' });
});

export default router;
