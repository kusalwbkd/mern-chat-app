import React, { useState } from 'react'
import customFetch from '../../utils/customFetch';
import { useConversationContext } from '../context/ConversationContext';
import toast from 'react-hot-toast';

const useSendMessages = () => {
    const [loading, setLoading] = useState(false);
	const{selectedConversation,messages,setMessages}=useConversationContext()

    const sendMessage=async(message)=>{
        setLoading(true)
        try {
            const response=await customFetch.post(`/messages/send/${selectedConversation._id}`,{message})
            const {msg}=await response.data

            setMessages([...messages,msg])
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        console.log(error);
      return error;
        }finally{
            setLoading(false)
          }
    }
    return{sendMessage,loading}
}

export default useSendMessages