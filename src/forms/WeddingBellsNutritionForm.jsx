"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const WeddingBellsNutritionForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    signingUpAs: "",
    healthGoals: [],
    otherHealthGoal: "",
    dietTypes: [],
    otherDiet: "",
    allergies: "",
    activityLevel: "",
    fitnessRoutine: "",
    stressLevel: "",
    wantStressStrategies: "",
    packageType: "",
    terms: false,
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
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
          ? arr.filter((item) => item !== value)
          : [...arr, value],
      };
    });
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e = {};

    if (!data.name.trim()) e.name = "Name is required";

    if (!data.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      e.email = "Invalid email";

    if (!data.phone.trim()) e.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(data.phone))
      e.phone = "Enter 10 digits";

    if (!data.weddingDate.trim())
      e.weddingDate = "Wedding date is required";

    if (!data.signingUpAs)
      e.signingUpAs = "Select an option";

    if (data.healthGoals.length === 0)
      e.healthGoals = "Select at least one";

    if (!data.activityLevel)
      e.activityLevel = "Select activity level";

    if (!data.fitnessRoutine.trim())
      e.fitnessRoutine = "Required";

    if (!data.stressLevel.trim())
      e.stressLevel = "Enter 0–10";
    else if (isNaN(data.stressLevel))
      e.stressLevel = "Must be a number";

    if (!data.wantStressStrategies)
      e.wantStressStrategies = "Select option";

    if (!data.packageType)
      e.packageType = "Choose a package";

    if (!data.terms)
      e.terms = "You must accept the terms";

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
      toast.error(first || "Fix all errors");
      return;
    }

    setLoading(true);
   try {
      let amount = 499;
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"Wedding Bells Nutrition Programme" });
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
    weddingDate: "",
    signingUpAs: "",
    healthGoals: [],
    otherHealthGoal: "",
    dietTypes: [],
    otherDiet: "",
    allergies: "",
    activityLevel: "",
    fitnessRoutine: "",
    stressLevel: "",
    wantStressStrategies: "",
    packageType: "",
    terms: false,
  })
    setOpen(false);
  };

  const closeModal = () => {
    setOpen(false);
    setErrors({});
    setData(initialData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-lg relative">

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#0C3C3E]"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl text-[#0C3C3E] font-semibold text-center mb-6">
          Wedding Bells Nutrition Programme
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Input Field */}
          {[
            ["Name", "name"],
            ["Email", "email"],
            ["Phone", "phone"],
            ["Wedding Date", "weddingDate"],
            ["Any food allergies or intolerances?", "allergies"],
            ["Do you currently follow any fitness routine?", "fitnessRoutine"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0C3C3E]"
                value={data[field]}
                onChange={(e) => updateField(field, e.target.value)}
              />
              {errors[field] && (
                <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">
              Are you signing up for yourself or as a couple?
            </label>
            <div className="flex gap-4 text-sm">
              {["Myself", "Couple"].map((o) => (
                <label key={o} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={data.signingUpAs === o}
                    onChange={() => updateField("signingUpAs", o)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.signingUpAs && (
              <p className="text-red-500 text-xs mt-1">{errors.signingUpAs}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Main health goals
            </label>

            <div className="flex flex-wrap gap-2">
              {[
                "Weight Loss",
                "Skin Glow",
                "Muscle Tone",
                "Better Sleep",
                "Energy Boost",
                "Stress Reduction",
              ].map((goal) => (
                <button
                  type="button"
                  key={goal}
                  onClick={() => toggleCheckbox("healthGoals", goal)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.healthGoals.includes(goal)
                      ? "border-[#0C3C3E] bg-[#0C3C3E] text-white"
                      : "border-gray-300 bg-gray-100 text-gray-700"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>

            <input
              placeholder="Other"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-3"
              value={data.otherHealthGoal}
              onChange={(e) => updateField("otherHealthGoal", e.target.value)}
            />

            {errors.healthGoals && (
              <p className="text-red-500 text-xs mt-1">{errors.healthGoals}</p>
            )}
          </div>

          {/* Diet Types */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Do you follow a specific diet?
            </label>

            <div className="flex flex-wrap gap-2">
              {["Keto", "Vegan", "Vegetarian", "Paleo", "Balanced"].map(
                (diet) => (
                  <button
                    type="button"
                    key={diet}
                    onClick={() => toggleCheckbox("dietTypes", diet)}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      data.dietTypes.includes(diet)
                        ? "border-[#0C3C3E] bg-[#0C3C3E] text-white"
                        : "border-gray-300 bg-gray-100 text-gray-700"
                    }`}
                  >
                    {diet}
                  </button>
                )
              )}
            </div>

            <input
              placeholder="Other"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-3"
              value={data.otherDiet}
              onChange={(e) => updateField("otherDiet", e.target.value)}
            />
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm font-medium mb-1">
              How active are you?
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.activityLevel}
              onChange={(e) => updateField("activityLevel", e.target.value)}
            >
              <option value="">Select</option>
              <option>Sedentary</option>
              <option>Lightly Active</option>
              <option>Moderately Active</option>
              <option>Highly Active</option>
            </select>
            {errors.activityLevel && (
              <p className="text-red-500 text-xs mt-1">{errors.activityLevel}</p>
            )}
          </div>

          {/* Stress Level */}
          <div>
            <label className="block text-sm font-medium mb-1">
              How would you rate your stress (0–10)?
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.stressLevel}
              onChange={(e) => updateField("stressLevel", e.target.value)}
            />
            {errors.stressLevel && (
              <p className="text-red-500 text-xs mt-1">{errors.stressLevel}</p>
            )}
          </div>

          {/* Radio: Stress Strategies */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Would you like stress management strategies?
            </label>
            <div className="flex gap-4 text-sm">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={data.wantStressStrategies === o}
                    onChange={() => updateField("wantStressStrategies", o)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.wantStressStrategies && (
              <p className="text-red-500 text-xs mt-1">
                {errors.wantStressStrategies}
              </p>
            )}
          </div>

          {/* Package */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Choose Your Package
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.packageType}
              onChange={(e) => updateField("packageType", e.target.value)}
            >
              <option value="">Select Package</option>
              <option>1-Month Glow-Up</option>
              <option>2-Month Transformation</option>
              <option>Couple&apos;s Premium Plan</option>
            </select>
            {errors.packageType && (
              <p className="text-red-500 text-xs mt-1">{errors.packageType}</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={data.terms}
              onChange={() => updateField("terms", !data.terms)}
            />
            <span>I agree to the Terms & Conditions</span>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
          )}

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#0C3C3E] text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
          >
            {loading ? "Processing..." : "Begin My Glow-Up"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default WeddingBellsNutritionForm;
