"use client"
import React from 'react';
import { Menu, X } from "lucide-react"
import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <div className='flex justify-end items-center gap-34 md:gap-48'>
      <ul className='hidden md:flex items-center justify-between gap-12 list-none'>
        <li 
          className='text-lg text-[#FFFFFF80] hover:text-white cursor-pointer font-semibold'
          onClick={() => scrollToSection("home")}
        >
          Home
        </li>

        <li 
          className='text-lg text-[#FFFFFF80] hover:text-white cursor-pointer font-semibold'
          onClick={() => scrollToSection("about")}
        >
          About Us
        </li>

        <li 
          className='text-lg text-[#FFFFFF80] hover:text-white cursor-pointer font-semibold'
          onClick={() => scrollToSection("contact")}
        >
          Contact Us
        </li>

        <li 
          className='text-lg text-[#FFFFFF80] hover:text-white cursor-pointer font-semibold'
          onClick={() => scrollToSection("blogs")}
        >
          Blogs
        </li>

        <li 
          className='text-lg text-[#FFFFFF80] hover:text-white cursor-pointer font-semibold'
          onClick={() => scrollToSection("services")}
        >
          Services
        </li>

        <li 
          className='text-lg text-[#FFFFFF80] hover:text-white cursor-pointer font-semibold'
          onClick={() => scrollToSection("people")}
        >
          People
        </li>
      </ul>
      <div onClick={() => setOpen(true)} className='md:hidden text-white'>
        <Menu className="w-20"/>
      </div>
      <select className='bg-[#FFFFFF40] backdrop-blur-md text-white px-4 py-2 text-lg font-semibold rounded-full'>
        <option value="english">English</option>
        <option value="french">French</option>
      </select>
      {open && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center transition-all delay-100 duration-100 items-center z-50">
          <div className="bg-transparent w-[85%] p-6 rounded-2xl shadow-xl">

            <div className="flex justify-end mb-4">
              <X className="text-white w-8 h-8 cursor-pointer hover:rotate-90" onClick={() => setOpen(false)} />
            </div>
            <ul className="flex flex-col gap-6 text-center">
              <li className="text-lg text-white font-semibold cursor-pointer"
                  onClick={() => scrollToSection("home")}>Home</li>

              <li className="text-lg text-white font-semibold cursor-pointer"
                  onClick={() => scrollToSection("about")}>About Us</li>

              <li className="text-lg text-white font-semibold cursor-pointer"
                  onClick={() => scrollToSection("contact")}>Contact Us</li>

              <li className="text-lg text-white font-semibold cursor-pointer"
                  onClick={() => scrollToSection("blogs")}>Blogs</li>

              <li className="text-lg text-white font-semibold cursor-pointer"
                  onClick={() => scrollToSection("services")}>Services</li>

              <li className="text-lg text-white font-semibold cursor-pointer"
                  onClick={() => scrollToSection("people")}>People</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
