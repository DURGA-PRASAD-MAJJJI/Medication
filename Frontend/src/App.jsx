import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Slides/Home'
import Doctors from './Slides/Doctors'
import Signin from './Slides/Signin'
import About from './Slides/About'
import Contact from './Slides/Contact'
import Profile from './Slides/Profile'
import Appointments from './Slides/Appointments'
import Appointment from './Slides/Appointment'
import Navi from './Components/Navi'
import Bottom from './Components/Bottom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Import the CSS

const App = () => {
  
  // Example toast trigger
  const showWelcomeToast = () => {
    toast.success("Welcome to our website!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  React.useEffect(() => {
    showWelcomeToast(); // Show toast on first load
  }, []);

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer /> {/* ✅ Toast Container */}
      <Navi />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/Signin' element={<Signin />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Appointments' element={<Appointments />} />
        <Route path='/Appointment/:doctorId' element={<Appointment />} />
      </Routes>
      <Bottom />
    </div>
  )
}

export default App
