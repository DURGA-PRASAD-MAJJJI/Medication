import express from 'express'
import { getProfile, registerUser, signInUser,updateProfile,bookAppointment, AllAppointments, cancelAppointment } from '../controls/userControl.js'
import authuser from '../middlelewares/authUser.js'
import upload from '../middlelewares/multi.js'

const userRoute = express.Router()
userRoute.post('/register',registerUser)
userRoute.post('/signIn',signInUser)
userRoute.get('/get-profile', authuser,getProfile)
userRoute.post('/update-profile',upload.single('image'),authuser,updateProfile)
userRoute.post('/book-appointment',authuser,bookAppointment)
userRoute.get('/all-appointments',authuser,AllAppointments)
userRoute.post('/cancel-appointment',authuser,cancelAppointment)
//userRoute.post('/payment',authuser,paymentRazorpay)

export default userRoute
