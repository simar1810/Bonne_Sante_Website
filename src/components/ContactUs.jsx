"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ContactUsForm from "@/forms/ContactUs";
import { useRouter } from "next/navigation";
import Script from "next/script";

const ContactUs = () => {
  const text = "Take the First Step Today!";
  const [displayedText, setDisplayedText] = useState("");
  const router = useRouter();
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: false,
    margin: "-150px",
  });

  useEffect(() => {
    let interval;

    if (isInView) {
      let i = 0;
      interval = setInterval(() => {
        setDisplayedText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 45);
    } else {
      setDisplayedText("");
    }

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

      <Script id="calendly-style">
        {`
          var l = document.createElement("link");
          l.rel = "stylesheet";
          l.href = "https://assets.calendly.com/assets/external/widget.css";
          document.head.appendChild(l);
        `}
      </Script>

      <div
        ref={sectionRef}
        id="contact"
        style={{
          backgroundImage: 'url("/contactbg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-auto md:h-[540px] lg:h-[450px] xl:h-[540px]
        flex flex-col md:flex-row items-center justify-between 
        px-6 sm:px-10 md:px-28 py-10 md:py-0"
      >
        {/* LEFT SECTION */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center gap-4 text-center md:text-left">
          <p className="text-white font-kaushan text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>

          <p className="text-white font-medium text-lg sm:text-xl mb-4">
            Let us help you unlock your health potential.
          </p>

          <div className="flex gap-3 justify-center md:justify-start">
            <ContactUsForm bgColor={"bg-[#07363C]"} />
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (window.Calendly) {
                  window.Calendly.initPopupWidget({
                    url: "https://calendly.com/snehansbehera080903/30min?text_color=07363c&primary_color=07363c",
                  });
                }
              }}
              className="text-[#07363C] rounded-full px-4 py-3 bg-white font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Book Now
            </a>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col gap-4 relative justify-start mt-10 md:mt-0">
          <motion.div
            initial={{
              opacity: 0,
              x: 80,
              filter: "blur(12px)",
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                  }
                : {}
            }
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/mockup.png"
              alt="mockup"
              width={500}
              height={500}
              className="w-xl sm:w-80 md:w-2xl lg:w-lg xl:w-2xl mx-auto md:mx-0"
            />
          </motion.div>

          <div
            className="flex justify-center items-center gap-2 
            static md:absolute bottom-8 lg:bottom-5 xl:bottom-8 
            text-center md:right-1/4 lg:right-1/3 xl:right-1/3 mt-4 md:mt-0"
          >
            <p className="text-sm text-white whitespace-nowrap">
              Available on
            </p>

            <Image
              onClick={() =>
                router.push(
                  "https://play.google.com/store/apps/details?id=com.wellnessz.banne&pcampaignid=web_share"
                )
              }
              src="/playStore.png"
              alt="playStore"
              width={120}
              height={50}
              className="w-20 cursor-pointer sm:w-24 lg:w-20 xl:w-24"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
