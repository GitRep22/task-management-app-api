const swaggerJsDoc = require("swagger-jsdoc"); // Make sure this matches the package name
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API documentation for Task Management",
    },
    servers: [
      {
        url: "https://te6tj7edk6.execute-api.ap-northeast-1.amazonaws.com",
      },
    ],
  },
  apis: ["./routes/taskRoutes.js"], // Make sure this path is correct
};

console.log("Generating Swagger specs...");
const specs = swaggerJsDoc(options);
console.log("Swagger specs generated:", specs);

const setupSwagger = (app) => {
  console.log("Setting up Swagger UI at /api-docs...");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  console.log("Swagger UI setup completed.");
};

module.exports = setupSwagger;
