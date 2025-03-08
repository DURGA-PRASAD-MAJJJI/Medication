import React from 'react'
import { assets } from '../assets/assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
            {/*-----------------LEFT------------------ */}
            <div className='md:w-1/2 flex flex-col item-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Healing Vibes Only <br />Book Appointment
                </p>
                <div className='flex flex-col md:flex-row item-center gap-3 text-white text-sm font-light'>
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <p>Scheduling a doctor appointment is an important step <br className='hidden sm:block' />It maintaining your health</p>
                </div>
                <a href="#speciality" className="flex w-fit items-center gap-1 bg-white px-3 py-2 rounded-full text-gray-600 text-lg m-auto md:m-0 hover:scale-105 transition-all duration-300">
                    Book Appointment <img className="w-3" src={assets.arrow_icon} alt="" />
                </a>

            </div>
            {/*-----------------RIGHT------------------ */}
            <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
            </div>
        </div >
    )
}

export default Header
