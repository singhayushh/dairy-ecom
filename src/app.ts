/*
    Load env file based on run command.
    Look at the package.json file, the script to run the server passes a variable named NODE_ENV using the cross-env package. We use the variable to determine which env file to call -> either .env.production or .env.development
*/
import * as dotenv from "dotenv";
if (!process.env.NODE_ENV) {
    dotenv.config({ path: `.env.production` });
} else {
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
}

import path from "path"; // path for directory handling
import cors from "cors"; // cors is for cross origin resource sharing.
import express from "express"; // express is the framework for the backend
import swaggerUi from "swagger-ui-express"; // swagger is the package we use for better documentation of the api

// Import custom packages we'll be using
import {
    connect,
    getConnectionState,
    isValidConnectionURI,
} from "./config/db.config"; // has code to establish connection the mongo db
import { swaggerSpec } from "./config/swagger.config"; // has configuration for swagger
import { mainRouter } from "./routes/main.route";
import { logger } from "./utils/logger.util";
import { ErrorHandler } from "./controllers/error.controller";
import env from "./config/env.config";

// Import variables for the env file.
const PROJECT_NAME = String(env.PROJECT_NAME);
const MONGO_URI = String(env.CONNECTION_URI);
const BASE_URL = String(env.BASE_URL) || "http://127.0.0.1";
const PORT = Number(env.PORT);

// Check MongoDB connection string format
if (!isValidConnectionURI(MONGO_URI)) {
    // tslint:disable-next-line:no-console
    console.log("Error: Invalid MongoDB Connection URI");
    process.exit(0);
}

// Initialize the express app!
const app: express.Application = express();
app.disable("x-powered-by");

// Add some external middleware. These middleware will always function for every request our express app receives.
app.use(cors()); // allows cross origin resource sharing. Edit and add whitelisted servers only
app.use(express.json()); // specifies that the type of json in request body and response body will be JSON
app.use(express.urlencoded({ extended: true })); // this middleware parses the incoming request body else it wouldn't be identified as a payload data.

// Set up ejs for server side rendering.
app.set("view engine", "ejs"); // setting the template engine of express as ejs
app.set("views", path.join(__dirname, "../views")); // defining directory to serve views.
app.use(express.static(path.join(__dirname, "../static"))); // defining directory to serve static files.

// Custom handler for error at any middleware / route
app.use(ErrorHandler);

/*
    Default route for logging server startup time. The "/" part is the route definition, what follows is the controller function written inside like a callback. Ideally, we should write this controller in a different file and refer it here like app.get("/", controllerFunction);

    Inside the controller, we are just sending a raw response which consists of a message that this server was started at xyz date-time.
*/
app.get("/status", (_req: express.Request, res: express.Response) =>
    res.send(`${PROJECT_NAME} server started on ${new Date()}`)
);

/* 
    Swagger Documentation route. If you browse to the /docs endpoint, you will see the UI based API documentation swagger creates for us.
*/
app.get("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add grouped routes to the express app from ./routes/main.route.ts
app.use("/", mainRouter);

// Start the express server in the defined port, this too uses a callback function which we have written right inside.
app.listen(PORT, async () => {
    const db = await connect(MONGO_URI); // connect to the mongo instance

    // Logging for dev and prod environments
    if (String(process.env.NODE_ENV) !== "test") {
        // tslint:disable-next-line:no-console
        console.log(
            `${getConnectionState(db.connection.readyState)} to the database`
        );

        // tslint:disable-next-line:no-console
        console.log(`Listening on ${BASE_URL}:${PORT}...`);
        logger.info(`Listening on ${BASE_URL}:${PORT}...`);
    }

    // Emit ready state
    app.emit("ready");
});

export { app };
