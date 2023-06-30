import swaggerJSDoc, { type Options } from 'swagger-jsdoc';
import { version } from '../../package.json';

const swaggerJSDocOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Test Application API Docs',
      version,
    },
  },
  apis: ['./src/routes/**/*.ts', './src/schemas/**/*.ts'],
};

const swaggerDoc = swaggerJSDoc(swaggerJSDocOptions);

export default swaggerDoc;
