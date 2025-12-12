"use client";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import { X, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function BehavioralCoachingForm({ open, setOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactMethod: "",
    coachingGoals: [],
    challenges: "",
    desiredOutcomes: "",
    coachingPackage: "",
    sessionLength: "",
    schedule: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [scriptLoaded, setScriptLoaded] = useState(false);

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
    if (!formData.contactMethod) e.contactMethod = "Choose contact method";
    if (!formData.coachingGoals.length) e.coachingGoals = "Choose at least one goal";
    if (!formData.coachingPackage) e.coachingPackage = "Select coaching package";
    if (!formData.sessionLength) e.sessionLength = "Select session length";
    if (!formData.agree) e.agree = "You must accept the agreement";

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
  const handleSubmit = async(ev) => {
    ev.preventDefault();
    if (!scriptLoaded) return toast.error("Payment gateway still loading, please wait a second");
    if (!validate()) {
      const first = Object.values(errors)[0] || "Please fix the errors";
      toast.error(first);
      return;
    }
    setLoading(true);
    try {
      let amount = 499;
      await registerUser({ name: formData.name, email:formData.email, phoneNumber:formData.phone, reason:"Behavioural Coaching" });
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
        contactMethod: "",
        coachingGoals: [],
        challenges: "",
        desiredOutcomes: "",
        coachingPackage: "",
        sessionLength: "",
        schedule: "",
        agree: false,
      });
      setOpen(false);
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

          <h2 className="text-2xl font-bold text-[#0C3C3E]">Behavioral & Lifestyle Coaching</h2>
          <p className="text-gray-600 mt-1 text-sm">
            Fill out the form and we&apos;ll reach out to start your coaching.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
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

            <div>
              <h3 className="text-sm font-semibold text-[#0C3C3E] mb-2">
                Preferred Contact Method
              </h3>
              <div className="flex gap-3">
                {["Email", "Phone", "WhatsApp"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={opt}
                      checked={formData.contactMethod === opt}
                      onChange={(e) => handleChange("contactMethod", e.target.value)}
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {errors.contactMethod && (
                <p className="text-red-500 text-xs mt-1">{errors.contactMethod}</p>
              )}
            </div>

            <FieldWrapper error={errors.coachingGoals} label="Coaching Goals / Focus Areas">
              <div className="flex flex-wrap gap-2">
                {["Time Management", "Stress Management", "Habit Formation", "Fitness", "Nutrition"].map(
                  (opt) => (
                    <label key={opt} className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-full text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.coachingGoals.includes(opt)}
                        onChange={() => handleCheckbox("coachingGoals", opt)}
                        className="accent-[#0C3C3E] w-4 h-4"
                      />
                      {opt}
                    </label>
                  )
                )}
              </div>
            </FieldWrapper>

            <FieldWrapper label="Specific Challenges You Face (optional)">
              <FloatingTextarea
                label="Challenges"
                value={formData.challenges}
                onChange={(v) => handleChange("challenges", v)}
              />
            </FieldWrapper>

            <FieldWrapper label="Desired Outcomes (optional)">
              <FloatingTextarea
                label="Desired Outcomes"
                value={formData.desiredOutcomes}
                onChange={(v) => handleChange("desiredOutcomes", v)}
              />
            </FieldWrapper>

            <FieldWrapper error={errors.coachingPackage} label="Preferred Coaching Package">
              <div className="flex gap-3">
                {["Standard", "Premium", "VIP"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="coachingPackage"
                      value={opt}
                      checked={formData.coachingPackage === opt}
                      onChange={(e) => handleChange("coachingPackage", e.target.value)}
                      className="accent-[#0C3C3E] w-4 h-4"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </FieldWrapper>

            <FieldWrapper error={errors.sessionLength} label="Preferred Session Length">
              <select
                value={formData.sessionLength}
                onChange={(e) => handleChange("sessionLength", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C3C3E] outline-none text-sm"
              >
                <option value="">Select duration</option>
                <option value="30 min">30 min</option>
                <option value="45 min">45 min</option>
                <option value="60 min">60 min</option>
              </select>
            </FieldWrapper>

            <FieldWrapper label="Preferred Coaching Schedule (optional)">
              <FloatingInput
                label="Schedule"
                value={formData.schedule}
                onChange={(v) => handleChange("schedule", v)}
              />
            </FieldWrapper>

            <div>
              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.agree}
                  onChange={(e) => handleChange("agree", e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#0C3C3E]"
                />
                <span>
                  I confirm the above information is correct and I agree to receive guidance. Not a substitute for medical advice.
                </span>
              </label>
              {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0C3C3E] text-white rounded-xl text-lg font-semibold hover:bg-[#0C3C3Ed2] transition disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Start Coaching"
              )}
            </button>
          </form>
        </div>
      </div>

      {successOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm w-full">
            <CheckCircle className="text-green-600 mx-auto" size={52} />
            <h3 className="text-xl font-semibold mt-3">Request Sent</h3>
            <p className="text-gray-600 mt-2">We&apos;ll contact you soon to start your coaching.</p>
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
        rows={4}
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
