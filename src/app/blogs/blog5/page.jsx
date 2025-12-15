"use client";
import React from "react";
import Image from "next/image";
import NavbarBlogs from "@/components/NavbarBlogs";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
export default function Page() {
  return (
    <div className="min-h-screen bg-white pt-5">
        <div className="mb-4 max-w-6xl mx-auto">
          <NavbarBlogs/>
        </div>
      <div className="bg-[#07363C] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
         <Link href="/" className="flex text-white items-center justify-start gap-3 mb-5">
            <MoveLeft size={30} className="" /> 
            <p>Back</p>
          </Link> 
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The Role of Adaptogens in Modern Nutrition: Transforming Wellness Routines
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed">
            Adaptogens are increasingly recognized in modern nutrition for their potential to enhance wellness routines by promoting resilience to stress and improving overall health. These herbal supplements are classified as adaptogens due to their ability to help the body adapt to various stressors, both physical and psychological, thereby supporting homeostasis and enhancing physical and mental performance (Lee et al., 2016; Oliynyk & Oh, 2013).
          </p>
          <p className="text-lg text-gray-200 leading-relaxed mt-4">
            At Bonne Sante, we recognize how adaptogens are transforming traditional health routines by offering natural solutions to enhance well-being. Let&apos;s explore how adaptogens are reshaping our approach to nutrition and promoting holistic health.
          </p>
          <Image src="/blog5_img1.jpg" alt="img1" width={500} height={500} className="pt-6 rounded-2xl w-full h-[200px] md:h-[350px]"/>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* What Are Adaptogens */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#07363C] mb-6">What Are Adaptogens?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Adaptogens are natural substances, primarily herbs and roots, that help the body adapt to stress, restore balance (homeostasis), and enhance resilience. By targeting the adrenal system, adaptogens regulate hormones, support energy levels, and improve overall well-being. Unlike conventional stimulants, adaptogens work holistically to strengthen the body&apos;s response to both physical and emotional stress.
          </p>
          
          <h3 className="text-xl font-semibold text-[#07363C] mb-4">Key Bioactive Components in Adaptogens</h3>
 
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="border-l-4 border-[#07363C] pl-4">
              <p className="text-gray-700"><span className="font-semibold">Polysaccharides</span> – Found in reishi and cordyceps, they boost immune function and promote cellular health.</p>
            </div>
            <div className="border-l-4 border-[#07363C] pl-4">
              <p className="text-gray-700"><span className="font-semibold">Triterpenoids</span> – Present in ashwagandha and ginseng, they possess anti-inflammatory and cortisol-regulating properties.</p>
            </div>
            <div className="border-l-4 border-[#07363C] pl-4">
              <p className="text-gray-700"><span className="font-semibold">Flavonoids</span> – Found in holy basil and rhodiola, they act as powerful antioxidants, protecting the body from oxidative stress.</p>
            </div>
            <div className="border-l-4 border-[#07363C] pl-4">
              <p className="text-gray-700"><span className="font-semibold">Saponins</span> – Commonly present in ginseng and licorice root, saponins support adrenal health and hormonal balance.</p>
            </div>
            </div>
            <Image src="/blog5_img2.jpg" alt="img1" width={500} height={500} className="pt-4 rounded-2xl h-[200px] md:h-[350px]" />
          </div>

        </section>

        {/* How Adaptogens Transform Wellness */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#07363C] mb-8">How Adaptogens Are Transforming Modern Wellness</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-[#07363C] mb-3">1. Stress Management and Cortisol Regulation</h3>
              <p className="text-gray-700 leading-relaxed">
                In today&apos;s fast-paced life, chronic stress is a common issue. Adaptogens like ashwagandha and rhodiola rosea help regulate cortisol levels, the hormone responsible for stress responses. By modulating cortisol, these herbs reduce feelings of anxiety, fatigue, and mental fog, promoting a state of calm and balance.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#07363C] mb-3">2. Energy and Stamina Enhancement</h3>
              <p className="text-gray-700 leading-relaxed">
                Adaptogens such as ginseng and cordyceps offer a natural boost in energy without the jittery effects of caffeine. They enhance mitochondrial function—boosting energy production at the cellular level—and reduce feelings of burnout, making them excellent for combating fatigue.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#07363C] mb-3">3. Immune Support</h3>
              <p className="text-gray-700 leading-relaxed">
                Adaptogens like reishi and holy basil strengthen the immune system by enhancing white blood cell activity and reducing inflammation. They are especially useful during seasonal changes or periods of high stress when the immune system is most vulnerable.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#07363C] mb-3">4. Cognitive Function and Mental Clarity</h3>
              <p className="text-gray-700 leading-relaxed">
                Adaptogens like bacopa monnieri and ginkgo biloba are recognized for their neuroprotective effects. They enhance cognitive function, memory, and focus by increasing blood flow to the brain and reducing oxidative stress, helping you stay sharp and alert.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#07363C] mb-3">5. Hormonal Balance</h3>
              <p className="text-gray-700 leading-relaxed">
                Adaptogens such as maca root and schisandra berry are particularly beneficial for hormonal balance. They help manage PMS, menopause symptoms, and adrenal fatigue, supporting long-term endocrine health.
              </p>
            </div>
          </div>
        </section>

        {/* Scientific Backing */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-[#07363C] mb-6">Scientific Backing: Why Adaptogens Work</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Modern research highlights the adaptogenic properties of herbs like ashwagandha and ginseng:
          </p>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-[#07363C]">Ginseng:</span> Particularly Panax ginseng, it contains bioactive compounds known as ginsenosides, responsible for its anti-inflammatory, antioxidative, and immunomodulatory properties (Uluişik & Keskin, 2016; Liang et al., 2019). Research indicates that ginseng can improve immune function and reduce inflammation, making it beneficial for conditions such as ulcerative colitis and other gastrointestinal disorders (Wang et al., 2021; You, 2024). It has also been shown to enhance cognitive function and physical performance (Oliynyk & Oh, 2013; Lee et al., 2016).
              </p>
            </div>
            
            <div>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-[#07363C]">Ashwagandha:</span> Known for its ability to lower cortisol levels, ashwagandha effectively mitigates stress-related symptoms and enhances resilience against daily stressors (Shamli, 2024). Studies demonstrate its benefits in improving mood, sleep quality, and overall mental clarity.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Adaptogens */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#07363C] mb-8">Popular Adaptogens in Modern Nutrition</h2>
          
          <div className="space-y-10">
            {/* Ashwagandha */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-2xl font-semibold text-[#07363C] mb-4">1. Ashwagandha (Withania somnifera)</h3>
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">Key Benefits:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Reduces stress and anxiety by lowering cortisol levels</li>
                  <li>Enhances mental clarity and cognitive function</li>
                  <li>Boosts energy and endurance</li>
                  <li>Supports hormonal balance, especially during periods of adrenal fatigue or PMS</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-2">How to Use:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Can be consumed as a powder mixed in water, milk, or smoothies.</li>
                  <li>Ashwagandha supplements (capsules, tablets) are also popular for convenience.</li>
                </ul>
              </div>
              <Image src="/blog5_img3.jpg" alt="img1" width={500} height={500} className="pt-4 rounded-2xl h-[200px] md:h-[350px]" />
            </div>

            {/* Rhodiola */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-2xl font-semibold text-[#07363C] mb-4">2. Rhodiola Rosea</h3>
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">Key Benefits:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Improves mental clarity, reduces fatigue, and boosts energy</li>
                  <li>Supports mood enhancement and reduces symptoms of anxiety and depression</li>
                  <li>Enhances endurance and physical performance</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-2">How to Use:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Rhodiola supplements (capsules or tinctures) are the most common form.</li>
                  <li>Can also be brewed into teas or mixed into smoothies.</li>
                </ul>
              </div>
              <Image src="/blog5_img4.jpg" alt="img1" width={500} height={500} className="pt-4 rounded-2xl h-[200px] md:h-[350px]" />
            </div>

            {/* Reishi */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-2xl font-semibold text-[#07363C] mb-4">3. Reishi Mushroom (Ganoderma lucidum)</h3>
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">Key Benefits:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Strengthens immune function and reduces inflammation</li>
                  <li>Improves sleep quality and supports relaxation</li>
                  <li>Enhances overall well-being and vitality.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-2">How to Use:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Reishi can be taken as a powder in hot water (as tea) or in supplement form (capsules or tinctures).</li>
                  <li>Also found in mushroom-based extracts and functional foods.</li>
                </ul>
              </div>
              <Image src="/blog5_img5.jpg" alt="img1" width={500} height={500} className="pt-4 rounded-2xl h-[200px] md:h-[350px]" />
            </div>

            {/* Holy Basil */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-2xl font-semibold text-[#07363C] mb-4">4. Holy Basil (Tulsi)</h3>
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">Key Benefits:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Reduces stress and anxiety</li>
                  <li>Supports respiratory health and boosts immunity</li>
                  <li>Protects against oxidative stress and inflammation</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-2">How to Use:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Brewed as tea, taken as capsules, or added to smoothies or recipes.</li>
                  <li>Can also be used in traditional Ayurvedic preparations.</li>
                </ul>
              </div>
              <Image src="/blog5_img6.jpg" alt="img1" width={500} height={500} className="pt-4 rounded-2xl h-[200px] md:h-[350px]" />
            </div>

            {/* Ginseng */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-2xl font-semibold text-[#07363C] mb-4">5. Ginseng (Panax ginseng)</h3>
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">Key Benefits:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Boosts energy and physical endurance</li>
                  <li>Supports immune health and hormonal balance</li>
                  <li>Enhances cognitive function and mental clarity</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-2">How to Use:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Commonly taken as capsules, powders, or brewed teas.</li>
                  <li>Ginseng supplements are widely available in health stores.</li>
                </ul>
              </div>
              <Image src="/blog5_img7.jpg" alt="img1" width={500} height={500} className="pt-4 rounded-2xl h-[200px] md:h-[350px]" />
            </div>

            {/* Cordyceps */}
            <div>
              <h3 className="text-2xl font-semibold text-[#07363C] mb-4">6. Cordyceps</h3>
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2">Key Benefits:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Increases energy, stamina, and endurance</li>
                  <li>Supports oxygen utilization and respiratory health</li>
                  <li>Enhances athletic performance and reduces fatigue</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-2">How to Use:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Available in powder, capsules, or tinctures.</li>
                  <li>Can be brewed into teas or added to smoothies for easy consumption.</li>
                </ul>
              </div>
            </div>
            <Image src="/blog5_img8.jpg" alt="img1" width={500} height={500} className="pt-4 rounded-2xl h-[200px] md:h-[350px]" />
          </div>
        </section>

        {/* How to Incorporate */}
        <section className="mb-16 bg-[#07363C] text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6">How to Incorporate Adaptogens into Your Wellness Routine</h2>
          <div className="space-y-3">
            <p className="leading-relaxed"><span className="font-semibold">Smoothies and Juices:</span> Add powdered forms of ashwagandha, ginseng, or rhodiola to your morning smoothie.</p>
            <p className="leading-relaxed"><span className="font-semibold">Teas:</span> Brew adaptogen-rich teas for a calming ritual.</p>
            <p className="leading-relaxed"><span className="font-semibold">Capsules and Tinctures:</span> Opt for supplements for convenience and consistency.</p>
            <p className="leading-relaxed"><span className="font-semibold">Adaptogen-Infused Snacks:</span> Look for energy bars and snacks enriched with adaptogenic herbs.</p>
            <p className="leading-relaxed"><span className="font-semibold">Cooking:</span> Integrate adaptogens into soups, stews, or even desserts for a nutrient boost.</p>
            <p className="leading-relaxed"><span className="font-semibold">Ready-to-Drink Adaptogenic Beverages:</span> Many modern wellness brands offer pre-made drinks infused with adaptogens, offering convenience without sacrificing health.</p>
          </div>
          <div className="mt-6 text-sm text-gray-300 space-y-2">
            <p>Homemade hot tea from dried mushrooms in a cup on the table Homemade hot tea from dried mushrooms in a cup on the table adaptogens DRINK stock pictures, royalty-free photos & imagesCORDYCEPS Few round petri dishes featured Cordyceps Sinensis and Cordyceps powder. Glass bottle without label and some pills placed on green background. Mockup with empty label cordyceps TABLET stock pictures, royalty-free photos & images</p>
            <p>Close up of organic fresh extracted juice of Tulsi or holy basil isolated on white along with raw basil leaves. Close up of organic fresh extracted juice of Tulsi or holy basil isolated on white along with raw basil leaves. TULSI JUICE stock pictures, royalty-free photos & images</p>
          </div>
        </section>

        {/* Benefits of Long-Term Use */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#07363C] mb-6">Benefits of Long-Term Adaptogen Use</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-[#07363C] mr-3 text-xl">•</span>
              <span>Enhanced Resilience to Stress</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#07363C] mr-3 text-xl">•</span>
              <span>Boosted Immune Functions and Reduced Inflammation</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#07363C] mr-3 text-xl">•</span>
              <span>Balanced Energy Levels without Stimulants</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#07363C] mr-3 text-xl">•</span>
              <span>Improved Hormonal Balance and Overall Vitality</span>
            </li>
          </ul>
        </section>

        {/* Side Effects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#07363C] mb-6">Potential Side Effects and Precautions</h2>
          <p className="text-gray-700 leading-relaxed">
            While adaptogens are generally considered safe, individual responses can vary. Potential side effects include gastrointestinal discomfort or allergic reactions. Additionally, some adaptogens like Rhodiola rosea and Ashwagandha may interact with medications or be contraindicated during pregnancy or certain physiological states (Machín, 2023; Gerontakos et al., 2021). Consulting a healthcare professional is recommended before incorporating adaptogens into your diet, especially if you have pre-existing conditions or take other medications.
          </p>
        </section>

        {/* Choosing Quality */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#07363C] mb-6">Choosing Quality Adaptogens: What to Look For</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To reap maximum benefits, it&apos;s crucial to select high-quality adaptogens:
          </p>
          <div className="space-y-3">
            <div className="border-l-4 border-[#07363C] pl-4">
              <p className="text-gray-700"><span className="font-semibold">Organic Certification:</span> Ensures the herbs are free from harmful chemicals.</p>
            </div>
            <div className="border-l-4 border-[#07363C] pl-4">
              <p className="text-gray-700"><span className="font-semibold">Third-Party Testing:</span> Verifies potency and purity.</p>
            </div>
            <div className="border-l-4 border-[#07363C] pl-4">
              <p className="text-gray-700"><span className="font-semibold">Reputable Brands:</span> Choose trusted companies with transparent sourcing.</p>
            </div>
          </div>
        </section>

        {/* Final Thoughts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#07363C] mb-6">Final Thoughts</h2>
          <p className="text-gray-700 leading-relaxed">
            Adaptogens represent a promising area of modern nutrition, offering a range of health benefits that can help mitigate the effects of stress and improve overall well-being. By integrating these powerful herbs into your daily nutrition, you can enhance resilience, reduce stress, and achieve a balanced state of health.
          </p>
        </section>

        {/* Bonne Sante Approach */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-[#07363C] mb-6">The Bonnesante Approach to Adaptogens</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            At Bonnesante, we believe in a personalized approach to health. Our experts understand that each individual&apos;s nutritional needs are unique. We incorporate adaptogens into tailored wellness plans, ensuring you get the most suitable solutions for your health goals. Whether you&apos;re seeking stress relief, improved energy, or cognitive clarity, we guide you on how to safely and effectively use adaptogens to enhance your overall well-being.
          </p>
          
          <h3 className="text-2xl font-semibold text-[#07363C] mb-4">Why Choose Bonne Sante?</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-800 mb-1">Evidence-Based Recommendations</p>
              <p className="text-gray-700">We rely on scientific research to provide trusted guidance on adaptogenic herbs.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Personalized Wellness Plans</p>
              <p className="text-gray-700">Our experts tailor recommendations to match your unique health journey.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Safe and Effective Use</p>
              <p className="text-gray-700">We ensure you understand potential interactions and contraindications, offering advice based on your health history</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-[#07363C] text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Embrace the Power of Adaptogens Today</h2>
          <p className="text-lg leading-relaxed mb-6">
            Adaptogens are more than just a health trend—they represent a powerful way to achieve balance and resilience in today&apos;s demanding world. Whether you&apos;re looking to reduce stress, boost energy, or enhance cognitive function, adaptogens can unlock your full potential.
          </p>
          <p className="text-lg leading-relaxed">
            At Bonne Sante our personalized wellness solutions provide adaptogens in your health journey. Together, let&apos;s harness the power of nature to achieve holistic well-being.
          </p>
        </section>

       <section className="mt-16">
          <h2 className="text-3xl font-bold text-[#07363C] mb-6">References</h2>
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Al Shamli, A., Mourgan, F. H. A., Al-Yaaribi, A., & Hefny, N. E. D. A. (2024). Adaptogenic herbs as natural sources of sports performance enhancers. <em>The Open Medicinal Chemistry Journal, 21</em>, 1–18. https://doi.org/10.2174/0118741045309981240611110433
            </p>

            <p>
              Gerontakos, S., Casteleijn, D., & Wardle, J. (2020). Clinician perspectives and understanding of the adaptogenic concept: A focus group study with naturopaths and Western herbalists. <em>Integrative Medicine Research, 9</em>(2), 100433. https://doi.org/10.1016/j.imr.2020.100433
            </p>

            <p>
              Lee, H. W., Choi, J., Lee, Y. J., Kil, K. J., & Lee, M. S. (2016). Ginseng for managing menopausal women&apos;s health: A systematic review of double-blind, randomized, placebo-controlled trials. <em>Medicine, 95</em>(38), e4914. https://doi.org/10.1097/MD.0000000000004914
            </p>

            <p>
              Liang, J., Chen, L., Guo, Y.-H., Zhang, M., & Gao, Y. (2019). Simultaneous determination and analysis of major ginsenosides in wild American ginseng grown in Tennessee. <em>Chemistry & Biodiversity, 16</em>(7), e201900203. https://doi.org/10.1002/cbdv.201900203
            </p>

            <p>
              Machín, R. P., Florido, M., Chirino-Godoy, R., & López-Rios, L. (2023). Adaptogenic botanicals with emphasis on Rhodiola rosea and Withania somnifera. <em>European Journal of Medicinal Plants, 34</em>(11), 20–39. https://doi.org/10.9734/ejmp/2023/v34i111168
            </p>

            <p>
              Oliynyk, S., & Oh, S. (2013). Actoprotective effect of ginseng: Improving mental and physical performance. <em>Journal of Ginseng Research, 37</em>(2), 144–166. https://doi.org/10.1016/j.jgr.2013.04.002
            </p>

            <p>
              Uluısık, D., & Keskin, E. (2016). Hepatoprotective effects of ginseng in rats fed cholesterol-rich diet. <em>Brazilian Journal of Pharmaceutical Sciences, 44</em>, e80887. https://doi.org/10.22456/1679-9216.80887
            </p>

            <p>
              Wang, D., Shao, S., Zhang, Y., Zhao, D., & Wang, M. (2021). Insight into polysaccharides from Panax ginseng C. A. Meyer in improving intestinal inflammation: Modulating intestinal microbiota and autophagy. <em>Frontiers in Immunology, 12</em>, 683911. https://doi.org/10.3389/fimmu.2021.683911
            </p>

            <p>
              You, M., & Xu, M. (2024). Ginseng oligopeptides improve the intestinal physiology and promote the antioxidant capacity of the gut-on-a-chip model. <em>Nutrients, 16</em>(6), 845. https://doi.org/10.3390/nu16060845
            </p>
          </div>
        </section>
      </div>
        <div className="bg-[rgb(7,54,60)] py-4 text-center px-4 flex justify-around w-full">
            <div className="max-w-4xl flex items-center justify-start text-white">
                  <p>Copyright © 2025 Bonne Sante. All Rights Reserved.</p>
            </div>
        </div>
    </div>
  );
}