import AboutSection from "@/components/AboutSection";
import ContactUs from "@/components/ContactUs";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import WhyChoose from "@/components/WhyChoose";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="">
      <Toaster />
      <HeroSection />
      <AboutSection />
      <Services />
      <WhyChoose />
      <ContactUs />
      <Footer/>
    </div>
  );
}
