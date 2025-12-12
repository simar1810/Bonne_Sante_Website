"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const LiverHealthProgrammeForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",

    diagnosedLiver: "",
    diagnosis: "",
    liverConditionTypes: [],
    liverConditionOther: "",

    medications: "",
    medicationList: "",

    otherMedicalConditions: [],
    otherMedicalConditionText: "",

    dietTypes: [],
    otherDiet: "",

    dietaryRestrictions: [],
    otherDietaryRestrictions: "",

    alcoholConsumption: "",
    alcoholFrequency: "",

    waterIntake: "",

    dietaryChallenges: [],
    otherDietChallenge: "",

    mealPreferences: [],

    hydrationGuidance: "",
    snackRecommendations: "",
    mealPrepHelp: "",
    weightManagementHelp: "",

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
      const next = arr.includes(value)
        ? arr.filter((a) => a !== value)
        : [...arr, value];
      return { ...prev, [field]: next };
    });
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const safeTrim = (v) => (typeof v === "string" ? v.trim() : "");

  const validate = () => {
    const e = {};

    if (!safeTrim(data.name)) e.name = "Name is required";
    if (!safeTrim(data.email)) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      e.email = "Invalid email";

    if (!safeTrim(data.phone)) e.phone = "Phone required";
    else if (!/^\d{10}$/.test(data.phone))
      e.phone = "Phone must be 10 digits";

    if (!safeTrim(data.dob)) e.dob = "Date of birth required";
    if (!data.gender) e.gender = "Gender required";

    if (!data.diagnosedLiver)
      e.diagnosedLiver = "Select an option";

    if (data.diagnosedLiver === "Yes" && !safeTrim(data.diagnosis))
      e.diagnosis = "Diagnosis required";

    if (data.liverConditionTypes.length === 0)
      e.liverConditionTypes = "Select at least one condition";

    if (!data.medications)
      e.medications = "Select medication status";

    if (data.medications === "Yes" && !safeTrim(data.medicationList))
      e.medicationList = "Enter medications";

    if (data.otherMedicalConditions.length === 0)
      e.otherMedicalConditions = "Select conditions";

    if (!data.waterIntake)
      e.waterIntake = "Enter water intake";

    if (!data.alcoholConsumption)
      e.alcoholConsumption = "Select status";

    if (data.alcoholConsumption === "Yes" && !data.alcoholFrequency)
      e.alcoholFrequency = "Select frequency";

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
      toast.error("Please fix the highlighted errors.");
      return;
    }

    setLoading(true);
     try {
      let amount = 499;
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"Liver Health Programme" });
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

    diagnosedLiver: "",
    diagnosis: "",
    liverConditionTypes: [],
    liverConditionOther: "",

    medications: "",
    medicationList: "",

    otherMedicalConditions: [],
    otherMedicalConditionText: "",

    dietTypes: [],
    otherDiet: "",

    dietaryRestrictions: [],
    otherDietaryRestrictions: "",

    alcoholConsumption: "",
    alcoholFrequency: "",

    waterIntake: "",

    dietaryChallenges: [],
    otherDietChallenge: "",

    mealPreferences: [],

    hydrationGuidance: "",
    snackRecommendations: "",
    mealPrepHelp: "",
    weightManagementHelp: "",

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 shadow-xl relative">

        <button onClick={closeModal} className="absolute top-4 right-4">
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-2xl font-semibold text-center text-[#0C3C3E] mb-6">
          Liver Health Nutrition Programme
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="font-medium text-sm">Name</label>
            <input
              className="w-full border rounded-lg p-2"
              value={data.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          <div>
            <label className="font-medium text-sm">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-2"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div>
            <label className="font-medium text-sm">Phone</label>
            <input
              className="w-full border rounded-lg p-2"
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>

          <div>
            <label className="font-medium text-sm">Date of Birth</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              value={data.dob}
              onChange={(e) => updateField("dob", e.target.value)}
            />
            {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}
          </div>

          <div>
            <label className="font-medium text-sm">Gender</label>
            <select
              className="w-full border rounded-lg p-2"
              value={data.gender}
              onChange={(e) => updateField("gender", e.target.value)}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
          </div>

          <div>
            <label className="font-medium text-sm">
              Do you have a diagnosed liver condition?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label className="flex items-center gap-2 text-sm" key={o}>
                  <input
                    type="radio"
                    name="diagnosedLiver"
                    value={o}
                    checked={data.diagnosedLiver === o}
                    onChange={(e) => updateField("diagnosedLiver", e.target.value)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.diagnosedLiver && <p className="text-red-500 text-xs">{errors.diagnosedLiver}</p>}
          </div>

          {data.diagnosedLiver === "Yes" && (
            <div>
              <label className="font-medium text-sm">Diagnosis</label>
              <input
                className="w-full border p-2 rounded-lg"
                value={data.diagnosis}
                onChange={(e) => updateField("diagnosis", e.target.value)}
              />
              {errors.diagnosis && <p className="text-red-500 text-xs">{errors.diagnosis}</p>}
            </div>
          )}

          <div>
            <label className="font-medium text-sm">Liver Condition Type</label>
            <div className="flex flex-wrap gap-2">
              {[
                "Fatty Liver",
                "NAFLD",
                "Alcoholic Liver Disease",
                "Hepatitis",
                "Cirrhosis",
                "Gallbladder Issues",
                "High Liver Enzymes",
              ].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleCheckbox("liverConditionTypes", opt)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.liverConditionTypes.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.liverConditionTypes && (
              <p className="text-red-500 text-xs">{errors.liverConditionTypes}</p>
            )}
          </div>

          <div>
            <label className="font-medium text-sm">Other</label>
            <input
              className="w-full border rounded-lg p-2"
              value={data.liverConditionOther}
              onChange={(e) => updateField("liverConditionOther", e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium text-sm">
              Are you currently on medication for liver health?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="medications"
                    value={o}
                    checked={data.medications === o}
                    onChange={(e) => updateField("medications", e.target.value)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.medications && <p className="text-red-500 text-xs">{errors.medications}</p>}
          </div>

          {data.medications === "Yes" && (
            <div>
              <label className="font-medium text-sm">
                List medications or supplements
              </label>
              <input
                className="w-full border rounded-lg p-2"
                value={data.medicationList}
                onChange={(e) => updateField("medicationList", e.target.value)}
              />
              {errors.medicationList && (
                <p className="text-red-500 text-xs">{errors.medicationList}</p>
              )}
            </div>
          )}

          <div>
            <label className="font-medium text-sm">
              Do you have any other medical conditions?
            </label>

            <div className="flex flex-wrap gap-2">
              {[
                "Diabetes",
                "Thyroid",
                "PCOS/PCOD",
                "High BP",
                "High Cholesterol",
              ].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleCheckbox("otherMedicalConditions", opt)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.otherMedicalConditions.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.otherMedicalConditions && (
              <p className="text-red-500 text-xs">{errors.otherMedicalConditions}</p>
            )}
          </div>

          <div>
            <label className="font-medium text-sm">Other</label>
            <input
              className="w-full border rounded-lg p-2"
              value={data.otherMedicalConditionText}
              onChange={(e) => updateField("otherMedicalConditionText", e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium text-sm">Current Diet Type</label>
            <div className="flex flex-wrap gap-2">
              {[
                "Vegetarian",
                "Non-Vegetarian",
                "Vegan",
                "Keto",
                "Low-Carb",
                "High-Protein",
              ].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleCheckbox("dietTypes", opt)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.dietTypes.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-medium text-sm">Other</label>
            <input
              className="w-full border rounded-lg p-2"
              value={data.otherDiet}
              onChange={(e) => updateField("otherDiet", e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium text-sm">Dietary Restrictions</label>
            <div className="flex flex-wrap gap-2">
              {["Gluten-Free", "Lactose-Free", "Sugar-Free", "Low-Sodium"].map(
                (opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => toggleCheckbox("dietaryRestrictions", opt)}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      data.dietaryRestrictions.includes(opt)
                        ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {opt}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="font-medium text-sm">Other</label>
            <input
              className="w-full border rounded-lg p-2"
              value={data.otherDietaryRestrictions}
              onChange={(e) => updateField("otherDietaryRestrictions", e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium text-sm">
              How often do you consume alcohol?
            </label>
            <select
              className="w-full border rounded-lg p-2"
              value={data.alcoholConsumption}
              onChange={(e) => updateField("alcoholConsumption", e.target.value)}
            >
              <option value="">Select</option>
              <option>Never</option>
              <option>Occasionally</option>
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
            </select>
            {errors.alcoholConsumption && (
              <p className="text-red-500 text-xs">{errors.alcoholConsumption}</p>
            )}
          </div>

          <div>
            <label className="font-medium text-sm">
              How much water do you consume daily?
            </label>
            <input
              className="w-full border rounded-lg p-2"
              value={data.waterIntake}
              onChange={(e) => updateField("waterIntake", e.target.value)}
            />
            {errors.waterIntake && (
              <p className="text-red-500 text-xs">{errors.waterIntake}</p>
            )}
          </div>

          <div>
            <label className="font-medium text-sm">Biggest Dietary Challenges</label>

            <div className="flex flex-wrap gap-2">
              {[
                "Cravings",
                "Bloating",
                "Skipping Meals",
                "Late-Night Eating",
                "Digestive Issues",
              ].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleCheckbox("dietaryChallenges", opt)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.dietaryChallenges.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-medium text-sm">Other</label>
            <input
              className="w-full border rounded-lg p-2"
              value={data.otherDietChallenge}
              onChange={(e) => updateField("otherDietChallenge", e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium text-sm">Meal Plan Preferences</label>
            <div className="flex flex-wrap gap-2">
              {[
                "Low-Fat",
                "High-Protein",
                "Low-Carb",
                "Vegetarian",
                "Vegan",
              ].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleCheckbox("mealPreferences", opt)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.mealPreferences.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-medium text-sm">
              Would you like guidance on hydration & detoxification?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="hydrationGuidance"
                    value={o}
                    checked={data.hydrationGuidance === o}
                    onChange={(e) => updateField("hydrationGuidance", e.target.value)}
                  />
                  {o}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="font-medium text-sm">
              Would you like liver-friendly snack recommendations?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="snackRecommendations"
                    value={o}
                    checked={data.snackRecommendations === o}
                    onChange={(e) => updateField("snackRecommendations", e.target.value)}
                  />
                  {o}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="font-medium text-sm">
              Do you require help with meal preparation?
            </label>
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
          </div>

          <div>
            <label className="font-medium text-sm">
              Would you like weight management guidance?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="weightManagementHelp"
                    value={o}
                    checked={data.weightManagementHelp === o}
                    onChange={(e) => updateField("weightManagementHelp", e.target.value)}
                  />
                  {o}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="font-medium text-sm">Package Selection</label>
            <select
              className="w-full border rounded-lg p-2"
              value={data.packageSelection}
              onChange={(e) => updateField("packageSelection", e.target.value)}
            >
              <option value="">Select</option>
              <option>Basic</option>
              <option>Standard</option>
              <option>Premium</option>
            </select>
            {errors.packageSelection && (
              <p className="text-red-500 text-xs">{errors.packageSelection}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.agreeTerms}
              onChange={(e) => updateField("agreeTerms", e.target.checked)}
            />
            <span className="text-sm">I agree to the Terms & Conditions</span>
          </div>
          {errors.agreeTerms && (
            <p className="text-red-500 text-xs">{errors.agreeTerms}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0C3C3E] text-white py-3 rounded-lg font-medium hover:bg-[#0C3C3E]/90"
          >
            {loading ? "Submitting..." : "Protect My Liver Health"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LiverHealthProgrammeForm;
