"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const HeartDiseaseSupportProgrammeForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    heartDiseaseTypes: [],
    otherHeartDiseaseType: "",
    medications: "",
    bloodPressure: "",
    cholesterol: "",
    familyHistory: "",
    activityLevel: "",
    eatingHabits: [],
    otherEatingHabit: "",
    heartChallenges: [],
    otherChallenge: "",
    allergies: [],
    otherAllergy: "",
    mealPreferences: [],
    exercisePreferences: [],
    stress: "",
    sleepHours: "",
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
    if (data.heartDiseaseTypes.length === 0) e.heartDiseaseTypes = "Select at least one heart disease type";
    if (!data.medications) e.medications = "Select an option for medications";
    if (!data.familyHistory) e.familyHistory = "Select an option for family history";
    if (!data.activityLevel) e.activityLevel = "Select activity level";
    if (data.eatingHabits.length === 0) e.eatingHabits = "Select at least one eating habit";
    if (data.heartChallenges.length === 0) e.heartChallenges = "Select at least one challenge";
    if (data.allergies.length === 0) e.allergies = "Select at least one allergy option";
    if (data.mealPreferences.length === 0) e.mealPreferences = "Select at least one meal preference";
    if (data.exercisePreferences.length === 0) e.exercisePreferences = "Select at least one exercise preference";
    if (!data.stress) e.stress = "Select an option";
    if (!data.sleepHours) e.sleepHours = "Select sleep hours";
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
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"Health Disease Support" });
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
    heartDiseaseTypes: [],
    otherHeartDiseaseType: "",
    medications: "",
    bloodPressure: "",
    cholesterol: "",
    familyHistory: "",
    activityLevel: "",
    eatingHabits: [],
    otherEatingHabit: "",
    heartChallenges: [],
    otherChallenge: "",
    allergies: [],
    otherAllergy: "",
    mealPreferences: [],
    exercisePreferences: [],
    stress: "",
    sleepHours: "",
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
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 shadow-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#0C3C3E]"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center text-[#0C3C3E] mb-6">
          Heart Disease Support Programme
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Simple Text Inputs */}
          {[
            ["Name", "name"],
            ["Email", "email"],
            ["Phone", "phone"],
            ["Date of Birth", "dob"],
            ["Recent Blood Pressure Reading", "bloodPressure"],
            ["Recent Cholesterol Levels", "cholesterol"],
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
            ["Gender", "gender", ["Male", "Female", "Other"]],
            ["Current Activity Level", "activityLevel", ["Sedentary", "Lightly Active", "Moderate", "High"]],
            ["How many hours of sleep per night?", "sleepHours", ["<5", "5-6", "6-7", "7-8", ">8"]],
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
            ["Type of Heart Disease", "heartDiseaseTypes", ["Coronary Artery Disease", "Arrhythmia", "Heart Failure", "Other"]],
            ["Current Eating Habits", "eatingHabits", ["Balanced", "High Carb", "High Fat", "Other"]],
            ["Biggest Challenges in Heart Health", "heartChallenges", ["Diet", "Exercise", "Stress Management"]],
            ["Food Allergies or Restrictions", "allergies", ["Gluten-Free", "Lactose-Free", "Nut Allergy", "Other"]],
            ["Meal Plan Preferences", "mealPreferences", ["Low Sodium", "Low Fat", "Balanced", "Custom"]],
            ["Exercise Preferences", "exercisePreferences", ["Cardio", "Strength", "Flexibility"]],
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
            ["Are you currently taking any heart-related medications?", "medications"],
            ["Do you have a family history of heart disease?", "familyHistory"],
            ["Do you experience stress frequently?", "stress"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <div className="flex gap-4">
                {["Yes", "No"].map((opt) => (
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

          {/* Terms & Submit */}
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
            {loading ? "Processing..." : "Aid My Heart"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeartDiseaseSupportProgrammeForm;
