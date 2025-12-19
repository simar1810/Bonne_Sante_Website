"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import Image from "next/image";
import NavbarBlogs from "@/components/NavbarBlogs";
import Footer from "@/components/Footer";

const blogData = [
  {
    id: 1,
    image: "/blog1_img2.jpg",
    title: "PCOS Care with Nutrition & Fitness",
    description: "Support your PCOS journey with easy nutrition tips and smart fitness habits that help restore balance.",
    link: "/blogs/blog1",
    category: "Women's Health",
    readTime: "5 min read"
  },
  {
    id: 2,
    image: "/blog2_img1.jpg",
    title: "Nutrition for Energy During Cancer Care",
    description: "Learn how the right foods can support your energy levels and keep your body strong throughout cancer care.",
    link: "/blogs/blog2",
    category: "Oncology",
    readTime: "7 min read"
  },
  {
    id: 3,
    image: "/blog3_img1.jpg",
    title: "Metabolism & Weight Loss: Myths vs. Facts",
    description: "Clear the confusion with simple, science-backed facts about metabolism and weight loss.",
    link: "/blogs/blog3",
    category: "Weight Loss",
    readTime: "6 min read"
  },
  {
    id: 4,
    image: "/blog4_img2.jpg",
    title: "Metabolic Reset: What You Really Need to Know",
    description: "A metabolic reset helps restore your body's energy balance through simple nutrition and lifestyle shifts.",
    link: "/blogs/blog4",
    category: "Metabolism",
    readTime: "8 min read"
  },
  {
    id: 5,
    image: "/blog5_img1.jpg",
    title: "Adaptogens in Modern Nutrition",
    description: "Learn how adaptogens help reduce stress, boost energy, and support everyday wellness.",
    link: "/blogs/blog5",
    category: "Wellness",
    readTime: "5 min read"
  },
  {
    id: 6,
    image: "/blog6_img1.png",
    title: "Gut Health & Total Wellness",
    description: "Discover how a healthy gut influences overall wellness, from digestion to immunity and mental well-being.",
    link: "/blogs/blog6",
    category: "Gut Health",
    readTime: "6 min read"
  }
];

function BlogCard({ blog, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-500">
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#558D94]/20 to-transparent rounded-bl-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0`}>
          <div className="relative lg:w-2/5 h-64 lg:h-auto overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="w-full md:my-3 md:mx-4"
            >
              <div className="overflow-hidden rounded-2xl  h-68">
              <Image width={500} height={300}
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
                />
                </div>
            </motion.div>
            
            <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent via-transparent to-white/30`} />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="absolute top-2 left-2 md:top-6 md:left-6 px-4 py-2 bg-[#0E3D3F]/90 backdrop-blur-md rounded-full"
            >
              <span className="text-white text-xs  font-medium flex items-center gap-1">
                <Sparkles size={12} />
                {blog.category}
              </span>
            </motion.div>
          </div>

          <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 20 }}
              className="absolute -top-4 -right-4 lg:top-8 lg:-right-4 w-16 h-16 bg-gradient-to-br from-[#558D94] to-[#0E3D3F] rounded-full flex items-center justify-center shadow-xl"
            >
              <span className="text-white font-bold text-xl">0{blog.id}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Clock size={14} />
                <span>{blog.readTime}</span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-kaushan text-[#0E3D3F] mb-4 leading-tight">
                {blog.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {blog.description}
              </p>

              <motion.button
                onClick={() => window.location.href = blog.link}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#558D94] to-[#0E3D3F] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all group/btn"
              >
                <span>Read Article</span>
                <ArrowRight 
                  size={18} 
                  className="transition-transform group-hover/btn:translate-x-1" 
                />
              </motion.button>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#558D94]/50 transition-all duration-500 pointer-events-none"
        />
      </div>
    </motion.div>
  );
}

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
      className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#558D94]/10 to-[#0E3D3F]/10 blur-xl"
    />
  );
}

export default function BlogsPage() {
  const containerRef = useRef(null);

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
              <div className="px-6 py-2 bg-gradient-to-r from-[#558D94]/20 to-[#0E3D3F]/20 rounded-full border border-[#558D94]/30">
                <span className="text-[#0E3D3F] font-medium">Latest Insights</span>
              </div>
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-kaushan text-[#0E3D3F] mb-6">
              Our Blog
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore evidence-based insights on nutrition, wellness, and holistic health
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-32 h-1 bg-gradient-to-r from-transparent via-[#558D94] to-transparent mx-auto mt-8"
            />
          </motion.div>
        </div>

        <div ref={containerRef} className="max-w-[1400px] mx-auto px-4 space-y-12">
          {blogData.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>
      </div>
      <div className="bg-[#07363C] w-full mt-20">
        <Footer landing={false} />
      </div>
    </div>
  );
}