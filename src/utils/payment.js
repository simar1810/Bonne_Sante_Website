import toast from "react-hot-toast";

// Register user
export const registerUser = async ({ name, email, phoneNumber, reason }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      phoneNumber,
      goal: reason,
      frontEndClient: "Bonne_Sante",
      isCallPermission: true,
    }),
  });
  if (!res.ok) throw new Error("Failed to register user");
  return res.json();
};

// Create Razorpay order
export const createOrder = async ({amount}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/razorpay/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      note: { client: "Bonne_Sante" },
      type: "bonneSante",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to create order, backend returned:", text);
    throw new Error("Failed to create order");
  }

  let json;
  try {
    json = await res.json();
  } catch (err) {
    console.error("Error parsing JSON from backend:", err);
    throw new Error("Invalid JSON response");
  }

  if (!json.success || !json.data) {
    console.error("Invalid structure from backend:", json);
    throw new Error("Invalid response format");
  }

  return json.data;
};

// Verify payment
export const verifyPayment = async ({ paymentData, name, email, phoneNumber,  amount }) => {
    if (!paymentData.razorpay_payment_id) {
        throw new Error("Missing payment ID");
      }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/razorpay/verify-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      phoneNumber,
      email,
      clientId: "Bonne_Sante",
      frontEndClient: "Bonne_Sante",
      razorpay_order_id: paymentData.razorpay_order_id,
      razorpay_payment_id: paymentData.razorpay_payment_id,
      razorpay_signature: paymentData.razorpay_signature,
      amount,
    }),
  });

  const data = await res.json();

  if (data.success) {
    toast.success("Payment Successful!");
  } else {
    toast.error("Payment verification failed. Please contact support.");
  }
};

// Open Razorpay
export const openRazorpay = async ({ order, name, phoneNumber, email, amount}) => {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency || "INR",
    name: "Bonne Sante",
    description: "Payment",
    image: "/logo.png",
    order_id: order.id,
    handler: async function (response) {
      await verifyPayment({ paymentData: response, name, phoneNumber, email, amount});
    },
    prefill: { name, contact: phoneNumber, email },
    theme: { color: "#07363C" },
    modal: {
      ondismiss: function () {
        toast.info("Payment cancelled!");
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", (response) => {
    toast.error(`Payment failed: ${response.error.description}`);
  });
  rzp.open();
};
