"use client";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
const GeneticNutritionForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    dnaTest: "",
    healthGoals: [],
    allergies: "",
    dietStyles: [],
    programDuration: "",
    consultationMethod: "",
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
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email format";

    if (!data.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[0-9]{7,15}$/.test(data.phone))
      e.phone = "Phone must be 7–15 digits";

    if (!data.dob) e.dob = "Date of Birth is required";

    if (!data.gender) e.gender = "Gender is required";

    if (!data.dnaTest) e.dnaTest = "Please select an option";

    if (data.healthGoals.length === 0)
      e.healthGoals = "Select at least one health goal";

    if (!data.allergies.trim())
      e.allergies = "Please enter known allergies or N/A";

    if (data.dietStyles.length === 0)
      e.dietStyles = "Select at least one dietary style";

    if (!data.programDuration) e.programDuration = "Select duration";

    if (!data.consultationMethod)
      e.consultationMethod = "Select a consultation method";

    if (!data.terms) e.terms = "You must accept the terms";

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
      toast.error(first || "Fix all errors to continue");
      return;
    }

    setLoading(true);
    try {
      let amount = 499;
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"Genetic nutrition" });
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
    dnaTest: "",
    healthGoals: [],
    allergies: "",
    dietStyles: [],
    programDuration: "",
    consultationMethod: "",
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-xl relative">

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#0C3C3E] mb-4 text-center">
          Genetic Nutrition Assessment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              className="w-full border rounded-lg px-4 py-3 text-sm"
              value={data.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              className="w-full border rounded-lg px-4 py-3 text-sm"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              className="w-full border rounded-lg px-4 py-3 text-sm"
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              className="w-full border rounded-lg px-4 py-3 text-sm"
              value={data.dob}
              onChange={(e) => updateField("dob", e.target.value)}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              className="w-full border rounded-lg px-4 py-3 text-sm"
              value={data.gender}
              onChange={(e) => updateField("gender", e.target.value)}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Completed a DNA Test?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={data.dnaTest === o}
                    onChange={() => updateField("dnaTest", o)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.dnaTest && (
              <p className="text-red-500 text-xs mt-1">{errors.dnaTest}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Main Health Goals
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Weight Loss",
                "Muscle Gain",
                "Energy Boost",
                "Hormone Balance",
                "Longevity",
              ].map((goal) => (
                <button
                  type="button"
                  key={goal}
                  onClick={() => toggleCheckbox("healthGoals", goal)}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    data.healthGoals.includes(goal)
                      ? "bg-[#0C3C3E] text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
            {errors.healthGoals && (
              <p className="text-red-500 text-xs mt-1">{errors.healthGoals}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Known Food Sensitivities / Allergies
            </label>
            <input
              className="w-full border rounded-lg px-4 py-3 text-sm"
              value={data.allergies}
              onChange={(e) => updateField("allergies", e.target.value)}
            />
            {errors.allergies && (
              <p className="text-red-500 text-xs mt-1">{errors.allergies}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Dietary Styles
            </label>
            <div className="flex flex-wrap gap-2">
              {["Keto", "Vegan", "Mediterranean", "Paleo", "Balanced"].map(
                (style) => (
                  <button
                    type="button"
                    key={style}
                    onClick={() => toggleCheckbox("dietStyles", style)}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      data.dietStyles.includes(style)
                        ? "bg-[#0C3C3E] text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {style}
                  </button>
                )
              )}
            </div>
            {errors.dietStyles && (
              <p className="text-red-500 text-xs mt-1">{errors.dietStyles}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Program Duration
            </label>
            <div className="flex gap-4">
              {["4 Weeks", "8 Weeks", "12 Weeks"].map((d) => (
                <label key={d} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={data.programDuration === d}
                    onChange={() => updateField("programDuration", d)}
                  />
                  {d}
                </label>
              ))}
            </div>
            {errors.programDuration && (
              <p className="text-red-500 text-xs mt-1">
                {errors.programDuration}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Consultation Method
            </label>
            <select
              className="w-full border rounded-lg px-4 py-3 text-sm"
              value={data.consultationMethod}
              onChange={(e) =>
                updateField("consultationMethod", e.target.value)
              }
            >
              <option value="">Select Method</option>
              <option>Video Call</option>
              <option>Phone Call</option>
              <option>In-Person</option>
            </select>
            {errors.consultationMethod && (
              <p className="text-red-500 text-xs mt-1">
                {errors.consultationMethod}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.terms}
                onChange={() => updateField("terms", !data.terms)}
              />
              <span className="text-sm">I agree to the Terms & Conditions</span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#0C3C3E] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#092d2f] transition"
          >
            {loading ? "Processing..." : "Discover My Plan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneticNutritionForm;
