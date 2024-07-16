import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ButtonComponent, FormInput } from '../components';
import useLogin from '../hooks/useLogin';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {

  const { authUser } = useAuthContext();
  if(authUser){
  return <Navigate to={'/home'}/>
  }
 
  const initialState={
    username: '',
    password: '',
   
  }

  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };


	const { signIn,loading } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signIn(values);
	};
  
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <h1 className='text-3xl font-semibold text-center text-gray-300'>
        Login
        <span className='text-blue-500'> ChatApp</span>
      </h1>

      <form onSubmit={handleSubmit}>
      <FormInput type={'text'} label={'Username or email'} value={values?.username} name={'username'} handleChange={handleChange}/>
      <FormInput type={'password'} label={'Password'} value={values?.password} name={'password'} handleChange={handleChange}/>

       
        <Link to='/register' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
          {"Don't"} have an account?
        </Link>

       <ButtonComponent loading={loading} text={'Login'}/>
      </form>
    </div>
  </div>
  )
}

export default Login