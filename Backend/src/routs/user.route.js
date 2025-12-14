// Import necessary modules from express and custom controllers and middlewares
import { Router } from "express"
import { loginUser, registerUser } from "../controllers/user.controller.js"
// import {upload} from "../middlewares/multer.middleware.js"
import { authMiddleware } from "../middlewares/Auth.middleware.js"

// Initialize a new router instance
const router =  Router()

// Define a POST route for user registration
router.route("/register").post(registerUser)

// Define a POST route for user login
router.route("/login").post(loginUser);

// Define a POST route for user logout
// The route is secured using the verifyJWT middleware to ensure only authenticated users can access it
// router.route("/logout").post(authMiddleware, logoutUser);

// Export the router instance to be used in the main application
export default router