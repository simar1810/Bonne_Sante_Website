"use client";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const CustomizedDietPlanForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    healthGoals: [],
    otherGoal: "",
    medicalConditions: "",
    medications: "",
    foodAllergies: [],
    otherAllergy: "",
    dietType: "",
    otherDietType: "",
    mealsPerDay: "",
    exerciseFrequency: "",
    foodPreferences: "",
    mealPrepTime: "",
    mealStyle: [],
    snackRecommendations: "",
    portionControl: "",
    packageSelection: "",
    terms: false,
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
    if (data.healthGoals.length === 0) e.healthGoals = "Select at least one goal";
    if (data.foodAllergies.length === 0) e.foodAllergies = "Select at least one allergy";
    if (!data.dietType) e.dietType = "Select diet type";
    if (!data.mealsPerDay) e.mealsPerDay = "Select meals per day";
    if (!data.exerciseFrequency) e.exerciseFrequency = "Select exercise frequency";
    if (!data.mealPrepTime) e.mealPrepTime = "Select meal prep time";
    if (data.mealStyle.length === 0) e.mealStyle = "Select at least one meal style";
    if (!data.snackRecommendations) e.snackRecommendations = "Select snack option";
    if (!data.portionControl) e.portionControl = "Select portion control option";
    if (!data.packageSelection) e.packageSelection = "Select package";
    if (!data.terms) e.terms = "You must accept terms";

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
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"Customized Diet Plan" });
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
          Customized Diet Plan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Info */}
          {[
            ["Full Name", "name", "text"],
            ["Email", "email", "email"],
            ["Phone", "phone", "number"],
            ["Date of Birth", "dob", "date"],
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

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              value={data.gender}
              onChange={(e) => updateField("gender", e.target.value)}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>

          {/* Health Goals */}
          <div>
            <label className="block text-sm font-medium mb-1">Main Health Goals</label>
            <div className="flex flex-wrap gap-2">
              {["Weight Loss", "Muscle Gain", "Better Digestion", "Improve Energy"].map((goal) => (
                <button
                  type="button"
                  key={goal}
                  onClick={() => toggleCheckbox("healthGoals", goal)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.healthGoals.includes(goal)
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
              value={data.otherGoal}
              onChange={(e) => updateField("otherGoal", e.target.value)}
            />
            {errors.healthGoals && <p className="text-red-500 text-xs mt-1">{errors.healthGoals}</p>}
          </div>

          {/* Medical Conditions & Medications */}
          {[
            ["Medical Conditions", "medicalConditions"],
            ["Current Medications", "medications"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-[#0C3C3E]"
                value={data[field]}
                onChange={(e) => updateField(field, e.target.value)}
              />
            </div>
          ))}

          {/* Food Allergies */}
          <div>
            <label className="block text-sm font-medium mb-1">Food Allergies / Intolerances</label>
            <div className="flex flex-wrap gap-2">
              {["Gluten", "Dairy", "Nuts", "Seafood", "None"].map((allergy) => (
                <button
                  type="button"
                  key={allergy}
                  onClick={() => toggleCheckbox("foodAllergies", allergy)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.foodAllergies.includes(allergy)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {allergy}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Other (optional)"
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.otherAllergy}
              onChange={(e) => updateField("otherAllergy", e.target.value)}
            />
            {errors.foodAllergies && <p className="text-red-500 text-xs mt-1">{errors.foodAllergies}</p>}
          </div>

          {/* Diet Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Diet Type</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              value={data.dietType}
              onChange={(e) => updateField("dietType", e.target.value)}
            >
              <option value="">Select</option>
              <option>Keto</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
              <option>Balanced</option>
            </select>
            <input
              type="text"
              placeholder="Other (optional)"
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.otherDietType}
              onChange={(e) => updateField("otherDietType", e.target.value)}
            />
            {errors.dietType && <p className="text-red-500 text-xs mt-1">{errors.dietType}</p>}
          </div>

          {/* Meals Per Day & Exercise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          {/* Food Preferences */}
          <div>
            <label className="block text-sm font-medium mb-1">Specific Food Preferences</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-[#0C3C3E]"
              value={data.foodPreferences}
              onChange={(e) => updateField("foodPreferences", e.target.value)}
            />
          </div>

          {/* Meal Prep & Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Meal Preparation Time</label>
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
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Meal Style</label>
              <div className="flex flex-wrap gap-2">
                {["Quick Meals", "Meal Prep", "Gourmet", "Balanced"].map((style) => (
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
          </div>

          {/* Snack & Portion Control - Radio */}
          {[
            ["Do you want snack recommendations included?", "snackRecommendations", ["Yes", "No"]],
            ["Do you need portion control guidance?", "portionControl", ["Yes", "No"]],
          ].map(([label, field, options]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <div className="flex gap-4">
                {options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={field}
                      value={opt}
                      checked={data[field] === opt}
                      onChange={() => updateField(field, opt)}
                    />
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Package */}
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
              checked={data.terms}
              onChange={(e) => updateField("terms", e.target.checked)}
            />
            <span className="text-sm">I agree to the Terms & Conditions</span>
          </div>
          {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#0C3C3E] text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
          >
            {loading ? "Submitting..." : "Get Your Plan"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CustomizedDietPlanForm;
