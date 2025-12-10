import React from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative h-[92vh] overflow-hidden mt-4 md:mt-6 mb-4 md:mb-10 mx-4 md:mx-8 rounded-4xl md:rounded-none">

      <Image
        src="/homebg2.png"
        alt="Hero Background"
        fill
        className="w-[60vw] hidden md:block md:object-center"
        priority
      />
      <Image
        src="/homebg2.png"
        alt="Hero Background"
        fill
        className="w-[60vw] md:hidden object-cover"
        priority
      />

      <div className="absolute top-0 left-0 sm:block hidden">
        <Image src="/logo.png" alt="logo" width={500} height={500} className="w-38" />
      </div>

      <div className="absolute bottom-0 right-0 rounded-4xl xl:rounded-5xl 2xl:rounded-4xl sm:block hidden">
        <Image
          src="/home-yoga2.png"
          alt="logo"
          width={500}
          height={500}
          className="w-56 h-26 xl:w-48 xl:h-30 2xl:w-56 2xl:h-26 rounded-2xl"
        />
      </div>

      <div className="absolute top-5 right-6 z-30">
        <Navbar />
      </div>

      <div className="relative z-20 px-5 sm:px-10 md:px-20 lg:px-32 pt-32 sm:pt-40 max-w-3xl">

        <h2 className="text-white text-[30px] sm:text-[36px] md:text-[44px] font-light tracking-wide leading-tight">
          EMPOWER YOUR
        </h2>

        <h1 className="text-white font-kaushan text-[38px] sm:text-[48px] md:text-[60px] leading-tight mb-4 sm:mb-6">
          Life and Strength
        </h1>

        <p className="text-white text-base sm:text-lg leading-6 max-w-xs sm:max-w-sm mb-6 sm:mb-8">
          Join us in transforming your body and mind through our comprehensive wellness and health plans.
        </p>

        <div className="flex sm:flex-row flex-col items-start sm:items-center gap-4 mb-8 sm:mb-10">
          <button className="bg-[#07363C] border-2 border-white text-white px-4 py-2 sm:px-3 sm:py-3 rounded-full font-semibold transition w-full sm:w-auto">
            Learn more about us
          </button>

          <button className="flex items-center gap-2 text-white font-medium w-full sm:w-auto justify-center sm:justify-start">
            Contact Us
            <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#07363C] backdrop-blur-md">
              <ArrowUpRight size={18} className="text-white" />
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex -space-x-2 sm:-space-x-3">
            <Image src="/Ellipse2.png" alt="user" width={32} height={32} className="rounded-full border-2 border-white" />
            <Image src="/Ellipse3.png" alt="user" width={32} height={32} className="rounded-full border-2 border-white" />
            <Image src="/Ellipse4.png" alt="user" width={32} height={32} className="rounded-full border-2 border-white" />
            <Image src="/Ellipse5.png" alt="user" width={32} height={32} className="rounded-full border-2 border-white" />
          </div>

          <div>
            <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
              <div className="flex gap-1 items-center">
                <Image src="/star.png" alt="stars" width={16} height={16} className="w-3 sm:w-4" />
                <Image src="/star.png" alt="stars" width={16} height={16} className="w-3 sm:w-4" />
                <Image src="/star.png" alt="stars" width={16} height={16} className="w-3 sm:w-4" />
                <Image src="/star.png" alt="stars" width={16} height={16} className="w-3 sm:w-4" />
                <Image src="/star.png" alt="stars" width={16} height={16} className="w-3 sm:w-4" />
              </div>
              <span className="ml-1 text-white/80">4.9</span>
            </div>
            <p className="text-white/70 text-xs sm:text-base">From 1000+ Reviews</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
