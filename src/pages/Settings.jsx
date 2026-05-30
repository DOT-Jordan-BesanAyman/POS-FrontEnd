import axios from "axios"
import React, { useEffect, useState } from "react"
const Settings = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("Token")
        const res = await axios.get(
          "https://pos-backend-rb6m.onrender.com/api/v1/users/getUserInfo",
          { headers: {
            Authorization: `Bearer ${token}`,
            }
          }
        )
        console.log(res.data);
        setUser(res.data.data);
      }
      catch (err) {
    console.log(err);}
    }
    fetchProfile()

  }, [])

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-300">
        <p className="text-2xl font-semibold text-gray-700">Loading...</p>
      </div>)
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-3xl p-10 w-full max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-black">My Profile</h2>
          <p className="text-gray-500 mt-2">User Account Information</p>
        </div>
        <div className="space-y-5">
          <div className="bg-blue-50 rounded-2xl p-4 flex justify-between">
            <span className="font-semibold text-gray-700">First Name</span>
            <span className="text-gray-900">{user?.firstName}</span>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 flex justify-between">
            <span className="font-semibold text-gray-700">Last Name</span>
            <span className="text-gray-900">{user?.lastName}</span>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 flex justify-between">
            <span className="font-semibold text-gray-700">UserName</span>
            <span className="text-gray-900">{user?.userName}</span>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 flex justify-between">

            <span className="font-semibold text-gray-700">Role</span>
            <span className="text-gray-900 capitalize">{user?.role}</span>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 flex justify-between">
            <span className="font-semibold text-gray-700"> User ID</span>
            <span className="text-gray-900 text-sm">{user?._id}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;