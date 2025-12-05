import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCLoudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("file upload successfully", response.secure_url);
    fs.unlinkSync(localFilePath)
    return response;
  } catch (error) {
    // remove file from local server
    console.error("Cloudinary Upload Error:",error)
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export default uploadOnCLoudinary;
