import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: "1.0.0",
        title: "Nérus API",
        description: "API documentation for Nérus Todo List",
    },
    host: "localhost:3001",
    basePath: "/api",
    servers: [
        {
            url: 'http://localhost:3001/api/',
            description: 'Development server'

        }
    ],
    components: {
        schemas: {
            task: {
                $id: "1",
                $title: 29,
                completed: false
            },
            someResponse: {
                name: "Jhon Doe",
                age: 29,
            },
            error: {
                message: "Error message",
                statusCode: 400,
            },
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/TodosRoutes.ts'];

(async () => {
    swaggerAutogen(outputFile, endpointsFiles, doc);
    require('./server');
})();