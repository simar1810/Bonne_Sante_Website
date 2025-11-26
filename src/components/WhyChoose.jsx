import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section id="blogs" className="w-full flex justify-center py-18 px-4">
      <div
        className="w-full max-w-[1400px] bg-[#0E3D3F] rounded-3xl p-10 relative text-white shadow-lg 
        border border-white/10 bg-cover bg-center"
        style={{ backgroundImage: "url('/chooseUsbg.png')" }}
      >
        <h2 className="text-center text-3xl md:text-4xl font-kaushan italic mb-10">
          Why Choose us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 w-full">
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

            <div className="bg-linear-to-r from-[#558D94] to-[#07363C] rounded-2xl px-5 py-3 backdrop-blur border-2 border-[#999999] w-full md:w-auto">
              <h3 className="text-xl font-kaushan mb-2 text-center md:text-left">
                Expert Team
              </h3>
              <p className="text-lg leading-5 text-gray-200 text-center md:text-left">
                Certified dietitians and health coaches dedicated to your success.
              </p>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-3 items-center md:items-start">
            <div className="bg-linear-to-r from-[#558D94] to-[#07363C] rounded-2xl px-5 py-3 backdrop-blur border-2 border-[#999999] w-full md:w-auto">
              <h3 className="text-xl font-kaushan mb-2 text-center md:text-left">
                Personalized Care
              </h3>
              <p className="text-lg leading-5 text-gray-200 text-center md:text-left">
                Every service is tailored to your unique needs.
              </p>
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

            <div className="bg-linear-to-r from-[#558D94] to-[#07363C] rounded-2xl px-5 py-3 backdrop-blur border-2 border-[#999999] w-full md:w-auto">
              <h3 className="text-xl font-kaushan mb-2 text-center md:text-left">
                Holistic Approach
              </h3>
              <p className="text-lg leading-5 text-gray-200 text-center md:text-left">
                Addressing diet, behavior, and lifestyle for lasting results.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
