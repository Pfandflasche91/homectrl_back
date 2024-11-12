import express from 'express';
const router = express.Router();

import database from '../database.js';
import { getClosestMeasurement } from '../services/hygrometerService.js'; 
import { resourceLimits } from 'worker_threads';

/**
 * @swagger
 * tags:
 *  name: Hygrometer
 *  description: API endpoints for managing hygrometer sensor data
*/

/**
 * @swagger
 * /hygrometer/{id}:
 *  get:
 *     tags: [Hygrometer]
 *     summary: Get one Hygrometers measurement by ID 
 *     description: Displays hygrometer sensors data 
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
  
    res.status(200).json('NYI');
});

/**
 * @swagger
 * /hygrometer/:
 *  get:
 *     tags: [Hygrometer]
 *     summary: Get all Hygrometers 
 *     description: Displays hygrometer sensors data 
 *     parameters:
 *      - in: query
 *        name: targetStartDatetime
 *        required: false
 *        schema:
 *          type: string
 *          format: date-time
 *          example: '2024-01-01T10:00:00Z'  # Beispiel für das date-time-Format
 *          description: Starting point for the desired period in ISO 8601 format  (YYYY-MM-DDTHH:MM:SSZ)
 *      - in: query
 *        name: targetEndDatetime
 *        required: false
 *        schema:
 *          type: string
 *          format: date-time
 *          example: '2024-01-01T10:00:00Z'  # Beispiel für das date-time-Format
 *          description: Starting point for the desired period in ISO 8601 format  (YYYY-MM-DDTHH:MM:SSZ)
 * 
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 * 
 */
router.get('/', async (req, res) => {
  const targetStartDatetime = req.query.targetStartDatetime as string;
  const targetEndDatetime = req.query.targetEndDatetime as string;
  try {
    const closestMeasurementStart = await getClosestMeasurement(targetStartDatetime);
    const closestMeasurementEnd = await getClosestMeasurement(targetEndDatetime);
    
    const query = 'SELECT * FROM DHT11 WHERE id BETWEEN ? AND ?';
    const result = await database.query(query, [closestMeasurementStart.id, closestMeasurementEnd.id]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'No measurements found for the given ID range.' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
});

/**
 * @swagger
 * /hygrometer:
 *   post:
 *     summary: Create a new sensor reading
 *     tags: [Hygrometer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Temperature
 *               - Humidity
 *               - Sensornr
 *             properties:
 *               Temperature:
 *                 type: number
 *                 description: The temperature reading from the sensor
 *               Humidity:
 *                 type: number
 *                 description: The humidity reading from the sensor
 *               Sensornr:
 *                 type: integer
 *                 description: The sensor number identifier
 *     responses:
 *       '201':
 *         description: Sensor reading created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *                 data:
 *                   type: object
 *                   properties:
 *                     Temperature:
 *                       type: number
 *                       description: The temperature reading from the sensor
 *                     Humidity:
 *                       type: number
 *                       description: The humidity reading from the sensor
 *                     Sensornr:
 *                       type: integer
 *                       description: The sensor number identifier
 *                     DATETIME:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp of the reading
 */
router.post('/', async (req, res) => {
  try {
    const query ='INSERT INTO DHT11 (Temperature,Humidity,Sensornr,DATETIME) VALUES (?,?,?,?)';
    const { Temperature, Humidity, Sensornr } = req.body;
    let datetime = new Date(); 
    const result = await database.query(query, [Temperature, Humidity, Sensornr, datetime]);
    console.log(result);
    res.status(201).json({
      message: `Temperature: ${Temperature}°, Humidity: ${Humidity}%, Sensor number: ${Sensornr}, Timestamp: ${datetime} added successfully.`,
      insertId: `${result.insertId}`
    });
}catch(error) {
    res.status(500).json({ error: error.message });
}

});

router.use((req, res) => {
  res.status(404).json({ message: 'Route nicht gefunden - route' });
});

export default router;
