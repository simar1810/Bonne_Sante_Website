"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import { X } from "lucide-react";

const HealthyRestaurantKitchenForm = ({ open, setOpen }) => {
  const initialData = {
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    cuisine: "",
    menuStyle: [],
    healthyOptions: "",
    goals: [],
    interests: [],
    staffCount: "",
    staffExperience: "",
    organicSourcing: "",
    budget: "",
    timeline: "",
    plan: "",
    terms: false,
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const toggleCheckbox = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((i) => i !== value)
        : [...prev[field], value],
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};

    if (!data.restaurantName.trim()) e.restaurantName = "Restaurant name is required";
    if (!data.ownerName.trim()) e.ownerName = "Owner/Manager name is required";

    if (!data.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email";

    if (!data.phone.trim()) e.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(data.phone))
      e.phone = "Phone must be 10 digits";

    if (!data.location.trim()) e.location = "Location is required";

    if (data.website && !/^https?:\/\/\S+$/.test(data.website))
      e.website = "Enter a valid URL";

    if (!data.cuisine) e.cuisine = "Select cuisine type";

    if (data.menuStyle.length === 0)
      e.menuStyle = "Select at least one menu style";

    if (!data.healthyOptions)
      e.healthyOptions = "Select an option";

    if (data.goals.length === 0)
      e.goals = "Select at least one goal";

    if (data.interests.length === 0)
      e.interests = "Select at least one program interest";

    if (!data.staffCount) e.staffCount = "Enter staff count";
    else if (isNaN(data.staffCount)) e.staffCount = "Must be a valid number";

    if (!data.staffExperience)
      e.staffExperience = "Select an option";

    if (!data.organicSourcing)
      e.organicSourcing = "Select an option";

    if (!data.budget) e.budget = "Select a budget";

    if (!data.timeline) e.timeline = "Select a timeline";

    if (!data.plan) e.plan = "Select a plan";

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
      toast.error(first || "Please correct all errors.");
      return;
    }

    setLoading(true);
    try {
      let amount = 499;
      await registerUser({ name: data.restaurantName, email:data.email, phoneNumber:data.phone, reason:"Healthy Resturant kitchen" });
      const order = await createOrder({amount});
      await openRazorpay({ order, name: data.restaurantName, email:data.email, phoneNumber:data.phone, amount });
    } catch (err) {
      console.error(err);
      toast.error("Error initiating payment. Please try again.");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
    setData({
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    cuisine: "",
    menuStyle: [],
    healthyOptions: "",
    goals: [],
    interests: [],
    staffCount: "",
    staffExperience: "",
    organicSourcing: "",
    budget: "",
    timeline: "",
    plan: "",
    terms: false,
  })
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

        {/* Close */}
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-[#0C3C3E]">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center text-[#0C3C3E] mb-6">
          Healthy Restaurant Kitchen Setup Programme
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Text Inputs */}
          {[
            ["Restaurant Name", "restaurantName"],
            ["Owner/Manager Name", "ownerName"],
            ["Email", "email"],
            ["Phone", "phone"],
            ["Restaurant Location", "location"],
            ["Restaurant Website", "website"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-[#0C3C3E]"
                value={data[field]}
                onChange={(e) => updateField(field, e.target.value)}
              />
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Cuisine */}
          <div>
            <label className="block text-sm font-medium mb-1">Type of Cuisine</label>
            <select
              value={data.cuisine}
              onChange={(e) => updateField("cuisine", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-[#0C3C3E]"
            >
              <option value="">Select</option>
              <option>Indian</option>
              <option>Italian</option>
              <option>Chinese</option>
              <option>Continental</option>
              <option>Mediterranean</option>
              <option>Multi-Cuisine</option>
            </select>
            {errors.cuisine && <p className="text-red-500 text-xs mt-1">{errors.cuisine}</p>}
          </div>

          {/* Menu Style */}
          <div>
            <label className="block text-sm font-medium mb-1">Current Menu Style</label>

            <div className="flex flex-wrap gap-2">
              {[
                "À la carte",
                "Buffet",
                "Combo Meals",
                "Specialty Menu",
                "Seasonal Menu",
                "Healthy Menu",
              ].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleCheckbox("menuStyle", item)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.menuStyle.includes(item)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {errors.menuStyle && <p className="text-red-500 text-xs mt-1">{errors.menuStyle}</p>}
          </div>

          {/* Healthy Options Radio */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Do you currently offer healthy menu options?
            </label>
            <div className="flex gap-4 text-sm">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={data.healthyOptions === o}
                    onChange={() => updateField("healthyOptions", o)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.healthyOptions && (
              <p className="text-red-500 text-xs mt-1">{errors.healthyOptions}</p>
            )}
          </div>

          {/* Goals */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Primary Goals for This Program
            </label>

            <div className="flex flex-wrap gap-2">
              {[
                "Improve Food Quality",
                "Add Healthy Recipes",
                "Calorie-Measured Meals",
                "Upgrade Kitchen Equipment",
                "Train Staff in Healthy Cooking",
                "Create Diet-Friendly Menu",
              ].map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => toggleCheckbox("goals", g)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.goals.includes(g)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {errors.goals && <p className="text-red-500 text-xs mt-1">{errors.goals}</p>}
          </div>

          {/* Program Interests */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Which program aspects interest you most?
            </label>

            <div className="flex flex-wrap gap-2">
              {[
                "Menu Engineering",
                "Kitchen Layout Optimization",
                "Ingredient Sourcing Guidance",
                "Healthy Cooking Workshops",
                "Staff Skill Development",
                "Calorie & Nutrition Standardization",
              ].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleCheckbox("interests", item)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.interests.includes(item)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {errors.interests && <p className="text-red-500 text-xs mt-1">{errors.interests}</p>}
          </div>

          {/* Staff Count */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Number of Chefs & Kitchen Staff
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={data.staffCount}
              onChange={(e) => updateField("staffCount", e.target.value)}
            />
            {errors.staffCount && <p className="text-red-500 text-xs mt-1">{errors.staffCount}</p>}
          </div>

          {/* Staff Experience */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Do your staff have experience with healthy cooking techniques?
            </label>
            <div className="flex gap-4 text-sm">
              {["Yes", "No"].map((o) => (
                <label key={o} className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={data.staffExperience === o}
                    onChange={() => updateField("staffExperience", o)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.staffExperience && (
              <p className="text-red-500 text-xs mt-1">{errors.staffExperience}</p>
            )}
          </div>

          {/* Organic Sourcing */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Do you currently source organic or sustainable ingredients?
            </label>
            <div className="flex gap-4 text-sm">
              {["Yes", "No", "Partially"].map((o) => (
                <label key={o} className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={data.organicSourcing === o}
                    onChange={() => updateField("organicSourcing", o)}
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.organicSourcing && (
              <p className="text-red-500 text-xs mt-1">{errors.organicSourcing}</p>
            )}
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Estimated Budget for Kitchen Transformation
            </label>
            <select
              value={data.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            >
              <option value="">Select</option>
              <option>₹50,000 – ₹1,00,000</option>
              <option>₹1,00,000 – ₹3,00,000</option>
              <option>₹3,00,000 – ₹5,00,000</option>
              <option>₹5,00,000+</option>
            </select>
            {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Timeline for Implementation
            </label>
            <select
              value={data.timeline}
              onChange={(e) => updateField("timeline", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            >
              <option value="">Select</option>
              <option>1–2 Weeks</option>
              <option>1 Month</option>
              <option>3 Months</option>
              <option>6 Months</option>
            </select>
            {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline}</p>}
          </div>

          {/* Plan */}
          <div>
            <label className="block text-sm font-medium mb-1">Choose Your Plan</label>
            <select
              value={data.plan}
              onChange={(e) => updateField("plan", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            >
              <option value="">Select</option>
              <option>Basic Kitchen Upgrade</option>
              <option>Professional Healthy Kitchen Package</option>
              <option>Premium Total Kitchen Transformation</option>
            </select>
            {errors.plan && <p className="text-red-500 text-xs mt-1">{errors.plan}</p>}
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={data.terms}
              onChange={() => updateField("terms", !data.terms)}
            />
            <span>I agree to the Terms and Conditions</span>
          </div>
          {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#0C3C3E] text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900"
          >
            {loading ? "Processing..." : "Revolutionize Your Kitchen"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HealthyRestaurantKitchenForm;
