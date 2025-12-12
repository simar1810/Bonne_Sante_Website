"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

function FadeSlide({ children, from }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: from === "up" ? -40 : 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: from === "up" ? -40 : 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const router = useRouter();
  return (
    <section id="blogs" className="w-full flex justify-center py-18 px-4">
      <div
        className={`w-full max-w-[1400px] bg-[#0E3D3F] rounded-3xl p-10 relative text-white shadow-lg 
        border border-white/10 bg-cover bg-center`}
        style={{ backgroundImage: "url('/chooseUsbg.png')" }}
      >
        <h2 className="text-center text-3xl md:text-4xl font-kaushan italic mb-10">
          Why Choose us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 w-full">
          <FadeSlide from="down">
          <div className="col-span-1 flex flex-col items-center md:items-start">
            <div className="overflow-hidden rounded-2xl w-full md:w-[28vw] h-52 sm:h-64 md:h-68">
              <Image
                src="/choose1.png"
                alt="Expert Team"
                width={1000}
                height={1000}
                className="h-full w-full object-cover md:w-[28vw]"
              />
            </div>

            <div className="bg-linear-to-r from-[#558D94] to-[#07363C] rounded-2xl px-5 py-3 backdrop-blur border-2 border-[#999999] w-full md:w-auto relative">
              <h3 className="text-xl font-kaushan mb-2 text-center md:text-left">
                Expert Team
              </h3>
              <p className="text-lg leading-5 text-gray-200 text-center md:text-left">
                Cure PCOS Naturally with Nutrition and Fitness Strategies That Work.
              </p>
              <MoveRight onClick={()=>router.push('/blogs/blog1')} size={20} className="text-white absolute top-2 right-4 animate-pulse"/> 
            </div>
            </div>
          </FadeSlide>
          <FadeSlide from="up">
          <div className="col-span-1 flex flex-col gap-3 items-center md:items-start">
            <div className="bg-linear-to-r from-[#558D94] to-[#07363C] rounded-2xl px-5 py-3 backdrop-blur border-2 border-[#999999] w-full md:w-auto relative">
              <h3 className="text-xl font-kaushan mb-2 text-center md:text-left">
                Personalized Care
              </h3>
              <p className="text-lg leading-5 text-gray-200 text-center md:text-left">
                Nutritional Interventions to Boost Energy and Strength During Cancer Treatment.
                </p>
              <MoveRight onClick={()=>router.push("/blogs/blog2")} size={20} className="text-white absolute top-2 right-4 animate-pulse"/>
            </div>

            <div className="overflow-hidden rounded-2xl w-full md:w-[28vw] h-52 sm:h-64 md:h-68">
              <Image
                src="/choose2.png"
                alt="Personalized Care"
                width={500}
                height={400}
                className="h-full w-full object-cover md:w-[28vw]"
              />
            </div>
            </div>
          </FadeSlide>
          <FadeSlide from="down">
          <div className="col-span-1 flex flex-col items-center md:items-start">
            <div className="overflow-hidden rounded-2xl w-full md:w-[28vw] h-52 sm:h-64 md:h-68">
              <Image
                src="/choose3.png"
                alt="Holistic Approach"
                width={500}
                height={400}
                className="h-full w-full object-cover md:w-[28vw]"
              />
            </div>

            <div className="bg-linear-to-r from-[#558D94] to-[#07363C] rounded-2xl px-5 py-3 backdrop-blur border-2 border-[#999999] w-full md:w-auto relative">
              <h3 className="text-xl font-kaushan mb-2 text-center md:text-left">
                Holistic Approach
              </h3>
              <p className="text-lg leading-5 text-gray-200 text-center md:text-left">
                Debunking Myths About Metabolism and Weight Loss Fact vs. Fiction
                </p>
              <MoveRight onClick={()=>router.push("/blogs/blog3")} size={20} className="text-white absolute top-2 right-4 animate-pulse"/>
            </div>
          </div>
          </FadeSlide>
          <FadeSlide from="down">
          <div className="col-span-1 flex flex-col items-center md:items-start">
            <div className="overflow-hidden rounded-2xl w-full md:w-[28vw] h-52 sm:h-64 md:h-68">
              <Image
                src="/choose1.png"
                alt="Expert Team"
                width={1000}
                height={1000}
                className="h-full w-full object-cover md:w-[28vw]"
              />
            </div>

            <div className="bg-linear-to-r from-[#558D94] to-[#07363C] rounded-2xl px-5 py-3 backdrop-blur border-2 border-[#999999] w-full md:w-auto relative">
              <h3 className="text-xl font-kaushan mb-2 text-center md:text-left">
                Expert Team
              </h3>
              <p className="text-lg leading-5 text-gray-200 text-center md:text-left">
                What is a Metabolic Reset? Clinical Insights You Need to Know
                </p>
              <MoveRight onClick={()=>router.push("/blogs/blog4")} size={20} className="text-white absolute top-2 right-4 animate-pulse"/>
            </div>
            </div>
          </FadeSlide>
          <FadeSlide from="up">
          <div className="col-span-1 flex flex-col gap-3 items-center md:items-start">
            <div className="bg-linear-to-r from-[#558D94] to-[#07363C] rounded-2xl px-5 py-3 backdrop-blur border-2 border-[#999999] w-full md:w-auto relative">
              <h3 className="text-xl font-kaushan mb-2 text-center md:text-left">
                Personalized Care
              </h3>
              <p className="text-lg leading-5 text-gray-200 text-center md:text-left">
                The Role of Adaptogens in Modern Nutrition: Transforming Wellness Routines
                </p>
              <MoveRight onClick={()=>router.push("/blogs/blog5")} size={20} className="text-white absolute top-2 right-4 animate-pulse"/>
            </div>

            <div className="overflow-hidden rounded-2xl w-full md:w-[28vw] h-52 sm:h-64 md:h-68">
              <Image
                src="/choose2.png"
                alt="Personalized Care"
                width={500}
                height={400}
                className="h-full w-full object-cover md:w-[28vw]"
              />
            </div>
            </div>
          </FadeSlide>
          <FadeSlide from="down">
          <div className="col-span-1 flex flex-col items-center md:items-start">
            <div className="overflow-hidden rounded-2xl w-full md:w-[28vw] h-52 sm:h-64 md:h-68">
              <Image
                src="/choose3.png"
                alt="Holistic Approach"
                width={500}
                height={400}
                className="h-full w-full object-cover md:w-[28vw]"
              />
            </div>

            <div className="bg-linear-to-r from-[#558D94] to-[#07363C] rounded-2xl px-5 py-3 backdrop-blur border-2 border-[#999999] w-full md:w-auto relative">
              <h3 className="text-xl font-kaushan mb-2 text-center md:text-left">
                Holistic Approach
              </h3>
              <p className="text-lg leading-5 text-gray-200 text-center md:text-left">
                Gut Health and Its Connection to Overall Wellness
                </p>
                <MoveRight onClick={()=>router.push("/blogs/blog6")} size={20} className="text-white absolute top-2 right-4 animate-pulse"/>
            </div>
          </div>
          </FadeSlide>
          <FadeSlide from="down">
          <div className="col-span-1 flex flex-col items-center md:items-start">
            <div className="overflow-hidden rounded-2xl w-full md:w-[28vw] h-52 sm:h-64 md:h-68">
              <Image
                src="/choose3.png"
                alt="Holistic Approach"
                width={500}
                height={400}
                className="h-full w-full object-cover md:w-[28vw]"
              />
            </div>

            <div className="bg-linear-to-r from-[#558D94] to-[#07363C] rounded-2xl px-5 py-3 backdrop-blur border-2 border-[#999999] w-full md:w-auto relative">
              <h3 className="text-xl font-kaushan mb-2 text-center md:text-left">
                Holistic Approach
              </h3>
              <p className="text-lg leading-5 text-gray-200 text-center md:text-left">
                The Power of Personalized Nutrition: Is One Size Fit All?
                </p>
                <MoveRight onClick={()=>router.push("/blogs/blog7")} size={20} className="text-white absolute top-2 right-4 animate-pulse"/>
            </div>
          </div>
          </FadeSlide>
        </div>
      </div>
    </section>
  );
}
