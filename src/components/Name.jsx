import React from 'react'
import { useNavigate } from 'react-router-dom'

import name from '../assets/name.png'

const Name = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

  return (
    <div
    onClick={handleClick}
    className='inline-block cursor-pointer max-w-30 max-h-30'>
        <img 
            src={name}
            alt="name" />
    </div>
  )
}

export default Name