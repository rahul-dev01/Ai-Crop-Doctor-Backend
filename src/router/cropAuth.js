const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const {
  predictImage,
  getUserHistory,
  deletePrediction,
} = require("../controller/predictionController");

const router = express.Router();
const upload = multer({ dest: "src/uploads/" });

router.post("/predict", authMiddleware, upload.single("image"), predictImage);
router.get("/history", authMiddleware, getUserHistory);
router.delete("/delete/:id", authMiddleware, deletePrediction);

module.exports = router;
