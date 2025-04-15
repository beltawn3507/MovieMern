import React from 'react'
import { Outlet } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Navigaton from './pages/Auth/Navigaton'

function App() {
  return (
    <>
     <ToastContainer/>
     <Navigaton/>
     <main className='py-3 '>
      <Outlet/>
     </main>
    </>
  )
}

export default App