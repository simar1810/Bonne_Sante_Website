"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const PersonalizedDietChartForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    primaryGoal: [],
    currentWeight: "",
    targetWeight: "",
    dietaryRestrictions: [],
    otherRestriction: "",
    mealsPerDay: "",
    exerciseFrequency: "",
    mealPrepTime: "",
    mealStyle: [],
    packageSelection: "",
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
    else if (!/^[0-9]{10}$/.test(data.phone)) e.phone = "Phone must be 10 digits";
    if (!data.dob.trim()) e.dob = "Date of Birth is required";
    if (data.primaryGoal.length === 0) e.primaryGoal = "Select at least one goal";
    if (!data.currentWeight.trim()) e.currentWeight = "Current weight is required";
    if (!data.targetWeight.trim()) e.targetWeight = "Target weight is required";
    if (data.dietaryRestrictions.length === 0) e.dietaryRestrictions = "Select at least one restriction";
    if (!data.mealsPerDay) e.mealsPerDay = "Select meals per day";
    if (!data.exerciseFrequency) e.exerciseFrequency = "Select exercise frequency";
    if (!data.mealPrepTime) e.mealPrepTime = "Select meal prep time";
    if (data.mealStyle.length === 0) e.mealStyle = "Select at least one meal style";
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
      toast.error("Please correct the errors.");
      return;
    }

    setLoading(true);
    try {
      let amount = 499;
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"Personalised Diet Chart" });
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
    dietaryRestrictions: [],
    otherRestriction: "",
    mealsPerDay: "",
    exerciseFrequency: "",
    mealPrepTime: "",
    mealStyle: [],
    packageSelection: "",
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
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-lg relative">

        {/* Close */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#0C3C3E]"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center text-[#0C3C3E] mb-6">
          Personalized Diet Chart
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Info */}
          {[
            ["Full Name", "name", "text"],
            ["Email", "email", "email"],
            ["Phone", "phone", "number"],
            ["Date of Birth", "dob", "date"],
            ["Current Weight (kg)", "currentWeight", "text"],
            ["Target Weight (kg)", "targetWeight", "text"],
          ].map(([label, field, type]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={type}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-[#0C3C3E]"
                value={data[field]}
                onChange={(e) => updateField(field, e.target.value)}
              />
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Primary Goal */}
          <div>
            <label className="block text-sm font-medium mb-1">Primary Goal</label>
            <div className="flex flex-wrap gap-2">
              {["Weight Loss", "Muscle Gain", "Better Digestion", "Energy"].map((goal) => (
                <button
                  type="button"
                  key={goal}
                  onClick={() => toggleCheckbox("primaryGoal", goal)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.primaryGoal.includes(goal)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Other (optional)"
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.otherRestriction}
              onChange={(e) => updateField("otherRestriction", e.target.value)}
            />
            {errors.primaryGoal && <p className="text-red-500 text-xs mt-1">{errors.primaryGoal}</p>}
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label className="block text-sm font-medium mb-1">Dietary Restrictions / Allergies</label>
            <div className="flex flex-wrap gap-2">
              {["Gluten", "Dairy", "Nuts", "Seafood", "None"].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => toggleCheckbox("dietaryRestrictions", r)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.dietaryRestrictions.includes(r)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Other (optional)"
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.otherRestriction}
              onChange={(e) => updateField("otherRestriction", e.target.value)}
            />
            {errors.dietaryRestrictions && <p className="text-red-500 text-xs mt-1">{errors.dietaryRestrictions}</p>}
          </div>

          {/* Meals, Exercise, Meal Prep */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Meals Per Day</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                value={data.mealsPerDay}
                onChange={(e) => updateField("mealsPerDay", e.target.value)}
              >
                <option value="">Select</option>
                <option>1-2 meals</option>
                <option>2-3 meals</option>
                <option>3-4 meals</option>
                <option>4+ meals</option>
              </select>
              {errors.mealsPerDay && <p className="text-red-500 text-xs mt-1">{errors.mealsPerDay}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Exercise Frequency</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                value={data.exerciseFrequency}
                onChange={(e) => updateField("exerciseFrequency", e.target.value)}
              >
                <option value="">Select</option>
                <option>Rarely</option>
                <option>1-2 times/week</option>
                <option>3-4 times/week</option>
                <option>5+ times/week</option>
              </select>
              {errors.exerciseFrequency && <p className="text-red-500 text-xs mt-1">{errors.exerciseFrequency}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Meal Prep Time</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                value={data.mealPrepTime}
                onChange={(e) => updateField("mealPrepTime", e.target.value)}
              >
                <option value="">Select</option>
                <option>15 mins</option>
                <option>30 mins</option>
                <option>45 mins</option>
                <option>1+ hour</option>
              </select>
              {errors.mealPrepTime && <p className="text-red-500 text-xs mt-1">{errors.mealPrepTime}</p>}
            </div>
          </div>

          {/* Meal Style */}
          <div>
            <label className="block text-sm font-medium mb-1">Meal Style Preference</label>
            <div className="flex flex-wrap gap-2">
              {["Quick Meals", "Meal Prep", "Balanced", "Gourmet"].map((style) => (
                <button
                  type="button"
                  key={style}
                  onClick={() => toggleCheckbox("mealStyle", style)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.mealStyle.includes(style)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
            {errors.mealStyle && <p className="text-red-500 text-xs mt-1">{errors.mealStyle}</p>}
          </div>

          {/* Package Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Package Selection</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              value={data.packageSelection}
              onChange={(e) => updateField("packageSelection", e.target.value)}
            >
              <option value="">Select</option>
              <option>Basic</option>
              <option>Standard</option>
              <option>Premium</option>
            </select>
            {errors.packageSelection && <p className="text-red-500 text-xs mt-1">{errors.packageSelection}</p>}
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.agreeTerms}
              onChange={(e) => updateField("agreeTerms", e.target.checked)}
            />
            <span className="text-sm">I agree to the Terms & Conditions</span>
          </div>
          {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#0C3C3E] text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalizedDietChartForm;
