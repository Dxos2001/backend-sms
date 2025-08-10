// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: { title: 'SMS Campaign API', version: '1.0.0' },
  host: 'localhost:3000',
  schemes: ['http'],
  tags: [
    { name: 'Health', description: 'Monitoreo' },
    { name: 'Campaigns', description: 'Gestión de campañas' },
    { name: 'Messages', description: 'Mensajes de campaña' },
    { name: 'Customers', description: 'Clientes' },
    { name: 'Users', description: 'Usuarios del sistema' }
  ]
};

const outputFile = './swagger_output.json';
// Incluye app.js y TODAS tus rutas .routes.js
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);