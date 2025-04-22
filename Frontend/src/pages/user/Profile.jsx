import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
import { useProfileMutation } from "../../redux/api/user.js";
import { setCredentials } from "../../redux/features/auth/authSlice";


const Profile = () => {
    const [username,setUsername]=useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const {userInfo}=useSelector((state)=>state.auth);

    //update mutation
    const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

    useEffect(() => {
        setUsername(userInfo.username);
        setEmail(userInfo.email);
      }, [userInfo.email, userInfo.username]);
    
      const dispatch = useDispatch();

      const submitHandler=async(e)=>{
        e.preventDefault();

        if(password!==confirmPassword){
            toast.error("Passwords do not match");
        }
        else{
            try {
                const res=await updateProfile({
                    username,
                    email,
                    password,
                }).unwrap();
               
                dispatch(setCredentials({...res}));
                toast.success("Profile updated successfully");
            } catch (error) {
                toast.error(err?.data?.message || err.error);
            }
        }
      }

  return (
    
       <div className="h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center">
  <div className='md:w-1/3 bg-[#1a1a2e] p-8 rounded-lg shadow-lg border border-purple-600'>
    <h2 className='text-3xl font-bold mb-6 text-purple-400 text-center tracking-wider'>
      Update Profile
    </h2>

    {/* Your form remains unchanged */}


      <form onSubmit={submitHandler}>
        <div className='mb-4'>
          <label className="block text-purple-300 mb-2">Name</label>
          <input
            type="text"
            placeholder='Enter Name'
            className='bg-[#0f0c29] text-white border border-purple-600 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-purple-300 mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Enter email"
            className="bg-[#0f0c29] text-white border border-purple-600 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-purple-300 mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="bg-[#0f0c29] text-white border border-purple-600 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-purple-300 mb-2">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-[#0f0c29] text-white border border-purple-600 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className="bg-purple-700 w-full text-white font-semibold py-3 px-4 rounded-md hover:bg-purple-800 transition-all shadow-md shadow-purple-500/30"
          >
            Update
          </button>

          {loadingUpdateProfile && <Loader />}
        </div>
      </form>

    </div>
  </div>

  )
}

export default Profile
