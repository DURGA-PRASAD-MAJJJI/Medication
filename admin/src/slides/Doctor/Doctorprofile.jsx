import React, { useContext, useEffect, useState } from 'react';
import { DocContext } from '../../context/DocContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getprofileData, backendUrl } = useContext(DocContext);
  const { currancy } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = { fees: profileData.fees, available: profileData.available };
      const { data } = await axios.post(`${backendUrl}/api/doctors/update-profile/`, updateData, { headers: { Authorization: `Bearer ${dToken}` } });
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getprofileData();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) getprofileData();
  }, [dToken]);

  return profileData && (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center">
          <img className="w-36 h-56 rounded-2xl border border-green-500 " src={profileData.image} alt="Doctor Profile" />
          <h2 className="text-3xl font-semibold text-gray-800 mt-4">{profileData.name}</h2>
          <p className="text-gray-600 text-lg">{profileData.degree} • {profileData.experience} years experience</p>
        </div>

        <div className="mt-6 space-y-4">
          <p className="text-gray-700 font-semibold text-xl">About</p>
          <p className="text-gray-600 text-lg">{profileData.about}</p>

          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-700 font-medium text-lg">Appointment Fee:</p>
            {isEdit ? (
              <input type="number" className="border px-3 py-2 w-28 rounded-md text-lg focus:ring focus:ring-primary"
                onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                value={profileData.fees}
              />
            ) : (
              <p className="text-gray-800 font-medium text-lg">{currancy}{profileData.fees}</p>
            )}
          </div>

          <div className="flex items-center mt-4">
            <input type="checkbox" id="available" className="w-6 h-6"
              checked={profileData.available}
              onChange={(e) => isEdit && setProfileData(prev => ({ ...prev, available: e.target.checked }))}
            />
            <label htmlFor="available" className="ml-2 text-gray-700 font-medium text-lg">Available for Appointments</label>
          </div>

          <div className="mt-6 flex justify-center">
            {isEdit ? (
              <button onClick={updateProfile} className="bg-primary text-white px-8 py-3 rounded-lg shadow-md text-lg hover:bg-primary-dark transition-all">
                Save Changes
              </button>
            ) : (
              <button onClick={() => setIsEdit(true)} className="border border-primary text-primary px-8 py-3 rounded-lg shadow-md text-lg hover:bg-primary hover:text-white transition-all">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
