import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions.js';
import hygrometerRoutes from './routes/hygrometer.js';
import cors from 'cors';
const app = express();
const port = 3000;


const corsOptions = {
  origin: '*',  // Alle Origins erlauben (nicht empfohlen für Produktionsumgebungen)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// CORS aktivieren
app.use(cors(corsOptions));
app.use(express.json());



// Swagger Docs
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/hygrometer', hygrometerRoutes);

// Catch-All Route für nicht gefundene Endpunkte
app.use((req, res) => {
  res.status(404).json({ message: 'Route nicht gefunden - app' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`API docs available at http://localhost:${port}/api-docs`);
});


