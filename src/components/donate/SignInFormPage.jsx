import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const elementOptions = {
  style: {
    base: {
      fontSize: "18px",
      color: "#243f57",
      fontFamily: "Arial, sans-serif",
      "::placeholder": {
        color: "#7c8b9a",
      },
    },
    invalid: {
      color: "#dc2626",
    },
  },
};

export default function StripeCardForm({
  clientSecret,
  onPaymentSuccess,
  onPaymentError,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setSubmitting(true);
    setLocalError("");

    const cardNumber = elements.getElement(CardNumberElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber,
      },
    });

    if (error) {
      setLocalError(error.message || "Payment failed.");
      onPaymentError?.(error.message || "Payment failed.");
      setSubmitting(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      onPaymentSuccess?.(paymentIntent);
    } else {
      onPaymentError?.(`Payment status: ${paymentIntent?.status || "unknown"}`);
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="overflow-hidden border border-slate-400 bg-white">
        <div className="flex items-center justify-between border-b border-slate-300 px-6 py-6">
          <h4 className="text-[22px] font-light text-[#243f57]">Card</h4>

          <div className="flex items-center gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="h-7 w-auto object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-7 w-auto object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
              alt="American Express"
              className="h-7 w-auto object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg"
              alt="Discover"
              className="h-7 w-auto object-contain"
            />
          </div>
        </div>

        <div className="px-6 py-6">
          <label className="mb-3 block text-[16px] font-medium text-[#526779]">
            Card number
          </label>
          <div className="h-[56px] border border-slate-500 px-4 py-[15px]">
            <CardNumberElement options={elementOptions} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-3 block text-[16px] font-medium text-[#526779]">
                Expiration date
              </label>
              <div className="h-[56px] border border-slate-500 px-4 py-[15px]">
                <CardExpiryElement options={elementOptions} />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-[16px] font-medium text-[#526779]">
                Security code
              </label>
              <div className="h-[56px] border border-slate-500 px-4 py-[15px]">
                <CardCvcElement options={elementOptions} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-[16px] text-[#526779]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-sky-500 text-sky-500">
              i
            </span>
            <span>Note on paying by card</span>
          </div>
        </div>
      </div>

      {localError ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {localError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="inline-flex h-[56px] min-w-[240px] items-center justify-center bg-[#d10058] px-8 text-[18px] font-bold uppercase tracking-[0.02em] text-white transition hover:bg-[#b1004b] disabled:opacity-60"
      >
        {submitting ? "Processing..." : "Submit Card Payment"}
      </button>
    </form>
  );
}