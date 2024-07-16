import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import customFetch from "../../utils/customFetch";


const useLogin = () => {
    const[loading,setLoading]=useState(false)
    const{authUser,setAuthUser}=useAuthContext()
    const navigate=useNavigate()
    const signIn=async({username,password})=>{
      const success = handleInputErrors({username, password });
          if (!success) return;
      setLoading(true)
  
      try {
        const response=await customFetch.post('/auth/login',{username,password})
       
        const{user}=await response.data
        console.log(user);
        toast.success('Logged in sucessfully')
        navigate('/home')
localStorage.setItem("chat-user",JSON.stringify(user))
setAuthUser(user)

        return user
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        console.log(error);
      return error;
      }finally{
        setLoading(false)
      }
  
    }
    return{signIn,loading}
  }
  
  export default useLogin
  
  function handleInputErrors({username, password }) {
      if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
      }
    
    
    
      return true;
    }
  