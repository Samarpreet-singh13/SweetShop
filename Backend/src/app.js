// Import necessary modules for the Express.js application
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

// Create an instance of the Express.js application
const app = express();
// console.log("",process.env.CORS_ORIGIN);
// Configure middleware for Cross-Origin Resource Sharing (CORS)
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Specify the allowed origin(s)
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Allow credentials to be sent along with the request
}));

// Configure middleware for parsing incoming JSON payloads with a limit of 16 KB
app.use(express.json({ limit: "16kb" }));

// Configure middleware for parsing incoming URL-encoded payloads with a limit of 16 KB
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Configure middleware for serving static files from the "public" directory
app.use(express.static("public"));

// Configure middleware for parsing incoming request cookies
app.use(cookieParser());

// Import and use the user routes defined in the "user.routs.js" file
import router from "./routs/user.route.js";
import sweet from "./routs/sweet.route.js";
app.use("/api/auth", router); // Mount the user routes at the "/api/v1/users" endpoint
app.use("/api/sweets", sweet); // Mount the user routes at the "/api/v1/users" endpoint

// https://localhost:8000/api/v1/users/

// Export the Express.js application instance for use in other parts of the application
export { app };
