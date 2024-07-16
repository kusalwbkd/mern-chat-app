import React, { useState } from 'react'
import toast from 'react-hot-toast';
import customFetch from '../../utils/customFetch';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
  const[loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const signUp=async({fullName,username,password,email,gender})=>{
    const success = handleInputErrors({ fullName, username, password,email, gender });
		if (!success) return;
    setLoading(true)

    try {
      const response=await customFetch.post('/auth/register',{fullName,username,password,email,gender})
      toast.success('Registered sucessfully')
      navigate('/')
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error);
    return error;
    }finally{
      setLoading(false)
    }

  }
  return{signUp,loading}
}

export default useSignup

function handleInputErrors({ fullName, username, password,email, gender }) {
    if (!fullName || !username || !password || !email || !gender) {
      toast.error("Please fill in all fields");
      return false;
    }
  
  
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
  
    return true;
  }


