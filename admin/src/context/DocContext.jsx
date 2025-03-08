import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DocContext = createContext();

const DocContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const savedToken = localStorage.getItem("dToken");
    const [dToken, setDToken] = useState(savedToken ? savedToken : "");

    const [appointments, setAppointments] = useState([]);
    const [dashData,setDashData] = useState(false)
    const [profileData,setProfileData]= useState(false)

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctors/appointments/`, { headers: { Authorization: `Bearer ${dToken}` } });
            if (data.success) {
                setAppointments(data.appointments.reverse());
                console.log(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctors/complete-appointment/`, { appointmentId }, { headers: { Authorization: `Bearer ${dToken}` } });
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/doctors/cancel-appointment/`, { appointmentId }, { headers: { Authorization: `Bearer ${dToken}` } });
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }
    const getDashData = async()=>{
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctors/doctorDashboard/`, { headers: { Authorization: `Bearer ${dToken}` } })
            if (data.success) {
                setDashData(data.data);
                console.log(data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }
    const getprofileData = async()=>{
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctors/profile/`, { headers: { Authorization: `Bearer ${dToken}` } })
            if (data.success) {
                setProfileData(data.profileData);
                console.log(data.profileData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }
    const value = {
        dToken, setDToken,
        backendUrl,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,setDashData,getDashData,
        profileData,setProfileData,getprofileData
    };

    return (
        <DocContext.Provider value={value}>
            {props.children}
        </DocContext.Provider>
    );
};

export default DocContextProvider;