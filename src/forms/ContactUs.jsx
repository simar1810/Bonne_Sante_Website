import React, { useState } from 'react'
import {X} from "lucide-react"
const ContactUs = ({openModal}) => {
    const [open, setOpen] = useState(false)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    if (!openModal) return null;
return (
    <>
    <button onClick={()=>setOpen(!open)} className="bg-[#07363C] rounded-full px-4 py-3 text-white font-bold transition-all 
          duration-200 hover:scale-105 hover:shadow-lg">
            Contact us
    </button> 
{open && <div className='fixed bg-black/50 backdrop-blur-sm inset-0 flex items-center justify-center transition'>
        <div className='px-4 md:px-6 py-6 rounded-2xl w-full md:w-[600px] relative bg-white'>
              <form onSubmit={handleSubmit}>
                  <div className='flex justify-between items-center gap-4'>
                      <input
                          type='name'
                          placeholder='First Name*'
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className='rounded-lg ring-1 ring-gray-100 text-gray-800 font-normal text-sm focus:ring-1 focus:ring-[#0D3B3C]'
                      />
                      <input
                          type='name'
                          placeholder='Last Name*'
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className='rounded-lg ring-1 ring-gray-100 text-gray-800 font-normal text-sm focus:ring-1 focus:ring-[#0D3B3C]'
                      />
                  </div>
                    <input
                          type='email'
                          placeholder='Email*'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className='rounded-lg ring-1 ring-gray-100 text-gray-800 font-normal text-sm focus:ring-1 focus:ring-[#0D3B3C]'
                    />
                    <input
                          type='text'
                          placeholder='Subject*'
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className='rounded-lg ring-1 ring-gray-100 text-gray-800 font-normal text-sm focus:ring-1 focus:ring-[#0D3B3C]'
                    />
                    <textarea
                          type='text'
                          placeholder='Message*'
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className='rounded-lg ring-1 ring-gray-100 text-gray-800 font-normal text-sm focus:ring-1 focus:ring-[#0D3B3C]'
                          rows={5}
                    />
                    <button className='px-4 py-3 text-center bg-[#0D3B3C] text-white font-semibold'>Submit</button>
              </form>
              <div onClick={()=>setOpen(!open)}>
                  <X size={20} className='text-lg text-[#0D3B3C] hover:animate-ping transition'/>
              </div>
        </div>    
      
            </div>}
    </>
  )
}

export default ContactUs
