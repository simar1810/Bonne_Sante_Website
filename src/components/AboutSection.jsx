"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["0.1 1", "0.9 0"],
  });

  // Faster and smoother motion using spring
  const smoothConfig = { stiffness: 120, damping: 20, mass: 0.2 };

  // Left image — inwards fade on scroll up/out
  const leftXRaw = useTransform(scrollYProgress, [0, 1], ["-60px", "0px"]);
  const leftOpacityRaw = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  const leftX = useSpring(leftXRaw, smoothConfig);
  const leftOpacity = useSpring(leftOpacityRaw, smoothConfig);

  // Right image — inwards fade on scroll up/out
  const rightXRaw = useTransform(scrollYProgress, [0, 1], ["40px", "0px"]);
  const rightOpacityRaw = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  const rightX = useSpring(rightXRaw, smoothConfig);
  const rightOpacity = useSpring(rightOpacityRaw, smoothConfig);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full flex justify-between py-10 px-4 sm:px-8 md:px-10 bg-white"
    >
      <div className="w-full flex flex-col md:flex-row items-center justify-between relative gap-6 md:gap-0">

        {/* LEFT IMAGE */}
        <motion.div style={{ x: leftX, opacity: leftOpacity }}>
          <Image
            src="/yoga3.png"
            alt="Meditation"
            width={500}
            height={400}
            className="w-64 sm:w-80 md:w-[400px] h-auto object-cover"
          />
        </motion.div>

        {/* MIDDLE TEXT */}
        <div className="text-center max-w-xl px-4 md:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0D3B3C] mb-4">
            At <span className="font-kaushan italic">Bonne Sante</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#0D3B3C] leading-7 font-medium">
            we believe that true health is about more than just diet; it’s about a holistic approach to wellness.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div style={{ x: rightX, opacity: rightOpacity }}>
          <Image
            src="/yoga4.png"
            alt="Meditation"
            width={500}
            height={400}
            className="w-64 sm:w-80 md:w-[400px] h-auto object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
}
