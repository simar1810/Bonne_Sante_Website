"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import { X } from "lucide-react";
import toast from "react-hot-toast";
const SchoolNutritionProgrammeForm = ({ open, setOpen }) => {
  const initialData = {
    schoolName: "",
    schoolAddress: "",
    schoolWebsite: "",
    schoolType: "",
    schoolTypeOther: "",
    medium: "",
    studentCount: "",
    ageGroups: [],
    existingMealProgram: "",
    mealProviders: [],
    mealProviderOther: "",
    mealTypes: [],
    nutritionGuidelines: "",
    interestedServices: [],
    workshopFormat: "",
    workshopAudience: [],
    budgetEstimate: "",
    fundingAssistance: "",
    contactName: "",
    email: "",
    phone: "",
    paymentPlan: "",
    terms: false,
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const updateField = (field, value) => {
    setData((p) => ({ ...p, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const toggleCheckbox = (field, value) => {
    setData((p) => {
      const arr = p[field];
      return {
        ...p,
        [field]: arr.includes(value)
          ? arr.filter((i) => i !== value)
          : [...arr, value],
      };
    });
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e = {};

    if (!data.schoolName.trim()) e.schoolName = "School name is required";
    if (!data.schoolAddress.trim()) e.schoolAddress = "Address is required";

    if (!data.schoolWebsite.trim()) e.schoolWebsite = "Website URL required";
    else if (!/^https?:\/\/.+\..+/.test(data.schoolWebsite))
      e.schoolWebsite = "Invalid URL";

    if (!data.schoolType) e.schoolType = "Select school type";

    if (data.schoolType === "Other" && !data.schoolTypeOther.trim())
      e.schoolTypeOther = "Please specify school type";

    if (!data.medium.trim()) e.medium = "Medium of language required";

    if (!data.studentCount.trim()) e.studentCount = "Student count required";
    else if (!/^[0-9]+$/.test(data.studentCount))
      e.studentCount = "Invalid number";

    if (data.ageGroups.length === 0) e.ageGroups = "Select age groups served";

    if (!data.existingMealProgram)
      e.existingMealProgram = "Select yes or no";

    if (data.mealProviders.length === 0)
      e.mealProviders = "Select at least one meal provider";

    if (data.mealProviders.includes("Other") && !data.mealProviderOther.trim())
      e.mealProviderOther = "Specify the meal provider";

    if (data.mealTypes.length === 0)
      e.mealTypes = "Select at least one meal type";

    if (!data.nutritionGuidelines.trim())
      e.nutritionGuidelines = "Enter current guidelines";

    if (data.interestedServices.length === 0)
      e.interestedServices = "Select services you're interested in";

    if (!data.workshopFormat)
      e.workshopFormat = "Select workshop format";

    if (data.workshopAudience.length === 0)
      e.workshopAudience = "Select workshop audiences";

    if (!data.budgetEstimate)
      e.budgetEstimate = "Select an estimated budget";

    if (!data.fundingAssistance)
      e.fundingAssistance = "Select yes or no";

    if (!data.contactName.trim())
      e.contactName = "Contact name required";

    if (!data.email.trim()) e.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      e.email = "Invalid email";

    if (!data.phone.trim())
      e.phone = "Phone number required";
    else if (!/^[0-9]{7,15}$/.test(data.phone))
      e.phone = "Enter 7–15 digits";

    if (!data.paymentPlan) e.paymentPlan = "Select a payment plan";

    if (!data.terms) e.terms = "You must agree to continue";

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
      toast.error("Please fix the errors to continue");
      return;
    }

    setLoading(true);
     try {
      let amount = 499;
      await registerUser({ name: data.schoolName, email:data.email, phoneNumber:data.phone, reason:"School Nutrition Programme" });
      const order = await createOrder({amount});
      await openRazorpay({ order, name: data.schoolName, email:data.email, phoneNumber:data.phone, amount });
    } catch (err) {
      console.error(err);
      toast.error("Error initiating payment. Please try again.");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
    setData({
    schoolName: "",
    schoolAddress: "",
    schoolWebsite: "",
    schoolType: "",
    schoolTypeOther: "",
    medium: "",
    studentCount: "",
    ageGroups: [],
    existingMealProgram: "",
    mealProviders: [],
    mealProviderOther: "",
    mealTypes: [],
    nutritionGuidelines: "",
    interestedServices: [],
    workshopFormat: "",
    workshopAudience: [],
    budgetEstimate: "",
    fundingAssistance: "",
    contactName: "",
    email: "",
    phone: "",
    paymentPlan: "",
    terms: false,
  })
    setOpen(false);
  };


  const closeModal = () => {
    setOpen(false);
    setErrors({});
  };

  if (!open) return null;


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto relative">

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold text-[#0C3C3E] mb-6 text-center">
          School Nutrition Programme
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* School Name */}
          <div>
            <label className="font-medium text-sm">School Name</label>
            <input
              className="w-full border rounded-lg px-4 py-2"
              value={data.schoolName}
              onChange={(e) => updateField("schoolName", e.target.value)}
            />
            {errors.schoolName && <p className="text-red-500 text-xs">{errors.schoolName}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="font-medium text-sm">School Address</label>
            <textarea
              className="w-full border rounded-lg px-4 py-2"
              rows={3}
              value={data.schoolAddress}
              onChange={(e) => updateField("schoolAddress", e.target.value)}
            ></textarea>
            {errors.schoolAddress && <p className="text-red-500 text-xs">{errors.schoolAddress}</p>}
          </div>

          {/* Website */}
          <div>
            <label className="font-medium text-sm">School Website</label>
            <input
              className="w-full border rounded-lg px-4 py-2"
              placeholder="https://example.com"
              value={data.schoolWebsite}
              onChange={(e) => updateField("schoolWebsite", e.target.value)}
            />
            {errors.schoolWebsite && <p className="text-red-500 text-xs">{errors.schoolWebsite}</p>}
          </div>

          {/* School Type */}
          <div>
            <label className="font-medium text-sm">School Type</label>
            <select
              className="w-full border rounded-lg px-4 py-2"
              value={data.schoolType}
              onChange={(e) => updateField("schoolType", e.target.value)}
            >
              <option value="">Select School Type</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
              <option value="Charter">Charter</option>
              <option value="Other">Other</option>
            </select>
            {errors.schoolType && <p className="text-red-500 text-xs">{errors.schoolType}</p>}

            {data.schoolType === "Other" && (
              <input
                className="w-full border rounded-lg px-4 py-2 mt-2"
                placeholder="Specify school type"
                value={data.schoolTypeOther}
                onChange={(e) => updateField("schoolTypeOther", e.target.value)}
              />
            )}

            {errors.schoolTypeOther && (
              <p className="text-red-500 text-xs">{errors.schoolTypeOther}</p>
            )}
          </div>

          {/* Medium */}
          <div>
            <label className="font-medium text-sm">Medium of Language</label>
            <input
              className="w-full border rounded-lg px-4 py-2"
              value={data.medium}
              onChange={(e) => updateField("medium", e.target.value)}
            />
            {errors.medium && <p className="text-red-500 text-xs">{errors.medium}</p>}
          </div>

          {/* Student Count */}
          <div>
            <label className="font-medium text-sm">Number of Students</label>
            <input
              className="w-full border rounded-lg px-4 py-2"
              value={data.studentCount}
              onChange={(e) => updateField("studentCount", e.target.value)}
            />
            {errors.studentCount && <p className="text-red-500 text-xs">{errors.studentCount}</p>}
          </div>

          {/* Age Groups */}
          <div>
            <label className="font-medium text-sm">Age Groups Served</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["3-5", "6-8", "9-12", "13-15", "16-18"].map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => toggleCheckbox("ageGroups", g)}
                  className={`px-4 py-2 border rounded-full text-sm ${
                    data.ageGroups.includes(g)
                      ? "bg-[#0C3C3E] text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            {errors.ageGroups && <p className="text-red-500 text-xs">{errors.ageGroups}</p>}
          </div>

          {/* Existing Program */}
          <div>
            <label className="font-medium text-sm">
              Existing Meal Program?
            </label>
            <div className="flex gap-6 mt-1">
              {["Yes", "No"].map((v) => (
                <label key={v} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={data.existingMealProgram === v}
                    onChange={() => updateField("existingMealProgram", v)}
                  />
                  {v}
                </label>
              ))}
            </div>
            {errors.existingMealProgram && (
              <p className="text-red-500 text-xs">{errors.existingMealProgram}</p>
            )}
          </div>

          {/* Meal Providers */}
          <div>
            <label className="font-medium text-sm">Who Provides the Meals?</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["In-House Kitchen", "Caterer", "Government Scheme", "Other"].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => toggleCheckbox("mealProviders", p)}
                  className={`px-4 py-2 border rounded-full text-sm ${
                    data.mealProviders.includes(p)
                      ? "bg-[#0C3C3E] text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {data.mealProviders.includes("Other") && (
              <input
                className="w-full border rounded-lg px-4 py-2 mt-2"
                placeholder="Specify provider"
                value={data.mealProviderOther}
                onChange={(e) => updateField("mealProviderOther", e.target.value)}
              />
            )}

            {errors.mealProviders && (
              <p className="text-red-500 text-xs">{errors.mealProviders}</p>
            )}
            {errors.mealProviderOther && (
              <p className="text-red-500 text-xs">{errors.mealProviderOther}</p>
            )}
          </div>

          {/* Meal Types */}
          <div>
            <label className="font-medium text-sm">Meal Types Offered</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Breakfast", "Lunch", "Snacks", "Dinner"].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => toggleCheckbox("mealTypes", m)}
                  className={`px-4 py-2 border rounded-full text-sm ${
                    data.mealTypes.includes(m)
                      ? "bg-[#0C3C3E] text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            {errors.mealTypes && <p className="text-red-500 text-xs">{errors.mealTypes}</p>}
          </div>

          {/* Guidelines */}
          <div>
            <label className="font-medium text-sm">Current Nutrition Guidelines Followed</label>
            <textarea
              className="w-full border rounded-lg px-4 py-2"
              rows={3}
              value={data.nutritionGuidelines}
              onChange={(e) => updateField("nutritionGuidelines", e.target.value)}
            />
            {errors.nutritionGuidelines && (
              <p className="text-red-500 text-xs">{errors.nutritionGuidelines}</p>
            )}
          </div>

          {/* Interested Services */}
          <div>
            <label className="font-medium text-sm">Services You Are Interested In</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "Menu Planning",
                "Nutrition Workshops",
                "Staff Training",
                "Dietary Assessment",
                "Food Safety Training"
              ].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleCheckbox("interestedServices", s)}
                  className={`px-4 py-2 border rounded-full text-sm ${
                    data.interestedServices.includes(s)
                      ? "bg-[#0C3C3E] text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {errors.interestedServices && (
              <p className="text-red-500 text-xs">{errors.interestedServices}</p>
            )}
          </div>

          {/* Workshop Format */}
          <div>
            <label className="font-medium text-sm">Preferred Workshop Format</label>
            <select
              className="w-full border rounded-lg px-4 py-2"
              value={data.workshopFormat}
              onChange={(e) => updateField("workshopFormat", e.target.value)}
            >
              <option value="">Select Format</option>
              <option value="Online">Online</option>
              <option value="On-Campus">On-Campus</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {errors.workshopFormat && (
              <p className="text-red-500 text-xs">{errors.workshopFormat}</p>
            )}
          </div>

          {/* Workshop Audience */}
          <div>
            <label className="font-medium text-sm">Workshop Target Audience</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Students", "Teachers", "Parents", "Staff"].map((a) => (
                <button
                  type="button"
                  key={a}
                  onClick={() => toggleCheckbox("workshopAudience", a)}
                  className={`px-4 py-2 border rounded-full text-sm ${
                    data.workshopAudience.includes(a)
                      ? "bg-[#0C3C3E] text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            {errors.workshopAudience && (
              <p className="text-red-500 text-xs">{errors.workshopAudience}</p>
            )}
          </div>

          {/* Budget */}
          <div>
            <label className="font-medium text-sm">Estimated Budget</label>
            <select
              className="w-full border rounded-lg px-4 py-2"
              value={data.budgetEstimate}
              onChange={(e) => updateField("budgetEstimate", e.target.value)}
            >
              <option value="">Select Budget Range</option>
              <option value="₹10,000–₹50,000">₹10,000–₹50,000</option>
              <option value="₹50,000–₹1,00,000">₹50,000–₹1,00,000</option>
              <option value="₹1,00,000+">₹1,00,000+</option>
            </select>
            {errors.budgetEstimate && (
              <p className="text-red-500 text-xs">{errors.budgetEstimate}</p>
            )}
          </div>

          {/* Funding Assistance */}
          <div>
            <label className="font-medium text-sm">Interested in Grants/Funding?</label>
            <div className="flex gap-6 mt-1">
              {["Yes", "No"].map((v) => (
                <label key={v} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={data.fundingAssistance === v}
                    onChange={() => updateField("fundingAssistance", v)}
                  />
                  {v}
                </label>
              ))}
            </div>
            {errors.fundingAssistance && (
              <p className="text-red-500 text-xs">{errors.fundingAssistance}</p>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <label className="font-medium text-sm">Point of Contact Name</label>
            <input
              className="w-full border rounded-lg px-4 py-2"
              value={data.contactName}
              onChange={(e) => updateField("contactName", e.target.value)}
            />
            {errors.contactName && (
              <p className="text-red-500 text-xs">{errors.contactName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-sm">Email</label>
            <input
              className="w-full border rounded-lg px-4 py-2"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div>
            <label className="font-medium text-sm">Phone</label>
            <input
              className="w-full border rounded-lg px-4 py-2"
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>
          <div>
            <label className="font-medium text-sm">Payment Plan Options</label>
            <select
              className="w-full border rounded-lg px-4 py-2"
              value={data.paymentPlan}
              onChange={(e) => updateField("paymentPlan", e.target.value)}
            >
              <option value="">Select Payment Plan</option>
              <option value="One-Time">One-Time</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
            </select>
            {errors.paymentPlan && (
              <p className="text-red-500 text-xs">{errors.paymentPlan}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={data.terms}
                onChange={() => updateField("terms", !data.terms)}
              />
              I agree to the Terms & Conditions
            </label>
            {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#0C3C3E] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#082b2c] transition"
          >
            {loading ? "Processing..." : "Build Healthy Futures"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default SchoolNutritionProgrammeForm;
