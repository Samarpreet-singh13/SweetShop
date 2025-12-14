// import axios from "axios";
import { apiConnector } from "../services/api";

export const register = async (name, email, password, role) => {
    try {
        const response = await apiConnector("POST", "/auth/register", { name, email, password, role });
        console.log(response);
        if (!response.data.success) {
            throw new Error(response.data.message || "Registration failed");
        }
        return response.data.data;
    } catch (error) {
        console.error("Registration failed:", error);
    }
}

export const authlogin = async (email, password, role) => {
    try {
        const response = await apiConnector("POST", "/auth/login", { email, password, role });
        console.log(response);

        if (!response.data.success) {
            throw new Error(response.data.message || "Login failed");
        }
        const { user } = response.data.data;
        const { Token } = response.data.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("Token", Token);
        return response.data.data;
    } catch (error) {
        console.error("Login failed:", error);
    }
}
export const authlogout = async () => {
    try {
        // Optionally notify the backend about logout
        // await axios.post("/auth/logout");
        // logout();
        localStorage.removeItem("user");
        localStorage.removeItem("Token");

    } catch (error) {
        console.error("Logout failed:", error);
    }
}