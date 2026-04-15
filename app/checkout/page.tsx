"use client";

import { useState } from "react";
import { ArrowRight, Lock } from "lucide-react";

const PRICE = 197;

export default function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      style={{ background: "var(--cream)" }}
    >
      {/* Header */}
      <a
        href="/"
        className="text-xs uppercase tracking-[0.25em] mb-16 opacity-60 hover:opacity-100 transition-opacity"
        style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
      >
        ← Self-Image Curator
      </a>

      <div className="w-full max-w-md">
        {/* Order summary */}
        <div
          className="p-8 mb-8"
          style={{ background: "var(--parchment)", border: "1px solid var(--ink-ghost)" }}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p
                className="text-xs uppercase tracking-[0.3em] mb-2"
                style={{ color: "var(--ink-soft)" }}
              >
                Enrolling in
              </p>
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
              >
                The Online Blueprint Workshop
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>
                Self-Image Curator — Thays Vick
              </p>
            </div>
            <span
              className="text-2xl font-bold shrink-0 ml-4"
              style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
            >
              ${PRICE}
            </span>
          </div>

          <div className="space-y-2 pt-4" style={{ borderTop: "1px solid var(--ink-ghost)" }}>
            {[
              "5 course modules",
              "Personalized garment guide",
              "Color exploration toolkit",
              "Lifetime access",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ background: "var(--plum)" }}
                />
                <span className="text-xs" style={{ color: "var(--ink-soft)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label
              className="block text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--ink-soft)" }}
            >
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 text-sm outline-none transition-colors"
              style={{
                background: "var(--parchment)",
                border: "1px solid var(--ink-ghost)",
                color: "var(--ink)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--plum)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--ink-ghost)")}
            />
          </div>

          {error && (
            <p className="text-xs" style={{ color: "#c0392b" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full flex items-center justify-center gap-3 py-4 font-semibold uppercase tracking-widest text-sm transition-opacity disabled:opacity-50"
            style={{ background: "var(--plum)", color: "var(--cream)" }}
          >
            {loading ? (
              "Redirecting..."
            ) : (
              <>
                Continue to Payment
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 pt-2">
            <Lock size={10} style={{ color: "var(--ink-ghost)" }} />
            <p className="text-xs" style={{ color: "var(--ink-ghost)" }}>
              Secured by Stripe. One-time charge of ${PRICE}.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
