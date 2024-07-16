import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import customFetch from "../../utils/customFetch";


const useGetConversation  = () => {
    const[loading,setLoading]=useState(false)
    const [conversations, setConversations] = useState([]);
    const navigate=useNavigate()
  useEffect(()=>{

    const getConversations=async()=>{
        setLoading(true)

        try {
            const response=await customFetch.get('/users')
            const{filterdUsers}=await response.data
            setConversations(filterdUsers)
        } catch (error) {
            toast.error(error?.response?.data?.msg);
      console.log(error);
    return error;
        }finally{
            setLoading(false)
        }
    }
    getConversations()
  },[])
    return{conversations,loading}
  }
  
  export default useGetConversation 
  
 