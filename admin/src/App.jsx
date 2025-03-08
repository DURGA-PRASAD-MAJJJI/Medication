import React, { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import SignIn from './slides/SignIn';
import { AdminContext } from './context/AdminContext';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './slides/Admin/Dashboard';
import AllAppointment from './slides/Admin/AllAppointment';
import AddDoctor from './slides/Admin/AddDoctor';
import DoctorsList from './slides/Admin/DoctorsList';
import { DocContext } from './context/DocContext';
import DoctorDashboard from './slides/Doctor/DoctorDashboard';
import DoctorAppointment from './slides/Doctor/DoctorAppointment';
import Doctorprofile from './slides/Doctor/Doctorprofile';
const App = () => {

  const { aToken } = useContext(AdminContext)
  const {dToken} =useContext(DocContext)


  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Nav/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* Admin Routes */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashbord' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllAppointment/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorsList/>}/>
          {/* Doctors Routes */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='/doctor-appointments' element={<DoctorAppointment/>}/>
          <Route path='/doctor-profile' element={<Doctorprofile/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <SignIn />
      <ToastContainer />
    </>
  )
}

export default App