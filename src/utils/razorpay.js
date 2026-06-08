const Razorpay = require("razorpay");

// If credentials are present, return a real Razorpay instance.
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  module.exports = instance;
} else {
  // Fallback stub to avoid crashing when keys are not set (development/testing).
  // Provides a minimal `orders.create` method used by the app.
  const stub = {
    orders: {
      create: async (options = {}) => {
        return {
          id: `order_${Date.now()}`,
          status: "created",
          amount: options.amount || 0,
          currency: options.currency || "INR",
          receipt: options.receipt || "",
          notes: options.notes || {},
        };
      },
    },
  };

  module.exports = stub;
}
