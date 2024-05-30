const express = require('express');
const router = express.Router();

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
router.get('/', (req, res) => {
  res.json(humidities);
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
router.get('/:id', (req, res) => {
  const humidity = humidities.find(h => h.id === parseInt(req.params.id));
  if (!humidity) return res.status(404).send('Humidity reading not found');
  res.json(humidity);
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
router.post('/', (req, res) => {
  const newHumidity = {
    id: humidities.length + 1,
    value: req.body.value,
    timestamp: new Date()
  };
  humidities.push(newHumidity);
  res.status(201).json(newHumidity);
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
