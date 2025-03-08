import validator from "validator";
import bcrypt from "bcrypt";
import { cloudinary } from "../config/cloudinary.js";
import doctorsModel from "../models/doctorsModels.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// ✅ ADD DOCTOR API
const addDoc = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Checking if all fields are present
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "MISSING DETAILS" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter Valid email" });
        }

        // Validate strong password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please Enter a Strong Password (min. 8 characters)" });
        }

        // Hash password for the doctor
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        let imageUrl = "";
        if (imageFile) {
            try {
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
                imageUrl = imageUpload.secure_url;
            } catch (uploadError) {
                return res.status(500).json({ success: false, message: "Image upload failed", error: uploadError.message });
            }
        }

        const doctorsData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: typeof address === "string" ? JSON.parse(address) : address, // Handle JSON.parse safely
            available: true,
            date: Date.now(),
        };

        // Save doctor to database
        const newDoc = new doctorsModel(doctorsData);
        await newDoc.save();

        res.json({ success: true, message: "DOCTOR ADDED" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body // ✅ Corrected from `res.body` to `req.body`

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign( email+password, process.env.JWT_SECRET)

            return res.json({ success: true, token });
        }
        else{
        res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

//api tto det all doctor into admin panel
const allDoc = async(req,res)=>{
    try {
        const doctors = await doctorsModel.find({}).select('-password')
        res.json({success:true,doctors})
        
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
//api for the all the appointments
const appointmentsAdmin = async(req,res)=>{
    try {
        const appointments = await  appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

//api for appointment for the admin
const appointmentCancel = async (req, res) => {
    try {
        const appointmentId  = req.body.id;

        // Fetch appointment details
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }
        // Mark appointment as cancelled
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Releasing doctor's slot
        const { doctorId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorsModel.findById(doctorId);

        if (doctorData) {
            let slots_booked = doctorData.slots_booked || {};

            if (slots_booked[slotDate]) {
                // Remove the cancelled slot
                slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

                // Remove date key if no slots are left
                if (slots_booked[slotDate].length === 0) {
                    delete slots_booked[slotDate];
                }

                // Update the doctor's booked slots
                await doctorsModel.findByIdAndUpdate(doctorId, { slots_booked });
            }
        }

        res.status(200).json({ success: true, message: 'Appointment cancelled' });
    } catch (error) {
        console.error("Cancel Appointment Error:", error);
        res.json({ success: false,message:error.message });
    }
};
//api to dashbord to admin
const adminDashboard = async(req,res)=>{
    try {
        const doctors =await doctorsModel.find({})
        const users = await userModel.find({})
        const appointments =await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse()
        }
        res.json({success:true,dashData})
    } catch (error) {
        console.error("Cancel Appointment Error:", error);
        res.json({ success: false,message:error.message });
    }
}
export { addDoc, loginAdmin, allDoc, appointmentsAdmin, appointmentCancel,adminDashboard};
