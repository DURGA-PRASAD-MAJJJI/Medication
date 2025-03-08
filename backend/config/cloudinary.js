import { v2 as cloudinary } from "cloudinary"; 
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_API_KEY
});

console.log("✅ Cloudinary Connected"); // Debugging log

export { cloudinary }; // ✅ Correct Export
