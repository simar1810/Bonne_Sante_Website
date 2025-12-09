import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div id='people' className='w-full px-4 md:px-20 pt-6 pb-8 
      flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 '>
      <Image 
        src="/logo.png" 
        alt="logo" 
        width={500} 
        height={500} 
        className='w-28 sm:w-32 md:w-36'
      />
      <div className='flex flex-col md:flex-row items-center justify-start gap-4 md:gap-8 text-center md:text-left'>
        <p className='font-semibold text-[#07363C] text-base sm:text-lg leading-6'>
          Stay Informed. Stay Healthy. <br className='hidden md:block' /> 
          Subscribe Today!
        </p>
        <div className='relative w-full md:w-auto'>
          <input 
            type="email" 
            placeholder='Your email' 
            className='rounded-full bg-[#558D941A] py-3 px-6 
            w-full md:w-md text-sm sm:text-base'
          />

          <button 
            className='text-sm font-semibold bg-[#07363C] text-white 
            py-3 px-4 rounded-full 
            absolute right-2 top-1/2 -translate-y-1/2 md:right-0 hover:scale-105 hover:shadow-lg transition-all duration-20'
          >
            Subscribe
          </button>
        </div>

      </div>

    </div>
  )
}

export default Footer
