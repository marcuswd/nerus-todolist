import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nérus TODO API",
      version: "1.0.0",
      description: "Documentação da API de tarefas",
    },
    servers: [
      {
        url: "http://localhost:3001/api/",
      },
    ],
  },
  apis: [path.resolve(__dirname, "./routes/*.js")],
});