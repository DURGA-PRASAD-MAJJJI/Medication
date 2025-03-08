import doctorsModel from "../models/doctorsModels.js";
import bcrypt, { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
const changeState = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorsModel.findById(docId);
        await doctorsModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: 'Availability Changed' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const docList = async (req, res) => {
    try {
        const doctors = await doctorsModel.find({}).select(['-password', '-email']);
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};
//api for doctors

const signinDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorsModel.findOne({ email });

        if (!doctor) {
            return res.json({ success: false, message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};
//api to get appointmets doctors
const appointmentsDoc = async (req, res) => {
    try {
        const { doctorId } = req.body

        const appointments = await appointmentModel.find({ doctorId })

        res.json({ success: true, appointments })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
//api to appointment completed
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body
        const appointmentData = appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        } else {
            return res.json({ success: false, message: 'Mark Failed' })

        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
//api to cancel to doctor
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body
        const appointmentData = appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment cancelled' })
        } else {
            return res.json({ success: false, message: 'Mark Failed' })

        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
// API to get dashboard data for doctor
const doctorDashboard = async (req, res) => {
    try {
        const { doctorId } = req.body;

        const appointments = await appointmentModel.find({ doctorId });

        let earnings = 0;
        appointments.forEach((item) => {

            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
        });

        let patients = [];
        appointments.forEach((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5),
        };

        res.json({ success: true, data: dashData }); // Fixed success response
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};
//api to get doctor profile

const docProfile = async (req, res) => {
    try {
        const { doctorId } = req.body
        const profileData = await doctorsModel.findById(doctorId).select('-password')
        res.json({ success: true, profileData })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
//api to updata doctor  profile
const updateDocProfile = async (req, res) => {
    try {
        const { doctorId, fees, address, available } = req.body
        await doctorsModel.findByIdAndUpdate(doctorId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
export { changeState, docList, signinDoctor, appointmentsDoc, appointmentComplete, appointmentCancel, doctorDashboard, docProfile, updateDocProfile };
