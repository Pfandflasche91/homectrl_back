const express = require('express');
const router = express.Router();

let temperatures = [
  { id: 1, value: 22.5, timestamp: new Date() },
  { id: 2, value: 23.0, timestamp: new Date() }
];

/**
 * @swagger
 * tags:
 *   name: Temperature
 *   description: API endpoints for managing temperature sensor data
 */

/**
 * @swagger
 * /temperature:
 *   get:
 *     summary: Get all temperature readings
 *     tags: [Temperature]
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/', (req, res) => {
  res.json(temperatures);
});

/**
 * @swagger
 * /temperature/{id}:
 *   get:
 *     summary: Get a temperature reading by ID
 *     tags: [Temperature]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The temperature reading ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Temperature reading not found
 */
router.get('/:id', (req, res) => {
  const temperature = temperatures.find(t => t.id === parseInt(req.params.id));
  if (!temperature) return res.status(404).send('Temperature reading not found');
  res.json(temperature);
});

/**
 * @swagger
 * /temperature:
 *   post:
 *     summary: Create a new temperature reading
 *     tags: [Temperature]
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
 *         description: Temperature reading created successfully
 */
router.post('/', (req, res) => {
  const newTemperature = {
    id: temperatures.length + 1,
    value: req.body.value,
    timestamp: new Date()
  };
  temperatures.push(newTemperature);
  res.status(201).json(newTemperature);
});

/**
 * @swagger
 * /temperature/{id}:
 *   put:
 *     summary: Update a temperature reading by ID
 *     tags: [Temperature]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The temperature reading ID
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
 *         description: Temperature reading updated successfully
 *       '404':
 *         description: Temperature reading not found
 */
router.put('/:id', (req, res) => {
  const temperature = temperatures.find(t => t.id === parseInt(req.params.id));
  if (!temperature) return res.status(404).send('Temperature reading not found');

  temperature.value = req.body.value;
  temperature.timestamp = new Date();
  res.json(temperature);
});

/**
 * @swagger
 * /temperature/{id}:
 *   delete:
 *     summary: Delete a temperature reading by ID
 *     tags: [Temperature]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The temperature reading ID
 *     responses:
 *       '204':
 *         description: Temperature reading deleted successfully
 *       '404':
 *         description: Temperature reading not found
 */
router.delete('/:id', (req, res) => {
  const temperatureIndex = temperatures.findIndex(t => t.id === parseInt(req.params.id));
  if (temperatureIndex === -1) return res.status(404).send('Temperature reading not found');

  temperatures.splice(temperatureIndex, 1);
  res.status(204).send();
});

module.exports = router;
