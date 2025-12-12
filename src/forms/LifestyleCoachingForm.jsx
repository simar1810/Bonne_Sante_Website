"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const LifestyleCoachingForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    goals: [],
    otherGoal: "",
    sleep: "",
    physicalActivity: "",
    stressLevel: "",
    healthConditions: "",
    medications: "",
    coachingFormat: "",
    sessionFrequency: "",
    coachingFocus: [],
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

  // VALIDATION
  const validate = () => {
    const e = {};

    if (!data.name.trim()) e.name = "Name is required";
    if (!data.dob.trim()) e.dob = "Date of Birth is required";
    if (!data.gender) e.gender = "Select gender";
    if (!data.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email";
    if (!data.phone.trim()) e.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(data.phone)) e.phone = "Phone must be 10 digits";
    if (!data.address.trim()) e.address = "Address is required";

    if (data.goals.length === 0) e.goals = "Select at least one goal";

    if (!data.sleep) e.sleep = "Select sleep duration";
    if (!data.physicalActivity) e.physicalActivity = "Select physical activity level";
    if (!data.stressLevel) e.stressLevel = "Enter stress level";

    if (!data.coachingFormat) e.coachingFormat = "Select coaching format";
    if (!data.sessionFrequency) e.sessionFrequency = "Select session frequency";

    if (data.coachingFocus.length === 0) e.coachingFocus = "Select at least one coaching focus";
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
      toast.error("Please correct the errors");
      return;
    }

    setLoading(true);
    try {
      let amount = 499;
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"Lifestyle Coaching" });
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
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    goals: [],
    otherGoal: "",
    sleep: "",
    physicalActivity: "",
    stressLevel: "",
    healthConditions: "",
    medications: "",
    coachingFormat: "",
    sessionFrequency: "",
    coachingFocus: [],
    packageSelection: "",
    terms: false,
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
          Lifestyle Coaching
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Info */}
          {[
            ["Full Name", "name", "text"],
            ["Date of Birth", "dob", "date"],
            ["Email", "email", "email"],
            ["Phone", "phone", "number"],
            ["Address", "address", "text"],
          ].map(([label, field, type]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={type}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-[#0C3C3E]"
                value={data[field]}
                onChange={(e) => updateField(field, e.target.value)}
              />
              {errors[field] && (
                <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
              )}
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
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Goals */}
          <div>
            <label className="block text-sm font-medium mb-1">Main Goals for Lifestyle Coaching</label>
            <div className="flex flex-wrap gap-2">
              {["Weight Management", "Stress Reduction", "Better Sleep", "Improve Nutrition"].map((goal) => (
                <button
                  type="button"
                  key={goal}
                  onClick={() => toggleCheckbox("goals", goal)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.goals.includes(goal)
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
            {errors.goals && (
              <p className="text-red-500 text-xs mt-1">{errors.goals}</p>
            )}
          </div>

          {/* Sleep & Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sleep</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                value={data.sleep}
                onChange={(e) => updateField("sleep", e.target.value)}
              >
                <option value="">Select</option>
                <option>Less than 5 hours</option>
                <option>5-6 hours</option>
                <option>6-7 hours</option>
                <option>7-8 hours</option>
                <option>More than 8 hours</option>
              </select>
              {errors.sleep && <p className="text-red-500 text-xs mt-1">{errors.sleep}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Physical Activity</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                value={data.physicalActivity}
                onChange={(e) => updateField("physicalActivity", e.target.value)}
              >
                <option value="">Select</option>
                <option>Sedentary</option>
                <option>Light</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
              {errors.physicalActivity && <p className="text-red-500 text-xs mt-1">{errors.physicalActivity}</p>}
            </div>
          </div>

          {/* Stress Level */}
          <div>
            <label className="block text-sm font-medium mb-1">Stress Levels (1-10)</label>
            <input
              type="number"
              min="1"
              max="10"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-[#0C3C3E]"
              value={data.stressLevel}
              onChange={(e) => updateField("stressLevel", e.target.value)}
            />
            {errors.stressLevel && <p className="text-red-500 text-xs mt-1">{errors.stressLevel}</p>}
          </div>

          {/* Health & Medications */}
          {[
            ["Existing Health Conditions", "healthConditions"],
            ["Currently Taking Medications", "medications"],
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

          {/* Coaching Format - Radio */}
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Coaching Format</label>
            <div className="space-y-2">
              {["In-person", "Virtual", "Hybrid"].map((fmt) => (
                <label key={fmt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="coachingFormat"
                    value={fmt}
                    checked={data.coachingFormat === fmt}
                    onChange={() => updateField("coachingFormat", fmt)}
                  />
                  <span className="text-sm">{fmt}</span>
                </label>
              ))}
            </div>
            {errors.coachingFormat && <p className="text-red-500 text-xs mt-1">{errors.coachingFormat}</p>}
          </div>

          {/* Session Frequency */}
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Session Frequency</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              value={data.sessionFrequency}
              onChange={(e) => updateField("sessionFrequency", e.target.value)}
            >
              <option value="">Select</option>
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
            </select>
            {errors.sessionFrequency && <p className="text-red-500 text-xs mt-1">{errors.sessionFrequency}</p>}
          </div>

          {/* Coaching Focus */}
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Coaching Focus</label>
            <div className="flex flex-wrap gap-2">
              {["Nutrition", "Fitness", "Mindfulness", "Work-life Balance"].map((focus) => (
                <button
                  type="button"
                  key={focus}
                  onClick={() => toggleCheckbox("coachingFocus", focus)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.coachingFocus.includes(focus)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {focus}
                </button>
              ))}
            </div>
            {errors.coachingFocus && <p className="text-red-500 text-xs mt-1">{errors.coachingFocus}</p>}
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
            {loading ? "Submitting..." : "Start Coaching"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default LifestyleCoachingForm;
