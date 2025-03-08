import express from "express";
import { addDoc, allDoc, loginAdmin, appointmentsAdmin,appointmentCancel, adminDashboard} from "../controls/adminControl.js";
import upload from "../middlelewares/multi.js";
import authAdmin from "../middlelewares/authAdmin.js";
import { changeState } from "../controls/docControl.js";

const router = express.Router();

// Add Multer middleware -> `upload.single("image")`
router.post('/add-doc',authAdmin,upload.single('image'), addDoc);


router.post('/login', loginAdmin );
router.post('/all-doc', authAdmin, allDoc);
router.post('/change-state', authAdmin, changeState );
router.get('/appointments',authAdmin, appointmentsAdmin);
router.post('/cancel-appointment', authAdmin, appointmentCancel);
router.get('/dasboard',authAdmin,adminDashboard)




export default router;
