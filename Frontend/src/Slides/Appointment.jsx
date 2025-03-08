import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets/assets';
import RealtedDoctors from '../Components/RealtedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { doctorId } = useParams(); 
  const { doctors, currency, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const dayWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIdx, setIdx] = useState(0);
  const [slotTime, setSlotTime] = useState(''); // ✅ Ensure correct casing and default state
  
  // Fetch doctor information based on doctorId
  const fetchDocInfo = async () => {
    if (doctors && doctors.length > 0) {
      const doc = doctors.find((doctor) => String(doctor._id) === String(doctorId));
      if (doc) {
        setDocInfo(doc);
        console.log('Doctor found:', doc);
      } else {
        console.log('No doctor found with this ID');
        setDocInfo(null);
      }
    } else {
      console.log('Doctors data is still loading');
    }
  };

  // Generate available slots
  const available = async () => {
    if (!docInfo) return;
    
    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let current = new Date(today);
      current.setDate(today.getDate() + i);

      let lastTime = new Date(current);
      lastTime.setHours(21, 0, 0, 0);

      current.setHours(0, 0, 0, 0); 

      if (today.getDate() === current.getDate()) {
        current.setHours(Math.max(current.getHours() + 1, 10));
        current.setMinutes(current.getMinutes() > 30 ? 30 : 0);
      }

      let timeSlots = [];
      while (current <= lastTime) {
        let formattedTime = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = current.getDate();
        let month = current.getMonth() + 1;
        let year = current.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime
        const isSlotAvailable = docInfo.slots_booked[slotDate]&&docInfo.slots_booked[slotDate].includes(slotTime)?false:true;

        if (isSlotAvailable) {
          timeSlots.push({ datetime: new Date(current), time: formattedTime });
        }

        current.setMinutes(current.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }
    
    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
        toast.warn('Please login to book an appointment');
        return navigate('/signIn');
    }
    if (!docSlots.length || !slotTime) {
        toast.error('Please select a slot before booking.');
        return;
    }

    try {
        const date = docSlots[slotIdx][0]?.datetime;
        if (!date) {
            toast.error("Invalid date selected.");
            return;
        }

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const { data } = await axios.post(`${backendUrl}/api/user/book-appointment/`, 
            { doctorId, slotDate, slotTime },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
            toast.success(data.message);
            getDoctorsData();
            navigate('/Appointments');
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error(error);
        toast.error(error.message);
    }
};


  useEffect(() => {
    fetchDocInfo();
  }, [doctorId]);

  useEffect(() => {
    if (docInfo) {
      available();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  if (!doctors || doctors.length === 0) {
    return <div>Loading doctor information...</div>;
  }

  if (!docInfo) {
    return <div>Doctor not found</div>;
  }

  return (
    <div>
      {/* Doctor info */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-green-50 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-12 py-10 bg-white mx-2 sm:mx-0 w-full sm:w-[1100px] mt-[-120px] sm:mt-0'>
          <p className='flex items-center text-3xl font-semibold text-gray-900'>
            {docInfo.name}
            <img className='w-14 ml-2' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-3 text-lg mt-3 text-gray-600'>
            <p>
              {docInfo.degree} - {docInfo.speciality}
              <button className='py-2 px-4 border text-base rounded-full font-medium'>{docInfo.experience}</button>
            </p>
          </div>
          <p className='text-lg text-gray-500 max-w-[1200px] mt-3'>{docInfo.about}</p>
          <p className='text-gray-700 font-semibold mt-6 text-xl'>
            Appointment fee: <span className="text-gray-900 font-bold">{currency}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div key={index} onClick={() => setIdx(index)} 
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIdx === index ? 'bg-primary text-white' : 'border-gray-200'}`}>
              <p>{item[0] && dayWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length > 0 && docSlots[slotIdx]?.map((item, index) => (
            <p key={index} onClick={() => setSlotTime(item.time)} 
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white tex-medium font-light px-14 py-3 rounded-full my-6'>Book Your Appointment</button>
      </div>
      <RealtedDoctors doctorId={doctorId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
