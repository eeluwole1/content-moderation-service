import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Express } from "express";
import { generateSwaggerSpec } from "./swaggerOptions";

// define swagger options
const swaggerOptions: swaggerJsDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
        },
    },
    // path to annotated files
    // **TODO** update to use routes instead of app 
    apis: ["./src/app.ts"],
};

// Initialize Swagger JSDoc object
// eslint: suppress eslint error for using "any" type on following line
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const swaggerDocs: any = swaggerJsDoc(swaggerOptions);

// serve swagger in apiDocs directory
const setupSwagger = (app: Express): void => {
    const specs = generateSwaggerSpec();
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

// export swagger endpoint for Express app
export default setupSwagger;