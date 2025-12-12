"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const FamilyDietPackageForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    familyMembers: "",
    healthGoals: [],
    medicalConditions: "",
    cookFrequency: "",
    mealPreferences: [],
    planType: "",
    terms: false,
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const updateField = (field, value) => {
    setData((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
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
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e = {};

    if (!data.name.trim()) e.name = "Name is required";

    if (!data.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      e.email = "Invalid email format";

    if (!data.phone.trim()) e.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(data.phone))
      e.phone = "Phone must be 10 digits";

    if (!data.familyMembers) e.familyMembers = "Select number of members";

    if (data.healthGoals.length === 0)
      e.healthGoals = "Select at least one goal";

    if (!data.cookFrequency)
      e.cookFrequency = "Select how often your family cooks";

    if (data.mealPreferences.length === 0)
      e.mealPreferences = "Select at least one meal preference";

    if (!data.planType) e.planType = "Choose your plan";

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
      const f = Object.values(errors)[0];
      toast.error(f || "Fix all errors to continue");
      return;
    }

    setLoading(true);
    try {
      let amount = 499;
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"Family Diet Package" });
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

        <h2 className="text-2xl font-semibold text-[#0C3C3E] text-center mb-6">
          Family Diet Package
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Input Fields */}
          {[
            ["Name", "name"],
            ["Email", "email"],
            ["Phone", "phone"],
          ].map(([label, key]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#0C3C3E] focus:outline-none"
                value={data[key]}
                onChange={(e) => updateField(key, e.target.value)}
              />
              {errors[key] && (
                <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
              )}
            </div>
          ))}

          {/* Family Members */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Number of Family Members
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#0C3C3E]"
              value={data.familyMembers}
              onChange={(e) => updateField("familyMembers", e.target.value)}
            >
              <option value="">Select</option>
              {[2, 3, 4, 5].map((n) => (
                <option key={n}>{n} Members</option>
              ))}
              <option>6+ Members</option>
            </select>
            {errors.familyMembers && (
              <p className="text-red-500 text-xs mt-1">
                {errors.familyMembers}
              </p>
            )}
          </div>

          {/* Health Goals */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Primary Family Health Goals
            </label>

            <div className="flex flex-wrap gap-2">
              {[
                "Weight Management",
                "Immunity Boost",
                "Heart Health",
                "Diabetes-Friendly Meal Planning",
                "Digestive Support",
                "General Wellness",
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

            {errors.healthGoals && (
              <p className="text-red-500 text-xs mt-1">
                {errors.healthGoals}
              </p>
            )}
          </div>

          {/* Cook Frequency */}
          <div>
            <label className="block text-sm font-medium mb-1">
              How often does your family cook at home?
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#0C3C3E]"
              value={data.cookFrequency}
              onChange={(e) => updateField("cookFrequency", e.target.value)}
            >
              <option value="">Select</option>
              <option>Rarely</option>
              <option>Sometimes</option>
              <option>Often</option>
              <option>Daily</option>
            </select>
            {errors.cookFrequency && (
              <p className="text-red-500 text-xs mt-1">
                {errors.cookFrequency}
              </p>
            )}
          </div>

          {/* Meal Preferences */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Meal Preferences
            </label>

            <div className="flex flex-wrap gap-2">
              {["Vegetarian", "Non-Vegetarian", "Vegan", "Jain", "High-Protein"].map(
                (m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => toggleCheckbox("mealPreferences", m)}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      data.mealPreferences.includes(m)
                        ? "border-[#0C3C3E] bg-[#0C3C3E] text-white"
                        : "border-gray-300 bg-gray-100 text-gray-700"
                    }`}
                  >
                    {m}
                  </button>
                )
              )}
            </div>

            {errors.mealPreferences && (
              <p className="text-red-500 text-xs mt-1">
                {errors.mealPreferences}
              </p>
            )}
          </div>

          {/* Plan Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Choose Plan
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#0C3C3E]"
              value={data.planType}
              onChange={(e) => updateField("planType", e.target.value)}
            >
              <option value="">Select Plan</option>
              <option>Monthly Family Plan</option>
              <option>Quarterly Family Plan</option>
              <option>Premium Annual Family Plan</option>
            </select>
            {errors.planType && (
              <p className="text-red-500 text-xs mt-1">{errors.planType}</p>
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
            {loading ? "Processing..." : "Submit Family Plan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FamilyDietPackageForm;
