import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
export const ConversationContext=createContext()
export const useConversationContext=()=>{
    return useContext(ConversationContext)
}
export const ConversationContextProvider=({children})=>{

    const[selectedConversation,setSelectedConversation]=useState(null)
    const[messages,setMessages]=useState([])
    const{authUser}=useAuthContext()

    
    return (
        <ConversationContext.Provider value={{selectedConversation,setSelectedConversation,messages,setMessages}}>
            {children}
        </ConversationContext.Provider>
    )
}