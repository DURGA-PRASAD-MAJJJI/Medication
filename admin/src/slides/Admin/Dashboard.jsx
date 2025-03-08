import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../../../admin/src/assets/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className='m-5 p-4 bg-gray-50 rounded-lg shadow-md w-full'>
      <div className='flex flex-wrap gap-6'>
        <div className='flex items-center gap-4 bg-white p-6 min-w-64 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all shadow-sm'>
          <img className='w-16' src={assets.doctor_icon} alt='' />
          <div>
            <p className='text-2xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-lg text-gray-400'>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-4 bg-white p-6 min-w-64 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all shadow-sm'>
          <img className='w-16' src={assets.appointments_icon} alt='' />
          <div>
            <p className='text-2xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-lg text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-4 bg-white p-6 min-w-64 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all shadow-sm'>
          <img className='w-16' src={assets.patients_icon} alt='' />
          <div>
            <p className='text-2xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-lg text-gray-400'>Patients</p>
          </div>
        </div>
      </div>
      <div className='bg-white mt-6 rounded-lg shadow-md w-full'>
        <div className='flex items-center gap-4 px-6 py-4 bg-green-500 text-white rounded-t-lg'>
          <img className='w-16' src={assets.list_icon} alt='' />
          <p className='text-xl font-semibold'>Latest Bookings</p>
        </div>
        <div className='pt-4 border border-t-0 max-h-[500px] overflow-y-auto'>
          {dashData.latestAppointments.map((item, index) => (
            <div className='flex items-center px-8 py-4 gap-4 hover:bg-gray-100 transition' key={index}>
              <img className='rounded-full w-12 border border-gray-300' src={item.docData.image} alt='' />
              <div className='flex-1 text-base'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className='text-red-400 text-sm font-medium'>Cancelled</p>
              ) : (
                <img onClick={() => cancelAppointment(item._id)} className='cursor-pointer hover:opacity-75 w-8' src={assets.cancel_icon} alt='' />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;