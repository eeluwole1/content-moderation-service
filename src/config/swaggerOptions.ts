import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Content Moderation API",
            version: "1.0.0",
            description: "API documentation for the content moderation service. It includes endpoints for moderating posts, managing users, and retrieving flagged content statistics.",
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
                        content: { type: "string", example: "Sample moderated post content..." },
                        author: { type: "string", example: "User123" },
                        isFlagged: { type: "boolean", example: true },
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
                        bio: { type: "string", example: "User bio about their experience." },
                        joinedAt: { type: "string", format: "date-time", example: "2023-01-15T09:00:00Z" },
                        postsCount: { type: "integer", example: 45 },
                    },
                },
                FlaggedContentStats: {
                    type: "object",
                    properties: {
                        totalFlaggedPosts: { type: "integer", example: 120 },
                        totalFlaggedUsers: { type: "integer", example: 15 },
                        mostCommonFlagReason: { type: "string", example: "Spam" },
                        flaggedContentByCategory: {
                            type: "object",
                            properties: {
                                spam: { type: "integer", example: 75 },
                                hateSpeech: { type: "integer", example: 30 },
                                inappropriateContent: { type: "integer", example: 15 },
                            },
                        },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/controllers/*.ts"], // Include controllers for full documentation
};
// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};
