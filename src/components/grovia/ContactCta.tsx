"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle, Sparkles, Building2, Phone, Mail, Send } from "lucide-react";

export default function ContactCta({
  content,
  buttons,
}: {
  content?: any;
  buttons?: any;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const title = content?.title || "Yolculuğa Başlayın";
  const subtitle = content?.subtitle || "Acentenizin operasyonel ve finansal süreçlerini tek akıllı omurgada birleştirelim.";
  const email = content?.email || "hello@codeicon.co";
  const phone = content?.phone || "+90 (533) 889 99 44";
  const submitText = buttons?.contactSubmitText || content?.submitText || "Mesajı Gönder";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Mesajınız iletilemedi. Lütfen tekrar deneyin.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (err: any) {
      console.error("Form submit error:", err);
      setErrorMessage(err.message || "Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-8 sm:py-16 px-3 sm:px-6 max-w-7xl mx-auto">
      {/* Dark Curved Container matching Grovia Aesthetic */}
      <div className="relative rounded-[2.5rem] bg-[#1E2229] text-white p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        
        {/* Subtle Ambient Bloom Glow in Background */}
        <div className="absolute -bottom-24 -left-24 w-[520px] h-[520px] bg-gradient-to-tr from-[#FEF7AF]/15 via-[#C77DFF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[460px] h-[460px] bg-gradient-to-br from-blue-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Eyebrow, Title, Subtitle, Contact Info, Social Proof */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
            <div>
              {content?.eyebrow && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF7AF] text-[#594C00] text-[11px] font-bold uppercase tracking-wider mb-4 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{content.eyebrow}</span>
                </div>
              )}

              <h2
                className="custom-section-title text-4xl sm:text-5xl font-bold tracking-tight !text-white leading-[1.1] mb-5"
                style={{ color: "#FFFFFF" }}
              >
                {title}
              </h2>
              
              <p
                className="custom-section-sub text-base !text-white/70 leading-relaxed max-w-md font-normal"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                {subtitle}
              </p>
            </div>

            <div className="space-y-6 pt-4 sm:pt-8 border-t border-white/10">
              {/* Phone & Large Email */}
              <div className="space-y-2">
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition group"
                >
                  <Phone className="w-4 h-4 text-[#FEF7AF] group-hover:scale-110 transition-transform" />
                  <span>{phone}</span>
                </a>
                
                <a
                  href={`mailto:${email}`}
                  className="text-2xl sm:text-3xl font-medium text-white hover:text-[#FEF7AF] transition block tracking-tight"
                >
                  {email}
                </a>
              </div>

              {/* Social Proof Avatars & Rating */}
              <div className="flex items-center gap-3.5 pt-2">
                <div className="flex -space-x-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                    alt="MICE Yöneticisi"
                    className="w-8 h-8 rounded-full border-2 border-[#1E2229] object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                    alt="Acente Sahibi"
                    className="w-8 h-8 rounded-full border-2 border-[#1E2229] object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80"
                    alt="Operasyon Direktörü"
                    className="w-8 h-8 rounded-full border-2 border-[#1E2229] object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&auto=format&fit=crop&q=80"
                    alt="Saha Lideri"
                    className="w-8 h-8 rounded-full border-2 border-[#1E2229] object-cover"
                  />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">
                    {content?.socialProofRating || "4.9 / 5 Memnuniyet"}
                  </span>
                  <span className="text-white/60">
                    {content?.socialProofText || "50+ MICE & Acente Ekibi"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dark Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-[#262B34]/90 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-white/10 shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {content?.successTitle || "Mesajınız Başarıyla İletildi!"}
                  </h3>
                  
                  <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                    {content?.successMessage ||
                      "Teşekkür ederiz! MICE ve operasyon uzmanımız en kısa sürede sizinle iletişime geçecektir."}
                  </p>
                  
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition border border-white/10"
                    >
                      <span>{content?.successButton || "Yeni bir mesaj gönder"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs text-white/80 font-semibold mb-1.5">
                        {content?.nameLabel || "Ad Soyad"} <span className="text-[#FEF7AF]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={content?.namePlaceholder || "Adınız Soyadınız"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1D23] border border-white/10 focus:border-[#FEF7AF]/60 focus:bg-[#1A1D23]/90 focus:outline-none text-sm text-white placeholder:text-white/30 transition"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs text-white/80 font-semibold mb-1.5">
                        {content?.emailLabel || "E-Posta"} <span className="text-[#FEF7AF]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={content?.emailPlaceholder || "ornek@acente.com"}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1D23] border border-white/10 focus:border-[#FEF7AF]/60 focus:bg-[#1A1D23]/90 focus:outline-none text-sm text-white placeholder:text-white/30 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs text-white/80 font-semibold mb-1.5">
                        Telefon Numarası
                      </label>
                      <input
                        type="tel"
                        placeholder="+90 (5XX) XXX XX XX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1D23] border border-white/10 focus:border-[#FEF7AF]/60 focus:bg-[#1A1D23]/90 focus:outline-none text-sm text-white placeholder:text-white/30 transition"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs text-white/80 font-semibold mb-1.5">
                        Acente / Firma Adı
                      </label>
                      <input
                        type="text"
                        placeholder="Örn: Atlas MICE & Travel"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1D23] border border-white/10 focus:border-[#FEF7AF]/60 focus:bg-[#1A1D23]/90 focus:outline-none text-sm text-white placeholder:text-white/30 transition"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs text-white/80 font-semibold mb-1.5">
                      {content?.messageLabel || "Operasyonel İhtiyaçlarınız"} <span className="text-[#FEF7AF]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={content?.messagePlaceholder || "Acentenizin büyüklüğü, yıllık pax hacminiz veya ilgilendiğiniz modüller..."}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1D23] border border-white/10 focus:border-[#FEF7AF]/60 focus:bg-[#1A1D23]/90 focus:outline-none text-sm text-white placeholder:text-white/30 resize-none transition"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <p className="text-[11px] text-white/50 hidden sm:block">
                      🔒 Bilgileriniz gizlilik politikamız kapsamında güvendedir.
                    </p>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto bg-[#FEF7AF] text-[#1A1A1A] font-bold px-7 py-3 rounded-full inline-flex items-center justify-center gap-2.5 hover:bg-[#FDF387] cursor-pointer transition-all disabled:opacity-50 text-sm shadow-lg hover:shadow-xl active:scale-[0.98]"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#1A1A1A]" />
                          <span>Gönderiliyor...</span>
                        </>
                      ) : (
                        <>
                          <span>{submitText}</span>
                          <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs">
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </>
                      )}
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
