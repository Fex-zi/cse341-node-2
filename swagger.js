const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/itemRoutes.js']; 

const doc = {
  info: {
    title: 'My API Documentation',
    description: 'Documentation for my API',
    version: '1.0.0',
  },
  host: 'localhost:3000', 
  basePath: '/api/items',
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app.js'); 
});
