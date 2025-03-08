import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currancy = '₹'

    const calculateAge = (dob) => {
        const today = new Date();
        const birthdate = new Date(dob);
        let age = today.getFullYear() - birthdate.getFullYear();
        return age;
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_'); // Assumes input format is "DD_MM_YYYY"
        return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`;
    };
    // Define context value
    const value = {
        calculateAge,
        slotDateFormat,
        currancy
    };

    return (
        <AppContext.Provider value={value}>
            {props.children} {/* ✅ Fixed typo */}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
