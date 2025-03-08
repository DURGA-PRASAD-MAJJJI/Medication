import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const savedToken = localStorage.getItem('aToken');
    const [aToken, setAToken] = useState(savedToken ? savedToken : '');
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getDoctors = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/all-doc/`, {}, { headers: { Authorization: `Bearer ${aToken}` } });

            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    const changeState = async (docId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-state/`, { docId }, { headers: { Authorization: `Bearer ${aToken}` } });
            if (data.success) {
                toast.success(data.message)
                getDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);

        }
    }
    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments/`, { headers: { Authorization: `Bearer ${aToken}` } });
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const cancelAppointment = async(appointmentId)=>{
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, {id:appointmentId},{ headers: { Authorization: `Bearer ${aToken}` } });

            if (data.success) {
                toast.success(data.message)
                console.log("Cancelling appointment with ID:", appointmentId);
                getAllAppointments()
                
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);

        }
    }

    const getDashData = async()=>{
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/dasboard`,{ headers: { Authorization: `Bearer ${aToken}` } });
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
                
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);

        }
    }
    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getDoctors,
        changeState,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,getDashData
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
