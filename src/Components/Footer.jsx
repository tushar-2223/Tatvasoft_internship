import React from 'react'
import tatvasoftlogo from '../assets/tatvasoft-logo-png.png'

const Footer = () => {
  return (
    <div className='bg-gray-500/20 flex justify-center p-7'>
      <img src={tatvasoftlogo} alt="" className='h-40'/>
    </div>
  )
}

export default Footer