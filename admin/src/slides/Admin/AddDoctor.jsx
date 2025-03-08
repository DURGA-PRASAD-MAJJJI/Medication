import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHand = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image not selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      // Log the form data
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await axios.post(`${backendUrl}/api/admin/add-doc/`,formData,{
          headers: {'Authorization': `Bearer ${aToken}`,
          },
        }
      );
 
      const result = response.data;

      if (result.success) {
        toast.success(result.message);
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <form onSubmit={onSubmitHand} className="m-8 w-full  justify-center">
      <p className="mb-6 text-2xl font-semibold text-gray-800">Add Doctor</p>
      <div className="bg-white shadow-lg px-10 py-10 border border-gray-200 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center gap-6 mb-8 text-gray-600">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img className="w-20 h-20 bg-gray-100 rounded-full object-cover" src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-sm">Upload Doctor <br /> Picture</p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-700">
          <div className="w-full lg:flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Doctor Name</label>
              <input onChange={(e) => setName(e.target.value)} value={name} className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all" type="text" placeholder="Name" required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Doctor Email</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all" type="email" placeholder="Email" required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Doctor Password</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all" type="password" placeholder="Password" required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Experience</label>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Fees</label>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all" type="number" placeholder="Your Fee" required />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Speciality</label>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all">
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Degree</label>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all" type="text" placeholder="Education" required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Address</label>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all" type="text" placeholder="Address 1" required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all" type="text" placeholder="Address 2" required />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-6">
          <label className="text-sm font-medium">About Doctor</label>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} placeholder="Write About Doctor" rows={5} required className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"></textarea>
        </div>
        <div className="mt-8">
          <button type='submit' className="w-full bg-primary hover:bg-green-600 text-white font-medium px-6 py-3 rounded shadow transition-colors">Add Doctor</button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor
