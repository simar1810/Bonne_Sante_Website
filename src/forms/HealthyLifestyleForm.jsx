"use client";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import React, { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function HealthyLifestyleForm({ open, setOpen }) {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    wellnessGoals: [], 
    fitnessLevel: "", 
    healthConditions: "",
    stressLevel: "", 
    focusAreas: [], 
    consultationMethod: "",
    programDuration: "", 
    terms: false,
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const wellnessGoalOptions = [
    "Weight Management",
    "Stress Reduction",
    "Better Sleep",
    "Improve Stamina",
    "Flexibility & Mobility",
  ];

  const fitnessLevels = ["Beginner", "Intermediate", "Advanced"];
  const focusAreaOptions = [
    "Cardio",
    "Strength",
    "Flexibility",
    "Mindfulness",
    "Nutrition",
  ];
  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
  const consultationOptions = ["Video Call", "Phone Call", "In-Person", "Chat"];
  const programDurations = ["4 Weeks", "8 Weeks", "12 Weeks"];
  const stressOptions = ["Low", "Moderate", "High"];

  const updateField = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const toggleCheckbox = (field, value) => {
    setFormData((p) => {
      const arr = Array.isArray(p[field]) ? [...p[field]] : [];
      const next = arr.includes(value) ? arr.filter((a) => a !== value) : [...arr, value];
      return { ...p, [field]: next };
    });
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validate = () => {
    const e = {};

    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = "Enter a valid email.";
    if (!formData.phone.trim()) e.phone = "Phone is required.";
    else if (!/^\d{7,15}$/.test(formData.phone)) e.phone = "Enter a valid phone number (7–15 digits).";

    if (!formData.dob) e.dob = "Date of birth is required.";
    if (!formData.gender) e.gender = "Gender is required.";

    if (!formData.wellnessGoals || formData.wellnessGoals.length === 0)
      e.wellnessGoals = "Select at least one wellness goal.";

    if (!formData.fitnessLevel) e.fitnessLevel = "Select your current fitness level.";

    if (!formData.healthConditions.trim()) e.healthConditions = "Please mention known health conditions or 'None'.";

    if (!formData.stressLevel) e.stressLevel = "Select your daily stress level.";

    if (!formData.focusAreas || formData.focusAreas.length === 0)
      e.focusAreas = "Select at least one focus area.";

    if (!formData.consultationMethod) e.consultationMethod = "Select a consultation method.";

    if (!formData.programDuration) e.programDuration = "Choose a program duration.";

    if (!formData.terms) e.terms = "You must accept terms and conditions.";

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
  const handleClose = () => {
    setFormData(initialData);
    setErrors({});
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!scriptLoaded) return toast.error("Payment gateway still loading, please wait a second");
    if (!validate()) {
      const first = Object.values(errors)[0] || "Please fix the highlighted fields.";
      toast.error(first);
      return;
    }

    setLoading(true);
     try {
      let amount = 499;
      await registerUser({ name: formData.name, email:formData.email, phoneNumber:formData.phone, reason:"Healthy Lifestyle" });
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
    setFormData({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    wellnessGoals: [], 
    fitnessLevel: "", 
    healthConditions: "",
    stressLevel: "", 
    focusAreas: [], 
    consultationMethod: "",
    programDuration: "", 
    terms: false,
  })
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 relative">
          <button
            aria-label="Close form"
            onClick={handleClose}
            className="absolute top-2 right-2 bg-white border border-gray-200 rounded-full p-2 shadow-sm hover:scale-95"
          >
            <X size={18} className="text-gray-700" />
          </button>

          <h3 className="text-2xl font-semibold text-[#0C3C3E]">Healthy Lifestyle Support</h3>
          <p className="text-sm text-gray-600 mt-1">Tell us a little about yourself so we can tailor support.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name*</label>
                <input
                  className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${errors.name ? "border-red-400" : "border-gray-300"}`}
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email*</label>
                <input
                  className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${errors.email ? "border-red-400" : "border-gray-300"}`}
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  type="email"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Phone*</label>
              <input
                className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${errors.phone ? "border-red-400" : "border-gray-300"}`}
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                type="tel"
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Date of Birth*</label>
                <input
                  type="date"
                  className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${errors.dob ? "border-red-400" : "border-gray-300"}`}
                  value={formData.dob}
                  onChange={(e) => updateField("dob", e.target.value)}
                />
                {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Gender*</label>
                <select
                  className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${errors.gender ? "border-red-400" : "border-gray-300"}`}
                  value={formData.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                >
                  <option value="">Select gender</option>
                  {genderOptions.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">What Are Your Main Wellness Goals?*</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {wellnessGoalOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm cursor-pointer ${formData.wellnessGoals.includes(opt) ? "border-[#0C3C3E] bg-[#f1f8f8]" : "border-gray-300"}`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.wellnessGoals.includes(opt)}
                      onChange={() => toggleCheckbox("wellnessGoals", opt)}
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {errors.wellnessGoals && <p className="text-xs text-red-500 mt-1">{errors.wellnessGoals}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Current Fitness Level*</label>
              <select
                className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${errors.fitnessLevel ? "border-red-400" : "border-gray-300"}`}
                value={formData.fitnessLevel}
                onChange={(e) => updateField("fitnessLevel", e.target.value)}
              >
                <option value="">Select level</option>
                {fitnessLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
              {errors.fitnessLevel && <p className="text-xs text-red-500 mt-1">{errors.fitnessLevel}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Known Health Conditions</label>
              <textarea
                className="mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E]"
                rows={3}
                value={formData.healthConditions}
                onChange={(e) => updateField("healthConditions", e.target.value)}
                placeholder="List any medical conditions, medications, or type 'None'"
              />
              {errors.healthConditions && <p className="text-xs text-red-500 mt-1">{errors.healthConditions}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Daily Stress Levels*</label>
              <div className="flex gap-3 mt-2">
                {stressOptions.map((s) => (
                  <label key={s} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="stress"
                      value={s}
                      checked={formData.stressLevel === s}
                      onChange={() => updateField("stressLevel", s)}
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {s}
                  </label>
                ))}
              </div>
              {errors.stressLevel && <p className="text-xs text-red-500 mt-1">{errors.stressLevel}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Preferred Focus Areas*</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {focusAreaOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm cursor-pointer ${formData.focusAreas.includes(opt) ? "border-[#0C3C3E] bg-[#f1f8f8]" : "border-gray-300"}`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.focusAreas.includes(opt)}
                      onChange={() => toggleCheckbox("focusAreas", opt)}
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {errors.focusAreas && <p className="text-xs text-red-500 mt-1">{errors.focusAreas}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Preferred Consultation Method*</label>
              <select
                className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${errors.consultationMethod ? "border-red-400" : "border-gray-300"}`}
                value={formData.consultationMethod}
                onChange={(e) => updateField("consultationMethod", e.target.value)}
              >
                <option value="">Select</option>
                {consultationOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.consultationMethod && <p className="text-xs text-red-500 mt-1">{errors.consultationMethod}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Select Program Duration*</label>
              <div className="flex gap-3 mt-2">
                {programDurations.map((d) => (
                  <label key={d} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="programDuration"
                      value={d}
                      checked={formData.programDuration === d}
                      onChange={() => updateField("programDuration", d)}
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {d}
                  </label>
                ))}
              </div>
              {errors.programDuration && <p className="text-xs text-red-500 mt-1">{errors.programDuration}</p>}
            </div>

            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={(e) => updateField("terms", e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#0C3C3E]"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the Terms and Conditions*
              </label>
            </div>
            {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center items-center gap-3 py-3 bg-[#0C3C3E] text-white rounded-xl text-sm font-semibold hover:bg-[#0a3a3b] disabled:opacity-60"
              >
                {loading ? (
                  <svg
                    className="w-5 h-5 animate-spin text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2" />
                    <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                ) : null}
                {loading ? "Submitting..." : "Get Support"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {successOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="text-green-600" size={34} />
            </div>
            <h4 className="text-lg font-semibold mt-4">Request Received</h4>
            <p className="text-sm text-gray-600 mt-2">Thanks — we received your request. We&apos;ll be in touch soon.</p>

            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={() => setSuccessOpen(false)}
                className="px-4 py-2 rounded-md bg-[#0C3C3E] text-white text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
