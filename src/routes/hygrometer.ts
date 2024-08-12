import express from 'express';
const router = express.Router();

import pool from '../database.js';


// In einer der Routendateien
/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Test route
 *     description: This is a test route
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/', (req, res) => {
  res.send('Test route');
});

router.use((req, res) => {
  res.status(404).json({ message: 'Route nicht gefunden - route' });
});

export default router;
