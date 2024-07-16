import React from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Error, Login, Register } from './pages'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
const App = () => {

const{authUser}=useAuthContext()
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Login/>,
      errorElement:<Error/>
    },
    
      {
        path:'/register',
        element:<Register/>,
        errorElement:<Error/>
      },
      {
        path:'/home',
        element:<Home/>,
        errorElement:<Error/>
      }
    

  ])
  return (
    <div className='p-4 h-screen flex sm:items-center sm:justify-center justify-start items-start'>
     
      <RouterProvider router={router}/>

     


    </div>
  )
}

export default App