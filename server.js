const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const temperatureRoute = require('./routes/temperature');
const humidityRoute = require('./routes/humidity');
const climateRoute = require('./routes/climate');

const app = express();
const port = process.env.PORT || 3000;

const database = require('./database');


app.use(cors());
app.use(bodyParser.json());

// Swagger-Konfiguration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'HomeCTRL API',
      version: '1.0.0',
      description: 'API documentation for HomeCTRL',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/temperature.js', './routes/humidity.js', './routes/climate.js'], // Pfad zu den API-Routen
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Verwenden der Routen
app.use('/temperature', temperatureRoute);
app.use('/humidity', humidityRoute);
app.use('/', climateRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

setTimeout(() => {
  console.log('Nach 3 Sekunden');
  database.testConnection();
}, 1000);


