"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";

const CorporateNutritionProgrammeForm = ({ open, setOpen }) => {
  const initialData = {
    companyName: "",
    companyAddress: "",
    industryType: "",
    otherIndustry: "",
    numEmployees: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    workshopFormat: "",
    participants: "",
    workshopDuration: "",
    wellnessGoals: [],
    otherGoal: "",
    workshopTopics: [],
    otherTopic: "",
    wellnessChallenge: "",
    followUpSupport: "",
    radioOption: "",
    resources: [],
    programmeFee: "",
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

    if (!data.companyName.trim()) e.companyName = "Company Name is required";
    if (!data.companyAddress.trim()) e.companyAddress = "Company Address is required";
    if (!data.industryType) e.industryType = "Select Industry Type";
    if (!data.numEmployees) e.numEmployees = "Number of Employees required";

    if (!data.contactName.trim()) e.contactName = "Contact Name required";
    if (!data.contactEmail.trim()) e.contactEmail = "Contact Email required";
    else if (!/^\S+@\S+\.\S+$/.test(data.contactEmail))
      e.contactEmail = "Invalid email";

    if (!data.contactPhone.trim()) e.contactPhone = "Contact Phone required";
    else if (!/^[0-9]{10}$/.test(data.contactPhone))
      e.contactPhone = "Phone must be 10 digits";

    if (!data.workshopFormat) e.workshopFormat = "Select Workshop Format";
    if (!data.participants) e.participants = "Estimated Participants required";
    if (!data.workshopDuration) e.workshopDuration = "Select Workshop Duration";

    if (data.wellnessGoals.length === 0) e.wellnessGoals = "Select at least one wellness goal";
    if (data.workshopTopics.length === 0) e.workshopTopics = "Select at least one topic";

    if (!data.wellnessChallenge) e.wellnessChallenge = "Select wellness challenge option";
    if (!data.followUpSupport) e.followUpSupport = "Select follow-up support option";
    if (!data.radioOption) e.radioOption = "Select an option";

    if (data.resources.length === 0) e.resources = "Select at least one resource type";
    if (!data.programmeFee) e.programmeFee = "Select programme fee";
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
      toast.error("Please correct errors");
      return;
    }

    setLoading(true);
    try {
      let amount = 499;
      await registerUser({ name: data.companyName, email:data.contactEmail, phoneNumber:data.contactPhone, reason:"Corporate Nutrition Programme" });
      const order = await createOrder({amount});
      await openRazorpay({ order, name: data.companyName, email:data.contactEmail, phoneNumber:data.contactPhone, amount });
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
          Corporate Nutrition Programme
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Company Info */}
          {[
            ["Company Name", "companyName"],
            ["Company Address", "companyAddress"],
            ["Number of Employees", "numEmployees"],
            ["Contact Person Name", "contactName"],
            ["Contact Email", "contactEmail"],
            ["Contact Phone Number", "contactPhone"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={
                  field === "contactEmail"
                    ? "email"
                    : field === "contactPhone" || field === "numEmployees"
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

          {/* Industry Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Industry Type</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              value={data.industryType}
              onChange={(e) => updateField("industryType", e.target.value)}
            >
              <option value="">Select</option>
              <option>IT</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Finance</option>
              <option>Other</option>
            </select>
            <input
              type="text"
              placeholder="Other (optional)"
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.otherIndustry}
              onChange={(e) => updateField("otherIndustry", e.target.value)}
            />
            {errors.industryType && (
              <p className="text-red-500 text-xs mt-1">{errors.industryType}</p>
            )}
          </div>

          {/* Workshop Format - Radio */}
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Workshop Format</label>
            <div className="space-y-2">
              {["In-person", "Virtual", "Hybrid"].map((fmt) => (
                <label key={fmt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="workshopFormat"
                    value={fmt}
                    checked={data.workshopFormat === fmt}
                    onChange={() => updateField("workshopFormat", fmt)}
                  />
                  <span className="text-sm">{fmt}</span>
                </label>
              ))}
            </div>
            {errors.workshopFormat && (
              <p className="text-red-500 text-xs mt-1">{errors.workshopFormat}</p>
            )}
          </div>

          {/* Estimated Participants */}
          <div>
            <label className="block text-sm font-medium mb-1">Estimated Number of Participants</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-[#0C3C3E]"
              value={data.participants}
              onChange={(e) => updateField("participants", e.target.value)}
            />
            {errors.participants && (
              <p className="text-red-500 text-xs mt-1">{errors.participants}</p>
            )}
          </div>

          {/* Workshop Duration - Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Workshop Duration</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              value={data.workshopDuration}
              onChange={(e) => updateField("workshopDuration", e.target.value)}
            >
              <option value="">Select</option>
              <option>1 Hour</option>
              <option>2 Hours</option>
              <option>Half Day</option>
              <option>Full Day</option>
            </select>
            {errors.workshopDuration && (
              <p className="text-red-500 text-xs mt-1">{errors.workshopDuration}</p>
            )}
          </div>

          {/* Wellness Goals */}
          <div>
            <label className="block text-sm font-medium mb-1">Primary Wellness Goals</label>
            <div className="flex flex-wrap gap-2">
              {["Weight Management", "Stress Reduction", "Healthy Eating", "Physical Activity"].map((goal) => (
                <button
                  type="button"
                  key={goal}
                  onClick={() => toggleCheckbox("wellnessGoals", goal)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.wellnessGoals.includes(goal)
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
            {errors.wellnessGoals && (
              <p className="text-red-500 text-xs mt-1">{errors.wellnessGoals}</p>
            )}
          </div>

          {/* Workshop Topics */}
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Workshop Topics</label>
            <div className="flex flex-wrap gap-2">
              {["Nutrition Basics", "Mindful Eating", "Fitness Tips", "Stress Management"].map((topic) => (
                <button
                  type="button"
                  key={topic}
                  onClick={() => toggleCheckbox("workshopTopics", topic)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.workshopTopics.includes(topic)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Other (optional)"
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.otherTopic}
              onChange={(e) => updateField("otherTopic", e.target.value)}
            />
            {errors.workshopTopics && (
              <p className="text-red-500 text-xs mt-1">{errors.workshopTopics}</p>
            )}
          </div>

          {/* Wellness Challenge */}
          <div>
            <label className="block text-sm font-medium mb-1">Customized Wellness Challenge for Employees?</label>
            <div className="space-y-2">
              {["Yes", "No"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="wellnessChallenge"
                    value={opt}
                    checked={data.wellnessChallenge === opt}
                    onChange={() => updateField("wellnessChallenge", opt)}
                  />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
            {errors.wellnessChallenge && (
              <p className="text-red-500 text-xs mt-1">{errors.wellnessChallenge}</p>
            )}
          </div>

          {/* Follow-up Support */}
          <div>
            <label className="block text-sm font-medium mb-1">Follow-up support including progress tracking?</label>
            <div className="space-y-2">
              {["Yes", "No"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="followUpSupport"
                    value={opt}
                    checked={data.followUpSupport === opt}
                    onChange={() => updateField("followUpSupport", opt)}
                  />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
            {errors.followUpSupport && (
              <p className="text-red-500 text-xs mt-1">{errors.followUpSupport}</p>
            )}
          </div>

          {/* Radio Buttons */}
          <div>
            <label className="block text-sm font-medium mb-1">Additional Option</label>
            <div className="space-y-2">
              {["Option 1", "Option 2"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="radioOption"
                    value={opt}
                    checked={data.radioOption === opt}
                    onChange={() => updateField("radioOption", opt)}
                  />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
            {errors.radioOption && (
              <p className="text-red-500 text-xs mt-1">{errors.radioOption}</p>
            )}
          </div>

          {/* Resources */}
          <div>
            <label className="block text-sm font-medium mb-1">Printed Materials or Digital Resources?</label>
            <div className="flex flex-wrap gap-2">
              {["Printed Materials", "Digital Resources"].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => toggleCheckbox("resources", r)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.resources.includes(r)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            {errors.resources && (
              <p className="text-red-500 text-xs mt-1">{errors.resources}</p>
            )}
          </div>

          {/* Programme Fee */}
          <div>
            <label className="block text-sm font-medium mb-1">Programme Fee Selection</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              value={data.programmeFee}
              onChange={(e) => updateField("programmeFee", e.target.value)}
            >
              <option value="">Select</option>
              <option>Standard</option>
              <option>Premium</option>
              <option>Custom</option>
            </select>
            {errors.programmeFee && (
              <p className="text-red-500 text-xs mt-1">{errors.programmeFee}</p>
            )}
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
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
          )}

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#0C3C3E] text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
          >
            {loading ? "Submitting..." : "Enhance Work Health"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CorporateNutritionProgrammeForm;
