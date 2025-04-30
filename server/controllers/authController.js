import { registerUser, loginUser } from "../services/authService.js";
import User from "../models/User.js";

// Register a new user
export const register = async (req, res) => {
    try {
        const { name, address, email, password } = req.body;
        const { user, token } = await registerUser({ name, address, email, password });
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login the user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser({ email, password });
        res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get logged customer's details
export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            name: user.name,
            address: user.address,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user details", error });
    }
};
