import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API for My Diary app',
      version: '1.0.0',
      description: 'REST API for MyDiary is an online journal for personal use',
    },
    servers: [
      {
        url: 'http://localhost:3333/api/v1',
        description: 'API TESTE',
      },
    ],
  },
  apis: ['./docs/**/*.yml'],
  withCredentials: true,
};

const specs = swaggerJSDoc(options);

export default (docsRoute) => {
  docsRoute.use('/', swaggerUI.serve, swaggerUI.setup(specs));
};
