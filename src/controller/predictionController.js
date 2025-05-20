const Prediction = require("../models/prediction");
const { sendImageToFlask } = require("../service/predictionService");

const predictImage = async (req, res) => {

  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: userId missing" });
  }

  const imageFile = req.file;

  try {
    const predictionData = await sendImageToFlask(imageFile.path);

    let crop = ""
    let disease = ""

    if (predictionData && predictionData.result) {
      const regex = /^(.+?) leaf with (.+)$/i;
      const match = predictionData.result.match(regex);
      if (match && match.length === 3) {
        crop = match[1].trim();
        disease = match[2].trim();
      }
      else {
        disease = predictionData.result;
      }
    }

    const newPrediction = new Prediction({
      userId: userId,
      crop: crop,
      result: disease,
      confidence: predictionData.confidence || "N/A",
      imagePath: imageFile.path,
    });

    await newPrediction.save();
    res.status(201).json(newPrediction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Prediction failed" });
  }
};


const getUserHistory = async (req, res) => {
  
  try {
    const userId = req.user?.userId;
    const history = await Prediction.find({ userId }).sort({ createdAt: -1 });
  
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch history" });
  }
};


const deletePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id);
    if (!prediction) return res.status(404).json({ error: "Not found" });

    if (prediction.imagePath) {
      const fs = require("fs");
      fs.unlinkSync(prediction.imagePath);
    }

    await Prediction.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Deletion failed" });
  }
};

module.exports = {
  predictImage,
  getUserHistory,
  deletePrediction,
};
