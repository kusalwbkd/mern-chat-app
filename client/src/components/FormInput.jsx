import React from 'react'

const FormInput = ({label,name,value,handleChange,type}) => {
  return (
    <div>
    <label className='label p-2'>
      <span className='text-base label-text'>{label}</span>
    </label>
    <input
      type={type}
      placeholder={`Enter ${''} ${label}`}
      className='w-full input input-bordered h-10'
      name={name}
      value={value}
      onChange={handleChange}
    />
  </div>
  )
}

export default FormInput