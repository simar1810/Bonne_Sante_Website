"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import MealPlanForm from "@/forms/MealPlanForms";
import Image from "next/image";

const featuredService = {
  title: "Personalized Meal Plans",
  desc: "We create custom meal plans that are nutritious, delicious, and designed to meet your health goals. Whether you want to lose weight, improve your energy, or manage a medical condition, we have a plan for you.",
  tag: "Create my Plan",
  img: "/services1.png",
  benefits: [
    "Customized to your lifestyle and preferences",
    "Evidence-based nutritional guidance",
    "Flexible meal options that fit your schedule",
    "Ongoing support and adjustments"
  ]
};

function FloatingOrb({ delay, size, top, left, color }) {
  return (
    <motion.div
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
      className={`absolute ${top} ${left} ${size} rounded-full ${color} blur-3xl pointer-events-none`}
    />
  );
}

function BenefitItem({ benefit, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start gap-3 group"
    >
      <motion.div
        animate={isInView ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <CheckCircle2 className="text-[#558D94] shrink-0 mt-1" size={20} />
      </motion.div>
      <p className="text-gray-700 group-hover:text-[#0C3C3E] transition-colors">
        {benefit}
      </p>
    </motion.div>
  );
}

export default function ServicesShowcase() {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const isImageInView = useInView(imageRef, { once: false, amount: 0.3 });
  const isContentInView = useInView(contentRef, { once: false, amount: 0.3 });
  const [openMeal, setOpenMeal] = useState(false);
  const handleGetStarted = () => {
    setOpenMeal(true)
  };

  const handleViewMore = () => {
    window.location.href = "/services";
  };

  return (
    <section id="services" className="w-full py-20 flex flex-col items-center px-4 relative overflow-hidden bg-linear-to-b from-white to-[#F6F9F9]">
      <FloatingOrb delay={0} size="w-96 h-96" top="top-20" left="left-10" color="bg-[#558D94]/10" />
      <FloatingOrb delay={2} size="w-80 h-80" top="top-40" left="right-20" color="bg-[#0C3C3E]/10" />
      <FloatingOrb delay={4} size="w-72 h-72" top="bottom-20" left="left-1/3" color="bg-[#558D94]/5" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="bg-[#0C3C3E] text-white px-8 py-2 rounded-full font-kaushan text-xl mb-16 shadow-lg relative overflow-hidden">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
          />
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles size={18} />
            Our Services
          </span>
        </div>
      </motion.div>

      <div className="w-full max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -100 }}
            animate={isImageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative rounded-3xl overflow-hidden">
              <motion.div
                className="relative"
              >
                <Image width={500} height={500}
                  src={featuredService.img}
                  alt={featuredService.title}
                  className="w-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isImageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-1 right-3  md:top-6 md:right-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetStarted}
                  className="bg-[#0C3C3E] text-white px-2 py-2 md:px-4 md:py-3 rounded-full text-[10px] md:text-sm font-medium shadow-lg cursor-pointer flex items-center gap-2 backdrop-blur-sm border border-white/20"
                >
                  {featuredService.tag}
                  <ArrowRight size={16} className="hidden md:block"/>
                </motion.div>
                <MealPlanForm open={openMeal} setOpen={setOpenMeal} />
              </motion.div>
            </div>

            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-linear-to-br from-[#558D94]/20 to-[#0C3C3E]/20 rounded-full blur-2xl -z-10"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-8 -right-8 w-40 h-40 bg-linear-to-br from-[#0C3C3E]/20 to-[#558D94]/20 rounded-full blur-2xl -z-10"
            />
          </motion.div>

          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: 100 }}
            animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 px-4 md:px-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-block px-4 py-1 bg-[#558D94]/10 rounded-full mb-4">
                <span className="text-[#0C3C3E] text-sm font-medium">Featured Service</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-kaushan text-[#0C3C3E] leading-tight">
                {featuredService.title}
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {featuredService.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {featuredService.benefits.map((benefit, index) => (
                <BenefitItem key={index} benefit={benefit} index={index} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(12, 60, 62, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="px-8 py-4 bg-linear-to-r from-[#0C3C3E] to-[#558D94] text-white rounded-full font-medium shadow-lg flex items-center gap-2"
              >
                Get Started Now
                <ArrowRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewMore}
                className="px-8 py-4 bg-white border-2 border-[#0C3C3E] text-[#0C3C3E] rounded-full font-medium shadow-lg hover:bg-[#0C3C3E] hover:text-white transition-all duration-300"
              >
                View All Services
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}