import express from 'express';
import { appointmentCancel, appointmentComplete, appointmentsDoc, docList, docProfile, doctorDashboard, signinDoctor, updateDocProfile } from '../controls/docControl.js';
import authDoc from '../middlelewares/authDoc.js';

const adminRouter = express.Router();

// Define the route to list doctors
adminRouter.get('/list',docList);
adminRouter.post('/signin',signinDoctor);
adminRouter.get('/appointments',authDoc,appointmentsDoc)
adminRouter.post('/complete-appointment',authDoc,appointmentComplete)
adminRouter.post('/cancel-appointment',authDoc,appointmentCancel)
adminRouter.get('/doctorDashboard',authDoc,doctorDashboard)
adminRouter.get('/profile',authDoc,docProfile)
adminRouter.post('/update-profile',authDoc,updateDocProfile)

export default adminRouter;
