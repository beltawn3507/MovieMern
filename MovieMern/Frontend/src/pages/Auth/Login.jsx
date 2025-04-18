import React, { use } from 'react'
import { useState,useEffect } from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from "../../component/Loader";
import {setCredentials} from '../../redux/features/auth/authSlice.js'
import {useLoginMutation} from '../../redux/api/user.js'


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userInfo} =useSelector((state)=> state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const {search} = useLocation();
  const sp=new URLSearchParams(search);
  const redirect=sp.get("redirect") || "/"
  
  useEffect(()=>{
     if(userInfo){
       navigate(redirect);
     }
  },[userInfo,navigate,redirect])
  
  const submitHandler=async(e)=>{
     e.preventDefault();
     
     try {
      const res=await login({email,password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate(redirect);
      toast.success("User Logged In successfully")
     } catch (error) {
      const message = error?.data?.message || error?.message || "Login Failed";
      toast.error(message);
     }
     
  }
  

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center px-6 py-10 min-h-screen bg-black">
    {/* Form Section */}
    <div className="w-full lg:w-1/2 max-w-2xl">
      <h1 className="text-3xl font-semibold mb-6 text-white">Sign In</h1>
      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded w-full text-black"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border rounded w-full text-black"
          />
        </div>
        
        <button
          disabled={isLoading}
          type="submit"
          className="bg-[#80deea] hover:bg-[#4dd0e1] text-[#0e1116] px-4 py-2 rounded cursor-pointer w-full transition-colors duration-200"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        {isLoading && <Loader />}
      </form>
      
      <p className="text-white mt-4">
        New User ?{" "}
        <Link
          to={"/register"}
          className="text-teal-400 hover:underline"
        >
          Create New Account
        </Link>
      </p>

      
    </div>

    {/* Image Section */}
    <div className="hidden lg:block lg:w-1/2 px-6">
      <img
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Register Visual"
        className="rounded-lg max-h-[600px] object-cover w-full"
      />
    </div>
  </div>
  )
}

export default Login