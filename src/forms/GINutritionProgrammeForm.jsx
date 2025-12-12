"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const GINutritionProgrammeForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    diagnosedGI: "",
    diagnosis: "",
    giConditionTypes: [], 
    medicationGI: "",
    giMedications: "",
    foodIntolerances: [], 
    dietTypes: [],
    otherDiet: "",
    dietaryRestrictions: "", 
    dietaryRestrictionsRadio: "",
    digestiveDiscomfortFreq: "", 
    waterIntake: "",
    digestiveChallenges: [], 
    otherChallenge: "",
    mealPreferences: [],
    probioticsGuidance: "", 
    supplementRecommendation: "", 
    mealPrepHelp: "", 
    stressManagement: "",
    packageSelection: "",
    agreeTerms: false,
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const updateField = (field, value) => {
    setData((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const toggleCheckbox = (field, value) => {
    setData((prev) => {
      const arr = Array.isArray(prev[field]) ? [...prev[field]] : [];
      const next = arr.includes(value) ? arr.filter((a) => a !== value) : [...arr, value];
      return { ...prev, [field]: next };
    });
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

const safeTrim = (v) => (typeof v === "string" ? v.trim() : "");

const validate = () => {
    const e = {};

    if (!safeTrim(data.name)) e.name = "Name is required";
    if (!safeTrim(data.email)) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email";

    if (!safeTrim(data.phone)) e.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(data.phone)) e.phone = "Phone must be 10 digits";

    if (!safeTrim(data.dob)) e.dob = "Date of birth is required";

    if (!data.gender) e.gender = "Select gender";

    if (!data.diagnosedGI) e.diagnosedGI = "Please indicate if you have a diagnosed GI condition";
    if (data.diagnosedGI === "Yes" && !safeTrim(data.diagnosis)) e.diagnosis = "Please provide your diagnosis";

    if (data.giConditionTypes.length === 0)
        e.giConditionTypes = "Select at least one GI condition type";

    if (!data.medicationGI) e.medicationGI = "Please indicate if you're on medication";
    if (data.medicationGI === "Yes" && !safeTrim(data.giMedications))
        e.giMedications = "List your medications";

    if (data.foodIntolerances.length === 0)
        e.foodIntolerances = "Select at least one intolerance";

    if (data.dietTypes.length === 0)
        e.dietTypes = "Select at least one current diet type";

    if (!data.dietaryRestrictionsRadio)
        e.dietaryRestrictionsRadio = "Select dietary restriction status";

    if (data.dietaryRestrictionsRadio === "Yes" && !safeTrim(data.dietaryRestrictions))
        e.dietaryRestrictions = "Describe restrictions";

    if (!data.digestiveDiscomfortFreq)
        e.digestiveDiscomfortFreq = "Select frequency";

    if (!safeTrim(data.waterIntake))
        e.waterIntake = "Enter daily water intake";

    if (data.digestiveChallenges.length === 0)
        e.digestiveChallenges = "Select at least one challenge";

    if (data.mealPreferences.length === 0)
        e.mealPreferences = "Select at least one meal preference";

    if (!data.probioticsGuidance)
        e.probioticsGuidance = "Select probiotics guidance";

    if (!data.supplementRecommendation)
        e.supplementRecommendation = "Select supplement recommendation";

    if (!data.mealPrepHelp)
        e.mealPrepHelp = "Select meal prep help";

    if (!data.stressManagement)
        e.stressManagement = "Select stress management";

    if (!data.packageSelection)
        e.packageSelection = "Select a package";

    if (!data.agreeTerms)
        e.agreeTerms = "You must accept terms";

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
      const first = Object.values(errors)[0] || "Please fix the errors.";
      toast.error(first);
      return;
    }

    setLoading(true);
    try {
      let amount = 499;
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"GI Nutrition Programme" });
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
    diagnosedGI: "",
    diagnosis: "",
    giConditionTypes: [], 
    medicationGI: "",
    giMedications: "",
    foodIntolerances: [], 
    dietTypes: [],
    otherDiet: "",
    dietaryRestrictions: "", 
    dietaryRestrictionsRadio: "",
    digestiveDiscomfortFreq: "", 
    waterIntake: "",
    digestiveChallenges: [], 
    otherChallenge: "",
    mealPreferences: [],
    probioticsGuidance: "", 
    supplementRecommendation: "", 
    mealPrepHelp: "", 
    stressManagement: "",
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
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-[#0C3C3E]">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center text-[#0C3C3E] mb-6">
          Gastrointestinal (GI) Nutrition Programme
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#0C3C3E]"
              value={data.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#0C3C3E]"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#0C3C3E]"
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#0C3C3E]"
              value={data.dob}
              onChange={(e) => updateField("dob", e.target.value)}
            />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
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

          <div>
            <label className="block text-sm font-medium mb-1">Do you have a diagnosed GI condition?</label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="diagnosedGI"
                    value={o}
                    checked={data.diagnosedGI === o}
                    onChange={(e) => updateField("diagnosedGI", e.target.value)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.diagnosedGI && <p className="text-red-500 text-xs mt-1">{errors.diagnosedGI}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">If yes, what is your diagnosis?</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.diagnosis}
              onChange={(e) => updateField("diagnosis", e.target.value)}
              placeholder={data.diagnosedGI === "Yes" ? "" : "Optional unless you answered Yes above"}
            />
            {errors.diagnosis && <p className="text-red-500 text-xs mt-1">{errors.diagnosis}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">GI Condition Type</label>
            <div className="flex flex-wrap gap-2">
              {["IBS", "IBD (Crohn's/Colitis)", "GERD/Acid Reflux", "Celiac", "Small Intestinal Bacterial Overgrowth (SIBO)", "Other"].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleCheckbox("giConditionTypes", opt)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.giConditionTypes.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.giConditionTypes && <p className="text-red-500 text-xs mt-1">{errors.giConditionTypes}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Are you currently on medication for GI health?</label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="medicationGI"
                    value={o}
                    checked={data.medicationGI === o}
                    onChange={(e) => updateField("medicationGI", e.target.value)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.medicationGI && <p className="text-red-500 text-xs mt-1">{errors.medicationGI}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">List any medications or supplements you take for digestion</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.giMedications}
              onChange={(e) => updateField("giMedications", e.target.value)}
              placeholder="e.g., Omeprazole, Pantoprazole, Digestive enzymes, Probiotics..."
            />
            {errors.giMedications && <p className="text-red-500 text-xs mt-1">{errors.giMedications}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Do you experience food intolerances?</label>
            <div className="flex flex-wrap gap-2">
              {["Lactose", "Gluten", "FODMAPs", "Histamine", "Fructose", "None"].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleCheckbox("foodIntolerances", opt)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.foodIntolerances.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.foodIntolerances && <p className="text-red-500 text-xs mt-1">{errors.foodIntolerances}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Current Diet Type</label>
            <div className="flex flex-wrap gap-2">
              {["Regular/Omnivore", "Vegetarian", "Vegan", "Low-FODMAP", "Low-Fiber", "Keto", "Other"].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleCheckbox("dietTypes", opt)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.dietTypes.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.dietTypes && <p className="text-red-500 text-xs mt-1">{errors.dietTypes}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Other</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.otherDiet}
              onChange={(e) => updateField("otherDiet", e.target.value)}
              placeholder="Any other diet type not listed above"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Are you following any dietary restrictions?</label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="dietaryRestrictionsRadio"
                    value={o}
                    checked={data.dietaryRestrictionsRadio === o}
                    onChange={(e) => updateField("dietaryRestrictionsRadio", e.target.value)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.dietaryRestrictionsRadio && <p className="text-red-500 text-xs mt-1">{errors.dietaryRestrictionsRadio}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">How often do you experience digestive discomfort?</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.digestiveDiscomfortFreq}
              onChange={(e) => updateField("digestiveDiscomfortFreq", e.target.value)}
            >
              <option value="">Select</option>
              <option>Daily</option>
              <option>Several times a week</option>
              <option>Once a week</option>
              <option>Rarely</option>
            </select>
            {errors.digestiveDiscomfortFreq && <p className="text-red-500 text-xs mt-1">{errors.digestiveDiscomfortFreq}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">How much water do you consume daily?</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.waterIntake}
              onChange={(e) => updateField("waterIntake", e.target.value)}
              placeholder="e.g., 2L, 8 cups"
            />
            {errors.waterIntake && <p className="text-red-500 text-xs mt-1">{errors.waterIntake}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Biggest Digestive Challenges</label>
            <div className="flex flex-wrap gap-2">
              {["Bloating", "Constipation", "Diarrhea", "Acid Reflux", "Gas/Flatulence", "Irregularity", "Other"].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleCheckbox("digestiveChallenges", opt)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.digestiveChallenges.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.digestiveChallenges && <p className="text-red-500 text-xs mt-1">{errors.digestiveChallenges}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Other</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.otherChallenge}
              onChange={(e) => updateField("otherChallenge", e.target.value)}
              placeholder="Any other digestive challenge"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Meal Plan Preferences</label>
            <div className="flex flex-wrap gap-2">
              {["Low FODMAP", "High Fiber", "Low Residue", "Low Fat", "Balanced", "Custom"].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleCheckbox("mealPreferences", opt)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.mealPreferences.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.mealPreferences && <p className="text-red-500 text-xs mt-1">{errors.mealPreferences}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Would you like guidance on probiotics & gut health?</label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="probioticsGuidance"
                    value={o}
                    checked={data.probioticsGuidance === o}
                    onChange={(e) => updateField("probioticsGuidance", e.target.value)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.probioticsGuidance && <p className="text-red-500 text-xs mt-1">{errors.probioticsGuidance}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Would you like a personalized supplement recommendation?</label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="supplementRecommendation"
                    value={o}
                    checked={data.supplementRecommendation === o}
                    onChange={(e) => updateField("supplementRecommendation", e.target.value)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.supplementRecommendation && <p className="text-red-500 text-xs mt-1">{errors.supplementRecommendation}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Do you require help with meal preparation?</label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="mealPrepHelp"
                    value={o}
                    checked={data.mealPrepHelp === o}
                    onChange={(e) => updateField("mealPrepHelp", e.target.value)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.mealPrepHelp && <p className="text-red-500 text-xs mt-1">{errors.mealPrepHelp}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Would you like stress management strategies for GI health?</label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="stressManagement"
                    value={o}
                    checked={data.stressManagement === o}
                    onChange={(e) => updateField("stressManagement", e.target.value)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.stressManagement && <p className="text-red-500 text-xs mt-1">{errors.stressManagement}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Package Selection</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.packageSelection}
              onChange={(e) => updateField("packageSelection", e.target.value)}
            >
              <option value="">Select a package</option>
              <option>Basic - Assessment & Plan</option>
              <option>Standard - Plan + 2 follow-ups</option>
              <option>Premium - Plan + Weekly follow-ups</option>
            </select>
            {errors.packageSelection && <p className="text-red-500 text-xs mt-1">{errors.packageSelection}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.agreeTerms}
              onChange={(e) => updateField("agreeTerms", e.target.checked)}
            />
            <span className="text-sm">I agree to the Terms & Conditions</span>
            {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
          </div>
            

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0C3C3E] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#092d2f] transition"
            >
              {loading ? "Processing..." : "Improve My Gut Health"}
            </button>
          </div>   
        </form>
      </div>
    </div>
  );
};

export default GINutritionProgrammeForm;
