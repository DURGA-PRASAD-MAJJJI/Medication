import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets/assets'
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { userInfo, setUserInfo, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userInfo.name);
      formData.append('phone', userInfo.phone);
      formData.append('address', JSON.stringify(userInfo.address));
      formData.append('gender', userInfo.gender);
      formData.append('dob', userInfo.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile/`, formData, { headers: { Authorization: `Bearer ${token}` } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userInfo && (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          {isEdit ? (
            <label htmlFor="image">
              <div className='inline-block relative cursor-pointer'>
                <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userInfo.image} alt="" />
                {!image && <img className='w-10 absolute bottom-12 right-12' src={assets.upload_icon} alt="" />}
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
          ) : (
            <img className="w-48 h-48 rounded-full" src={userInfo?.image || 'https://via.placeholder.com/150'} alt="Profile" />
          )}
        </div>

        {isEdit ? (
          <input className="bg-gray-50 text-4xl font-semibold max-w-60 mx-auto mb-4 p-2 w-full" type="text" value={userInfo?.name || ''} onChange={e => setUserInfo(prev => ({ ...prev, name: e.target.value }))} />
        ) : (
          <p className="text-4xl font-semibold text-center mb-4">{userInfo?.name || 'No Name'}</p>
        )}

        <hr className="bg-zinc-400 h-[1px] my-4" />

        <div>
          <p className="text-lg text-neutral-500 underline">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-4 mt-4 text-neutral-700">
            <p className="text-lg">Email id:</p>
            <p className="text-green-500">{userInfo?.email || 'No Email'}</p>

            <p className="text-lg">Phone:</p>
            {isEdit ? (
              <input className="bg-gray-100 max-w-60 p-2" type="text" value={userInfo?.phone || ''} onChange={e => setUserInfo(prev => ({ ...prev, phone: e.target.value }))} />
            ) : (
              <p className="text-green-400">{userInfo?.phone || 'No Phone'}</p>
            )}

            <p className="text-lg">Address:</p>
            {isEdit ? (
              <div>
                <input className="bg-gray-50 mb-2 p-2 w-full" onChange={(e) => setUserInfo(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userInfo?.address?.line1 || ''} type="text" />
                <input className="bg-gray-50 p-2 w-full" onChange={(e) => setUserInfo(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userInfo?.address?.line2 || ''} type="text" />
              </div>
            ) : (
              <p className="text-gray-500">{userInfo?.address?.line1 || 'No Address'}<br />{userInfo?.address?.line2 || ''}</p>
            )}
          </div>
        </div>

        <div>
          <p className="text-lg text-neutral-500 underline mt-4">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-4 mt-4 text-neutral-700">
            <p className="text-lg">Gender:</p>
            {isEdit ? (
              <select className="max-w-32 bg-gray-100 p-2 w-full" onChange={(e) => setUserInfo(prev => ({ ...prev, gender: e.target.value }))} value={userInfo?.gender || ''}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="others">Others</option>
              </select>
            ) : (
              <p className="text-gray-400">{userInfo?.gender || 'Not Specified'}</p>
            )}

            <p className="text-lg">DOB:</p>
            {isEdit ? (
              <input className="max-w-32 bg-gray-100 p-2" type="date" onChange={(e) => setUserInfo(prev => ({ ...prev, dob: e.target.value }))} value={userInfo?.dob || ''} />
            ) : (
              <p className="text-gray-400">{userInfo?.dob || 'Not Provided'}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          {isEdit ? (
            <button className="border border-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all" onClick={updateUserProfileData}>Save Information</button>
          ) : (
            <button className="border border-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all" onClick={() => setIsEdit(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
