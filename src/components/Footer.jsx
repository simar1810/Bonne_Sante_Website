"use client";

import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Footer = ({landing = true}) => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({behavior: "smooth"});
    }
  }
  const goToSection = (id) => {
    router.push(`/#${id}`);
  };
  const handleSubscribe = async () => {
    if (!email) {
      return toast.error("Please enter an email address.");
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address.");
    }

    setLoading(true);

    try {
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      toast.error("Subscription failed. Try again.");
      console.error(error);
    }

    setLoading(false);
  };
  return (
    <div id='people' className='w-full px-4 md:px-20 pt-6 pb-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 '>
      {landing? <Image 
        onClick={()=>scrollToSection("home")}
        src="/logo.png" 
        alt="logo" 
        width={500} 
        height={500} 
        className='w-28 sm:w-32 md:w-36 cursor-pointer'
      />: <Image 
        onClick={()=>goToSection("home")}
        src="/whiteLogo.png" 
        alt="logo" 
        width={500} 
        height={500} 
        className='w-28 sm:w-32 md:w-36 cursor-pointer'
      />}
      <div className='flex flex-col md:flex-row items-center justify-start gap-4 md:gap-8 text-center md:text-left'>
        <p className={`font-semibold ${landing? "text-[#07363C]" : "text-white"}  text-base sm:text-lg leading-6`}>
          Stay Informed. Stay Healthy. <br className='hidden md:block' /> 
          Subscribe Today!
        </p>
        <div className='relative w-full md:w-auto'>
          <input 
            type="email" 
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`rounded-full ${landing?"bg-[#558D941A]":"bg-white"} py-3 px-6 w-full md:w-md text-sm sm:text-base`}
          />

          <button 
            onClick={handleSubscribe}
            className={`text-sm font-semibold ${landing?"bg-[#07363C]":"bg-[#0C5E69]"} text-white py-3.5 px-6 md:px-4 rounded-full absolute right-[0.2px] top-1/2 -translate-y-1/2 md:right-0 hover:scale-105 hover:shadow-lg transition-all duration-20`}
          >
            Subscribe
          </button>
        </div>

      </div>

    </div>
  )
}

export default Footer
