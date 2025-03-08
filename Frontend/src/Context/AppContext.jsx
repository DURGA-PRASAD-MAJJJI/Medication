import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext({
    doctors: []  // Default value for context
});

const AppContextProvider = ({ children }) => {
    const currency = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userInfo, setUserInfo] = useState(false)


    const getDoctorsData = async () => {
        try {
            // Removed trailing slash after all-doc to match the API endpoint
            const { data } = await axios.get(`${backendUrl}/api/doctors/list/`);
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const loadUserProfileData = async () => {
        try {
            if (!token) {
                toast.error("User not authenticated!");
                return;
            }
    
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            if (data.success && data.userData) {
                setUserInfo(data.userData); // Ensure the correct property exists
            } else {
                toast.error(data.message || "Failed to load user data");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };
    
    const value = {
        doctors,
        getDoctorsData,
        currency,
        token, setToken,
        backendUrl,
        userInfo, setUserInfo,
        loadUserProfileData
    };

    useEffect(() => {
        getDoctorsData();
    }, []);
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserInfo(null); // Setting to null prevents undefined property errors
        }
    }, [token]);
    

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
