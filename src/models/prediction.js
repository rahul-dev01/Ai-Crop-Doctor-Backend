const mongoose = require("mongoose")

const PredictionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    crop: String,
    result: String,
    confidence: String,
    imagePath: String,
},
    { timestamps: true }
)

module.exports = mongoose.model("Prediction", PredictionSchema)