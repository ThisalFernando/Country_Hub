import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    countryCode: {type: String, required: true},
    countryName: {type: String},
});

export default mongoose.model("Favorite", favoriteSchema);