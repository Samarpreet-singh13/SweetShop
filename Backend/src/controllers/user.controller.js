import { asyncHandler } from "../utils/asyncHandler.js"
import User from "../modules/user.models.js"
import { ApiError } from "../utils/apiErrors.js"
import { ApiResponse } from "../utils/apiResponse.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User already exists with this email");
    }

    const hashed = await bcrypt.hash(password, 10);
    const createdUser = await User.create({ name, email, password: hashed });

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (role && user.role !== role) {
        throw new ApiError(400, "Invalid email or password");
    }
    if (!user || !isMatch) {
        throw new ApiError(400, "Invalid email or password");
    }

    const loggenInUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(
        loggenInUser,
        process.env.JWT_TOKEN_SECRET,
        { expiresIn: "1d" }
    );


    return res.status(200).cookie("Token", token).json(
        new ApiResponse(
            200, {
            user: loggenInUser,
            Token: token
        },
            "User logged In Successfully"
        )
    );
})


export {
    registerUser,
    loginUser,
}


