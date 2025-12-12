"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const HealthyLifestyleProgrammeForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    currentWeight: "",
    targetWeight: "",
    height: "",
    conditions: [],
    otherCondition: "",
    healthGoals: [],
    activityLevel: "",
    dietDescription: "",
    allergies: "",
    mealsPerDay: "",
    stressLevel: "",
    mindfulness: "",
    sleepHours: "",
    support: [],
    coachingStyle: "",
    plan: "",
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
    if (!data.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email";

    if (!data.phone.trim()) e.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(data.phone))
      e.phone = "Phone must be 10 digits";

    if (!data.dob.trim()) e.dob = "Date of Birth is required";
    if (!data.gender) e.gender = "Select gender";

    if (!data.currentWeight) e.currentWeight = "Enter current weight";
    if (!data.targetWeight) e.targetWeight = "Enter target weight";
    if (!data.height) e.height = "Enter height";

    if (data.conditions.length === 0)
      e.conditions = "Select at least one condition";

    if (data.healthGoals.length === 0)
      e.healthGoals = "Select at least one goal";

    if (!data.activityLevel) e.activityLevel = "Select activity level";

    if (!data.dietDescription.trim())
      e.dietDescription = "Describe your current diet";

    if (!data.allergies.trim()) e.allergies = "Enter allergies or 'None'";

    if (!data.mealsPerDay) e.mealsPerDay = "Select meals per day";

    if (!data.stressLevel.trim()) e.stressLevel = "Enter stress level";

    if (!data.mindfulness) e.mindfulness = "Select an option";

    if (!data.sleepHours) e.sleepHours = "Select sleep hours";

    if (data.support.length === 0)
      e.support = "Select at least one support type";

    if (!data.coachingStyle) e.coachingStyle = "Select coaching style";
    if (!data.plan) e.plan = "Select plan";

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
  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!scriptLoaded) return toast.error("Payment gateway still loading, please wait a second");
    if (!validate()) {
      toast.error("Please correct errors");
      return;
    }

    setLoading(true);
     try {
      let amount = 499;
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"Healthy Lifestyle programme" });
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
    currentWeight: "",
    targetWeight: "",
    height: "",
    conditions: [],
    otherCondition: "",
    healthGoals: [],
    activityLevel: "",
    dietDescription: "",
    allergies: "",
    mealsPerDay: "",
    stressLevel: "",
    mindfulness: "",
    sleepHours: "",
    support: [],
    coachingStyle: "",
    plan: "",
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

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#0C3C3E]"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center text-[#0C3C3E] mb-6">
          Healthy Lifestyle Programme
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BASIC INPUTS */}
          {[
            ["Full Name", "name"],
            ["Email", "email"],
            ["Phone Number", "phone"],
            ["Date of Birth", "dob"],
            ["Current Weight (kg)", "currentWeight"],
            ["Target Weight (kg)", "targetWeight"],
            ["Height (cm)", "height"],
            ["Current Diet Description", "dietDescription"],
            ["Food Allergies or Intolerances", "allergies"],
            ["Stress Level (Describe)", "stressLevel"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={
                  field === "dob" ? "date" : field.includes("Weight") || field === "height"
                    ? "number"
                    : "text"
                }
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-[#0C3C3E]"
                value={data[field]}
                onChange={(e) => updateField(field, e.target.value)}
              />
              {errors[field] && (
                <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          {/* GENDER */}
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

          {/* CONDITIONS CHECKBOX */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Medical Conditions / Dietary Restrictions
            </label>

            <div className="flex flex-wrap gap-2">
              {[
                "Diabetes",
                "Thyroid",
                "PCOS/PCOD",
                "High BP",
                "Cholesterol",
                "Gluten Intolerance",
                "Lactose Intolerance",
              ].map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => toggleCheckbox("conditions", c)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.conditions.includes(c)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* OTHER */}
            <input
              type="text"
              placeholder="Other (optional)"
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.otherCondition}
              onChange={(e) => updateField("otherCondition", e.target.value)}
            />

            {errors.conditions && (
              <p className="text-red-500 text-xs mt-1">{errors.conditions}</p>
            )}
          </div>

          {/* HEALTH GOALS */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Main Health Goals
            </label>

            <div className="flex flex-wrap gap-2">
              {[
                "Weight Loss",
                "Muscle Gain",
                "Better Digestion",
                "Stress Reduction",
                "Improve Sleep",
                "Hormonal Balance",
              ].map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => toggleCheckbox("healthGoals", g)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.healthGoals.includes(g)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {errors.healthGoals && (
              <p className="text-red-500 text-xs mt-1">{errors.healthGoals}</p>
            )}
          </div>

          {/* ACTIVITY LEVEL — RADIO (OPTION A) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              How Physically Active Are You?
            </label>

            <div className="space-y-2">
              {[
                "Not Active",
                "Lightly Active",
                "Moderately Active",
                "Very Active",
                "Athlete Level",
              ].map((level) => (
                <label key={level} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="activityLevel"
                    value={level}
                    checked={data.activityLevel === level}
                    onChange={() => updateField("activityLevel", level)}
                  />
                  <span className="text-sm">{level}</span>
                </label>
              ))}
            </div>

            {errors.activityLevel && (
              <p className="text-red-500 text-xs mt-1">{errors.activityLevel}</p>
            )}
          </div>

          {/* MINDFULNESS RADIO */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Do You Practice Mindfulness or Meditation?
            </label>

            <div className="space-y-2">
              {["Yes", "Sometimes", "No"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mindfulness"
                    value={opt}
                    checked={data.mindfulness === opt}
                    onChange={() => updateField("mindfulness", opt)}
                  />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>

            {errors.mindfulness && (
              <p className="text-red-500 text-xs mt-1">{errors.mindfulness}</p>
            )}
          </div>

          {/* MEALS PER DAY SELECT */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Meals Per Day
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              value={data.mealsPerDay}
              onChange={(e) => updateField("mealsPerDay", e.target.value)}
            >
              <option value="">Select</option>
              <option>1–2 meals</option>
              <option>2–3 meals</option>
              <option>3–4 meals</option>
              <option>4+ meals</option>
            </select>
            {errors.mealsPerDay && (
              <p className="text-red-500 text-xs mt-1">{errors.mealsPerDay}</p>
            )}
          </div>

          {/* SLEEP HOURS SELECT */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Average Sleep Hours Per Day
            </label>

            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              value={data.sleepHours}
              onChange={(e) => updateField("sleepHours", e.target.value)}
            >
              <option value="">Select</option>
              <option>Less than 5 hours</option>
              <option>5–6 hours</option>
              <option>6–7 hours</option>
              <option>7–8 hours</option>
              <option>8+ hours</option>
            </select>

            {errors.sleepHours && (
              <p className="text-red-500 text-xs mt-1">{errors.sleepHours}</p>
            )}
          </div>

          {/* SUPPORT CHECKBOX */}
          <div>
            <label className="block text-sm font-medium mb-1">
              What Type of Support Would You Like?
            </label>

            <div className="flex flex-wrap gap-2">
              {[
                "Weekly Coaching",
                "Daily Accountability",
                "Diet Charts",
                "Workout Plans",
                "Stress Management",
                "Sleep Coaching",
              ].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleCheckbox("support", s)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.support.includes(s)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {errors.support && (
              <p className="text-red-500 text-xs mt-1">{errors.support}</p>
            )}
          </div>

          {/* COACHING STYLE SELECT */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Coaching Style
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              value={data.coachingStyle}
              onChange={(e) => updateField("coachingStyle", e.target.value)}
            >
              <option value="">Select</option>
              <option>Strict & Disciplined</option>
              <option>Balanced & Flexible</option>
              <option>Soft & Supportive</option>
            </select>
            {errors.coachingStyle && (
              <p className="text-red-500 text-xs mt-1">{errors.coachingStyle}</p>
            )}
          </div>

          {/* PLAN SELECT */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Choose Your Plan
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              value={data.plan}
              onChange={(e) => updateField("plan", e.target.value)}
            >
              <option value="">Select</option>
              <option>1-Month Plan</option>
              <option>3-Month Plan</option>
              <option>6-Month Plan</option>
              <option>12-Month Plan</option>
            </select>
            {errors.plan && (
              <p className="text-red-500 text-xs mt-1">{errors.plan}</p>
            )}
          </div>

          {/* TERMS CHECKBOX */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.terms}
              onChange={(e) => updateField("terms", e.target.checked)}
            />
            <span className="text-sm">I agree to the Terms & Conditions</span>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
          )}

          {/* SUBMIT */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#0C3C3E] text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
          >
            {loading ? "Submitting..." : "Join the Programme"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HealthyLifestyleProgrammeForm;
