import { NextResponse } from "next/server";

// Knowledge base from website content
const knowledgeBase = {
  about: {
    description: "Bonne Sante is a wellness and nutrition platform that believes true health is about more than just diet; it's about a holistic approach to wellness. We provide evidence-based, personalized dietary strategies designed to support your health goals.",
    approach: "We use a science-driven approach with advanced assessments to understand your specific nutritional needs. Our holistic wellness solutions address lifestyle factors like hydration, physical activity, stress management, and sleep."
  },
  services: [
    "Personalized Meal Plans - Custom meal plans that are nutritious, delicious, and designed to meet your health goals",
    "Nutritional Counseling - One-on-one support from registered dietitians and health professionals",
    "Behavioral and Lifestyle Coaching - Guidance to help you make sustainable lifestyle changes",
    "Weight Management - Programs to help you achieve and maintain a healthy weight",
    "Sports Nutrition Programs - Nutrition plans to boost athletic performance",
    "Medical Nutrition Programs - Specialized nutrition support for medical conditions",
    "Family Wellness - Comprehensive wellness programs for the whole family",
    "Genetic Nutrition Program - Personalized plans based on your genetic profile",
    "Diabetes Management Programme - Specialized support for diabetes management",
    "Heart Disease Support Programme - Nutrition plans to support heart health",
    "Cancer Nutrition Support Programme - Nutritional support during cancer treatment",
    "Kidney Health Nutrition Programme - Specialized nutrition for kidney health",
    "Liver Health Nutrition Programme - Nutrition plans to support liver function",
    "Gastrointestinal (GI) Nutrition Programme - Support for digestive health",
    "School Nutrition Programme - Nutrition programs for educational institutions",
    "Corporate Nutrition Programme - Workplace wellness and nutrition programs",
    "Community Nutrition Programme - Community-based nutrition initiatives",
    "Wedding Bells Nutrition Programme - Special nutrition plans for weddings",
    "Family Diet Package - Comprehensive family nutrition packages",
    "Healthy Restaurant Kitchen Setup Programme - Support for restaurants",
    "Lifestyle Coaching - Comprehensive lifestyle transformation programs",
    "Customized Diet Plan - Tailored diet plans for your specific needs",
    "Personalized Diet Chart - Individualized diet charts based on your requirements"
  ],
  benefits: [
    "Customized to your lifestyle and preferences",
    "Evidence-based nutritional guidance",
    "Flexible meal options that fit your schedule",
    "Ongoing support and adjustments",
    "Science-driven approach rooted in latest research",
    "Expert guidance from registered dietitians",
    "Holistic wellness solutions"
  ]
};

// Fallback response generator
function generateFallbackResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  // Greetings
  if (message.match(/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/)) {
    return "Hello! I'm here to help you learn about Bonne Sante's wellness and nutrition services. How can I assist you today?";
  }
  
  // Services queries
  if (message.match(/\b(service|services|what do you offer|what can you do|programs|programmes)\b/)) {
    return `We offer a comprehensive range of wellness and nutrition services including:\n\n${knowledgeBase.services.slice(0, 10).join('\n')}\n\n...and many more! You can visit our services page to see all available programs. Would you like to know more about any specific service?`;
  }
  
  // Meal plans
  if (message.match(/\b(meal plan|meal plans|diet plan|diet chart|personalized meal|custom meal)\b/)) {
    return "We create personalized meal plans that are nutritious, delicious, and designed to meet your health goals. Our meal plans are:\n\n• Customized to your lifestyle and preferences\n• Evidence-based with nutritional guidance\n• Flexible to fit your schedule\n• Include ongoing support and adjustments\n\nWould you like to create a personalized meal plan?";
  }
  
  // Weight management
  if (message.match(/\b(weight|lose weight|weight loss|weight management|obesity|overweight)\b/)) {
    return "We offer comprehensive Weight Management programs designed to help you achieve and maintain a healthy weight. Our approach combines personalized nutrition plans, lifestyle coaching, and ongoing support to help you reach your goals sustainably.";
  }
  
  // Diabetes
  if (message.match(/\b(diabetes|diabetic|blood sugar|glucose|insulin)\b/)) {
    return "Our Diabetes Management Programme provides specialized nutrition support for managing diabetes. We create personalized meal plans that help regulate blood sugar levels while ensuring you get all the nutrients you need. Our approach is evidence-based and tailored to your specific needs.";
  }
  
  // Heart health
  if (message.match(/\b(heart|cardiac|cardiovascular|cholesterol|blood pressure|hypertension)\b/)) {
    return "Our Heart Disease Support Programme offers specialized nutrition plans to support heart health. We focus on heart-healthy eating patterns, managing cholesterol, and supporting overall cardiovascular wellness through personalized dietary strategies.";
  }
  
  // Cancer
  if (message.match(/\b(cancer|oncology|chemotherapy|treatment|tumor)\b/)) {
    return "Our Cancer Nutrition Support Programme provides specialized nutritional support during cancer treatment. We help manage treatment side effects, maintain energy levels, preserve muscle strength, and support overall well-being through evidence-based nutritional strategies.";
  }
  
  // Sports/Fitness
  if (message.match(/\b(sports|athlete|athletic|fitness|performance|training|exercise)\b/)) {
    return "Our Sports Nutrition Programs are designed to boost athletic performance. We create nutrition plans tailored to your training schedule, performance goals, and recovery needs. Whether you're a professional athlete or fitness enthusiast, we can help optimize your nutrition.";
  }
  
  // Family
  if (message.match(/\b(family|children|kids|child|parent|parents)\b/)) {
    return "We offer Family Wellness programs and Family Diet Packages designed to support the nutritional needs of your entire family. Our programs can be customized for different age groups and dietary preferences within your household.";
  }
  
  // Pricing
  if (message.match(/\b(price|pricing|cost|fee|fees|how much|expensive|affordable)\b/)) {
    return "For detailed pricing information and to find the best program for your needs, I recommend contacting us directly or visiting our services page. We offer various programs to suit different budgets and requirements.";
  }
  
  // Booking/Consultation
  if (message.match(/\b(book|booking|consultation|appointment|schedule|meet|contact)\b/)) {
    return "You can book a consultation or get started with any of our services by visiting our services page and clicking on the service you're interested in. Each service has a form where you can provide your details and we'll get back to you soon!";
  }
  
  // About/Company
  if (message.match(/\b(about|who are you|what is bonne sante|company|organization)\b/)) {
    return `${knowledgeBase.about.description}\n\n${knowledgeBase.about.approach}\n\nWe believe in a holistic approach that considers your entire lifestyle, not just what you eat. Would you like to know more about our services?`;
  }
  
  // Benefits/Why choose
  if (message.match(/\b(why|benefit|benefits|advantage|advantages|why choose|what makes you different)\b/)) {
    return `Here's what makes Bonne Sante special:\n\n${knowledgeBase.benefits.join('\n')}\n\nWe combine cutting-edge research with personalized care to help you achieve optimal health outcomes.`;
  }
  
  // Nutrition/Health general
  if (message.match(/\b(nutrition|nutritional|healthy|health|wellness|wellbeing|diet|food)\b/)) {
    return "At Bonne Sante, we provide comprehensive nutrition and wellness services. Our approach is holistic, evidence-based, and personalized to your unique needs. We offer everything from personalized meal plans to specialized medical nutrition programs. What specific aspect of nutrition or wellness would you like to learn more about?";
  }
  
  // Default response
  return "Thank you for your question! At Bonne Sante, we offer a wide range of personalized nutrition and wellness services. We can help with meal planning, weight management, medical nutrition support, sports nutrition, family wellness, and much more. Could you tell me more specifically what you're looking for? You can also visit our services page to explore all our offerings.";
}

// Helper function to get OpenAI client (only if API key is available)
async function getOpenAIClient() {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return null;
  }

  try {
    const { default: OpenAI } = await import("openai");
    return new OpenAI({
      apiKey: apiKey,
    });
  } catch (error) {
    console.warn("OpenAI package not available, using fallback responses:", error.message);
    return null;
  }
}

export async function POST(req) {
  let message = "";
  
  try {
    const body = await req.json();
    message = body.message || "";
    const history = body.history || [];

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Try to use OpenAI if available, otherwise use fallback
    const openai = await getOpenAIClient();
    
    if (openai) {
      try {
        const messages = [
          {
            role: "system",
            content:
              "You are a professional wellness and fitness assistant for Bonne Sante. Keep responses friendly, safe, concise, and helpful. Focus on nutrition, wellness, and the services offered by Bonne Sante.",
          },
          ...history,
          {
            role: "user",
            content: message,
          },
        ];

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages,
          temperature: 0.6,
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({
          success: true,
          reply,
        });
      } catch (openaiError) {
        console.error("OpenAI API Error:", openaiError);
        // Fall through to fallback response
      }
    }

    // Fallback response using knowledge base
    const reply = generateFallbackResponse(message);

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    // Even on error, provide a helpful fallback response
    const fallbackReply = generateFallbackResponse(message || "hello");

    return NextResponse.json({
      success: true,
      reply: fallbackReply,
    });
  }
}
