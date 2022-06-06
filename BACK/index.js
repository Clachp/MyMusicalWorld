require('dotenv').config();
const express = require('express');
const router = require('./app/router');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5050;

const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
  openapi: "3.0.0",
  info: {
    version: '1.0.0',
    title: 'API-MyMusicalWorld',
    description: 'MyMusicalWorld\'s librairy',
    license: {
      name: 'MIT',
    },
  },

  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    },

  },

  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};

const firstFunction = expressJSDocSwagger(app);

firstFunction(options);


//Mise à jour des options du module cors
const corsOptions = {
  exposedHeaders: `Authorization`,
};
// Middleware pour autoriser tous les domaines à se connecter à notre API
app.use(cors(corsOptions));

app.use(express.json());

app.use(router)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
    console.log(`api-docs on http://localhost:${port}/api-docs`);
});

