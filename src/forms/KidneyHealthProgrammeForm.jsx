"use client";

import { useState, useEffect } from "react";
import { createOrder, openRazorpay, registerUser } from "@/utils/payment";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const KidneyHealthProgrammeForm = ({ open, setOpen }) => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",

    diagnosedKidney: "",
    diagnosis: "",
    ckdStage: "",

    onDialysis: "",
    medicalConditions: [],
    otherMedicalCondition: "",

    medications: "",

    dietTypes: [],
    otherDiet: "",

    dietaryRestrictions: [],
    otherRestriction: "",

    waterIntake: "",

    dietaryChallenges: [],
    otherChallenge: "",

    mealPlanPreferences: [],

    fluidGuidance: "",
    snackGuidance: "",
    mealPrepHelp: "",
    bpDiabetesGuidance: "",

    packageSelection: "",
    agreeTerms: false,
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const updateField = (field, value) => {
    setData((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const toggleCheckbox = (field, value) => {
    setData((prev) => {
      const arr = Array.isArray(prev[field]) ? [...prev[field]] : [];
      const next = arr.includes(value)
        ? arr.filter((a) => a !== value)
        : [...arr, value];
      return { ...prev, [field]: next };
    });
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const safeTrim = (v) => (typeof v === "string" ? v.trim() : "");

  const validate = () => {
    const e = {};

    if (!safeTrim(data.name)) e.name = "Name is required";

    if (!safeTrim(data.email)) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      e.email = "Invalid email";

    if (!safeTrim(data.phone)) e.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(data.phone))
      e.phone = "Phone must be 10 digits";

    if (!safeTrim(data.dob)) e.dob = "Date of birth is required";

    if (!data.gender) e.gender = "Select gender";

    if (!data.diagnosedKidney)
      e.diagnosedKidney = "Please indicate kidney diagnosis status";

    if (data.diagnosedKidney === "Yes" && !safeTrim(data.diagnosis))
      e.diagnosis = "Please enter diagnosis";

    if (!data.ckdStage)
      e.ckdStage = "Select CKD stage";

    if (!data.onDialysis)
      e.onDialysis = "Select dialysis status";

    if (data.medicalConditions.length === 0)
      e.medicalConditions = "Select at least one medical condition";

    if (!safeTrim(data.medications))
      e.medications = "Please enter medications";

    if (data.dietTypes.length === 0)
      e.dietTypes = "Select at least one diet type";

    if (data.dietaryRestrictions.length === 0)
      e.dietaryRestrictions = "Select at least one restriction";

    if (!safeTrim(data.waterIntake))
      e.waterIntake = "Enter water intake";

    if (data.dietaryChallenges.length === 0)
      e.dietaryChallenges = "Select at least one challenge";

    if (data.mealPlanPreferences.length === 0)
      e.mealPlanPreferences = "Select at least one meal plan preference";

    if (!data.fluidGuidance)
      e.fluidGuidance = "Select fluid intake guidance option";

    if (!data.snackGuidance)
      e.snackGuidance = "Select snack recommendation option";

    if (!data.mealPrepHelp)
      e.mealPrepHelp = "Select meal preparation assistance option";

    if (!data.bpDiabetesGuidance)
      e.bpDiabetesGuidance =
        "Select BP/diabetes guidance option";

    if (!data.packageSelection)
      e.packageSelection = "Select a package";

    if (!data.agreeTerms)
      e.agreeTerms = "You must accept terms";

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
      const first = Object.values(errors)[0] || "Please fix the errors.";
      toast.error(first);
      return;
    }

    setLoading(true);
    try {
      let amount = 499;
      await registerUser({ name: data.name, email:data.email, phoneNumber:data.phone, reason:"Kidney Health" });
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

    diagnosedKidney: "",
    diagnosis: "",
    ckdStage: "",

    onDialysis: "",
    medicalConditions: [],
    otherMedicalCondition: "",

    medications: "",

    dietTypes: [],
    otherDiet: "",

    dietaryRestrictions: [],
    otherRestriction: "",

    waterIntake: "",

    dietaryChallenges: [],
    otherChallenge: "",

    mealPlanPreferences: [],

    fluidGuidance: "",
    snackGuidance: "",
    mealPrepHelp: "",
    bpDiabetesGuidance: "",

    packageSelection: "",
    agreeTerms: false,
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
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 shadow-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#0C3C3E]"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center text-[#0C3C3E] mb-6">
          Kidney Health Nutrition Programme
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              className="w-full border rounded-lg p-2 text-sm"
              value={data.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-2 text-sm"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              className="w-full border rounded-lg p-2 text-sm"
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2 text-sm"
              value={data.dob}
              onChange={(e) => updateField("dob", e.target.value)}
            />
            {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}
          </div>

          {/* GENDER */}
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              className="w-full border rounded-lg p-2 text-sm"
              value={data.gender}
              onChange={(e) => updateField("gender", e.target.value)}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
          </div>

          {/* DIAGNOSED KIDNEY */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Do you have a diagnosed kidney condition?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label className="flex items-center gap-2 text-sm" key={o}>
                  <input
                    type="radio"
                    name="diagnosedKidney"
                    value={o}
                    checked={data.diagnosedKidney === o}
                    onChange={(e) =>
                      updateField("diagnosedKidney", e.target.value)
                    }
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.diagnosedKidney && (
              <p className="text-red-500 text-xs">{errors.diagnosedKidney}</p>
            )}
          </div>

          {/* DIAGNOSIS */}
          {data.diagnosedKidney === "Yes" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                What is your diagnosis?
              </label>
              <input
                className="w-full border rounded-lg p-2 text-sm"
                value={data.diagnosis}
                onChange={(e) => updateField("diagnosis", e.target.value)}
              />
              {errors.diagnosis && (
                <p className="text-red-500 text-xs">{errors.diagnosis}</p>
              )}
            </div>
          )}

          {/* CKD STAGE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Stage of Chronic Kidney Disease (CKD)
            </label>
            <select
              className="w-full border rounded-lg p-2 text-sm"
              value={data.ckdStage}
              onChange={(e) => updateField("ckdStage", e.target.value)}
            >
              <option value="">Select</option>
              <option>Stage 1</option>
              <option>Stage 2</option>
              <option>Stage 3</option>
              <option>Stage 4</option>
              <option>Stage 5</option>
              <option>Unknown</option>
            </select>
            {errors.ckdStage && (
              <p className="text-red-500 text-xs">{errors.ckdStage}</p>
            )}
          </div>

          {/* DIALYSIS */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Are you currently on dialysis?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label className="flex items-center gap-2 text-sm" key={o}>
                  <input
                    type="radio"
                    name="onDialysis"
                    value={o}
                    checked={data.onDialysis === o}
                    onChange={(e) =>
                      updateField("onDialysis", e.target.value)
                    }
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.onDialysis && (
              <p className="text-red-500 text-xs">{errors.onDialysis}</p>
            )}
          </div>

          {/* MEDICAL CONDITIONS */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Other Medical Conditions
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Diabetes",
                "High Blood Pressure",
                "Heart Disease",
                "Thyroid Issues",
                "Digestive Problems",
                "Obesity",
              ].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() =>
                    toggleCheckbox("medicalConditions", opt)
                  }
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.medicalConditions.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.medicalConditions && (
              <p className="text-red-500 text-xs">
                {errors.medicalConditions}
              </p>
            )}
          </div>

          {/* OTHER MEDICAL CONDITION */}
          <div>
            <label className="block text-sm font-medium mb-1">Other</label>
            <input
              className="w-full border rounded-lg p-2 text-sm"
              value={data.otherMedicalCondition}
              onChange={(e) =>
                updateField("otherMedicalCondition", e.target.value)
              }
            />
          </div>

          {/* MEDICATIONS */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Medications You Take for Kidney Health
            </label>
            <input
              className="w-full border rounded-lg p-2 text-sm"
              value={data.medications}
              onChange={(e) => updateField("medications", e.target.value)}
            />
            {errors.medications && (
              <p className="text-red-500 text-xs">{errors.medications}</p>
            )}
          </div>

          {/* DIET TYPE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Current Diet Type
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Vegetarian",
                "Vegan",
                "Non-Vegetarian",
                "Low Sodium Diet",
                "Low Protein Diet",
                "Renal Diet",
              ].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleCheckbox("dietTypes", opt)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.dietTypes.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.dietTypes && (
              <p className="text-red-500 text-xs">{errors.dietTypes}</p>
            )}
          </div>

          {/* OTHER DIET */}
          <div>
            <label className="block text-sm font-medium mb-1">Other</label>
            <input
              className="w-full border rounded-lg p-2 text-sm"
              value={data.otherDiet}
              onChange={(e) => updateField("otherDiet", e.target.value)}
            />
          </div>

          {/* DIETARY RESTRICTIONS */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Dietary Restrictions
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Low Potassium",
                "Low Phosphorus",
                "Low Sodium",
                "Gluten-Free",
                "Lactose-Free",
              ].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() =>
                    toggleCheckbox("dietaryRestrictions", opt)
                  }
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.dietaryRestrictions.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.dietaryRestrictions && (
              <p className="text-red-500 text-xs">
                {errors.dietaryRestrictions}
              </p>
            )}
          </div>

          {/* OTHER RESTRICTION */}
          <div>
            <label className="block text-sm font-medium mb-1">Other</label>
            <input
              className="w-full border rounded-lg p-2 text-sm"
              value={data.otherRestriction}
              onChange={(e) =>
                updateField("otherRestriction", e.target.value)
              }
            />
          </div>

          {/* WATER INTAKE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              How much water do you consume daily?
            </label>
            <input
              className="w-full border rounded-lg p-2 text-sm"
              value={data.waterIntake}
              onChange={(e) => updateField("waterIntake", e.target.value)}
            />
            {errors.waterIntake && (
              <p className="text-red-500 text-xs">{errors.waterIntake}</p>
            )}
          </div>

          {/* DIETARY CHALLENGES */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Biggest Dietary Challenges
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "High Sodium Foods",
                "High Potassium Foods",
                "High Phosphorus Foods",
                "Sugar Cravings",
                "Low Protein Intake",
                "Unplanned Meal Timings",
              ].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() =>
                    toggleCheckbox("dietaryChallenges", opt)
                  }
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.dietaryChallenges.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.dietaryChallenges && (
              <p className="text-red-500 text-xs">
                {errors.dietaryChallenges}
              </p>
            )}
          </div>

          {/* OTHER CHALLENGE */}
          <div>
            <label className="block text-sm font-medium mb-1">Other</label>
            <input
              className="w-full border rounded-lg p-2 text-sm"
              value={data.otherChallenge}
              onChange={(e) =>
                updateField("otherChallenge", e.target.value)
              }
            />
          </div>

          {/* MEAL PLAN PREFERENCES */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Meal Plan Preferences
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Low Sodium Meals",
                "Low Potassium Meals",
                "Low Protein Meals",
                "High Fiber Meals",
                "Weight Loss Meals",
                "Quick & Easy Meals",
              ].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() =>
                    toggleCheckbox("mealPlanPreferences", opt)
                  }
                  className={`px-3 py-1 rounded-full border text-sm ${
                    data.mealPlanPreferences.includes(opt)
                      ? "bg-[#0C3C3E] text-white border-[#0C3C3E]"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.mealPlanPreferences && (
              <p className="text-red-500 text-xs">
                {errors.mealPlanPreferences}
              </p>
            )}
          </div>

          {/* FLUID GUIDANCE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Would you like guidance on managing fluid intake?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label className="flex items-center gap-2 text-sm" key={o}>
                  <input
                    type="radio"
                    name="fluidGuidance"
                    value={o}
                    checked={data.fluidGuidance === o}
                    onChange={(e) =>
                      updateField("fluidGuidance", e.target.value)
                    }
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.fluidGuidance && (
              <p className="text-red-500 text-xs">{errors.fluidGuidance}</p>
            )}
          </div>

          {/* SNACK GUIDANCE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Would you like kidney-friendly snack recommendations?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label className="flex items-center gap-2 text-sm" key={o}>
                  <input
                    type="radio"
                    name="snackGuidance"
                    value={o}
                    checked={data.snackGuidance === o}
                    onChange={(e) =>
                      updateField("snackGuidance", e.target.value)
                    }
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.snackGuidance && (
              <p className="text-red-500 text-xs">{errors.snackGuidance}</p>
            )}
          </div>

          {/* MEAL PREP HELP */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Do you require help with meal preparation?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label className="flex items-center gap-2 text-sm" key={o}>
                  <input
                    type="radio"
                    name="mealPrepHelp"
                    value={o}
                    checked={data.mealPrepHelp === o}
                    onChange={(e) =>
                      updateField("mealPrepHelp", e.target.value)
                    }
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.mealPrepHelp && (
              <p className="text-red-500 text-xs">{errors.mealPrepHelp}</p>
            )}
          </div>

          {/* BP + DIABETES GUIDANCE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Would you like guidance on managing blood pressure or diabetes alongside kidney health?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((o) => (
                <label className="flex items-center gap-2 text-sm" key={o}>
                  <input
                    type="radio"
                    name="bpDiabetesGuidance"
                    value={o}
                    checked={data.bpDiabetesGuidance === o}
                    onChange={(e) =>
                      updateField("bpDiabetesGuidance", e.target.value)
                    }
                  />
                  {o}
                </label>
              ))}
            </div>
            {errors.bpDiabetesGuidance && (
              <p className="text-red-500 text-xs">
                {errors.bpDiabetesGuidance}
              </p>
            )}
          </div>

          {/* PACKAGE SELECTION */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Package Selection
            </label>
            <select
              className="w-full border rounded-lg p-2 text-sm"
              value={data.packageSelection}
              onChange={(e) =>
                updateField("packageSelection", e.target.value)
              }
            >
              <option value="">Select</option>
              <option>Basic Kidney Support</option>
              <option>Kidney Health Intensive</option>
              <option>Renal Recovery Premium</option>
            </select>
            {errors.packageSelection && (
              <p className="text-red-500 text-xs">
                {errors.packageSelection}
              </p>
            )}
          </div>

          {/* TERMS */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.agreeTerms}
              onChange={(e) => updateField("agreeTerms", e.target.checked)}
            />
            <label className="text-sm">
              I agree to the Terms & Conditions
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-red-500 text-xs">{errors.agreeTerms}</p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0C3C3E] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#0C3C3E]/90"
          >
            {loading ? "Submitting..." : "Support My Kidney Health"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default KidneyHealthProgrammeForm;
