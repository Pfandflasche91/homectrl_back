import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions.js';
import hygrometerRoutes from './routes/hygrometer.js';
import cors from 'cors';
const app = express();
const port = 3000;


// Definiere eine Liste von erlaubten Origins
const allowedOrigins = [
  'http://192.168.2.231:8080',  
  'http://localhost:4200',      

];

// Funktion, um den Origin zu prüfen
const corsOptions = {
  origin: (origin: string, callback: Function) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Erlaube den Origin, wenn er in der Liste ist oder wenn der Origin leer ist (für lokale Tests)
      callback(null, true);
    } else {
      // Blockiere den Origin, wenn er nicht in der Liste ist
      callback(new Error('Not allowed by CORS'), false);
    }
  },
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


