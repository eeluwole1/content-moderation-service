import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Content Moderation API",
            version: "1.0.0",
            description: "API documentation for the content moderation service.",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Post: {
                    type: "object",
                    required: ["id", "content", "author", "isFlagged", "createdAt"],
                    properties: {
                        id: { type: "string", example: "p12345" },
                        content: { type: "string", example: "Sample post content..." },
                        author: { type: "string", example: "User123" },
                        isFlagged: { type: "boolean", example: false },
                        createdAt: { type: "string", format: "date-time", example: "2024-03-12T12:34:56Z" },
                        updatedAt: { type: "string", format: "date-time", example: "2024-03-15T10:12:45Z" },
                    },
                },
                User: {
                    type: "object",
                    required: ["id", "username", "bio", "joinedAt", "postsCount"],
                    properties: {
                        id: { type: "string", example: "u7890" },
                        username: { type: "string", example: "sampleUser123" },
                        bio: { type: "string", example: "This is a sample bio for the user profile." },
                        joinedAt: { type: "string", format: "date-time", example: "2023-01-15T09:00:00Z" },
                        postsCount: { type: "integer", example: 45 },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ["./src/api/v1/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express): void => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
