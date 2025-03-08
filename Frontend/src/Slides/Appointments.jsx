import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/all-appointments/`, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) setAppointments(data.appointments.reverse());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment/`, { appointmentId }, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { if (token) getUserAppointments(); }, [token]);

  return (
    <div>
      <p className='p-3 mt-8 font-medium text-zinc-700 border-b text-3xl text-center'>My Appointments</p>
      <div>
        {appointments.slice(0, 4).map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <img className='w-32 bg-green-50 border border-green-500 rounded-full' src={item.docData.image} alt="" />
            <div className='flex-1 text-base text-zinc-600'>
              <p className='text-neutral-800 font-semibold text-lg'>{item.docData.name}</p>
              <p className='text-md'>{item.speciality}</p>
              <p className='text-sm mt-1'><span className='text-md text-neutral-700 font-medium'>Date:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div className='flex flex-col gap-3 justify-end'>
              {!item.cancelled && !item.isCompleted && (
                <button className='text-medium text-stone-500 text-center sm:min-w-48 py-2 border rounded-xl hover:bg-primary hover:text-white transition-all'>Pay Online</button>
              )}
              {item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded-xl text-green-500 cursor-not-allowed" type="">Completed</button>}

              {!item.cancelled ? !item.isCompleted && (
                <button onClick={() => cancelAppointment(item._id)} className='text-medium text-stone-500 text-center sm:min-w-48 py-2 border rounded-xl hover:bg-red-500 hover:text-white transition-all'>Cancel Appointment</button>
              ) : (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded-xl text-red-500 cursor-not-allowed" disabled>Appointment Cancelled</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
