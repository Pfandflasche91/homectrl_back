const express = require('express');
const router = express.Router();
const temperatureRouter = require('./temperature');
const humidityRouter = require('./humidity');

/**
 * @swagger
 * tags:
 *   name: Climate
 *   description: API endpoints for managing climate data
 */

/**
 * @swagger
 * /updateclima:
 *   post:
 *     summary: Update both temperature and humidity
 *     tags: [Climate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - temperature
 *               - humidity
 *             properties:
 *               temperature:
 *                 type: number
 *               humidity:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Climate updated successfully
 */
router.post('/updateclima', (req, res) => {
  const temperatureReq = {
    body: { value: req.body.temperature }
  };

  const humidityReq = {
    body: { value: req.body.humidity }
  };

  const temperatureRes = {
    status: (code) => ({ json: (data) => console.log(`Temperature updated: ${data}`) })
  };

  const humidityRes = {
    status: (code) => ({ json: (data) => console.log(`Humidity updated: ${data}`) })
  };

  temperatureRouter.post('/', temperatureReq, temperatureRes);
  humidityRouter.post('/', humidityReq, humidityRes);

  res.status(200).send('Climate updated successfully');
});

module.exports = router;
