import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     description: Returns a welcome message.
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', (req, res) => {
  res.send('Welcome to the Simple API');
});

export default router;