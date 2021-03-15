import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

/**
 * @const specs
 *
 * Define as configs para inicializar o swagger.
 */
const specs = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API - NodeJS',
      version: '1.0.0',
      description: 'Sistema de reservas de livros para biblioteca.',
    },
    servers: [
      {
        url: 'http://localhost:3333/api/v1',
        description: 'Ambiente de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'authorization_id',
        },
      },
    },
  },
  apis: ['./docs/**/*.yml'],
  withCredentials: true,
});

export default (docsRoute) => {
  docsRoute.use('/', swaggerUI.serve, swaggerUI.setup(specs));
};
