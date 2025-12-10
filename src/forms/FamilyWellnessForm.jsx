"use client";
import React, { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function FamilyWellnessForm({ open, setOpen }) {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    relationship: "",
    familyMembers: "",
    ageGroups: [], 
    healthGoals: [], 
    concerns: "",
    mealPlanStyle: "",
    activityLevel: "", 
    stressManagement: [], 
    programDuration: "",
    supportFormat: "", 
    payment: "",
    terms: false,
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  
  const ageGroupOptions = ["Kids", "Teens", "Adults", "Seniors"];
  const healthGoalOptions = [
    "Weight Management",
    "Mental Wellness",
    "Healthy Eating",
    "Chronic Condition Support",
    "Fitness Improvement",
  ];
  const stressOptions = ["Yoga", "Meditation", "Breathing", "Outdoor Activities"];
  const relationshipOptions = ["Parent", "Guardian", "Sibling", "Relative"];
  const familyCountOptions = ["1–2", "3–4", "5–6", "7+"];

  
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

    if (!formData.relationship) e.relationship = "Relationship is required.";
    if (!formData.familyMembers) e.familyMembers = "Number of family members is required.";
    if (!formData.ageGroups || formData.ageGroups.length === 0)
      e.ageGroups = "Select at least one age group.";
    if (!formData.healthGoals || formData.healthGoals.length === 0)
      e.healthGoals = "Select at least one health goal.";
    if (!formData.mealPlanStyle) e.mealPlanStyle = "Select a preferred meal plan style.";
    if (!formData.activityLevel) e.activityLevel = "Select family activity level.";
    if (!formData.stressManagement || formData.stressManagement.length === 0)
      e.stressManagement = "Select at least one stress management practice.";
    if (!formData.programDuration) e.programDuration = "Choose preferred program duration.";
    if (!formData.supportFormat) e.supportFormat = "Choose support format.";
    if (!formData.payment.trim()) e.payment = "Credit card number is required.";
    else if (!/^\d{12,16}$/.test(formData.payment.replace(/\s+/g, "")))
      e.payment = "Enter a valid card number (12–16 digits).";
    if (!formData.terms) e.terms = "You must accept terms and conditions.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  
  const handleClose = () => {
    setFormData(initialData);
    setErrors({});
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      
      const first = Object.values(errors)[0] || "Please fix errors.";
      toast.error(first);
      return;
    }

    setLoading(true);
    try {
      
      await new Promise((res) => setTimeout(res, 1400));

      
      setLoading(false);
      setFormData(initialData);
      setErrors({});
      setOpen(false);
      setSuccessOpen(true);
      toast.success("Form submitted");

    } catch (err) {
      setLoading(false);
      toast.error("Submission failed. Try again.");
    }
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

          <h3 className="text-2xl font-semibold text-[#0C3C3E]">Family Wellness Program</h3>
          <p className="text-sm text-gray-600 mt-1">Tell us about your family so we can tailor the right program.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name*</label>
                <input
                  className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  }`}
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email*</label>
                <input
                  className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${
                    errors.email ? "border-red-400" : "border-gray-300"
                  }`}
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
                className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${
                  errors.phone ? "border-red-400" : "border-gray-300"
                }`}
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                type="tel"
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Relationship to Family*</label>
                <select
                  className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${
                    errors.relationship ? "border-red-400" : "border-gray-300"
                  }`}
                  value={formData.relationship}
                  onChange={(e) => updateField("relationship", e.target.value)}
                >
                  <option value="">Select relationship</option>
                  {relationshipOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.relationship && <p className="text-xs text-red-500 mt-1">{errors.relationship}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Number of Family Members*</label>
                <select
                  className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${
                    errors.familyMembers ? "border-red-400" : "border-gray-300"
                  }`}
                  value={formData.familyMembers}
                  onChange={(e) => updateField("familyMembers", e.target.value)}
                >
                  <option value="">Select</option>
                  {familyCountOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.familyMembers && <p className="text-xs text-red-500 mt-1">{errors.familyMembers}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Age Groups in Family*</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {ageGroupOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm cursor-pointer ${
                      formData.ageGroups.includes(opt) ? "border-[#0C3C3E] bg-[#f1f8f8]" : "border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.ageGroups.includes(opt)}
                      onChange={() => toggleCheckbox("ageGroups", opt)}
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {errors.ageGroups && <p className="text-xs text-red-500 mt-1">{errors.ageGroups}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">What Are Your Family&apos;s Top Health Goals?*</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {healthGoalOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm cursor-pointer ${
                      formData.healthGoals.includes(opt) ? "border-[#0C3C3E] bg-[#f1f8f8]" : "border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.healthGoals.includes(opt)}
                      onChange={() => toggleCheckbox("healthGoals", opt)}
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {errors.healthGoals && <p className="text-xs text-red-500 mt-1">{errors.healthGoals}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Any Specific Concerns?</label>
              <textarea
                className="mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E]"
                rows={3}
                value={formData.concerns}
                onChange={(e) => updateField("concerns", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Preferred Meal Plan Style*</label>
              <select
                className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${
                  errors.mealPlanStyle ? "border-red-400" : "border-gray-300"
                }`}
                value={formData.mealPlanStyle}
                onChange={(e) => updateField("mealPlanStyle", e.target.value)}
              >
                <option value="">Select meal plan style</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Balanced Diet">Balanced Diet</option>
                <option value="High Protein">High Protein</option>
              </select>
              {errors.mealPlanStyle && <p className="text-xs text-red-500 mt-1">{errors.mealPlanStyle}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Activity Level Across Family*</label>
              <div className="flex gap-3 mt-2">
                {["Low", "Moderate", "High"].map((lvl) => (
                  <label key={lvl} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="activity"
                      value={lvl}
                      checked={formData.activityLevel === lvl}
                      onChange={() => updateField("activityLevel", lvl)}
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {lvl}
                  </label>
                ))}
              </div>
              {errors.activityLevel && <p className="text-xs text-red-500 mt-1">{errors.activityLevel}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Stress Management Practices*</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {stressOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm cursor-pointer ${
                      formData.stressManagement.includes(opt) ? "border-[#0C3C3E] bg-[#f1f8f8]" : "border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.stressManagement.includes(opt)}
                      onChange={() => toggleCheckbox("stressManagement", opt)}
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {errors.stressManagement && <p className="text-xs text-red-500 mt-1">{errors.stressManagement}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Preferred Program Duration*</label>
              <div className="flex gap-3 mt-2">
                {["1 Month", "3 Months", "6 Months"].map((d) => (
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
            <div>
              <label className="text-sm font-medium text-gray-700">Preferred Support Format*</label>
              <select
                className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${
                  errors.supportFormat ? "border-red-400" : "border-gray-300"
                }`}
                value={formData.supportFormat}
                onChange={(e) => updateField("supportFormat", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Online Coaching">Online Coaching</option>
                <option value="In-Person Sessions">In-Person Sessions</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.supportFormat && <p className="text-xs text-red-500 mt-1">{errors.supportFormat}</p>}
            </div>

            {/* Payment */}
            <div>
              <label className="text-sm font-medium text-gray-700">Credit Card Number*</label>
              <input
                className={`mt-2 w-full px-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0C3C3E] ${
                  errors.payment ? "border-red-400" : "border-gray-300"
                }`}
                value={formData.payment}
                onChange={(e) => updateField("payment", e.target.value)}
                inputMode="numeric"
                aria-invalid={!!errors.payment}
              />
              {errors.payment && <p className="text-xs text-red-500 mt-1">{errors.payment}</p>}
            </div>

            {/* Terms */}
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

            {/* Submit */}
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
                {loading ? "Submitting..." : "Support My Family"}
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
            <h4 className="text-lg font-semibold mt-4">Submitted</h4>
            <p className="text-sm text-gray-600 mt-2">Thanks — we received your request. We&apos;ll reach out soon.</p>

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
