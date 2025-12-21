"use client"
import React from 'react';
import { Menu, X } from "lucide-react"
import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [peopleDropdown, setPeopleDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
    { code: "bn", name: "Bengali" },
    { code: "pa", name: "Punjabi" },
    { code: "te", name: "Telugu" },
    { code: "mr", name: "Marathi" },
    { code: "ta", name: "Tamil" },
    { code: "ur", name: "Urdu" },
    { code: "gu", name: "Gujarati" },
    { code: "kn", name: "Kannada" },
    { code: "ml", name: "Malayalam" },
    { code: "or", name: "Odia" },
    { code: "as", name: "Assamese" },
    { code: "ne", name: "Nepali" },
    { code: "si", name: "Sinhala" },
    { code: "tr", name: "Turkish" },
    { code: "nl", name: "Dutch" },
    { code: "pl", name: "Polish" },
    { code: "uk", name: "Ukrainian" },
    { code: "ro", name: "Romanian" },
    { code: "cs", name: "Czech" },
    { code: "sv", name: "Swedish" },
    { code: "el", name: "Greek" },
    { code: "he", name: "Hebrew" },
    { code: "th", name: "Thai" },
    { code: "vi", name: "Vietnamese" },
    { code: "id", name: "Indonesian" },
    { code: "ms", name: "Malay" },
    { code: "fil", name: "Filipino" },
    { code: "fa", name: "Persian" },
    { code: "sw", name: "Swahili" },
    { code: "hu", name: "Hungarian" },
    { code: "da", name: "Danish" },
    { code: "fi", name: "Finnish" },
    { code: "no", name: "Norwegian" },
    { code: "sk", name: "Slovak" },
    { code: "bg", name: "Bulgarian" },
    { code: "hr", name: "Croatian" },
    { code: "sr", name: "Serbian" },
    { code: "sl", name: "Slovenian" },
    { code: "lt", name: "Lithuanian" },
    { code: "lv", name: "Latvian" },
    { code: "et", name: "Estonian" },
    { code: "is", name: "Icelandic" },
    { code: "ga", name: "Irish" },
    { code: "mt", name: "Maltese" },
    { code: "cy", name: "Welsh" },
    { code: "eu", name: "Basque" },
    { code: "ca", name: "Catalan" },
    { code: "gl", name: "Galician" },
    { code: "af", name: "Afrikaans" },
    { code: "am", name: "Amharic" },
    { code: "az", name: "Azerbaijani" },
    { code: "be", name: "Belarusian" },
    { code: "bs", name: "Bosnian" },
    { code: "ceb", name: "Cebuano" },
    { code: "co", name: "Corsican" },
    { code: "eo", name: "Esperanto" },
    { code: "fy", name: "Frisian" },
    { code: "haw", name: "Hawaiian" },
    { code: "hmn", name: "Hmong" },
    { code: "ht", name: "Haitian Creole" },
    { code: "ig", name: "Igbo" },
    { code: "jv", name: "Javanese" },
    { code: "kk", name: "Kazakh" },
    { code: "km", name: "Khmer" },
    { code: "ku", name: "Kurdish" },
    { code: "ky", name: "Kyrgyz" },
    { code: "lo", name: "Lao" },
    { code: "la", name: "Latin" },
    { code: "lb", name: "Luxembourgish" },
    { code: "mg", name: "Malagasy" },
    { code: "mi", name: "Maori" },
    { code: "mk", name: "Macedonian" },
    { code: "mn", name: "Mongolian" },
    { code: "my", name: "Myanmar (Burmese)" },
    { code: "ny", name: "Chichewa" },
    { code: "ps", name: "Pashto" },
    { code: "sm", name: "Samoan" },
    { code: "gd", name: "Scots Gaelic" },
    { code: "sn", name: "Shona" },
    { code: "sd", name: "Sindhi" },
    { code: "so", name: "Somali" },
    { code: "st", name: "Sesotho" },
    { code: "su", name: "Sundanese" },
    { code: "tg", name: "Tajik" },
    { code: "tt", name: "Tatar" },
    { code: "tk", name: "Turkmen" },
    { code: "ug", name: "Uyghur" },
    { code: "uz", name: "Uzbek" },
    { code: "xh", name: "Xhosa" },
    { code: "yi", name: "Yiddish" },
    { code: "yo", name: "Yoruba" },
    { code: "zu", name: "Zulu" }
  ];

  return (
    <div className='flex items-center'>
      <div className='flex justify-between w-[80vw] md:justify-end items-center md:gap-10 2xl:gap-24'>
      <ul className='hidden md:flex items-center justify-between gap-4 list-none'>
        <li 
          className='text-lg text-[#07363C] hover:bg-[#07363C] px-4 py-2 rounded-full transition-all delay-75 duration-500 hover:text-white cursor-pointer font-semibold'
          onClick={() => scrollToSection("home")}
        >
          Home
        </li>

        <li 
          className='text-lg text-[#07363C] hover:bg-[#07363C] px-4 py-2 rounded-full transition-all delay-75 duration-500 hover:text-white cursor-pointer font-semibold'
          onClick={() => scrollToSection("about")}
        >
          About Us
        </li>
        <li 
          className='text-lg text-[#07363C] hover:bg-[#07363C] px-4 py-2 rounded-full transition-all delay-75 duration-500 hover:text-white cursor-pointer font-semibold'
          onClick={() => scrollToSection("services")}
        >
          Services
        </li>
        <li 
          className='text-lg text-[#07363C] hover:bg-[#07363C] px-4 py-2 rounded-full transition-all delay-75 duration-500 hover:text-white cursor-pointer font-semibold'
          onClick={() => scrollToSection("blogs")}
        >
          Blogs
        </li>

        <li 
          className='text-lg text-[#07363C] hover:bg-[#07363C] px-4 py-2 rounded-full transition-all delay-75 duration-500 hover:text-white cursor-pointer font-semibold relative'
          onClick={() => setPeopleDropdown(!peopleDropdown)}
        >
          People
          {peopleDropdown && (
            <div className="absolute top-12 left-0 bg-white shadow-md rounded-lg py-2 w-40 z-50">
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#07363C] font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  setPeopleDropdown(false);
                  window.location.href = "https://app.bonnesante.co.in/client/login";
                }}
              >
                Client Login
              </p>

              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#07363C] font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  setPeopleDropdown(false);
                  window.location.href = "https://app.bonnesante.co.in/login";
                }}
              >
                Employee Login
              </p>
            </div>
          )}
        </li>
        
        <li 
          className='text-lg text-[#07363C] hover:bg-[#07363C] px-4 py-2 rounded-full transition-all delay-75 duration-500 hover:text-white cursor-pointer font-semibold'
          onClick={() => scrollToSection("contact")}
        >
          Contact Us
        </li>
      </ul>
      <div onClick={() => setOpen(true)} className='md:hidden text-white'>
        <Menu size={25}/>
      </div>
      <select 
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className='bg-[#FFFFFF40] backdrop-blur-md text-black px-4 py-2 text-lg font-semibold rounded-full cursor-pointer max-h-10 overflow-y-auto'
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code.toLowerCase()}>
            {lang.name}
          </option>
        ))}
        </select>
      </div>
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
                  onClick={() => scrollToSection("services")}>Services</li>
              <li className="text-lg text-white font-semibold cursor-pointer"
                  onClick={() => scrollToSection("blogs")}>Blogs</li>
              <li className="text-lg text-white font-semibold cursor-pointer"
                onClick={() => setPeopleDropdown(!peopleDropdown)}>People</li>
              {peopleDropdown && (
                <div className="flex flex-col bg-white rounded-lg py-2 text-center">
                  <p
                    className="px-4 py-2 text-[#07363C] hover:bg-gray-100 cursor-pointer font-medium"
                    onClick={() => (window.location.href = "https://app.bonnesante.co.in/client/login")}
                  >
                    Client Login
                  </p>
                  <p
                    className="px-4 py-2 text-[#07363C] hover:bg-gray-100 cursor-pointer font-medium"
                    onClick={() => (window.location.href = "https://app.bonnesante.co.in/login")}
                  >
                    Employee Login
                  </p>
                </div>
              )}              
              <li className="text-lg text-white font-semibold cursor-pointer"
                  onClick={() => scrollToSection("contact")}>Contact Us</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;