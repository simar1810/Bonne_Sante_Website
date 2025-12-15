import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return <section className="w-full min-h-screen bg-[url('/contactbg.png')] bg-cover flex justify-center items-center py-16 px-6 md:px-12 ">
    <div className="flex flex-col xl:flex-row justify-between items-center h-full text-white gap-8 xl:gap-20">
      <div className="xl:min-w-1/2 flex flex-col items-center xl:items-start xl:pl-6 md:mt-40 xl:mt-0 text-center xl:text-left">
        <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-4xl font-bold mb-5">Download The <br /> <span className="text-4xl md:text-6xl lg:text-7xl xl:text-6xl">Bonne Sante App</span></h1>
        <p className="text-sm md:text-xl lg:text-3xl xl:text-xl mb-5 opacity-70 ">Begin your journey Towards Making People Healthy</p>
        <div className="flex justify-between items-center gap-5 mb-5">
          <Link href="https://play.google.com/store/apps/details?id=com.wellnessz.banne&pcampaignid=web_share" target="_blank">
            <Image src="/playstore.png" alt="Google Store" width={500} height={400} className="cursor-pointer w-30 md:w-[10vw]" />
          </Link>
          {/* <Link href="https://apps.apple.com/us/app/wellnessz/id6478812964" target="_blank">
            <Image src="/appStore.png" alt="App Store" width={500} height={400} className="cursor-pointer w-30 md:w-[10vw]" />
          </Link> */}
        </div>
      </div>

      <div className="flex justify-center items-center mr-2 md:mr-12">
        <Image
          src="/mockup.png"
          alt="SWC App Screens"
          width={900}
          height={900}
          className="w-full self-center lg:max-w-4xl xl:w-lg 2xl:max-w-3xl object-contain" />
      </div>
    </div>
  </section>
}