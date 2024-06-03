const express = require('express');
const router = express.Router();

const database = require('../database');
let humidities = [
  { id: 1, value: 45.0, timestamp: new Date() },
  { id: 2, value: 50.0, timestamp: new Date() }
];

/**
 * @swagger
 * tags:
 *   name: Humidity
 *   description: API endpoints for managing humidity sensor data
 */

/**
 * @swagger
 * /humidity:
 *   get:
 *     summary: Get all humidity readings
 *     tags: [Humidity]
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/', async (req, res) => {
  try {
    //connect to MariaDB
    //database.connectDB();

    // SQL-Abfrage zum Abrufen aller Temperaturwerte aus der Tabelle "DHT11"
    const query = 'SELECT humidity, datetime FROM DHT11';
    // Ausführen der SQL-Abfrage
    const humidity = await database.query(query);

    // Rückgabe der Temperaturwerte als JSON
    res.json(humidity);
  } catch (error) {
    // Fehlerbehandlung bei einem Datenbankfehler
    console.error('Fehler beim Abrufen der Luftfeuchtigkeitswerte:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }finally {
    //database.disconnectDB();
  }
});

/**
 * @swagger
 * /humidity/{id}:
 *   get:
 *     summary: Get a humidity reading by ID
 *     tags: [Humidity]
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
    id = req.params.id;
    // Ausführen der SQL-Abfrage
    const result = await database.query(query,[id]);
    console.log(result);
    res.json(result);
} catch (error) {
}
});

/**
 * @swagger
 * /humidity:
 *   post:
 *     summary: Create a new humidity reading
 *     tags: [Humidity]
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
 *         description: Humidity reading created successfully
 */
router.post('/', async (req, res) => {
    try {
      const query ='INSERT INTO DHT11 (Humidity,DATETIME) VALUES (?,?)';
      hum =req.body.value;
      console.log(hum);
      datetime = new Date(); 
      console.log(datetime);
      const result = await database.query(query,[hum,datetime]);
      //res.json({ message: 'Temperature added successfully', result });
      console.log(result);
      res.status(201).json(`Humidity : ${hum}° , Timestamp: ${datetime} added in row ${result.insertId}`);
  }catch(error) {
      res.status(500).json({ error: error.message });
  }

});

/**
 * @swagger
 * /humidity/{id}:
 *   put:
 *     summary: Update a humidity reading by ID
 *     tags: [Humidity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The humidity reading ID
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
 *       '200':
 *         description: Humidity reading updated successfully
 *       '404':
 *         description: Humidity reading not found
 */
router.put('/:id', (req, res) => {
  const humidity = humidities.find(h => h.id === parseInt(req.params.id));
  if (!humidity) return res.status(404).send('Humidity reading not found');

  humidity.value = req.body.value;
  humidity.timestamp = new Date();
  res.json(humidity);
});

/**
 * @swagger
 * /humidity/{id}:
 *   delete:
 *     summary: Delete a humidity reading by ID
 *     tags: [Humidity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The humidity reading ID
 *     responses:
 *       '204':
 *         description: Humidity reading deleted successfully
 *       '404':
 *         description: Humidity reading not found
 */
router.delete('/:id', (req, res) => {
  const humidityIndex = humidities.findIndex(h => h.id === parseInt(req.params.id));
  if (humidityIndex === -1) return res.status(404).send('Humidity reading not found');

  humidities.splice(humidityIndex, 1);
  res.status(204).send();
});

module.exports = router;
