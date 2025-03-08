import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets/assets';
import { useNavigate, NavLink } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const Navi = () => {
  const navigate = useNavigate();
  const { token, setToken, userInfo } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const signout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img onClick={() => navigate('/')} className="w-40 h-32 cursor-pointer" src={assets.logo} alt="Logo" />
      <ul className="hidden md:flex items-start gap-8 font-medium">
        <NavLink to="/"><li className="py-2 text-lg">HOME</li><hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" /></NavLink>
        <NavLink to="/doctors"><li className="py-2 text-lg">DOCTORS</li><hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" /></NavLink>
        <NavLink to="/About"><li className="py-2 text-lg">ABOUT</li><hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" /></NavLink>
        <NavLink to="/Contact"><li className="py-2 text-lg">CONTACT</li><hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" /></NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userInfo ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userInfo.image} alt="User" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate('Profile')} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate('Appointments')} className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={signout} className="hover:text-black cursor-pointer">LOGOUT</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('Signin')} className="bg-primary text-white px-6 py-2 rounded-full font-light block md:block">CREATE ACCOUNT</button>
        )}
        {!token && <div><a href="https://medication-admin.onrender.com"><button className="border border-primary text-primary px-4 py-2 rounded-full shadow-sm text-sm hover:bg-primary hover:text-white transition-all">Admin & Doctors Panel</button></a></div>}

        <div>
          <img onClick={() => setShowMenu(true)} className="w-8 md:hidden cursor-pointer" src={assets.menu_icon} alt="Menu Icon" />
          {showMenu && <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={() => setShowMenu(false)} />}
          <div className={`fixed top-0 right-0 w-32 h-auto md:hidden z-20 bg-white shadow-xl rounded-lg transition-all duration-300 ease-in-out ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between px-4 py-3">
              <img className="w-6 cursor-pointer" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close Icon" />
            </div>
            <ul className="space-y-3 px-4 pb-4">
              <li><NavLink onClick={() => setShowMenu(false)} className={({ isActive }) => `block text-lg transition-all duration-300 ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`} to="/">HOME</NavLink></li>
              <li><NavLink onClick={() => setShowMenu(false)} className={({ isActive }) => `block text-lg transition-all duration-300 ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`} to="/doctors">DOCTORS</NavLink></li>
              <li><NavLink onClick={() => setShowMenu(false)} className={({ isActive }) => `block text-lg transition-all duration-300 ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`} to="/about">ABOUT</NavLink></li>
              <li><NavLink onClick={() => setShowMenu(false)} className={({ isActive }) => `block text-lg transition-all duration-300 ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`} to="/Contact">CONTACT</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navi;
