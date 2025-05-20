const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");
require("dotenv").config()

const sendImageToFlask = async (imagePath) => {

  const Flask_URl = process.env.FLASK_API_URL ;

  console.log("sendImageToFlask called with imagePath:", imagePath);

  const formData = new FormData();
  formData.append("image", fs.createReadStream(imagePath));

  const response = await axios.post( `${Flask_URl}${"/detection/upload/"}` , formData, {
    headers: formData.getHeaders(),
  });

  console.log("Flask server responded:", response.data);
  
  return response.data; 
};

module.exports = { sendImageToFlask };
