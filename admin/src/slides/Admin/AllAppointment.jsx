import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../../../admin/src/assets/assets';

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext); // Fixed 'currancy' to 'currency'

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        {/* Header Row */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-semibold text-gray-700'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointment List */}
        {appointments.map((item, index) => (
          <div 
            key={index} 
            className='flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-100'
          >
            {/* Index */}
            <p className='hidden sm:block'>{index + 1}</p>

            {/* Patient Info */}
            <div className='flex items-center gap-2'>
              <img className='w-8 h-12 rounded-full' src={item.userData.image} alt="Patient" />
              <p>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className='hidden sm:block'>{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            {/* Doctor Info */}
            <div className='flex items-center gap-2'>
              <img className='w-8 h-12 rounded-full bg-gray-200' src={item.docData.image} alt="Doctor" />
              <p>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p>{currency}{item.amount}</p>

            {/* Actions */}
            {item.cancelled ? (
              <p className='text-red-500 text-xs font-medium'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-500 text-xs font-medium'>Completed</p>
            ) : (
              <img 
                onClick={() => cancelAppointment(item._id)} 
                src={assets.cancel_icon} 
                alt="Cancel" 
                className='cursor-pointer w-6 h-6 hover:opacity-70'
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointment;
