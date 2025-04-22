import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../component/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/user.js";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strongpass,setStrongpass] = useState(true);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  
  
  useEffect(()=>{
     if(password.length !== 0 && password.length < 8 ){
      setStrongpass(false);
     }
     else{
      setStrongpass(true);
     }
  },[password])



  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async(e) => {
     e.preventDefault();
     
     if(password !== confirmPassword){
        toast.error("Password do not match");
     } 
    else if(strongpass==false){
      toast.warn("Weak password.");
    }
     else{
       try {
        const res=await register({username,email,password}).unwrap();
        console.log(res);
        dispatch(setCredentials({...res}));
        navigate(redirect);
        toast.success("User successfully registered.");
       } catch (error) {
         console.log(error);
         const message=error?.data?.message || "Registration failed. Please try again later "
         toast.error(message);
       }
     }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center px-6 py-10 min-h-screen bg-black">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 max-w-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-white">Register</h1>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 border rounded w-full text-black"
            />
          </div>

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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                
              }}
              className="mt-1 p-2 border rounded w-full text-black"
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-[#80deea] hover:bg-[#4dd0e1] text-[#0e1116] px-4 py-2 rounded cursor-pointer w-full transition-colors duration-200"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <Loader />}
        </form>

        <p className="text-white mt-4">
          Already have an account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-teal-400 hover:underline"
          >
            Login
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
  );
}

export default Register;
