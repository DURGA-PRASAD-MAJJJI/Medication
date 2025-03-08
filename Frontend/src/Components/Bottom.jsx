import React from "react";
import { assets } from "../assets/assets/assets";

const Bottom = () => {
  return (
    <div className="md:mx-10 text-gray-700">
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-10 my-10 mt-28 text-xs sm:text-sm">
        {/* Left Section */}
        <div>
          <img className="mb-4 w-32" src={assets.logo} alt="Logo" />
          <p className="w-full md:w-3/4 leading-5 text-gray-500">
            Medication ensures efficient and timely access to medical care, minimizing wait times and offering flexibility in managing appointments. Reminders and rescheduling make healthcare more accessible.
          </p>
        </div>
        {/* Center Section */}
        <div>
          <p className="text-lg font-semibold mb-4 text-gray-800">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li className="hover:text-gray-900 cursor-pointer">Home</li>
            <li className="hover:text-gray-900 cursor-pointer">About</li>
            <li className="hover:text-gray-900 cursor-pointer">Contact Us</li>
            <li className="hover:text-gray-900 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
        {/* Right Section */}
        <div>
          <p className="text-lg font-semibold mb-4 text-gray-800">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-500">
            <li>Tel: (000) 000-0000</li>
            <li>Email: medication@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* Copyright Section */}
      <div className="text-center border-t border-gray-200 pt-5 text-xs text-gray-500">
        <p>© 2025 Medication - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Bottom;
