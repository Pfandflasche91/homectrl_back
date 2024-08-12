import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions.js';
import hygrometer from './routes/hygrometer.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/test', hygrometer);

// Swagger Docs
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Catch-All Route für nicht gefundene Endpunkte
app.use((req, res) => {
  res.status(404).json({ message: 'Route nicht gefunden - app' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`API docs available at http://localhost:${port}/api-docs`);
});


