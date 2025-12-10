import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const ContactUsForm = () => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};

    if (!firstName.trim()) tempErrors.firstName = "First name is required.";
    if (!lastName.trim()) tempErrors.lastName = "Last name is required.";

    if (!email.trim()) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      tempErrors.email = "Enter a valid email.";

    if (!subject.trim()) tempErrors.subject = "Subject is required.";
    if (!message.trim()) tempErrors.message = "Message cannot be empty.";

    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const firstErrorField = document.querySelector(".error-input");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      toast.error("Please fix the highlighted errors");
      return;
    }
    toast.success("Message sent successfully!");
    setErrors({});
  };
  const handleChange = (field, value, setter) => {
    setter(value);

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const errorStyle =
    "border-red-400 focus:border-red-500 focus:ring-red-200 error-input";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#07363C] rounded-full px-6 py-3 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        Contact Us
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-99">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-scaleIn transition-all">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition"
            >
              <X size={20} className="text-gray-700" />
            </button>

            <div className="mb-4">
              <h2 className="text-2xl font-bold text-[#07363C]">Get in Touch</h2>
              <p className="text-sm text-gray-500 mt-1">
                We would love to hear from you.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="First Name*"
                    value={firstName}
                    onChange={(e) => handleChange("firstName", e.target.value, setFirstName)}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.firstName ? errorStyle : "border-gray-200"
                    } focus:ring-2 outline-none`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Last Name*"
                    value={lastName}
                    onChange={(e) =>
                      handleChange("lastName", e.target.value, setLastName)
                    }
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.lastName ? errorStyle : "border-gray-200"
                    } focus:ring-2 outline-none`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email*"
                  value={email}
                  onChange={(e) =>
                    handleChange("email", e.target.value, setEmail)
                  }
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? errorStyle : "border-gray-200"
                  } focus:ring-2 outline-none`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <input
                  type="text"
                  placeholder="Subject*"
                  value={subject}
                  onChange={(e) =>
                    handleChange("subject", e.target.value, setSubject)
                  }
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.subject ? errorStyle : "border-gray-200"
                  } focus:ring-2 outline-none`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Message*"
                  value={message}
                  onChange={(e) =>
                    handleChange("message", e.target.value, setMessage)
                  }
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.message ? errorStyle : "border-gray-200"
                  } focus:ring-2 outline-none`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#07363C] text-white py-3 rounded-xl font-semibold hover:bg-[#0A454B] transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUsForm;
