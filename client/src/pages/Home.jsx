import React, { useEffect } from 'react'
import { MessageContainer, Sidebar } from '../components'
import { useAuthContext } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Home = () => {


  const { authUser } = useAuthContext();
  if(authUser===null){
  return <Navigate to={'/'}/>
  }

 
  return (
    <div className='grid mb-2 sm:flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
    <Sidebar/>
    <MessageContainer/>
  </div>
  )
}

export default Home