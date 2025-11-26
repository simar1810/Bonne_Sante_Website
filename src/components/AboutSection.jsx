import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="w-full flex justify-between py-10 px-4 sm:px-8 md:px-10 bg-white">
      <div className="w-full flex flex-col md:flex-row items-center justify-between relative gap-6 md:gap-0">

        <Image
          src="/yoga1.png"
          alt="Meditation"
          width={500}
          height={400}
          className="w-64 sm:w-80 md:w-[400px] h-auto md:h-full object-cover"
        />

        <div className="text-center max-w-xl px-4 md:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0D3B3C] mb-4">
            At <span className="font-kaushan italic">Bonne Sante</span>
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-[#0D3B3C] leading-7 font-medium">
            we believe that true health is about more than just diet; it’s about a holistic approach to wellness.
          </p>
        </div>

        <Image
          src="/yoga2.png"
          alt="Meditation"
          width={500}
          height={400}
          className="w-64 sm:w-80 md:w-[400px] h-auto md:h-full object-cover"
        />
      </div>
    </section>
  );
}
