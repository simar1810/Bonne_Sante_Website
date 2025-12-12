"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const SportsNutritionProgrammeForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    athleteType: "",
    trainingLevel: "",
    trainingFrequency: "",
    workoutIntensity: "",
    primaryGoal: [],
    currentWeight: "",
    targetWeight: "",
    dietaryRestrictions: [],
    otherRestriction: "",
    waterIntake: "",
    supplements: [],
    otherSupplement: "",
    mealPlanning: [],
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
    if (!data.gender) e.gender = "Select gender";
    if (!data.athleteType) e.athleteType = "Select athlete type";
    if (!data.trainingLevel) e.trainingLevel = "Select training level";
    if (!data.trainingFrequency) e.trainingFrequency = "Select training frequency";
    if (!data.workoutIntensity) e.workoutIntensity = "Select workout intensity";
    if (data.primaryGoal.length === 0) e.primaryGoal = "Select at least one goal";
    if (!data.currentWeight) e.currentWeight = "Enter current weight";
    if (!data.targetWeight) e.targetWeight = "Enter target weight";
    if (data.dietaryRestrictions.length === 0) e.dietaryRestrictions = "Select at least one restriction";
    if (!data.waterIntake) e.waterIntake = "Select water intake";
    if (data.mealPlanning.length === 0) e.mealPlanning = "Select at least one meal planning preference";
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
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"Sports Nutrition Programme" });
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
    gender: "",
    athleteType: "",
    trainingLevel: "",
    trainingFrequency: "",
    workoutIntensity: "",
    primaryGoal: [],
    currentWeight: "",
    targetWeight: "",
    dietaryRestrictions: [],
    otherRestriction: "",
    waterIntake: "",
    supplements: [],
    otherSupplement: "",
    mealPlanning: [],
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
          Sports Nutrition Programme
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Info */}
          {[
            ["Name", "name", "text"],
            ["Email", "email", "email"],
            ["Phone", "phone", "text"],
            ["Date of Birth", "dob", "date"],
            ["Current Weight (kg)", "currentWeight", "number"],
            ["Target Weight (kg)", "targetWeight", "number"],
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

          {/* Select Fields */}
          {[
            ["Gender", "gender", ["Male", "Female", "Other"]],
            ["Athlete Type", "athleteType", ["Professional", "Amateur", "Student"]],
            ["Current Training Level", "trainingLevel", ["Beginner", "Intermediate", "Advanced"]],
            ["Training Frequency", "trainingFrequency", ["1-2 times/week", "3-4 times/week", "5+ times/week"]],
            ["Workout Intensity", "workoutIntensity", ["Low", "Moderate", "High"]],
            ["Water Intake (Liters)", "waterIntake", ["<1L", "1-2L", "2-3L", "3+L"]],
          ].map(([label, field, options]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                value={data[field]}
                onChange={(e) => updateField(field, e.target.value)}
              >
                <option value="">Select</option>
                {options.map((opt) => <option key={opt}>{opt}</option>)}
              </select>
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Primary Goal */}
          <div>
            <label className="block text-sm font-medium mb-1">Primary Goal</label>
            <div className="flex flex-wrap gap-2">
              {["Weight Management", "Muscle Gain", "Endurance", "Recovery"].map((goal) => (
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
            {errors.dietaryRestrictions && <p className="text-red-500 text-xs mt-1">{errors.dietaryRestrictions}</p>}
          </div>

          {/* Supplements */}
          <div>
            <label className="block text-sm font-medium mb-1">Sports Supplements</label>
            <div className="flex flex-wrap gap-2">
              {["Protein", "Creatine", "BCAAs", "None"].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleCheckbox("supplements", s)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.supplements.includes(s)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Other (optional)"
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.otherSupplement}
              onChange={(e) => updateField("otherSupplement", e.target.value)}
            />
          </div>

          {/* Meal Planning */}
          <div>
            <label className="block text-sm font-medium mb-1">Meal Planning Preference</label>
            <div className="flex flex-wrap gap-2">
              {["Pre-Planned", "Customized", "Flexible"].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => toggleCheckbox("mealPlanning", m)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.mealPlanning.includes(m)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            {errors.mealPlanning && <p className="text-red-500 text-xs mt-1">{errors.mealPlanning}</p>}
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
            {loading ? "Submitting..." : "Boost Your Performance"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SportsNutritionProgrammeForm;
