import React from 'react'

const ButtonComponent = ({loading,text}) => {
  return (
    <div>
    <button className='btn btn-block btn-sm mt-2' disabled={loading}>
      {loading ? <span className='loading loading-spinner '></span> : text}
    </button>
  </div>
  )
}

export default ButtonComponent