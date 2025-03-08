import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Use ObjectId for relations
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true }, // ✅ Use ObjectId
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true }, // ✅ Use Date type for better date handling
    cancelled: { type: Boolean, default: false }, // ✅ Renamed to match usage
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
}, { timestamps: true }); // ✅ Adds `createdAt` & `updatedAt`

const appointmentModel = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

export default appointmentModel;
