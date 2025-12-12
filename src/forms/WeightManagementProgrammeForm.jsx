"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const WeightManagementProgrammeForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    primaryGoal: [],
    currentWeight: "",
    targetWeight: "",
    height: "",
    targetTimeline: "",
    dailyActivity: "",
    exerciseRoutine: "",
    physicalLimitations: [],
    otherLimitation: "",
    currentDiet: "",
    otherDiet: "",
    dietaryRestrictions: [],
    otherRestriction: "",
    mealsPerDay: "",
    nutritionChallenges: [],
    trackFood: "",
    sleepHours: "",
    stressEating: "",
    motivationLevel: "",
    mealPreferences: [],
    exercisePreferences: [],
    packageSelection: "",
    payment: "",
    agreeTerms: false,
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const toggleCheckbox = (field, value) => {
    setData((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((i) => i !== value)
          : [...arr, value],
      };
    });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = "Name is required";
    if (!data.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email";
    if (!data.phone.trim()) e.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(data.phone))
      e.phone = "Enter 10 digits";
    if (!data.dob.trim()) e.dob = "Date of Birth is required";
    if (data.primaryGoal.length === 0) e.primaryGoal = "Select at least one goal";
    if (!data.currentWeight) e.currentWeight = "Enter current weight";
    if (!data.targetWeight) e.targetWeight = "Enter target weight";
    if (!data.height) e.height = "Enter height";
    if (!data.targetTimeline) e.targetTimeline = "Select target timeline";
    if (!data.dailyActivity) e.dailyActivity = "Select daily activity level";
    if (!data.exerciseRoutine.trim()) e.exerciseRoutine = "Enter exercise routine";
    if (data.physicalLimitations.length === 0) e.physicalLimitations = "Select at least one limitation";
    if (!data.currentDiet) e.currentDiet = "Select current diet type";
    if (data.dietaryRestrictions.length === 0) e.dietaryRestrictions = "Select dietary restrictions";
    if (!data.mealsPerDay) e.mealsPerDay = "Select meals per day";
    if (data.nutritionChallenges.length === 0) e.nutritionChallenges = "Select at least one challenge";
    if (!data.trackFood) e.trackFood = "Select an option";
    if (!data.sleepHours) e.sleepHours = "Select sleep hours";
    if (!data.stressEating) e.stressEating = "Select an option";
    if (!data.motivationLevel) e.motivationLevel = "Enter motivation level";
    if (data.mealPreferences.length === 0) e.mealPreferences = "Select at least one meal preference";
    if (data.exercisePreferences.length === 0) e.exercisePreferences = "Select at least one exercise preference";
    if (!data.packageSelection) e.packageSelection = "Select package";
    if (!data.agreeTerms) e.agreeTerms = "You must accept terms";

    setErrors(e);
    return Object.keys(e).length === 0;
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!scriptLoaded) return toast.error("Payment gateway still loading, please wait a second");
    if (!validate()) {
      const first = Object.values(errors)[0];
      toast.error(first || "Correct the errors.");
      return;
    }

    setLoading(true);
    try {
      let amount = 499;
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"Weight Management Programme" });
      const order = await createOrder({amount});
      await openRazorpay({ order, name: data.name, email:data.email, phoneNumber:data.phone, amount });
    } catch (err) {
      console.error(err);
      toast.error("Error initiating payment. Please try again.");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
    setData({
    name: "",
    email: "",
    phone: "",
    dob: "",
    primaryGoal: [],
    currentWeight: "",
    targetWeight: "",
    height: "",
    targetTimeline: "",
    dailyActivity: "",
    exerciseRoutine: "",
    physicalLimitations: [],
    otherLimitation: "",
    currentDiet: "",
    otherDiet: "",
    dietaryRestrictions: [],
    otherRestriction: "",
    mealsPerDay: "",
    nutritionChallenges: [],
    trackFood: "",
    sleepHours: "",
    stressEating: "",
    motivationLevel: "",
    mealPreferences: [],
    exercisePreferences: [],
    packageSelection: "",
    payment: "",
    agreeTerms: false,
  })
    setOpen(false);
  };

  const closeModal = () => {
    setOpen(false);
    setData(initialData);
    setErrors({});
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 shadow-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#0C3C3E]"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center text-[#0C3C3E] mb-6">
          Weight Management Programme
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Simple Text Inputs */}
          {[
            ["Name", "name"],
            ["Email", "email"],
            ["Phone", "phone"],
            ["Date of Birth", "dob"],
            ["Current Weight (kg)", "currentWeight"],
            ["Target Weight (kg)", "targetWeight"],
            ["Height (inches)", "height"],
            ["Current Exercise Routine", "exerciseRoutine"],
            ["Motivation Level (1-10)", "motivationLevel"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={field === "dob" ? "date" : "text"}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-[#0C3C3E]"
                value={data[field]}
                onChange={(e) => updateField(field, e.target.value)}
              />
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Select Inputs */}
          {[
            ["Target Timeline", "targetTimeline", ["1 month", "3 months", "6 months", "12 months"]],
            ["Daily Activity Level", "dailyActivity", ["Sedentary", "Lightly Active", "Moderately Active", "Highly Active"]],
            ["Current Diet Type", "currentDiet", ["Vegetarian", "Vegan", "Keto", "Paleo", "Other"]],
            ["Meals Per Day", "mealsPerDay", ["1-2", "2-3", "3-4", "4+"]],
            ["Sleep Hours", "sleepHours", ["<5", "5-6", "6-7", "7-8", ">8"]],
            ["Package Selection", "packageSelection", ["Basic", "Standard", "Premium"]],
          ].map(([label, field, options]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                value={data[field]}
                onChange={(e) => updateField(field, e.target.value)}
              >
                <option value="">Select</option>
                {options.map((opt) => <option key={opt}>{opt}</option>)}
              </select>
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Checkbox Groups */}
          {[
            ["Primary Goal", "primaryGoal", ["Weight Loss", "Muscle Gain", "Fat Loss", "Improve Health"]],
            ["Physical Limitations / Medical Conditions", "physicalLimitations", ["Injury", "Chronic Illness", "None"]],
            ["Dietary Restrictions / Allergies", "dietaryRestrictions", ["Gluten-Free", "Lactose-Free", "Nut Allergy", "Other"]],
            ["Nutrition Challenges", "nutritionChallenges", ["Cravings", "Emotional Eating", "Lack of Knowledge"]],
            ["Meal Preferences", "mealPreferences", ["Low Carb", "High Protein", "Balanced Diet"]],
            ["Exercise Preferences", "exercisePreferences", ["Strength Training", "Cardio", "Flexibility"]],
          ].map(([label, field, options]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <div className="flex flex-wrap gap-2">
                {options.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => toggleCheckbox(field, opt)}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      data[field].includes(opt)
                        ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                        : "bg-gray-100 border-gray-300 text-gray-700"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Radio Buttons */}
          {[
            ["Track Food Intake", "trackFood", ["Yes", "No"]],
            ["Stress / Emotional Eating", "stressEating", ["Yes", "No"]],
          ].map(([label, field, options]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <div className="flex gap-4">
                {options.map((opt) => (
                  <label key={opt} className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      name={field}
                      value={opt}
                      checked={data[field] === opt}
                      onChange={(e) => updateField(field, e.target.value)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Submit & Terms */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.agreeTerms}
              onChange={(e) => updateField("agreeTerms", e.target.checked)}
            />
            <span className="text-sm">I agree to the Terms & Conditions</span>
          </div>
          {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#0C3C3E] text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900"
          >
            {loading ? "Processing..." : "Get Fit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WeightManagementProgrammeForm;
