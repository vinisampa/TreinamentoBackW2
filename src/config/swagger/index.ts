import { OpenAPIV3 } from 'openapi-types';
import paths from './paths';
import schemas from './schemas';

const swagger: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Api treinamento',
    description: 'Documentação',
    contact: {
      email: 'vinicius.silva@polijunior.com.br',
    },
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3333',
      description: 'Local server',
    },
  ],
  paths,
  components: {
    schemas,
  },
};

export default swagger;
