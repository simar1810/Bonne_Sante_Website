"use client";
import { X, CheckCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function WeightManagementForm({ open, setOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentWeight: "",
    targetWeight: "",
    height: "",
    activityLevel: "",
    dietaryPreferences: [],
    focusArea: "",
    challenges: "",
    desiredOutcome: "",
    programDuration: "",
    coachingFormat: "",
    schedule: "",
    paymentCard: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleCheckbox = (key, value) => {
    const arr = Array.isArray(formData[key]) ? [...formData[key]] : [];
    const exists = arr.includes(value);
    const next = exists ? arr.filter((i) => i !== value) : [...arr, value];
    handleChange(key, next);
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      e.email = "Enter a valid email";
    if (!formData.phone.trim()) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) e.phone = "Phone must be 10 digits";

    if (!formData.currentWeight) e.currentWeight = "Current weight is required";
    if (!formData.targetWeight) e.targetWeight = "Target weight is required";
    if (!formData.height) e.height = "Height is required";
    if (!formData.activityLevel) e.activityLevel = "Select activity level";
    if (!formData.focusArea) e.focusArea = "Select a focus area";
    if (!formData.programDuration) e.programDuration = "Select program duration";
    if (!formData.coachingFormat) e.coachingFormat = "Select coaching format";
    if (!formData.paymentCard) e.paymentCard = "Enter card number";
    else if (!/^\d{12,16}$/.test(formData.paymentCard))
      e.paymentCard = "Enter valid card number (12-16 digits)";
    if (!formData.terms) e.terms = "You must accept terms and conditions";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) {
      const first = Object.values(errors)[0] || "Please fix errors";
      toast.error(first);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessOpen(true);
      toast.success("Weight management request submitted");

      setFormData({
        name: "",
        email: "",
        phone: "",
        currentWeight: "",
        targetWeight: "",
        height: "",
        activityLevel: "",
        dietaryPreferences: [],
        focusArea: "",
        challenges: "",
        desiredOutcome: "",
        programDuration: "",
        coachingFormat: "",
        schedule: "",
        paymentCard: "",
        terms: false,
      });
      setOpen(false);
      setTimeout(() => setSuccessOpen(false), 2200);
    }, 1400);
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white w-[92vw] sm:w-[85vw] md:max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl p-5 sm:p-8 shadow-xl relative border border-gray-200">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 bg-white border border-gray-300 rounded-full p-2 shadow-sm"
          >
            <X size={20} className="text-gray-700" />
          </button>

          <h2 className="text-2xl font-bold text-[#0C3C3E]">Weight Management</h2>
          <p className="text-gray-600 mt-1 text-sm">
            Fill out the form and start your weight management program.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Name / Email / Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldWrapper error={errors.name}>
                <FloatingInput
                  label="Name"
                  value={formData.name}
                  onChange={(v) => handleChange("name", v)}
                />
              </FieldWrapper>

              <FieldWrapper error={errors.email}>
                <FloatingInput
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(v) => handleChange("email", v)}
                />
              </FieldWrapper>
            </div>

            <FieldWrapper error={errors.phone}>
              <FloatingInput
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(v) => handleChange("phone", v)}
              />
            </FieldWrapper>

            {/* Current / Target Weight */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FieldWrapper error={errors.currentWeight}>
                <FloatingInput
                  label="Current Weight (kg)"
                  type="number"
                  value={formData.currentWeight}
                  onChange={(v) => handleChange("currentWeight", v)}
                />
              </FieldWrapper>

              <FieldWrapper error={errors.targetWeight}>
                <FloatingInput
                  label="Target Weight (kg)"
                  type="number"
                  value={formData.targetWeight}
                  onChange={(v) => handleChange("targetWeight", v)}
                />
              </FieldWrapper>

              <FieldWrapper error={errors.height}>
                <FloatingInput
                  label="Height (cm)"
                  type="number"
                  value={formData.height}
                  onChange={(v) => handleChange("height", v)}
                />
              </FieldWrapper>
            </div>

            {/* Activity Level */}
            <FieldWrapper error={errors.activityLevel} label="Activity Level">
              <select
                value={formData.activityLevel}
                onChange={(e) => handleChange("activityLevel", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C3C3E] outline-none text-sm"
              >
                <option value="">Select level</option>
                <option value="Sedentary">Sedentary</option>
                <option value="Light">Light</option>
                <option value="Moderate">Moderate</option>
                <option value="Active">Active</option>
                <option value="Very Active">Very Active</option>
              </select>
            </FieldWrapper>

            {/* Dietary Preferences */}
            <FieldWrapper label="Dietary Preferences / Restrictions">
              <div className="flex flex-wrap gap-2">
                {["Vegetarian", "Vegan", "Low Carb", "Keto", "High Protein", "None"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-full text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.dietaryPreferences.includes(opt)}
                      onChange={() => handleCheckbox("dietaryPreferences", opt)}
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </FieldWrapper>

            {/* Focus Area */}
            <FieldWrapper error={errors.focusArea} label="Focus Area">
              <div className="flex gap-3">
                {["Weight Loss", "Muscle Gain", "Overall Health"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="focusArea"
                      value={opt}
                      checked={formData.focusArea === opt}
                      onChange={(e) => handleChange("focusArea", e.target.value)}
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </FieldWrapper>

            {/* Challenges / Desired Outcome */}
            <FieldWrapper label="Challenges Faced (optional)">
              <FloatingTextarea
                label="Challenges"
                value={formData.challenges}
                onChange={(v) => handleChange("challenges", v)}
              />
            </FieldWrapper>

            <FieldWrapper label="Desired Outcome (optional)">
              <FloatingTextarea
                label="Desired Outcome"
                value={formData.desiredOutcome}
                onChange={(v) => handleChange("desiredOutcome", v)}
              />
            </FieldWrapper>

            {/* Program Duration */}
            <FieldWrapper error={errors.programDuration} label="Preferred Program Duration">
              <div className="flex gap-3">
                {["1 Month", "3 Months", "6 Months"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="programDuration"
                      value={opt}
                      checked={formData.programDuration === opt}
                      onChange={(e) => handleChange("programDuration", e.target.value)}
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </FieldWrapper>

            {/* Coaching Format */}
            <FieldWrapper error={errors.coachingFormat} label="Preferred Coaching Format">
              <select
                value={formData.coachingFormat}
                onChange={(e) => handleChange("coachingFormat", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C3C3E] outline-none text-sm"
              >
                <option value="">Select format</option>
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
              </select>
            </FieldWrapper>

            {/* Schedule */}
            <FieldWrapper label="Preferred Schedule (optional)">
              <FloatingInput
                label="Schedule"
                value={formData.schedule}
                onChange={(v) => handleChange("schedule", v)}
              />
            </FieldWrapper>

            {/* Payment */}
            <FieldWrapper error={errors.paymentCard}>
              <FloatingInput
                label="Payment — Credit Card Number"
                value={formData.paymentCard}
                onChange={(v) => handleChange("paymentCard", v)}
              />
            </FieldWrapper>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.terms}
                  onChange={(e) => handleChange("terms", e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#0C3C3E]"
                />
                <span>I agree to the Terms and Conditions.</span>
              </label>
              {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0C3C3E] text-white rounded-xl text-lg font-semibold hover:bg-[#0C3C3Ed2] transition disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Get Fit"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {successOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm w-full">
            <CheckCircle className="text-green-600 mx-auto" size={52} />
            <h3 className="text-xl font-semibold mt-3">Request Sent</h3>
            <p className="text-gray-600 mt-2">We&apos;ll contact you soon to start your weight management program.</p>
            <button
              onClick={() => setSuccessOpen(false)}
              className="mt-4 px-5 py-2 bg-[#0C3C3E] text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Reusable components
function FieldWrapper({ children, error, label }) {
  return (
    <div className="w-full">
      {label && <h4 className="text-sm font-semibold text-[#0C3C3E] mb-2">{label}</h4>}
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function FloatingInput({ label, value, onChange, type = "text" }) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#0C3C3E] outline-none text-sm"
      />
      <label className="absolute left-3 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1">
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, value, onChange }) {
  return (
    <div className="relative w-full">
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#0C3C3E] outline-none text-sm"
      />
      <label className="absolute left-3 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1">
        {label}
      </label>
    </div>
  );
}
