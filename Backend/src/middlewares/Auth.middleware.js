import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    // const token = req.cookies.Token || req.headers.authorization;
    const token = req.cookies.Token || req.get("Authorization")?.replace("Bearer ", "");
    // console.log("Token:", token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        req.user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const adminOnly = (req, res, next) => {
    if (req.user.role !== "ADMIN")
        return res.status(403).json({ message: "Admin only" });
    next();
};
