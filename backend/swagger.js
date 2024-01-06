const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Mangaement API',
      description: "API for user management with authentication and authorization",
      contact: {
        name: process.env.CONTACT_NAME,
        email: process.env.CONTACT_EMAIL,
        url: process.env.CONTACT_URL
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: process.env.LIVE_SERVER_URL,
        description: "Live server"
      },
      {
        url: process.env.LOCAL_SERVER_URL,
        description: "Local server"
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