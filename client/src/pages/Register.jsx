import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ButtonComponent, FormInput, GenderCheckbox } from '../components';
import useSignup from '../hooks/useSignup';
import { useAuthContext } from '../context/AuthContext';

const Register = () => {
	const { authUser } = useAuthContext();
	if(authUser){
	return <Navigate to={'/home'}/>
	}
 
  const initialState={
    fullName: "",
		username: "",
		password: "",
		gender: "",
	
    email:""
   
  }

  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };





  
	const handleCheckboxChange = (gender) => {
		setValues({ ...values, gender });
	};
	const {loading,signUp } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signUp(values)
	};
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					
          <FormInput label={'Full Name'} type={'text'} value={values.fullName} name={'fullName'} handleChange={handleChange}/>
          <FormInput label={'Username'} type={'text'} value={values.username} name={'username'} handleChange={handleChange}/>
          <FormInput label={'email'} type={'email'} value={values.email} name={'email'} handleChange={handleChange}/>

          <FormInput label={'password'} type={'password'} value={values.password} name={'password'} handleChange={handleChange}/>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={values.gender} />

				
				

				

					{/* */}

					<Link
						to={"/"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						
					>
						Already have an account?
					</Link>

				<ButtonComponent loading={loading} text={'Register'}/>
				</form>
			</div>
		</div>
  )
}

export default Register