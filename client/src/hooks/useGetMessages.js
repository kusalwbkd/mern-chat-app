import React, { useEffect, useState } from 'react'
import customFetch from '../../utils/customFetch';
import { useConversationContext } from '../context/ConversationContext';
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
	const{messages:msgs,selectedConversation,setMessages}=useConversationContext()

  useEffect(()=>{
    setLoading(true)
    const getMessages=async()=>{
        try {
        const response=  await customFetch.get(`/messages/${selectedConversation?._id}`)
        const{messages}=response?.data 
          setMessages(messages)
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        console.log(error);
      return error;
        }finally{
             setLoading(false)
        }
    }

    if(selectedConversation?._id)   getMessages()

  
  },[selectedConversation?._id,setMessages])
    return{msgs,loading}
}

export default useGetMessages