"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContactCta({
  content,
  buttons,
}: {
  content?: any;
  buttons?: any;
}) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const title = content?.title || "Start your journey";
  const subtitle = content?.subtitle || "Let's start building something great together.";
  const email = content?.email || "hello@grovia.io";
  const phone = content?.phone || "206-837-1232";
  const submitText = buttons?.contactSubmitText || "Submit";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-8 sm:py-12 px-3 sm:px-6 max-w-7xl mx-auto">
      {/* Dark Curved Container matching Grovia Screenshot 10 */}
      <div className="relative rounded-[2.5rem] bg-[#2A2E37] text-white p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden border border-white/10 shadow-2xl">
        {/* Subtle Ambient Bloom Glow in Background */}
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-[#E07A5F]/25 via-[#C77DFF]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading, Subtitle, Contact Info, Rating */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8">
            <div>
              <h2 className="custom-section-title text-4xl sm:text-5xl font-normal tracking-tight !text-white leading-tight mb-4" style={{ color: "#FFFFFF" }}>
                {title}
              </h2>
              <p className="custom-section-sub text-base !text-white/70 leading-relaxed max-w-sm" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                {subtitle}
              </p>
            </div>

            <div className="space-y-6 pt-6 sm:pt-16">
              {/* Phone & Large Email */}
              <div>
                <a
                  href={`tel:${phone}`}
                  className="text-sm text-white/60 hover:text-white transition block mb-1"
                >
                  {phone}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="text-2xl sm:text-3xl font-normal text-white hover:opacity-80 transition block tracking-tight"
                >
                  {email}
                </a>
              </div>

              {/* Social Proof Avatars & Rating */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                    alt="Customer"
                    className="w-7 h-7 rounded-full border border-[#2A2E37] object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                    alt="Customer"
                    className="w-7 h-7 rounded-full border border-[#2A2E37] object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80"
                    alt="Customer"
                    className="w-7 h-7 rounded-full border border-[#2A2E37] object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&auto=format&fit=crop&q=80"
                    alt="Customer"
                    className="w-7 h-7 rounded-full border border-[#2A2E37] object-cover"
                  />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-white block">4.9 / 5 Rated</span>
                  <span className="text-white/60">Over 9.2k Customers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dark Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#1F2229]/90 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-white/10 shadow-xl max-w-lg mx-auto lg:max-w-none">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-normal text-white">
                    {content?.successTitle || "Thank you for reaching out!"}
                  </h3>
                  <p className="text-sm text-white/70 max-w-sm mx-auto">
                    {content?.successMessage ||
                      "Our team will review your message and get back to you shortly."}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-semibold text-[#FEF7AF] underline"
                  >
                    {content?.successButton || "Send another message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-white/70 font-medium mb-1.5">
                      {content?.nameLabel || "Name"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={content?.namePlaceholder || "Jane Smith"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#282C35] border border-white/10 focus:border-white/30 focus:outline-none text-sm text-white placeholder:text-white/30 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/70 font-medium mb-1.5">
                      {content?.emailLabel || "Email"}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={content?.emailPlaceholder || "jane@framer.com"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#282C35] border border-white/10 focus:border-white/30 focus:outline-none text-sm text-white placeholder:text-white/30 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/70 font-medium mb-1.5">
                      {content?.messageLabel || "Message"}
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={content?.messagePlaceholder || "Enter your message"}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#282C35] border border-white/10 focus:border-white/30 focus:outline-none text-sm text-white placeholder:text-white/30 resize-none transition"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-[#FEF7AF] text-[#1A1A1A] font-medium px-5 py-2.5 rounded-full inline-flex items-center gap-2 hover:bg-[#FDF387] cursor-pointer transition-all disabled:opacity-50 text-sm shadow-md"
                    >
                      <span>{submitting ? "Sending..." : submitText}</span>
                      <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs">
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
