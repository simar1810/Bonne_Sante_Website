"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Personalized Meal Plans",
    desc: "We create custom meal plans that are nutritious, delicious, and designed to meet your health goals. Whether you want to lose weight, improve your energy, or manage a medical condition, we have a plan for you.",
    tag: "Create my Plan",
    img: "/services1.png",
  },
  {
    title: "Nutritional Counseling",
    tag: "Book a Session",
    img: "/services2.png",
  },
  {
    title: "Behavioral and Lifestyle Coaching",
    tag: "Start Coaching",
    img: "/services10.png",
  },
  {
    title: "Weight Management",
    tag: "  Get Fit",
    fit:1,
    img: "/services4.png",
  },
  {
    title: "Sports Nutrition Programs",
    tag: "Boost My Performance",
    fit:1,
    img: "/services11.png",
  },
  {
    title: "Medical Nutrition Programs",
    tag: "Get Support",
    img: "/services12.png",
  },
  {
    title: "Family Wellness",
    tag: "Support Family",
    img: "/services13.png",
  },
  {
    title: "Genetic Nutrition Program",
    tag: "Discover My Plan",
    fit:1,
    img: "/services14.png",
  },
  {
    title: "Healthy Lifestyle Program",
    tag: "Get Support",
    img: "/services9.png",
  },
];

function ServiceCard({ item, i }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: (i % 3) * 0.15,
      }}
      className="relative cursor-pointer"
    >
      <Image
        src={item.img}
        alt={item.title}
        width={500}
        height={400}
        className=""
      />

      {item.tag && (
        <div
          className={`
            absolute 
            top-1 md:top-2 lg:top-1 xl:top-2 2xl:top-3 
            right-4 md:right-6 lg:right-4 
            bg-[#0C3C3E] text-white text-center py-2 
            ${!item.fit ? "w-20 md:w-[82px] xl:w-[110px] md:px-2" : "w-auto px-2"}
            rounded-full 
            text-[10px] md:text-[9px] xl:text-[12px]
            font-medium shadow-md
          `}
        >
          {item.tag}
        </div>
      )}

      <div className="absolute bottom-14 left-8 w-[80%] md:max-w-[87%] 2xl:w-[90%] text-white">
        <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>

        {item.desc && (
          <p className="text-sm text-gray-200 mt-1 leading-4 font-normal">
            {item.desc}
          </p>
        )}
      </div>
    </motion.div>
  );
}


export default function Services() {
  return (
    <section id="services" className="w-full pb-10 flex flex-col items-center px-4">
      <div className="bg-[#0C3C3E] text-white px-8 py-2 rounded-full font-kaushan text-xl mb-12 shadow-sm">
        Our Services
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
        {services.map((item, i) => (
          <ServiceCard key={i} item={item} i={i} />
        ))}
      </div>
    </section>
  );
}
