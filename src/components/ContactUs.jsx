import Image from 'next/image'
import React from 'react'

const ContactUs = () => {
  return (
    <div id='contact' className='w-full h-auto md:h-[540px] lg:h-[450px] xl:h-[540px] bg-[url("/contactbg.png")] bg-cover bg-center 
      flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-28 py-10 md:py-0'>

      <div className='w-full md:w-1/2 flex flex-col items-center md:items-start justify-center gap-4 text-center md:text-left'>
        <p className='text-white font-kaushan text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl'>
          Take the First Step Today!
        </p>

        <p className='text-white font-medium text-lg sm:text-xl mb-4'>
          Let us help you unlock your health potential.
        </p>

        <div className='flex gap-3 justify-center md:justify-start'>
          <button className='bg-[#07363C] rounded-full px-4 py-3 text-white font-bold'>
            Contact us
          </button>
          <button className='text-[#07363C] rounded-full px-4 py-3 bg-white font-bold'>
            Book Now
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-4 relative justify-start mt-10 md:mt-0'>

        <Image 
          src="/mockup.png" 
          alt='mockup' 
          width={500} 
          height={500} 
          className='w-xl sm:w-80 md:w-2xl lg:w-lg xl:w-2xl mx-auto md:mx-0'
        />
        <div className='flex justify-center items-center gap-2 
          static md:absolute bottom-8 lg:bottom-5 xl:bottom-8 text-center md:right-1/4 lg:right-1/6 xl:right-1/4 mt-4 md:mt-0'>
          <p className='text-sm text-white whitespace-nowrap'>Available on</p>
          <Image 
            src="/appStore.png" 
            alt='appStore' 
            width={500} 
            height={500} 
            className='w-20 sm:w-24 lg:w-20 xl:w-24'
          />

          <Image 
            src="/playStore.png" 
            alt='playStore' 
            width={500} 
            height={500} 
            className='w-20 sm:w-24 lg:w-20 xl:w-24'
          />
        </div>

      </div>
    </div>
  )
}

export default ContactUs
