"use client";
import { X, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import toast from "react-hot-toast";

export default function MealPlanForm({ open, setOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    last: "",
    email: "",
    phone: "",
    contactMethod: [],
    goals: [],
    medicalCondition: "",
    dietType: [],
    foodDislike: [],
    foodLove: "",
    mealsPerDay: [],
    cookAtHome: [],
    foodAllergies: [],
    medicalAdjustments: [],
    activityLevel: [],
    fitnessGoals: [],
    additionalInfo: "",
    serviceSelection: "",
    agreeMedicalDisclaimer: false,
  });

  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckbox = (key, value) => {
    let arr = [...formData[key]];
    arr.includes(value)
      ? (arr = arr.filter((i) => i !== value))
      : arr.push(value);

    handleChange(key, arr);
  };


  const validateForm = () => {
    if (!formData.name.trim()) return "First name is required";
    if (!formData.last.trim()) return "Last name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Invalid email format";
    if (!formData.phone.trim()) return "Phone number is required";
    if (!/^\d{10}$/.test(formData.phone))
      return "Phone number must be 10 digits";

    if (formData.contactMethod.length === 0)
      return "Select at least 1 contact method";

    if (formData.goals.length === 0) return "Select at least 1 primary goal";

    if (!formData.serviceSelection)
      return "Select a service plan duration";

    if (!formData.agreeMedicalDisclaimer)
      return "You must agree to the disclaimer";

    return null;
  };
 useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!scriptLoaded) return toast.error("Payment gateway still loading, please wait a second");
    const error = validateForm();

    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {
      let amount = 499;
      await registerUser({ name: formData.name, email:formData.email, phoneNumber:formData.phone, reason:"Meal Plan" });
      const order = await createOrder({amount});
      await openRazorpay({ order, name: formData.name, email:formData.email, phoneNumber:formData.phone, amount });
    } catch (err) {
      console.error(err);
      toast.error("Error initiating payment. Please try again.");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center sm:p-4">
        <div className="bg-white w-[85vw] md:max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl p-5 sm:p-8 shadow-xl relative border border-gray-200">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 bg-white border border-gray-300 rounded-full p-2 shadow-sm active:scale-90"
          >
            <X size={20} className="text-gray-700" />
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#0C3C3E]">Personalized Meal Plan</h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Tell us about your lifestyle so we can craft the perfect plan.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8 mt-6">
            <div>
              <h3 className="text-lg font-semibold text-[#667475] mb-3">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatingInput
                  label="First Name"
                  value={formData.name}
                  onChange={(v) => handleChange("name", v)}
                />
                <FloatingInput
                  label="Last Name"
                  value={formData.last}
                  onChange={(v) => handleChange("last", v)}
                />
              </div>

              <div className="mt-4 space-y-4">
                <FloatingInput
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(v) => handleChange("email", v)}
                />
                <FloatingInput
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(v) => handleChange("phone", v)}
                />
              </div>
            </div>

            <CheckboxGroup
              title="Preferred Method of Contact"
              options={["Email", "Phone", "WhatsApp"]}
              selected={formData.contactMethod}
              onToggle={(v) => handleCheckbox("contactMethod", v)}
            />

            <CheckboxGroup
              title="Primary Goals"
              options={[
                "Weight Loss",
                "Muscle Gain",
                "Energy Boost",
                "Medical Support",
                "Healthy Eating",
              ]}
              selected={formData.goals}
              onToggle={(v) => handleCheckbox("goals", v)}
            />

            <FloatingTextarea
              label="If managing a medical condition, please provide details:"
              value={formData.medicalCondition}
              onChange={(v) => handleChange("medicalCondition", v)}
            />

            <CheckboxGroup
              title="Specific Diet / Eating Style"
              options={["Veg", "Vegan", "Keto", "Low Carb", "High Protein", "None"]}
              selected={formData.dietType}
              onToggle={(v) => handleCheckbox("dietType", v)}
            />

            <CheckboxGroup
              title="Foods You Dislike or Avoid"
              options={["Dairy", "Gluten", "Spicy", "Sugar", "Oil", "None"]}
              selected={formData.foodDislike}
              onToggle={(v) => handleCheckbox("foodDislike", v)}
            />

            <FloatingInput
              label="Foods You Absolutely Love"
              value={formData.foodLove}
              onChange={(v) => handleChange("foodLove", v)}
            />

            <CheckboxGroup
              title="Meals Per Day"
              options={["2 meals", "3 meals", "4 meals", "More"]}
              selected={formData.mealsPerDay}
              onToggle={(v) => handleCheckbox("mealsPerDay", v)}
            />

            <CheckboxGroup
              title="Do You Cook at Home?"
              options={["Yes", "No", "Sometimes"]}
              selected={formData.cookAtHome}
              onToggle={(v) => handleCheckbox("cookAtHome", v)}
            />

            <CheckboxGroup
              title="Food Allergies or Sensitivities"
              options={["Dairy", "Gluten", "Peanuts", "Soy", "Seafood", "None"]}
              selected={formData.foodAllergies}
              onToggle={(v) => handleCheckbox("foodAllergies", v)}
            />

            <CheckboxGroup
              title="Medical Conditions Requiring Diet Adjustments"
              options={["Diabetes", "Thyroid", "PCOD/PCOS", "Hypertension", "None"]}
              selected={formData.medicalAdjustments}
              onToggle={(v) => handleCheckbox("medicalAdjustments", v)}
            />

            <CheckboxGroup
              title="How Would You Describe Your Activity Level?"
              options={["Sedentary", "Light", "Moderate", "Active", "Very Active"]}
              selected={formData.activityLevel}
              onToggle={(v) => handleCheckbox("activityLevel", v)}
            />

            <CheckboxGroup
              title="Do You Have Specific Fitness Goals?"
              options={[
                "Fat Loss",
                "Muscle Gain",
                "Tone Up",
                "Improve Endurance",
                "General Fitness",
              ]}
              selected={formData.fitnessGoals}
              onToggle={(v) => handleCheckbox("fitnessGoals", v)}
            />

            <FloatingTextarea
              label="Additional Information"
              value={formData.additionalInfo}
              onChange={(v) => handleChange("additionalInfo", v)}
            />

            <div>
              <h3 className="text-lg font-semibold text-[#0C3C3E] mb-2">
                Service Selection
              </h3>

              <div className="flex flex-col gap-2">
                {["1-Month Plan", "3-Month Plan", "6-Month Plan"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="serviceSelection"
                      value={opt}
                      checked={formData.serviceSelection === opt}
                      onChange={(e) =>
                        handleChange("serviceSelection", e.target.value)
                      }
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={formData.agreeMedicalDisclaimer}
                onChange={(e) =>
                  handleChange("agreeMedicalDisclaimer", e.target.checked)
                }
                className="mt-1 w-4 h-4 accent-[#0C3C3E]"
              />
              <span>
                By submitting this form, I agree to receive a personalized meal plan based on the
                information provided. This is not a substitute for medical advice.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0C3C3E] text-white rounded-xl text-lg font-semibold hover:bg-[#0C3C3Ed2] transition-all shadow-sm active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>

      {successOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
          <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-sm">
            <CheckCircle className="text-green-600 mx-auto" size={60} />
            <h2 className="text-xl font-bold mt-4">Form Submitted Successfully!</h2>
            <p className="text-gray-600 mt-2">
              Thank you! We will get back to you shortly.
            </p>

            <button
              onClick={() => setSuccessOpen(false)}
              className="mt-5 px-5 py-2 bg-[#0C3C3E] text-white rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function FloatingInput({ label, value, onChange, type = "text" }) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-[#0C3C3E] focus:border-[#0C3C3E] outline-none"
      />
      <label className="absolute left-4 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white">
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, value, onChange }) {
  return (
    <div className="relative w-full">
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-[#0C3C3E] outline-none"
      />
      <label className="absolute left-4 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-white">
        {label}
      </label>
    </div>
  );
}

function CheckboxGroup({ title, options, selected, onToggle }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-[#0C3C3E] mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-full cursor-pointer text-xs sm:text-sm hover:border-[#0C3C3E]"
          >
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => onToggle(opt)}
              className="accent-[#0C3C3E] w-4 h-4"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
