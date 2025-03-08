import React from 'react'
import { assets } from '../assets/assets/assets'

const Contact = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-12">
      <div className="text-center text-4xl font-bold text-gray-800">
        <p>CONTACT <span className="text-primary">US</span></p>
      </div>

      <div className="my-12 flex flex-col md:flex-row items-center gap-12">
        <img className="w-full md:max-w-[500px] lg:max-w-[600px] h-[700px] rounded-3xl shadow-lg object-cover" src={assets.contact_image} alt="Contact Us" />
        
        <div className="md:w-1/2 flex flex-col items-start gap-6 text-gray-700">
          <p className="font-semibold text-2xl text-gray-900">OUR HOSPITAL</p>
          <p className="text-lg text-gray-600 leading-relaxed">Danavaipeta <br />  Rajahmundry, Andhra Pradesh</p>
          
          <p className="font-semibold text-2xl text-gray-900">GET IN TOUCH</p>
          <p className="text-lg text-gray-600 leading-relaxed">Tel: (000) 000-0000 <br /> Email: <a href="mailto:Medication@gmail.com" className="text-primary font-semibold hover:underline">Medication@gmail.com</a></p>

          <p className="font-semibold text-2xl text-gray-900">CAREERS AT MEDICATION</p>
          <p className="text-lg text-gray-600 leading-relaxed">Learn more about our teams and job openings.</p>
          <button className="px-8 py-3 text-lg font-medium border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300">Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
