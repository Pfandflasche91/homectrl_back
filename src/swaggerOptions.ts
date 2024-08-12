// src/swaggerOptions.ts
import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import path from 'path';

// __filename und __dirname für ES-Module definieren
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const port = 3000;

const swaggerOptions: Options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Simple API',
        version: '1.0.0',
        description: 'A simple Express API with Swagger',
      },
      servers: [
        {
            url: `http://localhost:${port}`,
            description: 'Development server',
          },
          {
            url: `http://192.168.2.231:${port}`,
            description: 'Productiv System',
          },
      ],
    },
    apis: ['./dist/routes/*.js'],
  };

  export default swaggerOptions;