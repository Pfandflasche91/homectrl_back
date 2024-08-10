// src/swaggerOptions.ts
const port = 3000;
export const swaggerOptions = {
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
    apis: ['./src/routes/*.ts'], // Pfad zu den API-Dokumentationskommentaren
  };