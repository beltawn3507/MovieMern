import React from "react";
import { useState,useEffect,useRef } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice.js";
import { useLogoutMutation } from "../../redux/api/user.js";

const Navigaton = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(); 
  const toggledropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  
  useEffect(() => {
    setDropdownOpen(false);
  }, [userInfo]); 
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  const logoutHandler=async ()=>{
    try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate("/login");
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <div
      className='fixed bottom-10 left-[30rem] transform translate-x-1/2 translate-y-1/2 z-50 bg-[#0f0f0f] border w-[30%] px-[4rem] mb-[2rem] rounded">
      <section className="flex justify-between items-center'
    >
      <section className="flex justify-between items-center">
        {/* Section 1  home and movies*/}
        <div className="flex justify-center items-center mb-[2rem]">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem] ">Home</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center transition-transform transform hover:translate-x-2 ml-[1rem]"
          >
            <MdOutlineLocalMovies className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
          </Link>
        </div>
        {/* Section 2 */}

        <div className="relative" ref={dropdownRef}>
            {/* the dropdown button it has a toogler function on submit and a dropdown will appear after this is clicked */}
          <button
            onClick={toggledropdown}
            className="text-gray-800 focus:outline-none"
          >
            {/* display username if a user is logged in */}
            {userInfo ? (
              <span className="text-white">{userInfo.username}</span>
            ) : (
              <></>
            )}
           
            {/* if user logged in the dropdown button will be like this */}
            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={` h-4 w-4 ml-1 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>
           
           {/* if user is loged in then the dropdown will look like this */}
           {dropdownOpen && userInfo && (
              <ul className="absolute right-0 bottom-full mb-2 w-[10rem] space-y-2 bg-white text-gray-600">
                {userInfo.isAdmin && (
                  <li>
                    <Link
                      to="/admin/movies/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          
          {/* if user not logged in */}
          {!userInfo && (
            <ul className="flex">
              <li>
                <Link
                  to="/login"
                  className="flex items-center mt-5 transition-transform transform hover:translate-x-2 mb-[2rem]"
                >
                  <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                  <span className="hidden nav-item-name">LOGIN</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="flex items-center mt-5 transition-transform transform hover:translate-x-2 ml-[1rem]"
                >
                  <AiOutlineUserAdd size={26} />
                  <span className="hidden nav-item-name">REGISTER</span>
                </Link>
              </li>
            </ul>
          )}

        </div>
      </section>
    </div>
  );
};

export default Navigaton;
