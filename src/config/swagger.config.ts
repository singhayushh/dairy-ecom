/*
 * Author: Ayush Singh
 * File: swagger.config.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import swaggerJSDoc from "swagger-jsdoc";
import env from "./env.config";

// Swagger API definition
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: `API Documentation for ${env.PROJECT_NAME}`,
        version: "1.0.0",
        description: `${env.PROJECT_DESC}`,
    },
    servers: [
        {
            url: `${env.BASE_URL}`,
            description: "Production",
        },
        {
            url: `http://localhost:${env.PORT}`,
            description: "Local Development",
        },
    ],
    components: {
        securitySchemes: {
            httpBearer: {
                type: "http",
                scheme: "bearer",
            },
        },
    },
    security: [
        {
            httpBearer: [],
        },
    ],
};

// Swagger options
const options = {
    swaggerDefinition,
    apis: ["./src/routes/*.route.ts"],
};

// Generate Swagger specification
const swaggerSpec: object = swaggerJSDoc(options);

export { swaggerSpec };
