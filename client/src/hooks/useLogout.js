import React, { useState } from 'react'
import toast from 'react-hot-toast';
import customFetch from '../../utils/customFetch';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
  const[loading,setLoading]=useState(false)
  const { setAuthUser } = useAuthContext();

  const navigate=useNavigate()
  const logOut=async()=>{
   
    setLoading(true)

    try {
      const response=await customFetch.get('/auth/logout')
      toast.success('Logout sucessfully')
      localStorage.removeItem("chat-user");
			setAuthUser(null);
      navigate('/')
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error);
    return error;
    }finally{
      setLoading(false)
    }

  }
  return{logOut,loading}
}

export default useLogout


