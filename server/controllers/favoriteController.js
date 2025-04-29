import Favorite from "../models/Favorite.js";

// Add favorite countries
export const addFavorite = async (req, res) => {
    const { countryCode, countryName } = req.body;
    try {
        const favorite = new Favorite({
            userId: req.user.id,
            countryCode,
            countryName
        });
        await favorite.save();
        res.status(201).json(favorite);
    } catch (err) {
        res.status(500).json({ message: "Failed to add favorite", error: err.message });
    }
};

// Delete favorite countries
export const deleteFavorite = async (req, res) => {
    try {
        await Favorite.deleteOne({ userId: req.user.id, countryCode: req.params.countryCode });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: "Failed to delete favorite", error: err.message });
    }
};

// Fetch favorite countries
export const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user.id });
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch favorites", error: err.message });
    }
};
