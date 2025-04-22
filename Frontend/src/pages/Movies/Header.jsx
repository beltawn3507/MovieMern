import React from 'react'
import { Link } from 'react-router-dom';
import {useGetallmoviesQuery} from "../../redux/api/movie.js"
import SliderUtil from '../../component/SliderUtil.jsx';



const Header = () => {
  
    const {data}= useGetallmoviesQuery();

  return (
    <div className='flex flex-col mt-[2rem] ml-[2rem] md:flex-row  items-center md:items-start'>
      <nav className='w-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0'>
      <Link to={"/"} className='transition duration-300 ease-in-out hover:bg-teal-200  block p-2 rounded mb-1 md:mb-2 text-lg'>
          Home
        </Link>

        <Link to={"/movies"} className='transition duration-300 ease-in-out hover:bg-teal-200  block p-2 rounded mb-1 md:mb-2 text-lg'>
          Browse Movies
        </Link>
      </nav>

      <div className="w-full md:w-[80%] mr-0 md:mr-2">
        <SliderUtil data={data} />
      </div>
    </div>
  )
}

export default Header
