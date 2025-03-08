import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, required: true }, // ✅ Fixed duplicate field
    fees: { type: Number, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} } // ✅ Ensures no errors if undefined
}, { minimize: false, timestamps: true }); // ✅ Auto adds `createdAt` & `updatedAt`

const doctorsModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);

export default doctorsModel;
