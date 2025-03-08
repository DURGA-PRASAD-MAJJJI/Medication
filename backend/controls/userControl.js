import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { json } from 'react-router-dom'
import { v2 as cloudinary } from "cloudinary";
import doctorsModel from '../models/doctorsModels.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }
        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Missing Details" })

        }
        //validating strong password

        if (password.length < 8) {
            return res.json({ success: false, message: "Its Not a Strong Password" })
        }
        //harshing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        //_id
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for login user
const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'User Does not Found' })
        }
        const isFound = await bcrypt.compare(password, user.password)
        if (isFound) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}
//api for user profile
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//api to update
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageInfo = req.file
        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "Data Has Missing...." })

        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });
        if (imageInfo) {
            //upload image to cloudanary
            const uploadImage = await cloudinary.uploader.upload(imageInfo.path, { resource_type: 'image' })
            const imageUrl = uploadImage.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }
        res.json({ success: true, message: "Profile Update" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for appointment
const bookAppointment = async (req, res) => {
    try {
        console.log("📥 Received Request Body:", req.body); // ✅ Debugging

        const { userId, doctorId, slotDate, slotTime } = req.body;

        if (!userId || !doctorId || !slotDate || !slotTime) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Check if user already booked the same slot
        const existingAppointment = await appointmentModel.findOne({ userId, doctorId, slotDate, slotTime });
        if (existingAppointment) {
            return res.status(400).json({ success: false, message: "You have already booked this slot." });
        }

        // Fetch doctor data (excluding password)
        const docData = await doctorsModel.findById(doctorId).select('-password');
        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        if (!docData.available) {
            return res.status(400).json({ success: false, message: "Doctor is not available" });
        }

        let slots_booked = docData.slots_booked || {};
        if (!slots_booked[slotDate]) {
            slots_booked[slotDate] = [];
        }

        if (slots_booked[slotDate].includes(slotTime)) {
            return res.status(400).json({ success: false, message: "Slot not available" });
        }

        slots_booked[slotDate].push(slotTime);

        // Fetch user data (excluding password)
        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const appointmentData = {
            userId,
            doctorId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        };

        console.log("📝 Saving Appointment Data:", appointmentData); // ✅ Debugging

        // Save appointment
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Update doctor slots
        await doctorsModel.findByIdAndUpdate(doctorId, { slots_booked });

        return res.status(201).json({ success: true, message: "Appointment Booked Successfully" });

    } catch (error) {
        console.error("❌ Error in booking appointment:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
//api to get appointments

const AllAppointments = async (req, res) => {
    try {
        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//api to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        // Fetch appointment details
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        // Authorization check
        if (appointmentData.userId.toString() !== userId) {
            return res.status(401).json({ success: false, message: "Unauthorized Activity" });
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
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};


export { registerUser, signInUser, getProfile, updateProfile, bookAppointment, AllAppointments, cancelAppointment }