"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MoveRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const reasons = [
  {
    id: 1,
    image: "/blog1_img1.jpg",
    title: "PCOS Care with Nutrition & Fitness",
    description: "Support your PCOS journey with easy nutrition tips and smart fitness habits that help restore balance.",
    link: "/blogs/blog1"
  },
  {
    id: 2,
    image: "/blog2_img1.jpg",
    title: "Nutrition for Energy During Cancer Care",
    description: "Learn how the right foods can support your energy levels and keep your body strong throughout cancer care.",
    link: "/blogs/blog2"
  },
  {
    id: 3,
    image: "/blog3_img1.jpg",
    title: "Metabolism & Weight Loss: Myths vs. Facts",
    description: "Clear the confusion with simple, science-backed facts about metabolism and weight loss.",
    link: "/blogs/blog3"
  }
];

function CardReveal({ children, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={
        isInView 
          ? { opacity: 1, y: 0, scale: 1 } 
          : { opacity: 0, y: 60, scale: 0.9 }
      }
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const router = useRouter();
  return (
    <section id="blogs" className="w-full flex justify-center py-20 px-4">
      <div className="w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-kaushan italic text-[#0E3D3F] mb-4">
            Why Choose us?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#558D94] to-transparent mx-auto" />
        </motion.div>
        <button onClick={()=>router.push("/blogs")} className="text-[#558D94] font-bold w-full text-right pr-8 text-base mb-3 flex justify-end items-center gap-1">
          <p className="hover:underline transition-all">View More</p>
          <ChevronRight size={20} className="hover:translate-x-2 transition-all"/>
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <CardReveal key={reason.id} index={index}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative h-full"
              >
                <div className="relative h-[420px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#0E3D3F] to-[#07363C] border border-white/10 shadow-xl">
                  <div className="relative h-38 md:h-48 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full my-4"
                    >
                      <div className="overflow-hidden rounded-2xl">
                      <Image
                        width={500} height={500}
                        src={reason.image}
                        alt={reason.title}
                        className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E3D3F] via-[#0E3D3F]/40 to-transparent" />
                  </div>

                  <div className="relative p-6 flex flex-col justify-between h-[calc(100%-192px)]">
                    <div>
                      <h3 className="text-xl font-kaushan text-white mb-3 leading-snug">
                        {reason.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {reason.description}
                      </p>
                    </div>

                    <motion.button
                      onClick={() => window.location.href = reason.link}
                      whileHover={{ x: 4 }}
                      className="self-start mt-4 flex items-center gap-2 text-[#558D94] font-medium text-sm group/btn z-10"
                    >
                      <span className="">Learn More</span>
                      <MoveRight 
                        size={18} 
                        className="transition-transform group-hover/btn:translate-x-1" 
                      />
                    </motion.button>
                  </div>

                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(85, 141, 148, 0.3), transparent)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '200% 0%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </div>

                <motion.div
                  className="absolute -z-10 inset-0 rounded-3xl bg-[#558D94]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </CardReveal>
          ))}
        </div>
      </div>
    </section>
  );
}