"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import MealPlanForm from "@/forms/MealPlanForms";
import NutritionalCounselingForm from "@/forms/NutritionalCounselingForm";
import BehavioralCoachingForm from "@/forms/BehavioralCoachingForm";
import WeightManagementForm from "@/forms/WeightManagementForm";
import SportsNutritionForm from "@/forms/SportsNutritionForm";
import MedicalNutritionForm from "@/forms/MedicalNutritionForm";
import FamilyWellnessForm from "@/forms/FamilyWellnessForm";

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
  const [openMeal, setOpenMeal] = useState(false);
  const [openNutrition, setOpenNutrition] = useState(false);
  const [openBehavioral, setOpenBehavioral] = useState(false);
  const [openWeight, setOpenWeight] = useState(false);
  const [openSports, setOpenSports] = useState(false);
  const [openMedical, setOpenMedical] = useState(false);
  const [openFamily, setOpenFamily] = useState(false);


  const onTagClick = () => {
    if (item.title === "Personalized Meal Plans") setOpenMeal(true);
    if (item.title === "Nutritional Counseling") setOpenNutrition(true);
    if (item.title === "Behavioral and Lifestyle Coaching") setOpenBehavioral(true);
    if (item.title === "Weight Management") setOpenWeight(true);
    if (item.title === "Sports Nutrition Programs") setOpenSports(true);
    if (item.title === "Medical Nutrition Programs") setOpenMedical(true);
    if (item.title === "Family Wellness") setOpenFamily(true);
  };

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
          onClick={onTagClick}
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
        {item.title === "Personalized Meal Plans" && (
          <MealPlanForm open={openMeal} setOpen={setOpenMeal} />
      )}
      {item.title === "Nutritional Counseling" && (
        <NutritionalCounselingForm open={openNutrition} setOpen={setOpenNutrition} />
      )}
      {item.title === "Behavioral and Lifestyle Coaching" && (
        <BehavioralCoachingForm open={openBehavioral} setOpen={setOpenBehavioral} />
      )}
      {item.title === "Weight Management" && (
        <WeightManagementForm open={openWeight} setOpen={setOpenWeight} />
      )}
      {item.title === "Sports Nutrition Programs" && (
        <SportsNutritionForm open={openSports} setOpen={setOpenSports} />
      )}
      {item.title === "Medical Nutrition Programs" && (
        <MedicalNutritionForm open={openMedical} setOpen={setOpenMedical} />
      )}
      {item.title === "Family Wellness" && (
        <FamilyWellnessForm open={openFamily} setOpen={setOpenFamily} />
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
