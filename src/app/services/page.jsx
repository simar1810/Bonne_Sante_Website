"use client";
import { motion, useInView} from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import NavbarBlogs from "@/components/NavbarBlogs";
import Footer from "@/components/Footer";
import MealPlanForm from "@/forms/MealPlanForms";
import NutritionalCounselingForm from "@/forms/NutritionalCounselingForm";
import BehavioralCoachingForm from "@/forms/BehavioralCoachingForm";
import WeightManagementForm from "@/forms/WeightManagementForm";
import SportsNutritionForm from "@/forms/SportsNutritionForm";
import MedicalNutritionForm from "@/forms/MedicalNutritionForm";
import FamilyWellnessForm from "@/forms/FamilyWellnessForm";
import GeneticNutritionForm from "@/forms/GeneticNutritionForm";
import HealthyLifestyleForm from "@/forms/HealthyLifestyleForm";
import SchoolNutritionProgrammeForm from "@/forms/SchoolNutritionProgrammeForm";
import WeddingBellsNutritionForm from "@/forms/WeddingBellsNutritionForm";
import FamilyDietPackageForm from "@/forms/FamilyDietPackageForm";
import HealthyRestaurantKitchenForm from "@/forms/HealthyRestaurantKitchenForm";
import HealthyLifestyleProgrammeForm from "@/forms/HealthyLifestyleProgrammeForm";
import CommunityNutritionProgrammeForm from "@/forms/CommunityNutritionProgrammeForm";
import CorporateNutritionProgrammeForm from "@/forms/CorporateNutritionProgrammeForm";
import LifestyleCoachingForm from "@/forms/LifestyleCoachingForm";
import CustomizedDietPlanForm from "@/forms/CustomizedDietPlanForm";
import PersonalizedDietChartForm from "@/forms/PersonalizedDietChartForm";
import SportsNutritionProgrammeForm from "@/forms/SportsNutritionProgrammeForm";
import WeightManagementProgrammeForm from "@/forms/WeightManagementProgrammeForm";
import DiabetesManagementProgrammeForm from "@/forms/DiabetesManagementProgrammeForm";
import HeartDiseaseSupportProgrammeForm from "@/forms/HeartDiseaseSupportProgrammeForm";
import GINutritionProgrammeForm from "@/forms/GINutritionProgrammeForm";
import LiverHealthProgrammeForm from "@/forms/LiverHealthProgrammeForm";
import KidneyHealthProgrammeForm from "@/forms/KidneyHealthProgrammeForm";
import { ChevronDown } from "lucide-react";

const services = [
  {
    title: "Personalized Meal Plans",
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

  {
    title: "School Nutrition Programme",
    tag: "Healthy Futures",
    img: "/services15.png",
  },
  {
    title: "Wedding Bells Nutrition Programme",
    tag: "Begin Glow-Up",
    img: "/services16.png",
  },
  {
    title: "Family Diet Package",
    tag: "Get Started",
    img: "/services17.png",
  },
  {
    title: "Healthy Restaurant Kitchen Setup Programme",
    tag: "Get fit",
    img: "/services18.png",
  },
  {
    title: "Healthy Lifestyle Programme",
    tag: "Get in",
    img: "/services9.png",
  },
  {
    title: "Community Nutrition Programme",
    tag: "Boost my performance",
    fit:1,
    img: "/services19.png",
  },
  {
    title: "Corporate Nutrition Programme",
    tag: "Get support",
    img: "/services20.png",
  },
  {
    title: "Lifestyle Coaching",
    tag: "Support family",
    img: "/services21.png",
  },
  {
    title: "Customized Diet Plan",
    tag: "Discover my Plan",
    fit:1,
    img: "/services22.png",
  },
  {
    title: "Personalized Diet Chart",
    tag: "Get support",
    img: "/services23.png",
  },
  {
    title: "Sports Nutrition Programme",
    tag: "Boost yourself",
    img: "/services24.png",
  },
  {
    title: "Weight Management Programme",
    tag: "Get Fit",
    img: "/services25.png",
  },
  {
    title: "Diabetes Management Programme",
    tag: "Check Diabetes",
    img: "/services9.png",
  },
  {
    title: "Heart Disease Support Programme",
    tag: "Aid My Heart",
    img: "/services26.png",
  },
  {
    title: "Cancer Nutrition Support Programme",
    tag: "Support family",
    img: "/services27.png",
  },
  {
    title: "Kidney Health Nutrition Programme",
    tag: "Discover My Plan",
    fit:1,
    img: "/services28.png",
  },
  {
    title: "Liver Health Nutrition Programme",
    tag: "Liver Health",
    img: "/services29.png",
  },
  {
    title: "Gastrointestinal (GI) Nutrition Programme",
    tag: "Gut Health",
    img: "/services30.png",
  },
];

function FloatingShape({ delay, duration, yOffset }) {
  return (
    <motion.div
      animate={{
        y: [0, yOffset, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
      className="absolute w-20 h-20 rounded-full bg-linear-to-br from-[#558D94]/10 to-[#0E3D3F]/10 blur-xl"
    />
  );
}
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
  const [openGenetics, setOpenGenetics] = useState(false);
  const [openhealthy, setOpenhealthy] = useState(false);
  const [openSchool, setOpenSchool] = useState(false);
  const [openWedding, setOpenWedding] = useState(false);
  const [openFamilyPackage, setOpenFamilyPackage] = useState(false);
  const [openhealthyRest, setOpenhealthyRest] = useState(false);
  const [openhealthylifestyle, setOpenhealthylifestyle] = useState(false);
  const [openCommunityNutri, setOpenCommunityNutri] = useState(false);
  const [openCorporateNutri, setOpenCorporateNutri] = useState(false);
  const [openlifestyle, setOpenlifestyle] = useState(false);
  const [openCustomiseddiet, setOpenCustomiseddiet] = useState(false);
  const [openPersonalised, setOpenPersonalised] = useState(false);
  const [openSportsNutri, setOpenSportsNutri] = useState(false);
  const [openWeightMan, setOpenWeightMan] = useState(false);
  const [openDiabetes, setOpenDiabetes] = useState(false);
  const [openHeartDisease, setOpenHeartDisease] = useState(false);
  const [openGI, setOpenGI] = useState(false);
  const [openKidney, setOpenKidney] = useState(false);
  const [openLiver, setOpenLiver] = useState(false);


  const onTagClick = () => {
    if (item.title === "Personalized Meal Plans") setOpenMeal(true);
    if (item.title === "Nutritional Counseling") setOpenNutrition(true);
    if (item.title === "Behavioral and Lifestyle Coaching") setOpenBehavioral(true);
    if (item.title === "Weight Management") setOpenWeight(true);
    if (item.title === "Sports Nutrition Programs") setOpenSports(true);
    if (item.title === "Medical Nutrition Programs") setOpenMedical(true);
    if (item.title === "Family Wellness") setOpenFamily(true);
    if (item.title === "Genetic Nutrition Program") setOpenGenetics(true);
    if (item.title === "Healthy Lifestyle Program") setOpenhealthy(true);
    if (item.title === "School Nutrition Programme") setOpenSchool(true);
    if (item.title === "Wedding Bells Nutrition Programme") setOpenWedding(true);
    if (item.title === "Family Diet Package") setOpenFamilyPackage(true);
    if (item.title === "Healthy Restaurant Kitchen Setup Programme") setOpenhealthyRest(true);
    if (item.title === "Healthy Lifestyle Programme") setOpenhealthylifestyle(true);
    if (item.title === "Community Nutrition Programme") setOpenCommunityNutri(true);
    if (item.title === "Corporate Nutrition Programme") setOpenCorporateNutri(true);
    if (item.title === "Lifestyle Coaching") setOpenlifestyle(true);
    if (item.title === "Customized Diet Plan") setOpenCustomiseddiet(true);
    if (item.title === "Personalized Diet Chart") setOpenPersonalised(true);
    if (item.title === "Sports Nutrition Programme") setOpenSportsNutri(true);
    if (item.title === "Weight Management Programme") setOpenWeightMan(true);
    if (item.title === "Diabetes Management Programme") setOpenDiabetes(true);
    if (item.title === "Heart Disease Support Programme") setOpenHeartDisease(true);
    if (item.title === "Gastrointestinal (GI) Nutrition Programme") setOpenGI(true);
    if (item.title === "Liver Health Nutrition Programme") setOpenLiver(true);
    if (item.title === "Kidney Health Nutrition Programme") setOpenKidney(true);
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
      {item.title === "Genetic Nutrition Program" && (
        <GeneticNutritionForm open={openGenetics} setOpen={setOpenGenetics} />
      )}
      {item.title === "Healthy Lifestyle Program" && (
        <HealthyLifestyleForm open={openhealthy} setOpen={setOpenhealthy} />
      )}
      {item.title === "School Nutrition Programme" && (
        <SchoolNutritionProgrammeForm open={openSchool} setOpen={setOpenSchool} />
      )}
      {item.title === "Wedding Bells Nutrition Programme" && (
        <WeddingBellsNutritionForm open={openWedding} setOpen={setOpenWedding} />
      )}
      {item.title === "Family Diet Package" && (
        <FamilyDietPackageForm open={openFamilyPackage} setOpen={setOpenFamilyPackage} />
      )}
      {item.title === "Healthy Restaurant Kitchen Setup Programme" && (
        <HealthyRestaurantKitchenForm open={openhealthyRest} setOpen={setOpenhealthyRest} />
      )}
      {item.title === "Healthy Lifestyle Programme" && (
        <HealthyLifestyleProgrammeForm open={openhealthylifestyle} setOpen={setOpenhealthylifestyle} />
      )}
      {item.title === "Community Nutrition Programme" && (
        <CommunityNutritionProgrammeForm open={openCommunityNutri} setOpen={setOpenCommunityNutri} />
      )}
      {item.title === "Corporate Nutrition Programme" && (
        <CorporateNutritionProgrammeForm open={openCorporateNutri} setOpen={setOpenCorporateNutri} />
      )}
      {item.title === "Lifestyle Coaching" && (
        <LifestyleCoachingForm open={openlifestyle} setOpen={setOpenlifestyle} />
      )}
      {item.title === "Customized Diet Plan" && (
        <CustomizedDietPlanForm open={openCustomiseddiet} setOpen={setOpenCustomiseddiet} />
      )}
      {item.title === "Personalized Diet Chart" && (
        <PersonalizedDietChartForm open={openPersonalised} setOpen={setOpenPersonalised} />
      )}
      {item.title === "Sports Nutrition Programme" && (
        <SportsNutritionProgrammeForm open={openSportsNutri} setOpen={setOpenSportsNutri} />
      )}
      {item.title === "Weight Management Programme" && (
        <WeightManagementProgrammeForm open={openWeightMan} setOpen={setOpenWeightMan} />
      )}
      {item.title === "Diabetes Management Programme" && (
        <DiabetesManagementProgrammeForm open={openDiabetes} setOpen={setOpenDiabetes} />
      )}
      {item.title === "Heart Disease Support Programme" && (
        <HeartDiseaseSupportProgrammeForm open={openHeartDisease} setOpen={setOpenHeartDisease} />
      )}
      {item.title === "Gastrointestinal (GI) Nutrition Programme" && (
        <GINutritionProgrammeForm open={openGI} setOpen={setOpenGI} />
      )}
      {item.title === "Liver Health Nutrition Programme" && (
        <LiverHealthProgrammeForm open={openLiver} setOpen={setOpenLiver} />
      )}
      {item.title === "Kidney Health Nutrition Programme" && (
        <KidneyHealthProgrammeForm open={openKidney} setOpen={setOpenKidney} />
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
export default function ServicesPage() {
  const containerRef = useRef(null);

  const ITEMS_PER_ROW = 3;
  const ROWS_AT_A_TIME = 3;
  const ITEMS_PER_PAGE = ITEMS_PER_ROW * ROWS_AT_A_TIME;
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  
    const handleLoadMore = () => {
      setVisibleCount((prev) =>
        Math.min(prev + ITEMS_PER_PAGE, services.length)
      );
  };
  const hasMore = visibleCount < services.length;
  return (
    <div className="min-h-screen bg-[#F6F9F9] relative overflow-hidden">
      <FloatingShape delay={0} duration={15} yOffset={-50} />
      <FloatingShape delay={2} duration={18} yOffset={60} />
      <FloatingShape delay={4} duration={20} yOffset={-40} />
      

      <div className="relative z-10 pt-20 pb-32">
        <div className="mb-16 flex justify-center">
          <NavbarBlogs/>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block mb-6"
            >
              <div className="px-6 py-2 bg-linear-to-r from-[#558D94]/20 to-[#0E3D3F]/20 rounded-full border border-[#558D94]/30">
                <span className="text-[#0E3D3F] font-medium">Latest Insights</span>
              </div>
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-kaushan text-[#0E3D3F] mb-6">
              Our Services
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore evidence-based insights on nutrition, wellness, and holistic health
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-32 h-1 bg-linear-to-r from-transparent via-[#558D94] to-transparent mx-auto mt-8"
            />
          </motion.div>
        </div>

        <div ref={containerRef} className="max-w-[1400px] mx-auto flex flex-col items-center  space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
        {services.slice(0, visibleCount).map((item, i) => (
          <ServiceCard key={i} item={item} i={i} />
        ))}
      </div>
      {hasMore && (
        <>
        <p className="text-[#0C3C3E] text-sm font-bold">Load More</p>
        <button
          onClick={handleLoadMore}
          className="mt-6 flex items-center justify-center w-12 h-12 rounded-full bg-[#327476] text-white hover:scale-110 transition animate-bounce"
          aria-label="Load more services"
        >
          <ChevronDown size={28} />
          </button>
        </>
      )}
        </div>
      </div>
      <div className="bg-[#07363C] w-full mt-20">
        <Footer landing={false} />
      </div>
    </div>
  );
}