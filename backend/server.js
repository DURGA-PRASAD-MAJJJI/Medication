import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import { cloudinary } from './config/cloudinary.js'; // Cloudinary integration
import adminRouter from './routes/adminRoute.js';
import docRoute from './routes/docRoute.js';
import userRoute from './routes/userRoute.js';
dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 4000;

// Database Connection
connectDB();

// Middleware
app.use(express.json()); // Parses JSON request bodies

// CORS configuration (optional but useful for security)
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', // Adjust based on your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions)); // Enable CORS with options

// API Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctors',docRoute);
app.use('/api/user',userRoute);

//app.use('/api/doctor',docRouter);

// Cloudinary example upload route
app.post('/api/upload', (req, res) => {
    const { image } = req.body;

    cloudinary.uploader.upload(image, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
        }
        return res.json({ url: result.url });
    });
});


// Default Route
app.get('/', (req, res) => res.send('API Working'));

// Start Server
app.listen(port, () => console.log(`🚀 Server started on port ${port}`));
