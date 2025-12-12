"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const CommunityNutritionProgrammeForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    organizationName: "",
    role: "",
    otherRole: "",
    communityInfo: "",
    participants: "",
    ageGroups: [],
    otherAgeGroup: "",
    keyChallenges: [],
    otherChallenge: "",
    workshopTopics: [],
    otherTopic: "",
    workshopFormat: "",
    workshopDuration: "",
    resources: [],
    funding: "",
    partnerships: "",
    programme: "",
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


  const validate = () => {
    const e = {};

    if (!data.name.trim()) e.name = "Organizer Name is required";
    if (!data.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email";

    if (!data.phone.trim()) e.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(data.phone))
      e.phone = "Phone must be 10 digits";

    if (!data.organizationName.trim())
      e.organizationName = "Organization Name is required";
    if (!data.role) e.role = "Role is required";

    if (!data.communityInfo.trim())
      e.communityInfo = "Community Name and Location required";

    if (!data.participants) e.participants = "Number of participants required";

    if (data.ageGroups.length === 0) e.ageGroups = "Select at least one age group";
    if (data.keyChallenges.length === 0) e.keyChallenges = "Select at least one challenge";
    if (data.workshopTopics.length === 0) e.workshopTopics = "Select at least one topic";

    if (!data.workshopFormat) e.workshopFormat = "Select a format";
    if (!data.workshopDuration) e.workshopDuration = "Select a duration";
    if (data.resources.length === 0) e.resources = "Select at least one resource type";

    if (!data.funding) e.funding = "Select funding option";
    if (!data.partnerships) e.partnerships = "Select partnership option";
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
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"Community Nutrition Programme" });
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
    organizationName: "",
    role: "",
    otherRole: "",
    communityInfo: "",
    participants: "",
    ageGroups: [],
    otherAgeGroup: "",
    keyChallenges: [],
    otherChallenge: "",
    workshopTopics: [],
    otherTopic: "",
    workshopFormat: "",
    workshopDuration: "",
    resources: [],
    funding: "",
    partnerships: "",
    programme: "",
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
          Community Nutrition Programme
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Organizer Info */}
          {[
            ["Organizer Name", "name"],
            ["Email", "email"],
            ["Phone Number", "phone"],
            ["Organization Name", "organizationName"],
            ["Community Name and Location", "communityInfo"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={field === "email" ? "email" : "text"}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-[#0C3C3E]"
                value={data[field]}
                onChange={(e) => updateField(field, e.target.value)}
              />
              {errors[field] && (
                <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1">Role in Community</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              value={data.role}
              onChange={(e) => updateField("role", e.target.value)}
            >
              <option value="">Select</option>
              <option>Leader</option>
              <option>Volunteer</option>
              <option>Health Professional</option>
              <option>Other</option>
            </select>
            <input
              type="text"
              placeholder="Other (optional)"
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.otherRole}
              onChange={(e) => updateField("otherRole", e.target.value)}
            />
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
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

          {/* Age Groups */}
          <div>
            <label className="block text-sm font-medium mb-1">Age Groups Targeted</label>
            <div className="flex flex-wrap gap-2">
              {["Children", "Teens", "Adults", "Seniors"].map((age) => (
                <button
                  type="button"
                  key={age}
                  onClick={() => toggleCheckbox("ageGroups", age)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.ageGroups.includes(age)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Other (optional)"
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.otherAgeGroup}
              onChange={(e) => updateField("otherAgeGroup", e.target.value)}
            />
            {errors.ageGroups && (
              <p className="text-red-500 text-xs mt-1">{errors.ageGroups}</p>
            )}
          </div>

          {/* Key Health Challenges */}
          <div>
            <label className="block text-sm font-medium mb-1">Key Health Challenges</label>
            <div className="flex flex-wrap gap-2">
              {["Malnutrition", "Obesity", "Diabetes", "Hypertension", "Other"].map((ch) => (
                <button
                  type="button"
                  key={ch}
                  onClick={() => toggleCheckbox("keyChallenges", ch)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.keyChallenges.includes(ch)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Other (optional)"
              className="mt-2 w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.otherChallenge}
              onChange={(e) => updateField("otherChallenge", e.target.value)}
            />
            {errors.keyChallenges && (
              <p className="text-red-500 text-xs mt-1">{errors.keyChallenges}</p>
            )}
          </div>

          {/* Workshop Topics */}
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Workshop Topics</label>
            <div className="flex flex-wrap gap-2">
              {["Nutrition Basics", "Cooking Demonstrations", "Community Health Awareness", "Physical Activity"].map((topic) => (
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

          {/* Funding */}
          <div>
            <label className="block text-sm font-medium mb-1">Do you need funding or sponsorship assistance?</label>
            <div className="space-y-2">
              {["Yes", "No"].map((f) => (
                <label key={f} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="funding"
                    value={f}
                    checked={data.funding === f}
                    onChange={() => updateField("funding", f)}
                  />
                  <span className="text-sm">{f}</span>
                </label>
              ))}
            </div>
            {errors.funding && (
              <p className="text-red-500 text-xs mt-1">{errors.funding}</p>
            )}
          </div>

          {/* Partnerships */}
          <div>
            <label className="block text-sm font-medium mb-1">Open to partnerships with local businesses or health organizations?</label>
            <div className="space-y-2">
              {["Yes", "No"].map((p) => (
                <label key={p} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="partnerships"
                    value={p}
                    checked={data.partnerships === p}
                    onChange={() => updateField("partnerships", p)}
                  />
                  <span className="text-sm">{p}</span>
                </label>
              ))}
            </div>
            {errors.partnerships && (
              <p className="text-red-500 text-xs mt-1">{errors.partnerships}</p>
            )}
          </div>

          {/* Programme Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Programme Selection (if applicable)</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
              value={data.programme}
              onChange={(e) => updateField("programme", e.target.value)}
            >
              <option value="">Select</option>
              <option>Nutrition Awareness</option>
              <option>Weight Management</option>
              <option>Diabetes Prevention</option>
            </select>
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
            {loading ? "Submitting..." : "Learn More"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CommunityNutritionProgrammeForm;
