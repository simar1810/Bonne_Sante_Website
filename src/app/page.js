import AboutSection from "@/components/AboutSection";
import ContactUs from "@/components/ContactUs";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import WhyChoose from "@/components/WhyChoose";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <AboutSection />
      <Services />
      <WhyChoose />
      <ContactUs />
      <Footer/>
    </div>
  );
}
