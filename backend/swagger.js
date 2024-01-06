const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Mangaement API',
      description: "API for user management with authentication and authorization",
      contact: {
        name: "Shamitha",
        email: "shamitha19102002@gmail.com",
        url: ""
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Local server"
      },
      {
        url: "<your live url here>",
        description: "Live server"
      },
    ]
  },
  // looks for configuration in specified directories
  apis: ['./swagger.yaml'],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}
module.exports = swaggerDocs;