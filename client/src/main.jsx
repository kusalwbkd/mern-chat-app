import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import customFetch from '../utils/customFetch.js';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { ConversationContextProvider } from './context/ConversationContext.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <SocketContextProvider>
    <ConversationContextProvider>
    <App />
   <Toaster/>
   </ConversationContextProvider>
   </SocketContextProvider>
    </AuthContextProvider>
    
   
 
    
  
)
