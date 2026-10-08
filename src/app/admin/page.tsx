"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Save,
  CheckCircle,
  Eye,
  Settings,
  Sparkles,
  Layers,
  CreditCard,
  HelpCircle,
  Mail,
  ArrowLeft,
  AlertTriangle,
  Plus,
  Trash2,
  Check,
  Image as ImageIcon,
  Upload,
  Copy,
  ExternalLink,
  Laptop,
  Navigation,
  MousePointerClick,
  Link2,
  PanelBottom,
  Building2,
  Palette,
  Type,
  Sliders,
  Bold,
  Italic,
  Lock,
  LogOut,
  KeyRound,
  Loader2,
  BookOpen,
  Bot,
  Edit3,
  FileText,
  Search,
  Tag,
  Calendar,
  User,
  Clock,
  X,
  Heading2,
  Heading3,
  Quote,
  List,
  Wand2,
  EyeOff,
  RefreshCw,
} from "lucide-react";

export default function AdminPage() {
  const [content, setContent] = useState<any>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("navigation");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Blog State
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiTone, setAiTone] = useState("profesyonel");
  const [aiAudience, setAiAudience] = useState("MICE Acenteleri & Operasyon Yöneticileri");
  const [aiProvider, setAiProvider] = useState<"builtin" | "gemini" | "openai">("builtin");
  const [aiCustomKey, setAiCustomKey] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState("Tümü");
  const [postEditorTab, setPostEditorTab] = useState<"edit" | "preview">("edit");
  const [deleteConfirmSlug, setDeleteConfirmSlug] = useState<string | null>(null);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Media Library state
  const [mediaList, setMediaList] = useState<{ name: string; url: string; folder: string }[]>([]);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [uploadingGeneral, setUploadingGeneral] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const generalInputRef = useRef<HTMLInputElement>(null);

  // Check auth on mount
  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(!!data.authenticated);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        // Initialize fallback structure if missing
        if (!data.navigation) {
          data.navigation = {
            headerLinks: [
              { label: "Hakkında", href: "#process" },
              { label: "Özellikler", href: "#features" },
              { label: "Entegrasyonlar", href: "#integrations" },
              { label: "Fiyatlandırma", href: "#pricing" },
              { label: "Referanslar", href: "#case-studies" },
              { label: "İletişim", href: "#contact" },
            ],
            footerLinks: [
              { label: "Ana Sayfa", href: "#" },
              { label: "Hakkında", href: "#process" },
              { label: "Özellikler", href: "#features" },
              { label: "Referanslar", href: "#case-studies" },
              { label: "Fiyatlandırma", href: "#pricing" },
            ],
          };
        }
        if (!data.buttons) {
          data.buttons = {
            navbarCtaText: data.brand?.ctaText || "Demoyu İncele",
            navbarCtaHref: "#contact",
            heroPrimaryText: data.hero?.ctaPrimary || "Demoyu İncele",
            heroPrimaryHref: "#contact",
            heroSecondaryText: data.hero?.ctaSecondary || "Sistemi Keşfedin",
            heroSecondaryHref: "#features",
            contactSubmitText: "Mesajı Gönder",
            newsletterSubmitText: "Abone Ol",
          };
        }
        if (!data.footer) {
          data.footer = {
            description: "CODEICON, kurumsal MICE acenteleri ve seyahat ekipleri için geliştirilmiş yeni nesil operasyon ve finans işletim sistemidir.",
            systemStatus: "Tüm Sistemler Operasyonel",
            showSystemStatus: true,
            col1Title: "Hızlı Erişim",
            col1Links: [
              { label: "Ana Sayfa", href: "#" },
              { label: "MICE & Projeler", href: "#features" },
              { label: "Saha Operasyonu", href: "#features" },
              { label: "Fiyatlandırma", href: "#pricing" },
              { label: "İletişim", href: "#contact" },
            ],
            col2Title: "Platform & Modüller",
            col2Links: [
              { label: "MICE & Kongre Yönetimi", href: "#features" },
              { label: "Sejour & Otel Entegrasyonu", href: "#features" },
              { label: "Havalimanı & Transfer", href: "#features" },
              { label: "TCMB Finans & Bütçe", href: "#features" },
            ],
            col3Title: "Doğrudan İletişim",
            email: "hello@codeicon.co",
            phone: "+90 (533) 889 99 44",
            location: "İstanbul & Antalya, Türkiye",
            copyright: "CODEICON Inc. Tüm hakları saklıdır.",
            legalLinks: [
              { label: "Gizlilik Politikası", href: "#" },
              { label: "Kullanım Koşulları", href: "#" },
              { label: "Destek & Yardım", href: "#contact" },
            ],
          };
        }
        if (!data.references) {
          data.references = {
            eyebrow: "İş Ortaklarımız & Referanslar",
            title: "Sektörün Öncü Acentelerinin Güvenilir Tercihi",
            subtitle: "Yüzlerce kurumsal kongre, bayi toplantısı ve transfer operasyonunu kusursuz yöneten lider acenteler.",
            logos: [],
            items: [],
            testimonials: [],
          };
        }
        if (!data.references.logos) data.references.logos = [];
        if (!data.references.items) data.references.items = [];
        if (!data.references.testimonials) data.references.testimonials = [];

        if (!data.theme) {
          data.theme = {
            fontFamily: "'Geist', 'Albert Sans', -apple-system, sans-serif",
            fontName: "Geist & Albert Sans (Grovia)",
            googleFontUrl: "https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,700&family=Fragment+Mono&family=Geist:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap",
            colors: {
              background: "#F4F2EE",
              foreground: "#1A1A1A",
              muted: "#605F5F",
              accent: "#FEF7AF",
              accentText: "#594C00",
              cardBg: "#FFFFFF",
              border: "#DDD7D0",
              buttonBg: "#1A1A1A",
              buttonText: "#FFFFFF",
            },
            typography: {
              heroTitle: { size: "clamp(2.25rem, 5vw, 4.5rem)", weight: "700", italic: false, color: "#1A1A1A" },
              heroTitleAccent: { weight: "400", italic: true, color: "#2A2A2A" },
              heroSubtitle: { size: "clamp(1rem, 2vw, 1.25rem)", weight: "400", italic: false, color: "#605F5F" },
              sectionEyebrow: { size: "0.75rem", weight: "600", italic: false, color: "#8C8C8C" },
              sectionTitle: { size: "clamp(1.75rem, 3.5vw, 3rem)", weight: "700", italic: false, color: "#1A1A1A" },
              sectionSubtitle: { size: "1.0625rem", weight: "400", italic: false, color: "#605F5F" },
              cardTitle: { size: "1.25rem", weight: "700", italic: false, color: "#1A1A1A" },
            },
          };
        }
        if (!data.theme.colors) data.theme.colors = {};
        if (!data.theme.typography) data.theme.typography = {};

        if (!data.blog) {
          data.blog = {
            enabled: true,
            eyebrow: "CODEICON BLOG",
            title: "MICE ve Turizm Teknolojileri Rehberi",
            subtitle: "Acente kârlılığı, saha operasyonları ve seyahat yazılımları üzerine pratik analizler ve ipuçları.",
            posts: [],
          };
        }
        if (!data.blog.posts) data.blog.posts = [];

        setContent(data);
      })
      .catch((err) => console.error(err));

    loadMedia();
  }, []);

  const loadMedia = () => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => {
        if (data.media) setMediaList(data.media);
      })
      .catch((err) => console.error(err));
  };

  const handleFileUpload = async (
    file: File,
    type: "logo" | "favicon" | "heroMockup" | "general"
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    if (type === "logo") setUploadingLogo(true);
    if (type === "favicon") setUploadingFavicon(true);
    if (type === "general") setUploadingGeneral(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        let updatedContent = { ...content };
        if (type === "logo") {
          updatedContent = {
            ...content,
            assets: {
              ...content.assets,
              logoUrl: data.url,
              logoType: "image",
            },
          };
        } else if (type === "favicon") {
          updatedContent = {
            ...content,
            assets: {
              ...content.assets,
              faviconUrl: data.url,
            },
          };
        } else if (type === "heroMockup") {
          updatedContent = {
            ...content,
            assets: {
              ...content.assets,
              heroMockupImage: data.url,
              heroMockupType: "image",
            },
          };
        }
        setContent(updatedContent);
        loadMedia();

        // Auto-save to Supabase immediately so changes reflect everywhere
        try {
          const saveRes = await fetch("/api/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedContent),
          });
          if (saveRes.ok) {
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
          }
        } catch (saveErr) {
          console.warn("Auto save after upload error:", saveErr);
        }
      } else {
        setSaveError(data.error || "Görsel yüklenemedi!");
        setTimeout(() => setSaveError(null), 6000);
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setSaveError("Dosya yüklenirken bağlantı hatası oluştu.");
      setTimeout(() => setSaveError(null), 6000);
    } finally {
      setUploadingLogo(false);
      setUploadingFavicon(false);
      setUploadingGeneral(false);
    }
  };


  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaveSuccess(true);
        router.refresh();
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        const errData = await res.json().catch(() => ({}));
        setSaveError(errData.error || "Değişiklikler kaydedilemedi!");
        setTimeout(() => setSaveError(null), 5000);
      }
    } catch (error: any) {
      console.error("Save error:", error);
      setSaveError(error?.message || "Sunucuyla bağlantı kurulamadı.");
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  // Blog Management Helpers
  const generateSlug = (text: string) => {
    const trMap: Record<string, string> = {
      ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i", ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
    };
    return text
      .split("")
      .map((c) => trMap[c] || c)
      .join("")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const AI_SUGGESTIONS = [
    "TCMB Otomatik Kur Entegrasyonunun MICE Acentelerine Sağladığı Kârlılık ve Kur Riski Koruması",
    "Havalimanı Operasyonlarında WhatsApp Karşılama ve Şoför Görev Emri Yönetimi",
    "MICE Kongrelerinde Excel Rooming List Çilesine Son: Hataları Sıfıra İndirme Yolları",
    "Acente Operasyonlarında Dinamik Transfer Rotalama ve Araç Kapasite Optimizasyonu",
    "Kurumsal Bayi Toplantılarında Bütçe & Avans Takibi ve Fatura Uyuşmazlıklarını Önleme",
    "Kongre ve Etkinlik Kayıt Masalarında Hızlı QR Check-in ile Sıraları Yok Etme",
  ];

  const handleGenerateBlogWithAi = async () => {
    if (!aiTopic.trim()) {
      setAiError("Lütfen bir konu yazın veya aşağıdaki hazır başlıklardan birine tıklayın.");
      return;
    }
    setAiLoading(true);
    setAiError(null);

    try {
      const res = await fetch("/api/ai/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: aiTopic,
          tone: aiTone,
          audience: aiAudience,
          provider: aiProvider,
          apiKey: aiCustomKey || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Yapay zeka içeriği oluşturamadı.");
      }

      const generatedArticle = data.article || data.post;
      if (!generatedArticle) {
        throw new Error("Sunucudan geçerli bir makale nesnesi alınamadı.");
      }

      setEditingPost(generatedArticle);
      setPostEditorTab("edit");
      setIsAiModalOpen(false);
      setAiTopic("");
    } catch (err: any) {
      console.error("AI Generation error:", err);
      setAiError(err.message || "İçerik üretilirken bir hata oluştu.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSaveBlogPost = async (postToSave: any) => {
    if (!postToSave.title || !postToSave.title.trim()) {
      alert("Lütfen bir başlık girin.");
      return;
    }
    const slug = (postToSave.slug || generateSlug(postToSave.title)).trim();
    const finalPost = {
      ...postToSave,
      slug,
      published: postToSave.published !== false,
      publishedAt: postToSave.publishedAt || new Date().toISOString().split("T")[0],
      readingTime: postToSave.readingTime || "5 dk okuma",
      tags: Array.isArray(postToSave.tags)
        ? postToSave.tags
        : typeof postToSave.tags === "string"
        ? postToSave.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : [],
      author: postToSave.author || {
        name: "CODEICON Ekibi",
        role: "MICE & Teknoloji Editörü",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      },
    };

    const currentPosts = content?.blog?.posts || [];
    const existingIdx = currentPosts.findIndex((p: any) => p.slug === slug);

    let newPosts;
    if (existingIdx >= 0) {
      newPosts = [...currentPosts];
      newPosts[existingIdx] = finalPost;
    } else {
      newPosts = [finalPost, ...currentPosts];
    }

    const updatedContent = {
      ...content,
      blog: {
        ...(content?.blog || {}),
        posts: newPosts,
      },
    };

    setContent(updatedContent);
    setEditingPost(null);

    try {
      setSaving(true);
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContent),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
      console.error("Direct save failed:", e);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePostPublished = async (postSlug: string) => {
    const currentPosts = content?.blog?.posts || [];
    const newPosts = currentPosts.map((p: any) => {
      if (p.slug === postSlug) {
        return { ...p, published: !p.published };
      }
      return p;
    });

    const updatedContent = {
      ...content,
      blog: {
        ...(content?.blog || {}),
        posts: newPosts,
      },
    };

    setContent(updatedContent);

    try {
      setSaving(true);
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContent),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    } catch (e) {
      console.error("Toggle published error:", e);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlogPost = async (postSlug: string) => {
    const currentPosts = content?.blog?.posts || [];
    const newPosts = currentPosts.filter((p: any) => p.slug !== postSlug);

    const updatedContent = {
      ...content,
      blog: {
        ...(content?.blog || {}),
        posts: newPosts,
      },
    };

    setContent(updatedContent);
    setDeleteConfirmSlug(null);

    try {
      setSaving(true);
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContent),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
      console.error("Delete blog post error:", e);
    } finally {
      setSaving(false);
    }
  };


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setLoginPassword("");
      } else {
        setLoginError(data.error || "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      }
    } catch (err: any) {
      setLoginError("Sunucuyla bağlantı kurulamadı.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setIsAuthenticated(false);
    }
  };

  // 1. Initial auth checking state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F4F2EE] flex items-center justify-center text-sm font-medium text-[#605F5F]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#1A1A1A]" />
          <span>Güvenlik kontrolü yapılıyor...</span>
        </div>
      </div>
    );
  }

  // 2. Login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F2EE] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Background glow & styling matching Grovia */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#DDD7D0_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#FEF7AF]/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative w-full max-w-md bg-white border border-[#DDD7D0] rounded-3xl p-8 sm:p-10 shadow-xl shadow-black/[0.03]">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md">
              C
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A]">
              CODEICON Yönetici Girişi
            </h1>
            <p className="text-xs sm:text-sm text-[#605F5F] mt-1.5">
              Yönetim paneline erişmek için yetkili bilgilerinizi girin.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2.5 animate-fadeIn">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                Yönetici E-Posta
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="hello@codeicon.co"
                  required
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#DDD7D0] text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                Şifre
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#DDD7D0] text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#1A1A1A] text-white text-xs sm:text-sm font-bold hover:bg-neutral-800 active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Giriş Yapılıyor...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Güvenli Giriş Yap</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#DDD7D0]/60 flex items-center justify-between text-xs text-[#8C8C8C]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-[#1A1A1A] transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ana Sayfaya Dön</span>
            </Link>
            <span className="font-mono text-[11px] text-[#A0A0A0]">v3.2 Secure</span>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-[#F4F2EE] flex items-center justify-center text-sm font-medium text-[#605F5F]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#1A1A1A]" />
          <span>Yönetim paneli yükleniyor...</span>
        </div>
      </div>
    );
  }


  const toggleVisibility = (key: string) => {
    setContent({
      ...content,
      visibility: {
        ...content.visibility,
        [key]: !content.visibility[key],
      },
    });
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const mockupOptions = [
    { name: "Varsayılan İnteraktif Dashboard", type: "interactive", img: "" },
    { name: "Dashboard Ekranı", type: "image", img: "/images/mockups/dashboard.png" },
    { name: "Projeler (MICE) Ekranı", type: "image", img: "/images/mockups/projeler.png" },
    { name: "Operasyon Ekranı", type: "image", img: "/images/mockups/operasyon.png" },
    { name: "Muhasebe & Finans Ekranı", type: "image", img: "/images/mockups/muhasebe.png" },
    { name: "Teklifler Ekranı", type: "image", img: "/images/mockups/teklifler.png" },
    { name: "Uçuş & Bilet Ekranı", type: "image", img: "/images/mockups/bilet.png" },
  ];

  const fontPresets = [
    {
      name: "Geist & Albert Sans (Grovia Orijinal)",
      category: "Grovia Framer Orijinal Eşleşmesi (Başlıklar: Albert Sans, Gövde: Geist)",
      family: "'Geist', 'Albert Sans', -apple-system, sans-serif",
      url: "https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,700&family=Fragment+Mono&family=Geist:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap",
    },
    {
      name: "Inter",
      category: "Modern Sans",
      family: "'Inter', system-ui, -apple-system, sans-serif",
      url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
    },
    {
      name: "Plus Jakarta Sans",
      category: "Kurumsal & Temiz Sans",
      family: "'Plus Jakarta Sans', system-ui, sans-serif",
      url: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
    },
    {
      name: "Outfit",
      category: "Geometrik & Şık",
      family: "'Outfit', system-ui, sans-serif",
      url: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap",
    },
    {
      name: "Space Grotesk",
      category: "Teknolojik & Karakterli Grotesk",
      family: "'Space Grotesk', system-ui, sans-serif",
      url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
    },
    {
      name: "Poppins",
      category: "Yuvarlak & Samimi Geometrik",
      family: "'Poppins', system-ui, sans-serif",
      url: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap",
    },
    {
      name: "Montserrat",
      category: "Güçlü & Prestijli",
      family: "'Montserrat', system-ui, sans-serif",
      url: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap",
    },
    {
      name: "Playfair Display",
      category: "Lüks & Editöryal Serif",
      family: "'Playfair Display', Georgia, serif",
      url: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&display=swap",
    },
    {
      name: "Cinzel",
      category: "Klasik Roma & Premium Başlık",
      family: "'Cinzel', serif",
      url: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&display=swap",
    },
    {
      name: "DM Sans",
      category: "Dengeli & Net",
      family: "'DM Sans', system-ui, sans-serif",
      url: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap",
    },
  ];

  const updateThemeColor = (key: string, value: string) => {
    setContent({
      ...content,
      theme: {
        ...content.theme,
        colors: {
          ...(content.theme?.colors || {}),
          [key]: value,
        },
      },
    });
  };

  const updateTypography = (element: string, field: string, value: any) => {
    setContent({
      ...content,
      theme: {
        ...content.theme,
        typography: {
          ...(content.theme?.typography || {}),
          [element]: {
            ...(content.theme?.typography?.[element] || {}),
            [field]: value,
          },
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F2EE] text-[#1A1A1A] pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DDD7D0] px-4 sm:px-8 py-4">
        <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-[#F4F2EE] hover:bg-[#EAE6E1] text-[#1A1A1A] transition"
              title="Siteye Dön"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white text-[11px] font-bold flex items-center justify-center">
                  C
                </span>
                <h1 className="font-bold text-base sm:text-lg tracking-tight">CODEICON Yönetim Paneli</h1>
              </div>
              <p className="text-xs text-[#8C8C8C]">Menüleri, butonları, tipografiyi, renkleri, görselleri ve içerikleri buradan yönetin</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FAF9F6] border border-[#DDD7D0] text-xs font-semibold text-[#1A1A1A] hover:bg-[#F0ECE6] transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Siteyi Canlı Gör</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#DDD7D0] text-xs font-semibold text-neutral-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition"
              title="Oturumu Kapat"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Çıkış</span>
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                saveSuccess
                  ? "bg-emerald-600 text-white"
                  : saveError
                  ? "bg-red-600 text-white"
                  : "bg-[#1A1A1A] text-white hover:bg-neutral-800 disabled:opacity-50"
              }`}
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Kaydedildi!</span>
                </>
              ) : saveError ? (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  <span>Hata Oluştu!</span>
                </>
              ) : saving ? (
                <span>Kaydediliyor...</span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Değişiklikleri Kaydet</span>
                </>
              )}
            </button>
          </div>
        </div>

        {saveError && (
          <div className="bg-red-50 border-t border-red-200 px-6 py-2.5 text-xs text-red-700 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span><strong>Kaydetme Hatası:</strong> {saveError}</span>
            </div>
            <button
              onClick={() => setSaveError(null)}
              className="text-red-500 hover:text-red-800 text-xs font-semibold underline"
            >
              Kapat
            </button>
          </div>
        )}
      </header>


      {/* Main Container */}
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Navigation Sidebar */}
          <div className="w-full lg:w-72 shrink-0 bg-white rounded-2xl border border-[#DDD7D0] p-2 space-y-1 shadow-2xs lg:sticky lg:top-24 max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
            {[
              { id: "theme", label: "🎨 Tipografi & Tasarım Stili", icon: Palette },
              { id: "navigation", label: "🧭 Üst Menü (Navbar)", icon: Navigation },
              { id: "footer", label: "🦶 Alt Bilgi (Footer)", icon: PanelBottom },
              { id: "buttons", label: "🔘 Tüm Butonlar & Linkler", icon: MousePointerClick },
              { id: "media", label: "🖼️ Medya, Logo & Favicon", icon: ImageIcon },
              { id: "visibility", label: "👁️ Bölüm Görünürlüğü (Aç/Kapa)", icon: Eye },
              { id: "brand", label: "🏷️ Genel & Marka", icon: Settings },
              { id: "hero", label: "🚀 Hero (Giriş)", icon: Sparkles },
              { id: "process", label: "⚡ 3 Adımlı Süreç", icon: Layers },
              { id: "features", label: "📊 Özellik Sekmeleri", icon: Layers },
              { id: "integrations", label: "🔗 Entegrasyonlar", icon: Link2 },
              { id: "pricing", label: "💳 Fiyatlandırma", icon: CreditCard },
              { id: "references", label: "⭐ Referanslar & Logolar", icon: Building2 },
              { id: "blog", label: "✍️ Blog & İçerik", icon: BookOpen },
              { id: "faq", label: "❓ Sıkça Sorulanlar (FAQ)", icon: HelpCircle },
              { id: "contact", label: "✉️ İletişim & Slogan", icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                    isActive
                      ? "bg-[#1A1A1A] text-white shadow-xs"
                      : "text-[#605F5F] hover:text-[#1A1A1A] hover:bg-[#FAF9F6]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Content Editor Area */}
          <div className="flex-1 min-w-0 bg-white rounded-3xl border border-[#DDD7D0] p-6 sm:p-8 lg:p-10 shadow-xs">
            
            {/* TAB: THEME, TYPOGRAPHY & DESIGN STYLE */}
            {activeTab === "theme" && (
              <div className="space-y-10">
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
                    <span>🎨 Tipografi, Font Ailesi & Tasarım Stili</span>
                  </h2>
                  <p className="text-xs text-[#605F5F] mt-1">
                    Sitedeki tüm metinlerin yazı tipini (font), kalınlığını (bold), italik stilini, büyüklüğünü ve renk paletini tek merkezden yönetin.
                  </p>
                </div>

                {/* 1. FONT FAMILY PRESETS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">1. Yazı Tipi (Font Family) Seçimi</h3>
                      <p className="text-xs text-[#8C8C8C]">Google Fonts kütüphanesinden dilediğiniz yazı tipini tek tıkla seçin</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1A1A1A] text-white">
                      Aktif: {content.theme?.fontName || "Inter"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                    {fontPresets.map((preset) => {
                      const isSelected = content.theme?.fontName === preset.name;
                      return (
                        <div
                          key={preset.name}
                          onClick={() => {
                            setContent({
                              ...content,
                              theme: {
                                ...content.theme,
                                fontName: preset.name,
                                fontFamily: preset.family,
                                googleFontUrl: preset.url,
                              },
                            });
                          }}
                          className={`cursor-pointer p-4 rounded-xl border text-left transition-all relative ${
                            isSelected
                              ? "bg-white border-[#1A1A1A] shadow-md ring-2 ring-[#1A1A1A]/10"
                              : "bg-white/80 border-[#DDD7D0] hover:border-[#1A1A1A]/40 hover:bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-[#1A1A1A]">{preset.name}</span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[10px]">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#8C8C8C] block mb-2">{preset.category}</span>
                          <div
                            style={{ fontFamily: preset.family }}
                            className="text-xs text-[#2A2A2A] font-medium truncate pt-1 border-t border-[#F0ECE6]"
                          >
                            CODEICON MICE Sistemi
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Custom Font Override */}
                  <details className="pt-2 text-xs">
                    <summary className="cursor-pointer font-bold text-[#605F5F] hover:text-[#1A1A1A]">
                      + Başka bir Google Font eklemek istiyor musunuz? (Gelişmiş)
                    </summary>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 mt-2 bg-white p-4 rounded-xl border border-[#DDD7D0]">
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Font Adı</label>
                        <input
                          type="text"
                          value={content.theme?.fontName || ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              theme: { ...content.theme, fontName: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0]"
                          placeholder="Örn: Roboto"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">CSS font-family</label>
                        <input
                          type="text"
                          value={content.theme?.fontFamily || ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              theme: { ...content.theme, fontFamily: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-[#DDD7D0]"
                          placeholder="'Roboto', sans-serif"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Google Font CSS Linki</label>
                        <input
                          type="text"
                          value={content.theme?.googleFontUrl || ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              theme: { ...content.theme, googleFontUrl: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-[#DDD7D0]"
                          placeholder="https://fonts.googleapis.com/css2?..."
                        />
                      </div>
                    </div>
                  </details>
                </div>

                {/* 2. COLOR PALETTE MANAGER */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">2. Renk Paleti Özelleştirme</h3>
                      <p className="text-xs text-[#8C8C8C]">Sitenin zemin, metin, vurgu ve buton renklerini ayarlayın</p>
                    </div>

                    {/* Quick Palette Presets */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold text-[#8C8C8C] uppercase">Hazır Temalar:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setContent({
                            ...content,
                            theme: {
                              ...content.theme,
                              colors: {
                                background: "#F4F2EE",
                                foreground: "#1A1A1A",
                                muted: "#605F5F",
                                accent: "#FEF7AF",
                                accentText: "#594C00",
                                cardBg: "#FFFFFF",
                                border: "#DDD7D0",
                                buttonBg: "#1A1A1A",
                                buttonText: "#FFFFFF",
                              },
                            },
                          });
                        }}
                        className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-white border border-[#DDD7D0] hover:bg-[#EAE6E1]"
                      >
                        Klasik Bej
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setContent({
                            ...content,
                            theme: {
                              ...content.theme,
                              colors: {
                                background: "#FFFFFF",
                                foreground: "#0F172A",
                                muted: "#64748B",
                                accent: "#E0E7FF",
                                accentText: "#3730A3",
                                cardBg: "#F8FAFC",
                                border: "#E2E8F0",
                                buttonBg: "#0F172A",
                                buttonText: "#FFFFFF",
                              },
                            },
                          });
                        }}
                        className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-white border border-[#DDD7D0] hover:bg-[#EAE6E1]"
                      >
                        Modern Beyaz & İndigo
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setContent({
                            ...content,
                            theme: {
                              ...content.theme,
                              colors: {
                                background: "#0F172A",
                                foreground: "#F8FAFC",
                                muted: "#94A3B8",
                                accent: "#FDE047",
                                accentText: "#713F12",
                                cardBg: "#1E293B",
                                border: "#334155",
                                buttonBg: "#FDE047",
                                buttonText: "#0F172A",
                              },
                            },
                          });
                        }}
                        className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-white border border-[#DDD7D0] hover:bg-[#EAE6E1]"
                      >
                        Koyu Gece (Dark)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
                    {[
                      { key: "background", label: "Sayfa Ana Arka Planı", default: "#F4F2EE" },
                      { key: "foreground", label: "Ana Metin Rengi", default: "#1A1A1A" },
                      { key: "muted", label: "Açıklama / İkincil Metin", default: "#605F5F" },
                      { key: "accent", label: "Vurgu Rozet Rengi", default: "#FEF7AF" },
                      { key: "accentText", label: "Vurgu Rozet Yazısı", default: "#594C00" },
                      { key: "cardBg", label: "Kart Arka Plan Rengi", default: "#FFFFFF" },
                      { key: "border", label: "Kenarlık & Çizgiler", default: "#DDD7D0" },
                      { key: "buttonBg", label: "Ana Buton Rengi", default: "#1A1A1A" },
                      { key: "buttonText", label: "Ana Buton Yazı Rengi", default: "#FFFFFF" },
                    ].map((item) => {
                      const currentColor = content.theme?.colors?.[item.key] || item.default;
                      return (
                        <div key={item.key} className="bg-white p-3 rounded-xl border border-[#DDD7D0] flex items-center justify-between gap-3 shadow-2xs">
                          <div>
                            <label className="block text-[11px] font-bold text-[#1A1A1A]">{item.label}</label>
                            <span className="text-[10px] font-mono text-[#8C8C8C]">{currentColor}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={currentColor}
                              onChange={(e) => updateThemeColor(item.key, e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer border border-[#DDD7D0] p-0.5 bg-white"
                            />
                            <input
                              type="text"
                              value={currentColor}
                              onChange={(e) => updateThemeColor(item.key, e.target.value)}
                              className="w-20 px-2 py-1 text-xs font-mono rounded border border-[#DDD7D0] uppercase"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. DETAILED TYPOGRAPHY SCALE, WEIGHT & STYLE CONTROLS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-[#1A1A1A]">3. Her Başlık ve Metin İçin Tipografi Ayarları</h3>
                    <p className="text-xs text-[#8C8C8C]">Büyüklük, kalınlık (bold), italik vurgu ve özel metin renklerini ayrı ayrı belirleyin</p>
                  </div>

                  <div className="space-y-4">
                    {/* Hero Ana Başlık */}
                    <div className="bg-white p-4 rounded-xl border border-[#DDD7D0] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE6]">
                        <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                          <Type className="w-3.5 h-3.5" />
                          Hero Ana Başlık (Giriş Başlığı)
                        </span>
                        <span className="text-[10px] text-[#8C8C8C]">Örn: "MICE operasyonlarında"</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Büyüklük</label>
                          <select
                            value={content.theme?.typography?.heroTitle?.size || "clamp(2.25rem, 5vw, 4.5rem)"}
                            onChange={(e) => updateTypography("heroTitle", "size", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0] bg-white font-semibold"
                          >
                            <option value="clamp(1.75rem, 4vw, 3.5rem)">Kompakt (36px - 48px)</option>
                            <option value="clamp(2.25rem, 5vw, 4.5rem)">Normal (48px - 64px)</option>
                            <option value="clamp(2.5rem, 6vw, 5.5rem)">Büyük (56px - 72px)</option>
                            <option value="clamp(3rem, 7vw, 6.5rem)">Ekstra Büyük (64px - 84px)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Kalınlık (Weight)</label>
                          <select
                            value={content.theme?.typography?.heroTitle?.weight || "700"}
                            onChange={(e) => updateTypography("heroTitle", "weight", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0] bg-white font-semibold"
                          >
                            <option value="300">300 - İnce (Light)</option>
                            <option value="400">400 - Normal (Regular)</option>
                            <option value="600">600 - Yarı Kalın (Semibold)</option>
                            <option value="700">700 - Kalın (Bold)</option>
                            <option value="800">800 - Ekstra Kalın</option>
                            <option value="900">900 - En Kalın (Black)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">İtalik</label>
                          <button
                            type="button"
                            onClick={() =>
                              updateTypography("heroTitle", "italic", !content.theme?.typography?.heroTitle?.italic)
                            }
                            className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                              content.theme?.typography?.heroTitle?.italic
                                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                                : "bg-white text-[#1A1A1A] border-[#DDD7D0] hover:bg-[#FAF9F6]"
                            }`}
                          >
                            <Italic className="w-3.5 h-3.5" />
                            <span>{content.theme?.typography?.heroTitle?.italic ? "İtalik Aktif" : "Normal"}</span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Özel Renk</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={content.theme?.typography?.heroTitle?.color || content.theme?.colors?.foreground || "#1A1A1A"}
                              onChange={(e) => updateTypography("heroTitle", "color", e.target.value)}
                              className="w-7 h-7 rounded border border-[#DDD7D0] cursor-pointer"
                            />
                            <input
                              type="text"
                              value={content.theme?.typography?.heroTitle?.color || ""}
                              placeholder="#1A1A1A"
                              onChange={(e) => updateTypography("heroTitle", "color", e.target.value)}
                              className="w-full px-2 py-1 text-xs font-mono rounded border border-[#DDD7D0]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hero Vurgulu Kelime (Accent) */}
                    <div className="bg-white p-4 rounded-xl border border-[#DDD7D0] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE6]">
                        <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          Hero Vurgulu Kelime (Accent)
                        </span>
                        <span className="text-[10px] text-[#8C8C8C]">Örn: "kusursuz dijital çağ"</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Kalınlık (Weight)</label>
                          <select
                            value={content.theme?.typography?.heroTitleAccent?.weight || "400"}
                            onChange={(e) => updateTypography("heroTitleAccent", "weight", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0] bg-white font-semibold"
                          >
                            <option value="300">300 - İnce (Light)</option>
                            <option value="400">400 - Normal (Regular)</option>
                            <option value="600">600 - Yarı Kalın (Semibold)</option>
                            <option value="700">700 - Kalın (Bold)</option>
                            <option value="800">800 - Ekstra Kalın</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">İtalik</label>
                          <button
                            type="button"
                            onClick={() =>
                              updateTypography("heroTitleAccent", "italic", content.theme?.typography?.heroTitleAccent?.italic === false ? true : false)
                            }
                            className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                              content.theme?.typography?.heroTitleAccent?.italic !== false
                                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                                : "bg-white text-[#1A1A1A] border-[#DDD7D0] hover:bg-[#FAF9F6]"
                            }`}
                          >
                            <Italic className="w-3.5 h-3.5" />
                            <span>{content.theme?.typography?.heroTitleAccent?.italic !== false ? "İtalik Aktif" : "Normal"}</span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Özel Renk</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={content.theme?.typography?.heroTitleAccent?.color || "#2A2A2A"}
                              onChange={(e) => updateTypography("heroTitleAccent", "color", e.target.value)}
                              className="w-7 h-7 rounded border border-[#DDD7D0] cursor-pointer"
                            />
                            <input
                              type="text"
                              value={content.theme?.typography?.heroTitleAccent?.color || ""}
                              placeholder="#2A2A2A"
                              onChange={(e) => updateTypography("heroTitleAccent", "color", e.target.value)}
                              className="w-full px-2 py-1 text-xs font-mono rounded border border-[#DDD7D0]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bölüm Başlıkları (H2) */}
                    <div className="bg-white p-4 rounded-xl border border-[#DDD7D0] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE6]">
                        <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                          <Type className="w-3.5 h-3.5" />
                          Bölüm Başlıkları (H2 - Modüller, Süreç, Entegrasyon, Fiyat)
                        </span>
                        <span className="text-[10px] text-[#8C8C8C]">Tüm bölümlerin ana başlıkları</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Büyüklük</label>
                          <select
                            value={content.theme?.typography?.sectionTitle?.size || "clamp(1.75rem, 3.5vw, 3rem)"}
                            onChange={(e) => updateTypography("sectionTitle", "size", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0] bg-white font-semibold"
                          >
                            <option value="clamp(1.5rem, 3vw, 2.25rem)">Kompakt (26px - 36px)</option>
                            <option value="clamp(1.75rem, 3.5vw, 3rem)">Normal (32px - 48px)</option>
                            <option value="clamp(2.25rem, 4.5vw, 3.75rem)">Büyük (40px - 56px)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Kalınlık (Weight)</label>
                          <select
                            value={content.theme?.typography?.sectionTitle?.weight || "700"}
                            onChange={(e) => updateTypography("sectionTitle", "weight", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0] bg-white font-semibold"
                          >
                            <option value="500">500 - Orta (Medium)</option>
                            <option value="600">600 - Yarı Kalın (Semibold)</option>
                            <option value="700">700 - Kalın (Bold)</option>
                            <option value="800">800 - Ekstra Kalın</option>
                            <option value="900">900 - En Kalın (Black)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">İtalik</label>
                          <button
                            type="button"
                            onClick={() =>
                              updateTypography("sectionTitle", "italic", !content.theme?.typography?.sectionTitle?.italic)
                            }
                            className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                              content.theme?.typography?.sectionTitle?.italic
                                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                                : "bg-white text-[#1A1A1A] border-[#DDD7D0] hover:bg-[#FAF9F6]"
                            }`}
                          >
                            <Italic className="w-3.5 h-3.5" />
                            <span>{content.theme?.typography?.sectionTitle?.italic ? "İtalik Aktif" : "Normal"}</span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Özel Renk</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={content.theme?.typography?.sectionTitle?.color || content.theme?.colors?.foreground || "#1A1A1A"}
                              onChange={(e) => updateTypography("sectionTitle", "color", e.target.value)}
                              className="w-7 h-7 rounded border border-[#DDD7D0] cursor-pointer"
                            />
                            <input
                              type="text"
                              value={content.theme?.typography?.sectionTitle?.color || ""}
                              placeholder="#1A1A1A"
                              onChange={(e) => updateTypography("sectionTitle", "color", e.target.value)}
                              className="w-full px-2 py-1 text-xs font-mono rounded border border-[#DDD7D0]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bölüm Alt Başlıkları / Açıklamaları */}
                    <div className="bg-white p-4 rounded-xl border border-[#DDD7D0] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE6]">
                        <span className="text-xs font-bold text-[#1A1A1A]">
                          Bölüm Alt Başlıkları / Açıklamaları (Subtitles)
                        </span>
                        <span className="text-[10px] text-[#8C8C8C]">Başlık altındaki açıklama paragrafları</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Büyüklük</label>
                          <select
                            value={content.theme?.typography?.sectionSubtitle?.size || "1.0625rem"}
                            onChange={(e) => updateTypography("sectionSubtitle", "size", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0] bg-white font-semibold"
                          >
                            <option value="0.9375rem">Kompakt (15px)</option>
                            <option value="1.0625rem">Normal (17px)</option>
                            <option value="1.1875rem">Büyük (19px)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Kalınlık (Weight)</label>
                          <select
                            value={content.theme?.typography?.sectionSubtitle?.weight || "400"}
                            onChange={(e) => updateTypography("sectionSubtitle", "weight", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0] bg-white font-semibold"
                          >
                            <option value="300">300 - İnce (Light)</option>
                            <option value="400">400 - Normal (Regular)</option>
                            <option value="500">500 - Orta (Medium)</option>
                            <option value="600">600 - Yarı Kalın</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">İtalik</label>
                          <button
                            type="button"
                            onClick={() =>
                              updateTypography("sectionSubtitle", "italic", !content.theme?.typography?.sectionSubtitle?.italic)
                            }
                            className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                              content.theme?.typography?.sectionSubtitle?.italic
                                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                                : "bg-white text-[#1A1A1A] border-[#DDD7D0] hover:bg-[#FAF9F6]"
                            }`}
                          >
                            <Italic className="w-3.5 h-3.5" />
                            <span>{content.theme?.typography?.sectionSubtitle?.italic ? "İtalik Aktif" : "Normal"}</span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Özel Renk</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={content.theme?.typography?.sectionSubtitle?.color || content.theme?.colors?.muted || "#605F5F"}
                              onChange={(e) => updateTypography("sectionSubtitle", "color", e.target.value)}
                              className="w-7 h-7 rounded border border-[#DDD7D0] cursor-pointer"
                            />
                            <input
                              type="text"
                              value={content.theme?.typography?.sectionSubtitle?.color || ""}
                              placeholder="#605F5F"
                              onChange={(e) => updateTypography("sectionSubtitle", "color", e.target.value)}
                              className="w-full px-2 py-1 text-xs font-mono rounded border border-[#DDD7D0]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Üst Rozetler (Eyebrows) */}
                    <div className="bg-white p-4 rounded-xl border border-[#DDD7D0] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE6]">
                        <span className="text-xs font-bold text-[#1A1A1A]">
                          Üst Rozetler / Etiketler (Eyebrows)
                        </span>
                        <span className="text-[10px] text-[#8C8C8C]">Örn: "MERKEZİ MODÜLLER", "ESNEK PAKETLER"</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Büyüklük</label>
                          <select
                            value={content.theme?.typography?.sectionEyebrow?.size || "0.75rem"}
                            onChange={(e) => updateTypography("sectionEyebrow", "size", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0] bg-white font-semibold"
                          >
                            <option value="0.6875rem">11px - Kompakt</option>
                            <option value="0.75rem">12px - Normal</option>
                            <option value="0.8125rem">13px - Orta</option>
                            <option value="0.875rem">14px - Büyük</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Kalınlık (Weight)</label>
                          <select
                            value={content.theme?.typography?.sectionEyebrow?.weight || "600"}
                            onChange={(e) => updateTypography("sectionEyebrow", "weight", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0] bg-white font-semibold"
                          >
                            <option value="500">500 - Orta (Medium)</option>
                            <option value="600">600 - Yarı Kalın (Semibold)</option>
                            <option value="700">700 - Kalın (Bold)</option>
                            <option value="800">800 - Ekstra Kalın</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">İtalik</label>
                          <button
                            type="button"
                            onClick={() =>
                              updateTypography("sectionEyebrow", "italic", !content.theme?.typography?.sectionEyebrow?.italic)
                            }
                            className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                              content.theme?.typography?.sectionEyebrow?.italic
                                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                                : "bg-white text-[#1A1A1A] border-[#DDD7D0] hover:bg-[#FAF9F6]"
                            }`}
                          >
                            <Italic className="w-3.5 h-3.5" />
                            <span>{content.theme?.typography?.sectionEyebrow?.italic ? "İtalik Aktif" : "Normal"}</span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Özel Renk</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={content.theme?.typography?.sectionEyebrow?.color || "#8C8C8C"}
                              onChange={(e) => updateTypography("sectionEyebrow", "color", e.target.value)}
                              className="w-7 h-7 rounded border border-[#DDD7D0] cursor-pointer"
                            />
                            <input
                              type="text"
                              value={content.theme?.typography?.sectionEyebrow?.color || ""}
                              placeholder="#8C8C8C"
                              onChange={(e) => updateTypography("sectionEyebrow", "color", e.target.value)}
                              className="w-full px-2 py-1 text-xs font-mono rounded border border-[#DDD7D0]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Kart Başlıkları (H3/H4) */}
                    <div className="bg-white p-4 rounded-xl border border-[#DDD7D0] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE6]">
                        <span className="text-xs font-bold text-[#1A1A1A]">
                          Kart Başlıkları (Fiyat Paketleri, Modül İçi Kartlar vb.)
                        </span>
                        <span className="text-[10px] text-[#8C8C8C]">Örn: "MICE Pro", "Butik Acente"</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Büyüklük</label>
                          <select
                            value={content.theme?.typography?.cardTitle?.size || "1.25rem"}
                            onChange={(e) => updateTypography("cardTitle", "size", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0] bg-white font-semibold"
                          >
                            <option value="1.125rem">18px - Kompakt</option>
                            <option value="1.25rem">20px - Normal</option>
                            <option value="1.5rem">24px - Büyük</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Kalınlık (Weight)</label>
                          <select
                            value={content.theme?.typography?.cardTitle?.weight || "700"}
                            onChange={(e) => updateTypography("cardTitle", "weight", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0] bg-white font-semibold"
                          >
                            <option value="600">600 - Yarı Kalın</option>
                            <option value="700">700 - Kalın (Bold)</option>
                            <option value="800">800 - Ekstra Kalın</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">İtalik</label>
                          <button
                            type="button"
                            onClick={() =>
                              updateTypography("cardTitle", "italic", !content.theme?.typography?.cardTitle?.italic)
                            }
                            className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                              content.theme?.typography?.cardTitle?.italic
                                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                                : "bg-white text-[#1A1A1A] border-[#DDD7D0] hover:bg-[#FAF9F6]"
                            }`}
                          >
                            <Italic className="w-3.5 h-3.5" />
                            <span>{content.theme?.typography?.cardTitle?.italic ? "İtalik Aktif" : "Normal"}</span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Özel Renk</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={content.theme?.typography?.cardTitle?.color || content.theme?.colors?.foreground || "#1A1A1A"}
                              onChange={(e) => updateTypography("cardTitle", "color", e.target.value)}
                              className="w-7 h-7 rounded border border-[#DDD7D0] cursor-pointer"
                            />
                            <input
                              type="text"
                              value={content.theme?.typography?.cardTitle?.color || ""}
                              placeholder="#1A1A1A"
                              onChange={(e) => updateTypography("cardTitle", "color", e.target.value)}
                              className="w-full px-2 py-1 text-xs font-mono rounded border border-[#DDD7D0]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. LIVE INTERACTIVE PREVIEW CARD */}
                <div className="p-6 rounded-2xl border border-[#DDD7D0] space-y-4 shadow-sm" style={{ backgroundColor: content.theme?.colors?.background || "#F4F2EE" }}>
                  <div className="flex items-center justify-between pb-3 border-b border-black/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C8C8C]">
                      Canlı Tipografi & Renk Önizlemesi
                    </span>
                    <span className="text-xs text-[#8C8C8C]">
                      Font: {content.theme?.fontName || "Inter"}
                    </span>
                  </div>

                  <div style={{ fontFamily: content.theme?.fontFamily || "'Inter', sans-serif" }} className="text-center py-6 space-y-4">
                    {/* Eyebrow */}
                    <div
                      style={{
                        color: content.theme?.typography?.sectionEyebrow?.color || "#8C8C8C",
                        fontWeight: content.theme?.typography?.sectionEyebrow?.weight || "600",
                        fontStyle: content.theme?.typography?.sectionEyebrow?.italic ? "italic" : "normal",
                      }}
                      className="text-xs uppercase tracking-widest"
                    >
                      {content.brand?.badge || "Yeni Nesil MICE & Acente Sistemi"}
                    </div>

                    {/* Hero Title */}
                    <h3
                      style={{
                        color: content.theme?.typography?.heroTitle?.color || content.theme?.colors?.foreground || "#1A1A1A",
                        fontWeight: content.theme?.typography?.heroTitle?.weight || "700",
                        fontStyle: content.theme?.typography?.heroTitle?.italic ? "italic" : "normal",
                      }}
                      className="text-2xl sm:text-4xl font-bold tracking-tight"
                    >
                      MICE operasyonlarında{" "}
                      <span
                        style={{
                          color: content.theme?.typography?.heroTitleAccent?.color || "#2A2A2A",
                          fontWeight: content.theme?.typography?.heroTitleAccent?.weight || "400",
                          fontStyle: content.theme?.typography?.heroTitleAccent?.italic !== false ? "italic" : "normal",
                        }}
                      >
                        kusursuz dijital çağ
                      </span>
                    </h3>

                    {/* Subtitle */}
                    <p
                      style={{
                        color: content.theme?.typography?.heroSubtitle?.color || content.theme?.colors?.muted || "#605F5F",
                        fontWeight: content.theme?.typography?.heroSubtitle?.weight || "400",
                        fontStyle: content.theme?.typography?.heroSubtitle?.italic ? "italic" : "normal",
                      }}
                      className="text-sm max-w-xl mx-auto leading-relaxed"
                    >
                      Kurumsal Etkinlik, Toplantı, Kongre, Sejour konaklamaları ve tam entegre finansal yönetimi tek ekranda birleştiren yeni nesil işletim sistemi.
                    </p>

                    {/* Sample Button */}
                    <div className="pt-2 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        style={{
                          backgroundColor: content.theme?.colors?.buttonBg || "#1A1A1A",
                          color: content.theme?.colors?.buttonText || "#FFFFFF",
                        }}
                        className="px-6 py-2.5 rounded-full text-xs font-semibold shadow-md"
                      >
                        Demoyu İncele
                      </button>
                      <span
                        style={{
                          backgroundColor: content.theme?.colors?.accent || "#FEF7AF",
                          color: content.theme?.colors?.accentText || "#594C00",
                        }}
                        className="px-3 py-1 rounded-full text-xs font-bold"
                      >
                        %20 İndirim
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MENU & NAVIGATION MANAGEMENT */}
            {activeTab === "navigation" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Menü Yönetimi</h2>
                  <p className="text-xs text-[#605F5F] mt-1">
                    Üst navigasyon (Navbar) ve alt bilgi (Footer) menü linklerini ekleyin, düzenleyin veya kaldırın.
                  </p>
                </div>

                {/* 1. HEADER NAV LINKS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">Üst Menü (Navbar) Linkleri</h3>
                      <p className="text-xs text-[#8C8C8C]">Sitenin en üstündeki yüzen menüde görünen bağlantılar</p>
                    </div>

                    <button
                      onClick={() => {
                        const links = content.navigation?.headerLinks || [];
                        setContent({
                          ...content,
                          navigation: {
                            ...content.navigation,
                            headerLinks: [...links, { label: "Yeni Sayfa", href: "#" }],
                          },
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Yeni Menü Öğesi Ekle</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    {(content.navigation?.headerLinks || []).map((link: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#DDD7D0] shadow-2xs">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Menü Başlığı</label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const newLinks = [...content.navigation.headerLinks];
                              newLinks[idx].label = e.target.value;
                              setContent({
                                ...content,
                                navigation: { ...content.navigation, headerLinks: newLinks },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-[#DDD7D0] focus:outline-none focus:border-[#1A1A1A]"
                            placeholder="Örn: Hakkımızda"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Hedef Link / URL</label>
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) => {
                              const newLinks = [...content.navigation.headerLinks];
                              newLinks[idx].href = e.target.value;
                              setContent({
                                ...content,
                                navigation: { ...content.navigation, headerLinks: newLinks },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-[#DDD7D0] focus:outline-none focus:border-[#1A1A1A]"
                            placeholder="Örn: #features veya /sayfa"
                          />
                        </div>

                        <div className="pt-4">
                          <button
                            onClick={() => {
                              const newLinks = content.navigation.headerLinks.filter((_: any, i: number) => i !== idx);
                              setContent({
                                ...content,
                                navigation: { ...content.navigation, headerLinks: newLinks },
                              });
                            }}
                            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                            title="Menü Öğesini Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. FOOTER NAV LINKS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">Alt Bilgi (Footer) Linkleri</h3>
                      <p className="text-xs text-[#8C8C8C]">Sayfanın altındaki "Pages" sütununda görünen linkler</p>
                    </div>

                    <button
                      onClick={() => {
                        const links = content.navigation?.footerLinks || [];
                        setContent({
                          ...content,
                          navigation: {
                            ...content.navigation,
                            footerLinks: [...links, { label: "Yeni Link", href: "#" }],
                          },
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Footer Linki Ekle</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    {(content.navigation?.footerLinks || []).map((link: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#DDD7D0] shadow-2xs">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Link Başlığı</label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const newLinks = [...content.navigation.footerLinks];
                              newLinks[idx].label = e.target.value;
                              setContent({
                                ...content,
                                navigation: { ...content.navigation, footerLinks: newLinks },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-[#DDD7D0] focus:outline-none focus:border-[#1A1A1A]"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Hedef Link / URL</label>
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) => {
                              const newLinks = [...content.navigation.footerLinks];
                              newLinks[idx].href = e.target.value;
                              setContent({
                                ...content,
                                navigation: { ...content.navigation, footerLinks: newLinks },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-[#DDD7D0] focus:outline-none focus:border-[#1A1A1A]"
                          />
                        </div>

                        <div className="pt-4">
                          <button
                            onClick={() => {
                              const newLinks = content.navigation.footerLinks.filter((_: any, i: number) => i !== idx);
                              setContent({
                                ...content,
                                navigation: { ...content.navigation, footerLinks: newLinks },
                              });
                            }}
                            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                            title="Linki Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FOOTER MANAGEMENT */}
            {activeTab === "footer" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Alt Bilgi (Footer) Yönetimi</h2>
                  <p className="text-xs text-[#605F5F] mt-1">
                    Sitenin en altındaki marka açıklaması, canlı sistem durumu, sütun başlıkları, bağlantılar ve telif haklarını yönetin.
                  </p>
                </div>

                {/* 1. BRAND INFO & SYSTEM STATUS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <h3 className="text-sm font-bold text-[#1A1A1A]">Marka Açıklaması & Sistem Durumu</h3>
                  
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Logo Altındaki Marka Açıklama Metni
                    </label>
                    <textarea
                      rows={3}
                      value={content.footer?.description || ""}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          footer: { ...content.footer, description: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none resize-none"
                      placeholder="Acentenizi ve sisteminizi tanıtan kısa açıklama..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Canlı Sistem Durumu Metni
                      </label>
                      <input
                        type="text"
                        value={content.footer?.systemStatus || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: { ...content.footer, systemStatus: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 rounded-xl border border-[#DDD7D0] text-xs font-medium"
                        placeholder="Örn: Tüm Sistemler Operasyonel"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        id="showSystemStatus"
                        checked={content.footer?.showSystemStatus !== false}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: { ...content.footer, showSystemStatus: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded text-[#1A1A1A] focus:ring-0 cursor-pointer"
                      />
                      <label htmlFor="showSystemStatus" className="text-xs font-bold text-[#1A1A1A] cursor-pointer">
                        Yeşil Durum Işığı & Metnini Göster
                      </label>
                    </div>
                  </div>
                </div>

                {/* 2. COLUMN 1: QUICK LINKS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 max-w-xs">
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">1. Sütun Başlığı</label>
                      <input
                        type="text"
                        value={content.footer?.col1Title || "Hızlı Erişim"}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: { ...content.footer, col1Title: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-[#DDD7D0] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>

                    <button
                      onClick={() => {
                        const links = content.footer?.col1Links || [];
                        setContent({
                          ...content,
                          footer: {
                            ...content.footer,
                            col1Links: [...links, { label: "Yeni Link", href: "#" }],
                          },
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>1. Sütuna Link Ekle</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    {(content.footer?.col1Links || []).map((link: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#DDD7D0] shadow-2xs">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Link Adı</label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const newLinks = [...content.footer.col1Links];
                              newLinks[idx].label = e.target.value;
                              setContent({
                                ...content,
                                footer: { ...content.footer, col1Links: newLinks },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-[#DDD7D0]"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Hedef URL</label>
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) => {
                              const newLinks = [...content.footer.col1Links];
                              newLinks[idx].href = e.target.value;
                              setContent({
                                ...content,
                                footer: { ...content.footer, col1Links: newLinks },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-[#DDD7D0]"
                          />
                        </div>
                        <div className="pt-4">
                          <button
                            onClick={() => {
                              const newLinks = content.footer.col1Links.filter((_: any, i: number) => i !== idx);
                              setContent({
                                ...content,
                                footer: { ...content.footer, col1Links: newLinks },
                              });
                            }}
                            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                            title="Linki Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. COLUMN 2: PLATFORM & SOLUTIONS LINKS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 max-w-xs">
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">2. Sütun Başlığı</label>
                      <input
                        type="text"
                        value={content.footer?.col2Title || "Platform & Modüller"}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: { ...content.footer, col2Title: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-[#DDD7D0] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>

                    <button
                      onClick={() => {
                        const links = content.footer?.col2Links || [];
                        setContent({
                          ...content,
                          footer: {
                            ...content.footer,
                            col2Links: [...links, { label: "Yeni Modül", href: "#features" }],
                          },
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>2. Sütuna Link Ekle</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    {(content.footer?.col2Links || []).map((link: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#DDD7D0] shadow-2xs">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Modül / Sayfa Adı</label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const newLinks = [...content.footer.col2Links];
                              newLinks[idx].label = e.target.value;
                              setContent({
                                ...content,
                                footer: { ...content.footer, col2Links: newLinks },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-[#DDD7D0]"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Hedef URL</label>
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) => {
                              const newLinks = [...content.footer.col2Links];
                              newLinks[idx].href = e.target.value;
                              setContent({
                                ...content,
                                footer: { ...content.footer, col2Links: newLinks },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-[#DDD7D0]"
                          />
                        </div>
                        <div className="pt-4">
                          <button
                            onClick={() => {
                              const newLinks = content.footer.col2Links.filter((_: any, i: number) => i !== idx);
                              setContent({
                                ...content,
                                footer: { ...content.footer, col2Links: newLinks },
                              });
                            }}
                            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                            title="Linki Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. COLUMN 3: DIRECT CONTACT & ADDRESS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      3. Sütun Başlığı
                    </label>
                    <input
                      type="text"
                      value={content.footer?.col3Title || "Doğrudan İletişim"}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          footer: { ...content.footer, col3Title: e.target.value },
                        })
                      }
                      className="w-full max-w-xs px-3 py-1.5 text-xs font-bold rounded-lg border border-[#DDD7D0] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">E-Posta</label>
                      <input
                        type="text"
                        value={content.footer?.email || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: { ...content.footer, email: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-[#DDD7D0]"
                        placeholder="hello@codeicon.co"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Telefon</label>
                      <input
                        type="text"
                        value={content.footer?.phone || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: { ...content.footer, phone: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-[#DDD7D0]"
                        placeholder="+90 (533) ..."
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Şehir & Ofis Lokasyonu</label>
                      <input
                        type="text"
                        value={content.footer?.location || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: { ...content.footer, location: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-[#DDD7D0]"
                        placeholder="İstanbul & Antalya, Türkiye"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. FOOTER NEWSLETTER & SOCIAL MEDIA */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <h3 className="text-sm font-bold text-[#1A1A1A]">Footer E-Bülten & Sosyal Medya</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Footer E-Bülten Başlığı
                      </label>
                      <input
                        type="text"
                        value={content.footer?.newsletterTitle || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: { ...content.footer, newsletterTitle: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 text-xs font-bold rounded-xl border border-[#DDD7D0]"
                        placeholder="Örn: MICE & Acente Bültenine Kaydolun"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Footer Bülten Buton Metni
                      </label>
                      <input
                        type="text"
                        value={content.footer?.newsletterButtonText || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: { ...content.footer, newsletterButtonText: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-[#DDD7D0]"
                        placeholder="Örn: Abone Ol"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-[#1A1A1A] mb-2">Sosyal Medya Linkleri</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">X (Twitter) URL</label>
                        <input
                          type="text"
                          value={content.footer?.socials?.twitter || ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              footer: {
                                ...content.footer,
                                socials: { ...(content.footer?.socials || {}), twitter: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-[#DDD7D0]"
                          placeholder="https://x.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Instagram URL</label>
                        <input
                          type="text"
                          value={content.footer?.socials?.instagram || ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              footer: {
                                ...content.footer,
                                socials: { ...(content.footer?.socials || {}), instagram: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-[#DDD7D0]"
                          placeholder="https://instagram.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">LinkedIn URL</label>
                        <input
                          type="text"
                          value={content.footer?.socials?.linkedin || ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              footer: {
                                ...content.footer,
                                socials: { ...(content.footer?.socials || {}), linkedin: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-[#DDD7D0]"
                          placeholder="https://linkedin.com/..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. BOTTOM BAR: COPYRIGHT & LEGAL LINKS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <h3 className="text-sm font-bold text-[#1A1A1A]">Alt Telif Bandı & Yasal Sözleşmeler</h3>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Telif Hakkı Metni (Copyright)
                    </label>
                    <input
                      type="text"
                      value={content.footer?.copyright || ""}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          footer: { ...content.footer, copyright: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 text-xs font-medium rounded-xl border border-[#DDD7D0]"
                      placeholder="Örn: CODEICON Inc. Tüm hakları saklıdır."
                    />
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#1A1A1A]">Yasal Bağlantılar & Sözleşmeler</h4>
                        <p className="text-[11px] text-[#8C8C8C]">Gizlilik, Kullanım Koşulları, KVKK vb.</p>
                      </div>

                      <button
                        onClick={() => {
                          const links = content.footer?.legalLinks || [];
                          setContent({
                            ...content,
                            footer: {
                              ...content.footer,
                              legalLinks: [...links, { label: "Yeni Sözleşme", href: "#" }],
                            },
                          });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Sözleşme Linki Ekle</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {(content.footer?.legalLinks || []).map((link: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#DDD7D0] shadow-2xs">
                          <div className="flex-1">
                            <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Başlık</label>
                            <input
                              type="text"
                              value={link.label}
                              onChange={(e) => {
                                const newLinks = [...content.footer.legalLinks];
                                newLinks[idx].label = e.target.value;
                                setContent({
                                  ...content,
                                  footer: { ...content.footer, legalLinks: newLinks },
                                });
                              }}
                              className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-[#DDD7D0]"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">URL / Sayfa</label>
                            <input
                              type="text"
                              value={link.href}
                              onChange={(e) => {
                                const newLinks = [...content.footer.legalLinks];
                                newLinks[idx].href = e.target.value;
                                setContent({
                                  ...content,
                                  footer: { ...content.footer, legalLinks: newLinks },
                                });
                              }}
                              className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-[#DDD7D0]"
                            />
                          </div>
                          <div className="pt-4">
                            <button
                              onClick={() => {
                                const newLinks = content.footer.legalLinks.filter((_: any, i: number) => i !== idx);
                                setContent({
                                  ...content,
                                  footer: { ...content.footer, legalLinks: newLinks },
                                });
                              }}
                              className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                              title="Sil"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: BUTTONS & CTAS MANAGEMENT */}
            {activeTab === "buttons" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Tüm Butonlar & Aksiyonlar (CTA)</h2>
                  <p className="text-xs text-[#605F5F] mt-1">
                    Sitedeki tüm tıklanabilir butonların üzerindeki yazıları ve yönlendirdikleri adresleri tek bir yerden yönetin.
                  </p>
                </div>

                {/* 1. NAVBAR CTA BUTTON */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
                    <h3 className="text-sm font-bold text-[#1A1A1A]">Üst Menü (Navbar) Sağ Butonu</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Buton Yazısı
                      </label>
                      <input
                        type="text"
                        value={content.buttons?.navbarCtaText || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            buttons: { ...content.buttons, navbarCtaText: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                        placeholder="Örn: Get started / Demoyu İncele"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Buton Hedef Linki (URL veya #bölüm)
                      </label>
                      <input
                        type="text"
                        value={content.buttons?.navbarCtaHref || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            buttons: { ...content.buttons, navbarCtaHref: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm font-mono focus:border-[#1A1A1A] focus:outline-none"
                        placeholder="Örn: #contact veya https://calendly.com"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. HERO BUTTONS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
                    <h3 className="text-sm font-bold text-[#1A1A1A]">Hero (Giriş) Bölümü Butonları</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3 bg-white p-3.5 rounded-xl border border-[#DDD7D0]">
                      <span className="text-xs font-bold text-[#1A1A1A]">1. Ana Buton (Siyah Dolgulu)</span>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">Yazı:</label>
                        <input
                          type="text"
                          value={content.buttons?.heroPrimaryText || ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              buttons: { ...content.buttons, heroPrimaryText: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">Link:</label>
                        <input
                          type="text"
                          value={content.buttons?.heroPrimaryHref || ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              buttons: { ...content.buttons, heroPrimaryHref: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 bg-white p-3.5 rounded-xl border border-[#DDD7D0]">
                      <span className="text-xs font-bold text-[#1A1A1A]">2. İkincil Buton (Beyaz Kenarlıklı)</span>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">Yazı:</label>
                        <input
                          type="text"
                          value={content.buttons?.heroSecondaryText || ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              buttons: { ...content.buttons, heroSecondaryText: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">Link:</label>
                        <input
                          type="text"
                          value={content.buttons?.heroSecondaryHref || ""}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              buttons: { ...content.buttons, heroSecondaryHref: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. FORM & NEWSLETTER BUTTONS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
                    <h3 className="text-sm font-bold text-[#1A1A1A]">Form ve Bülten Gönder Butonları</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        İletişim Formu Butonu
                      </label>
                      <input
                        type="text"
                        value={content.buttons?.contactSubmitText || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            buttons: { ...content.buttons, contactSubmitText: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Bülten Abone Ol Butonu
                      </label>
                      <input
                        type="text"
                        value={content.buttons?.newsletterSubmitText || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            buttons: { ...content.buttons, newsletterSubmitText: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MEDIA, LOGO & FAVICON */}
            {activeTab === "media" && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#EAE6E1]">
                  <div>
                    <h2 className="text-xl font-bold text-[#1A1A1A]">Medya, Logo ve Favicon Yönetimi</h2>
                    <p className="text-xs text-[#605F5F] mt-1">
                      Sitede kullanılacak logonuzu, favicon ikonunuzu ve ekran görüntülerini tek tıkla yükleyin veya değiştirin.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition shadow-sm disabled:opacity-50 self-start sm:self-auto"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Kaydediliyor...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Değişiklikleri Kaydet</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 1. LOGO SECTION */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">Site Logosu</h3>
                      <p className="text-xs text-[#8C8C8C]">Üst menü ve alt bilgide görünecek logo</p>
                    </div>
                    {/* Logo Type Selector */}
                    <div className="flex items-center gap-1 bg-[#ECE8E2] p-1 rounded-lg text-xs font-semibold">
                      <button
                        onClick={() => setContent({ ...content, assets: { ...content.assets, logoType: "monogram" } })}
                        className={`px-3 py-1 rounded-md transition ${
                          content.assets?.logoType !== "image" ? "bg-white text-[#1A1A1A] shadow-xs" : "text-[#605F5F]"
                        }`}
                      >
                        Yazı / Monogram
                      </button>
                      <button
                        onClick={() => setContent({ ...content, assets: { ...content.assets, logoType: "image" } })}
                        className={`px-3 py-1 rounded-md transition ${
                          content.assets?.logoType === "image" ? "bg-white text-[#1A1A1A] shadow-xs" : "text-[#605F5F]"
                        }`}
                      >
                        Resim Logo
                      </button>
                    </div>
                  </div>

                  {content.assets?.logoType === "image" && (
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      <div className="sm:col-span-4 bg-white border border-[#DDD7D0] rounded-xl p-4 flex items-center justify-center min-h-[90px] shadow-2xs">
                        {content.assets?.logoUrl ? (
                          <img
                            src={content.assets.logoUrl}
                            alt="Logo Önizleme"
                            className="max-h-12 max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-xs text-[#8C8C8C]">Logo seçilmedi</span>
                        )}
                      </div>

                      <div className="sm:col-span-8 space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={content.assets?.logoUrl || ""}
                            onChange={(e) =>
                              setContent({ ...content, assets: { ...content.assets, logoUrl: e.target.value } })
                            }
                            placeholder="/logo.png veya görsel adresi"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD7D0] focus:outline-none focus:border-[#1A1A1A]"
                          />
                          <button
                            onClick={() => logoInputRef.current?.click()}
                            disabled={uploadingLogo}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition shrink-0"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadingLogo ? "Yükleniyor..." : "Logo Yükle"}</span>
                          </button>
                          <input
                            ref={logoInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "logo");
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-[#8C8C8C]">
                          <span>Hazır Seçim:</span>
                          <button
                            onClick={() =>
                              setContent({ ...content, assets: { ...content.assets, logoUrl: "/logo.png", logoType: "image" } })
                            }
                            className="underline hover:text-[#1A1A1A]"
                          >
                            /logo.png (Codeicon Logosu)
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. FAVICON SECTION */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">Site Faviconu</h3>
                      <p className="text-xs text-[#8C8C8C]">Tarayıcı sekmesinde görünecek küçük ikon (.ico, .png, .svg)</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-white border border-[#DDD7D0] flex items-center justify-center p-1.5 shadow-2xs">
                        <img
                          src={content.assets?.faviconUrl || "/favicon.ico"}
                          alt="Favicon"
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                      <button
                        onClick={() => faviconInputRef.current?.click()}
                        disabled={uploadingFavicon}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingFavicon ? "Yükleniyor..." : "Favicon Yükle"}</span>
                      </button>
                      <input
                        ref={faviconInputRef}
                        type="file"
                        accept="image/x-icon,image/png,image/svg+xml"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "favicon");
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. HERO DASHBOARD DISPLAY */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#1A1A1A]">Hero Görsel / Mockup Tercihi</h3>
                    <p className="text-xs text-[#8C8C8C]">
                      Giriş bölümündeki büyük mockup alanında ne görünmesini istersiniz?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mockupOptions.map((opt, idx) => {
                      const isSelected =
                        opt.type === "interactive"
                          ? content.assets?.heroMockupType === "interactive"
                          : content.assets?.heroMockupType === "image" && content.assets?.heroMockupImage === opt.img;

                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            setContent({
                              ...content,
                              assets: {
                                ...content.assets,
                                heroMockupType: opt.type,
                                heroMockupImage: opt.img || content.assets?.heroMockupImage,
                              },
                            });
                          }}
                          className={`cursor-pointer p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-white border-[#1A1A1A] shadow-xs font-bold text-[#1A1A1A]"
                              : "bg-white/60 border-[#E2DDD7] text-[#605F5F] hover:bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Laptop className="w-4 h-4 text-[#8C8C8C]" />
                            <span>{opt.name}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. MEDIA LIBRARY (ORTAM KÜTÜPHANESİ) */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">Ortam Kütüphanesi</h3>
                      <p className="text-xs text-[#8C8C8C]">Projeye yüklenmiş tüm görseller ({mediaList.length} dosya)</p>
                    </div>

                    <button
                      onClick={() => generalInputRef.current?.click()}
                      disabled={uploadingGeneral}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingGeneral ? "Yükleniyor..." : "Yeni Görsel Yükle"}</span>
                    </button>
                    <input
                      ref={generalInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "general");
                      }}
                    />
                  </div>

                  {/* Media Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {mediaList.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl border border-[#DDD7D0] p-2 flex flex-col justify-between group hover:border-[#1A1A1A] transition shadow-2xs"
                      >
                        <div className="h-24 bg-[#FAF9F6] rounded-lg overflow-hidden flex items-center justify-center p-1 mb-2">
                          <img
                            src={item.url}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="text-[11px] font-semibold text-[#1A1A1A] truncate mb-1" title={item.name}>
                          {item.name}
                        </div>
                        <div className="flex items-center justify-between gap-1 pt-1 border-t border-[#F0ECE6]">
                          <span className="text-[9px] uppercase tracking-wider text-[#8C8C8C]">{item.folder}</span>
                          <button
                            onClick={() => copyToClipboard(item.url)}
                            className="text-[10px] font-semibold text-[#1A1A1A] hover:underline flex items-center gap-0.5"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedUrl === item.url ? "Kopyalandı!" : "URL"}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SECTION VISIBILITY */}
            {activeTab === "visibility" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Bölüm Görünürlüğü</h2>
                  <p className="text-xs text-[#605F5F] mt-1">
                    İstemediğin bölümleri tek tıkla kapatabilirsin. Kapatılan bölümler ana sayfadan tamamen kaldırılır.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { key: "hero", title: "Hero (Giriş & Mockup)", desc: "Ana başlık, butonlar ve dashboard" },
                    { key: "process", title: "3 Adımlı Süreç", desc: "Easy setup, Collaborate, Track growth" },
                    { key: "features", title: "Özellik Sekmeleri", desc: "Client portal, KPI, Automation, Team" },
                    { key: "integrations", title: "Entegrasyonlar", desc: "Slack, Notion, Google logoları" },
                    { key: "pricing", title: "Fiyatlandırma", desc: "Starter, Growth, Scale paketleri" },
                    { key: "caseStudies", title: "⭐ Referanslar & Logolar", desc: "Acente logoları, başarı hikayeleri ve yönetici yorumları" },
                    { key: "faq", title: "Sıkça Sorulan Sorular", desc: "Akordeon soru cevap listesi" },
                    { key: "contact", title: "İletişim & Form", desc: "İletişim formu ve bülten kayıt" },
                  ].map((sec) => {
                    const isVisible = content.visibility[sec.key];
                    return (
                      <div
                        key={sec.key}
                        onClick={() => toggleVisibility(sec.key)}
                        className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
                          isVisible
                            ? "bg-[#FAF9F6] border-[#1A1A1A] shadow-2xs"
                            : "bg-white border-[#E2DDD7] opacity-60"
                        }`}
                      >
                        <div className="pr-3">
                          <div className="font-bold text-sm text-[#1A1A1A]">{sec.title}</div>
                          <div className="text-xs text-[#8C8C8C] mt-0.5">{sec.desc}</div>
                        </div>

                        <div
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                            isVisible ? "bg-emerald-600" : "bg-[#DDD7D0]"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transition-transform ${
                              isVisible ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: BRAND & GENERAL */}
            {activeTab === "brand" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Genel & Marka Ayarları</h2>
                  <p className="text-xs text-[#605F5F] mt-1">Site adı, üst rozet ve iletişim kanalları</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Tarayıcı Sekme Başlığı (Browser Tab Title / Sayfa Başlığı)
                    </label>
                    <input
                      type="text"
                      value={content.brand.siteTitle || ""}
                      onChange={(e) => setContent({ ...content, brand: { ...content.brand, siteTitle: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                      placeholder="Örn: CODEICON — Yeni Nesil MICE Yönetim Sistemi"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Marka / Logo Adı
                    </label>
                    <input
                      type="text"
                      value={content.brand.name}
                      onChange={(e) => setContent({ ...content, brand: { ...content.brand, name: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Hero Rozeti (Badge)
                    </label>
                    <input
                      type="text"
                      value={content.brand.badge}
                      onChange={(e) => setContent({ ...content, brand: { ...content.brand, badge: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        İletişim E-Postası
                      </label>
                      <input
                        type="email"
                        value={content.brand.contactEmail}
                        onChange={(e) => setContent({ ...content, brand: { ...content.brand, contactEmail: e.target.value } })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Telefon Numarası
                      </label>
                      <input
                        type="text"
                        value={content.brand.contactPhone}
                        onChange={(e) => setContent({ ...content, brand: { ...content.brand, contactPhone: e.target.value } })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: HERO SECTION */}
            {activeTab === "hero" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Hero (Giriş) Bölümü Metinleri</h2>
                  <p className="text-xs text-[#605F5F] mt-1">Ana sayfanın en üstündeki başlık ve açıklamalar</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Ana Başlık (Düz Metin)
                      </label>
                      <input
                        type="text"
                        value={content.hero.title}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Vurgulu İtalik Kelime (Accent)
                      </label>
                      <input
                        type="text"
                        value={content.hero.titleAccent}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, titleAccent: e.target.value } })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Alt Açıklama (Subtitle)
                    </label>
                    <textarea
                      rows={3}
                      value={content.hero.subtitle}
                      onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Puanlama (Rating)
                      </label>
                      <input
                        type="text"
                        value={content.hero.rating}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, rating: e.target.value } })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Müşteri Sayısı Metni
                      </label>
                      <input
                        type="text"
                        value={content.hero.customerCount}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, customerCount: e.target.value } })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Sosyal Kanıt Avatar İnisiyalleri (Virgülle Ayrılmış)
                      </label>
                      <input
                        type="text"
                        value={content.hero.avatarText || "MJ, CF, GH, TN"}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, avatarText: e.target.value } })}
                        placeholder="Örn: MJ, CF, GH, TN"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Hero Mockup Tarayıcı Başlık Adresi (URL)
                      </label>
                      <input
                        type="text"
                        value={content.hero.mockupBrowserUrl || "app.preview.live"}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, mockupBrowserUrl: e.target.value } })}
                        placeholder="Örn: app.preview.live"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm font-mono focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Hero Mockup Canlı Durum Rozeti (Badge)
                      </label>
                      <input
                        type="text"
                        value={content.hero.mockupStatusBadge || "Canlı Acente Sistemi"}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, mockupStatusBadge: e.target.value } })}
                        placeholder="Örn: Canlı Acente Sistemi"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Hero Sağ Acente & İstatistik Kartı Ayarları */}
                  <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
                        <span>✦ Hero Sağ Kartı (Acente & İstatistik Paneli)</span>
                      </h3>
                      <p className="text-xs text-[#605F5F] mt-0.5">
                        Hero bölümünün sağında yer alan yüzen Acente listesi ve İstatistik kartının metinlerini ve satırlarını özelleştirin
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                          Kart Başlığı
                        </label>
                        <input
                          type="text"
                          value={content.hero.cardTitle || "Acenteler"}
                          onChange={(e) => setContent({ ...content, hero: { ...content.hero, cardTitle: e.target.value } })}
                          placeholder="Örn: Acenteler"
                          className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                          Filtre / Sıralama Metni
                        </label>
                        <input
                          type="text"
                          value={content.hero.cardFilterText || "En Yeniler"}
                          onChange={(e) => setContent({ ...content, hero: { ...content.hero, cardFilterText: e.target.value } })}
                          placeholder="Örn: En Yeniler"
                          className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                          Kart Alt Linki Metni
                        </label>
                        <input
                          type="text"
                          value={content.hero.cardFooterText || "Tüm Acenteler"}
                          onChange={(e) => setContent({ ...content, hero: { ...content.hero, cardFooterText: e.target.value } })}
                          placeholder="Örn: Tüm Acenteler"
                          className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                        Grafik Kartı Başlığı
                      </label>
                      <input
                        type="text"
                        value={content.hero.statsTitle || "Günlük Ortalama"}
                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, statsTitle: e.target.value } })}
                        placeholder="Örn: Günlük Ortalama"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>

                    {/* Customer Rows */}
                    <div className="space-y-3 pt-2">
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                        Acente & Müşteri Satırları (Mouse ile üzerine gelindiğinde açılan veriler)
                      </label>
                      {(content.hero.customers || [
                        { id: "1", name: "Mert Yılmaz", company: "Tempus Travel (MICE)", initials: "MY", statValue: "2h 20m", statBadge: "+30dk bu hafta" },
                        { id: "2", name: "Selin Kaya", company: "La Tour Event", initials: "SK", statValue: "3h 45m", statBadge: "+45dk bu hafta" },
                        { id: "3", name: "Burak Demir", company: "Ravento Travel", initials: "BD", statValue: "1h 50m", statBadge: "+15dk bu hafta" }
                      ]).map((cust: any, cIdx: number) => (
                        <div key={cIdx} className="p-3.5 rounded-xl bg-white border border-[#DDD7D0] grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-semibold text-[#8C8C8C] mb-1">Kısaltma:</label>
                            <input
                              type="text"
                              value={cust.initials || ""}
                              onChange={(e) => {
                                const newCustomers = [...(content.hero.customers || [
                                  { id: "1", name: "Mert Yılmaz", company: "Tempus Travel (MICE)", initials: "MY", statValue: "2h 20m", statBadge: "+30dk bu hafta" },
                                  { id: "2", name: "Selin Kaya", company: "La Tour Event", initials: "SK", statValue: "3h 45m", statBadge: "+45dk bu hafta" },
                                  { id: "3", name: "Burak Demir", company: "Ravento Travel", initials: "BD", statValue: "1h 50m", statBadge: "+15dk bu hafta" }
                                ])];
                                newCustomers[cIdx].initials = e.target.value;
                                setContent({ ...content, hero: { ...content.hero, customers: newCustomers } });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-bold"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-[10px] font-semibold text-[#8C8C8C] mb-1">İsim Soyisim:</label>
                            <input
                              type="text"
                              value={cust.name || ""}
                              onChange={(e) => {
                                const newCustomers = [...(content.hero.customers || [
                                  { id: "1", name: "Mert Yılmaz", company: "Tempus Travel (MICE)", initials: "MY", statValue: "2h 20m", statBadge: "+30dk bu hafta" },
                                  { id: "2", name: "Selin Kaya", company: "La Tour Event", initials: "SK", statValue: "3h 45m", statBadge: "+45dk bu hafta" },
                                  { id: "3", name: "Burak Demir", company: "Ravento Travel", initials: "BD", statValue: "1h 50m", statBadge: "+15dk bu hafta" }
                                ])];
                                newCustomers[cIdx].name = e.target.value;
                                setContent({ ...content, hero: { ...content.hero, customers: newCustomers } });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-semibold"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-[10px] font-semibold text-[#8C8C8C] mb-1">Acente / Şirket:</label>
                            <input
                              type="text"
                              value={cust.company || ""}
                              onChange={(e) => {
                                const newCustomers = [...(content.hero.customers || [
                                  { id: "1", name: "Mert Yılmaz", company: "Tempus Travel (MICE)", initials: "MY", statValue: "2h 20m", statBadge: "+30dk bu hafta" },
                                  { id: "2", name: "Selin Kaya", company: "La Tour Event", initials: "SK", statValue: "3h 45m", statBadge: "+45dk bu hafta" },
                                  { id: "3", name: "Burak Demir", company: "Ravento Travel", initials: "BD", statValue: "1h 50m", statBadge: "+15dk bu hafta" }
                                ])];
                                newCustomers[cIdx].company = e.target.value;
                                setContent({ ...content, hero: { ...content.hero, customers: newCustomers } });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-semibold text-[#8C8C8C] mb-1">Ort. Süre:</label>
                            <input
                              type="text"
                              value={cust.statValue || ""}
                              onChange={(e) => {
                                const newCustomers = [...(content.hero.customers || [
                                  { id: "1", name: "Mert Yılmaz", company: "Tempus Travel (MICE)", initials: "MY", statValue: "2h 20m", statBadge: "+30dk bu hafta" },
                                  { id: "2", name: "Selin Kaya", company: "La Tour Event", initials: "SK", statValue: "3h 45m", statBadge: "+45dk bu hafta" },
                                  { id: "3", name: "Burak Demir", company: "Ravento Travel", initials: "BD", statValue: "1h 50m", statBadge: "+15dk bu hafta" }
                                ])];
                                newCustomers[cIdx].statValue = e.target.value;
                                setContent({ ...content, hero: { ...content.hero, customers: newCustomers } });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-mono font-bold"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-semibold text-[#8C8C8C] mb-1">Haftalık Rozet:</label>
                            <input
                              type="text"
                              value={cust.statBadge || ""}
                              onChange={(e) => {
                                const newCustomers = [...(content.hero.customers || [
                                  { id: "1", name: "Mert Yılmaz", company: "Tempus Travel (MICE)", initials: "MY", statValue: "2h 20m", statBadge: "+30dk bu hafta" },
                                  { id: "2", name: "Selin Kaya", company: "La Tour Event", initials: "SK", statValue: "3h 45m", statBadge: "+45dk bu hafta" },
                                  { id: "3", name: "Burak Demir", company: "Ravento Travel", initials: "BD", statValue: "1h 50m", statBadge: "+15dk bu hafta" }
                                ])];
                                newCustomers[cIdx].statBadge = e.target.value;
                                setContent({ ...content, hero: { ...content.hero, customers: newCustomers } });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PROCESS STEPS */}
            {/* TAB: PROCESS */}
            {activeTab === "process" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">3 Adımlı Süreç & Canlı Önizleme Kartları</h2>
                  <p className="text-xs text-[#605F5F] mt-1">
                    Sol taraftaki adımları ve sağ panelde görüntülenen canlı önizleme rozetlerini, başlıklarını ve maddelerini düzenleyin
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Üst Başlık (Eyebrow)
                      </label>
                      <input
                        type="text"
                        value={content.process.eyebrow || ""}
                        onChange={(e) => setContent({ ...content, process: { ...content.process, eyebrow: e.target.value } })}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Bölüm Başlığı
                      </label>
                      <input
                        type="text"
                        value={content.process.title || ""}
                        onChange={(e) => setContent({ ...content, process: { ...content.process, title: e.target.value } })}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Alt Açıklama
                    </label>
                    <textarea
                      rows={2}
                      value={content.process.subtitle || ""}
                      onChange={(e) => setContent({ ...content, process: { ...content.process, subtitle: e.target.value } })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Önizleme Kartı Alt Sistem Durumu Metni
                    </label>
                    <input
                      type="text"
                      value={content.process.footerStatus || "Sistem Durumu: Tam Operasyonel"}
                      onChange={(e) => setContent({ ...content, process: { ...content.process, footerStatus: e.target.value } })}
                      placeholder="Örn: Sistem Durumu: Tam Operasyonel"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Steps List */}
                <div className="space-y-5">
                  {content.process.steps?.map((st: any, idx: number) => {
                    const preview = st.preview || {
                      badge: "Anında Kurulum",
                      title: "Adım Önizlemesi",
                      items: [
                        { label: "Örnek İşlem Maddesi", status: "Tamamlandı" }
                      ]
                    };

                    return (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-[#DDD7D0] shadow-2xs space-y-4">
                        {/* Step Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE6]">
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white text-xs font-bold flex items-center justify-center">
                              {st.number || `0${idx + 1}`}
                            </span>
                            <span className="font-bold text-sm text-[#1A1A1A]">
                              Adım {st.number || `0${idx + 1}`}: {st.title}
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF9F6] border border-[#DDD7D0] text-[#605F5F]">
                            Adım #{idx + 1}
                          </span>
                        </div>

                        {/* Step Basic Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">Adım Numarası:</label>
                            <input
                              type="text"
                              value={st.number || ""}
                              onChange={(e) => {
                                const newSteps = [...content.process.steps];
                                newSteps[idx].number = e.target.value;
                                setContent({ ...content, process: { ...content.process, steps: newSteps } });
                              }}
                              className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-mono font-bold"
                            />
                          </div>
                          <div className="sm:col-span-9">
                            <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">Adım Başlığı (Sol Menü):</label>
                            <input
                              type="text"
                              value={st.title || ""}
                              onChange={(e) => {
                                const newSteps = [...content.process.steps];
                                newSteps[idx].title = e.target.value;
                                setContent({ ...content, process: { ...content.process, steps: newSteps } });
                              }}
                              className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-semibold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">Adım Açıklaması:</label>
                          <textarea
                            rows={2}
                            value={st.description || ""}
                            onChange={(e) => {
                              const newSteps = [...content.process.steps];
                              newSteps[idx].description = e.target.value;
                              setContent({ ...content, process: { ...content.process, steps: newSteps } });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs resize-none"
                          />
                        </div>

                        {/* Preview Box Editor (Instant Onboarding Area) */}
                        <div className="pt-3 border-t border-[#F0ECE6] bg-[#FAF9F6] p-4 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                              <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                                Sağ Panel Canlı Önizleme Kartı
                              </span>
                            </div>
                            <span className="text-[10px] text-[#8C8C8C]">
                              Kullanıcı bu adıma tıkladığında sağda görünen kart
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-semibold text-[#8C8C8C] mb-1">
                                Önizleme Rozeti (Badge):
                              </label>
                              <input
                                type="text"
                                value={preview.badge || ""}
                                onChange={(e) => {
                                  const newSteps = [...content.process.steps];
                                  newSteps[idx].preview = { ...preview, badge: e.target.value };
                                  setContent({ ...content, process: { ...content.process, steps: newSteps } });
                                }}
                                placeholder="örn: Online Onay & Kilit"
                                className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-semibold bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-semibold text-[#8C8C8C] mb-1">
                                Önizleme Başlığı (Title):
                              </label>
                              <input
                                type="text"
                                value={preview.title || ""}
                                onChange={(e) => {
                                  const newSteps = [...content.process.steps];
                                  newSteps[idx].preview = { ...preview, title: e.target.value };
                                  setContent({ ...content, process: { ...content.process, steps: newSteps } });
                                }}
                                placeholder="örn: Tekliften Projeye Otomatik Dönüşüm"
                                className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-semibold bg-white"
                              />
                            </div>
                          </div>

                          {/* Checklist Items */}
                          <div className="space-y-2 pt-2">
                            <div className="flex items-center justify-between">
                              <label className="text-[11px] font-semibold text-[#605F5F]">
                                Kontrol Listesi Maddeleri ({preview.items?.length || 0})
                              </label>
                              <button
                                type="button"
                                onClick={() => {
                                  const newSteps = [...content.process.steps];
                                  const curItems = preview.items || [];
                                  newSteps[idx].preview = {
                                    ...preview,
                                    items: [...curItems, { label: "Yeni Kontrol Maddesi", status: "Aktif" }]
                                  };
                                  setContent({ ...content, process: { ...content.process, steps: newSteps } });
                                }}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1A1A1A] hover:underline"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Madde Ekle</span>
                              </button>
                            </div>

                            <div className="space-y-1.5">
                              {preview.items?.map((it: any, itemIdx: number) => (
                                <div key={itemIdx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={it.label || ""}
                                    onChange={(e) => {
                                      const newSteps = [...content.process.steps];
                                      const newItems = [...preview.items];
                                      newItems[itemIdx] = { ...newItems[itemIdx], label: e.target.value };
                                      newSteps[idx].preview = { ...preview, items: newItems };
                                      setContent({ ...content, process: { ...content.process, steps: newSteps } });
                                    }}
                                    placeholder="Madde metni..."
                                    className="flex-1 px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs bg-white"
                                  />
                                  <input
                                    type="text"
                                    value={it.status || ""}
                                    onChange={(e) => {
                                      const newSteps = [...content.process.steps];
                                      const newItems = [...preview.items];
                                      newItems[itemIdx] = { ...newItems[itemIdx], status: e.target.value };
                                      newSteps[idx].preview = { ...preview, items: newItems };
                                      setContent({ ...content, process: { ...content.process, steps: newSteps } });
                                    }}
                                    placeholder="Durum (örn: Onaylandı)"
                                    className="w-28 px-2.5 py-1.5 rounded-lg border border-[#DDD7D0] text-xs bg-white text-center font-medium"
                                  />
                                  {preview.items.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newSteps = [...content.process.steps];
                                        const newItems = preview.items.filter((_: any, i: number) => i !== itemIdx);
                                        newSteps[idx].preview = { ...preview, items: newItems };
                                        setContent({ ...content, process: { ...content.process, steps: newSteps } });
                                      }}
                                      className="p-1 text-neutral-400 hover:text-rose-600 transition"
                                      title="Maddeyi Sil"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: FEATURES */}
            {activeTab === "features" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#1A1A1A]">Özellik Sekmeleri</h2>
                    <p className="text-xs text-[#605F5F] mt-1">Sekme isimlerini, başlıklarını ve açıklamalarını düzenleyin</p>
                  </div>
                  <button
                    onClick={() => {
                      const newTabs = [
                        ...content.features.tabs,
                        {
                          id: `tab-${Date.now()}`,
                          label: "Yeni Sekme",
                          title: "Yeni Özellik Başlığı",
                          description: "Bu sekmenin açıklama metni buraya gelecek.",
                        },
                      ];
                      setContent({ ...content, features: { ...content.features, tabs: newTabs } });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Yeni Sekme Ekle</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {content.features.tabs.map((tab: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1">
                          <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                            Sekme Adı (Butonda Görünen İsim)
                          </label>
                          <input
                            type="text"
                            value={tab.label}
                            onChange={(e) => {
                              const newTabs = [...content.features.tabs];
                              newTabs[idx].label = e.target.value;
                              setContent({ ...content, features: { ...content.features, tabs: newTabs } });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-bold text-[#1A1A1A] bg-white focus:border-[#1A1A1A] focus:outline-none"
                            placeholder="Örn: Müşteri Portalı"
                          />
                        </div>

                        {content.features.tabs.length > 1 && (
                          <div className="pt-4">
                            <button
                              onClick={() => {
                                const newTabs = content.features.tabs.filter((_: any, i: number) => i !== idx);
                                setContent({ ...content, features: { ...content.features, tabs: newTabs } });
                              }}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                              title="Sekmeyi Sil"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                          Panel Başlığı
                        </label>
                        <input
                          type="text"
                          value={tab.title}
                          onChange={(e) => {
                            const newTabs = [...content.features.tabs];
                            newTabs[idx].title = e.target.value;
                            setContent({ ...content, features: { ...content.features, tabs: newTabs } });
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-[#DDD7D0] text-sm font-semibold focus:border-[#1A1A1A] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                          Panel Açıklaması
                        </label>
                        <textarea
                          rows={2}
                          value={tab.description}
                          onChange={(e) => {
                            const newTabs = [...content.features.tabs];
                            newTabs[idx].description = e.target.value;
                            setContent({ ...content, features: { ...content.features, tabs: newTabs } });
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none resize-none"
                        />
                      </div>

                      {/* Bullets */}
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                          Öne Çıkan Madde İmleri (Her satıra bir madde)
                        </label>
                        <textarea
                          rows={3}
                          value={(tab.bullets || []).join("\n")}
                          onChange={(e) => {
                            const newTabs = [...content.features.tabs];
                            newTabs[idx].bullets = e.target.value.split("\n").filter(Boolean);
                            setContent({ ...content, features: { ...content.features, tabs: newTabs } });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-mono focus:border-[#1A1A1A] focus:outline-none"
                          placeholder="Maddeleri alt alta yazın..."
                        />
                      </div>

                      {/* CTA & Mockup details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Buton Yazısı</label>
                          <input
                            type="text"
                            value={tab.ctaText || ""}
                            placeholder={`${tab.label} için demo talep edin`}
                            onChange={(e) => {
                              const newTabs = [...content.features.tabs];
                              newTabs[idx].ctaText = e.target.value;
                              setContent({ ...content, features: { ...content.features, tabs: newTabs } });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Buton Linki</label>
                          <input
                            type="text"
                            value={tab.ctaHref || "#contact"}
                            onChange={(e) => {
                              const newTabs = [...content.features.tabs];
                              newTabs[idx].ctaHref = e.target.value;
                              setContent({ ...content, features: { ...content.features, tabs: newTabs } });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Tarayıcı URL</label>
                          <input
                            type="text"
                            value={tab.mockupUrl || ""}
                            placeholder={`codeicon.co/app/${tab.id}`}
                            onChange={(e) => {
                              const newTabs = [...content.features.tabs];
                              newTabs[idx].mockupUrl = e.target.value;
                              setContent({ ...content, features: { ...content.features, tabs: newTabs } });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Durum Rozeti</label>
                          <input
                            type="text"
                            value={tab.mockupBadge || "Canlı Modül"}
                            onChange={(e) => {
                              const newTabs = [...content.features.tabs];
                              newTabs[idx].mockupBadge = e.target.value;
                              setContent({ ...content, features: { ...content.features, tabs: newTabs } });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: INTEGRATIONS */}
            {activeTab === "integrations" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#EAE6E1]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-[#1A1A1A]">Entegrasyonlar Yönetimi</h2>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EAE6E1] text-[#1A1A1A] font-semibold">
                        {content.integrations?.items?.length || 0} adet
                      </span>
                    </div>
                    <p className="text-xs text-[#605F5F] mt-1">Sitede gösterilen entegrasyon kartlarını ekleyin, silin ve içeriklerini düzenleyin</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition shadow-sm disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Kaydediliyor...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>Değişiklikleri Kaydet</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = [
                          ...(content.integrations?.items || []),
                          {
                            name: "Yeni Entegrasyon",
                            category: "Genel",
                            desc: "Entegrasyon açıklaması buraya gelecek.",
                            icon: "⚡"
                          }
                        ];
                        setContent({
                          ...content,
                          integrations: { ...content.integrations, items: newItems }
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition shadow-sm self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Yeni Entegrasyon Ekle</span>
                    </button>
                  </div>
                </div>

                {/* Section Header Editor */}
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Üst Başlık (Eyebrow)
                      </label>
                      <input
                        type="text"
                        value={content.integrations?.eyebrow || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            integrations: { ...content.integrations, eyebrow: e.target.value }
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Bölüm Başlığı
                      </label>
                      <input
                        type="text"
                        value={content.integrations?.title || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            integrations: { ...content.integrations, title: e.target.value }
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Alt Açıklama
                    </label>
                    <textarea
                      rows={2}
                      value={content.integrations?.subtitle || ""}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          integrations: { ...content.integrations, subtitle: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Öne Çıkan 3 Vurgu Rozeti (Virgülle Ayrılmış)
                    </label>
                    <input
                      type="text"
                      value={(content.integrations?.highlights || [
                        "TCMB Canlı Kur & Sabitleme",
                        "Matbu Excel & Sıfır Veri Kaybı",
                        "Anlık Saha & Transfer Otomasyonu"
                      ]).join(", ")}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          integrations: {
                            ...content.integrations,
                            highlights: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean)
                          }
                        })
                      }
                      placeholder="Örn: TCMB Canlı Kur & Sabitleme, Matbu Excel & Sıfır Veri Kaybı, Anlık Saha & Transfer Otomasyonu"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Buton Yazısı (CTA)
                      </label>
                      <input
                        type="text"
                        value={content.integrations?.ctaText || "Hemen Başlayın"}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            integrations: { ...content.integrations, ctaText: e.target.value }
                          })
                        }
                        placeholder="Örn: Hemen Başlayın"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Buton Hedef Linki
                      </label>
                      <input
                        type="text"
                        value={content.integrations?.ctaHref || "#contact"}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            integrations: { ...content.integrations, ctaHref: e.target.value }
                          })
                        }
                        placeholder="Örn: #contact"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs font-mono focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Integrations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.integrations?.items?.map((item: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-[#DDD7D0] shadow-2xs space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item.icon || "⚡"}
                            onChange={(e) => {
                              const newItems = [...content.integrations.items];
                              newItems[idx].icon = e.target.value;
                              setContent({ ...content, integrations: { ...content.integrations, items: newItems } });
                            }}
                            title="İkon / Emoji (örn: 🏛️, 📊, ✈️)"
                            className="w-10 h-10 text-xl text-center rounded-xl bg-[#FAF9F6] border border-[#DDD7D0]"
                          />
                          <div>
                            <span className="text-[10px] text-[#8C8C8C] block uppercase font-bold tracking-wider">İkon / Emoji</span>
                            <span className="text-xs text-[#1A1A1A] font-semibold">{item.name || "Entegrasyon"}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const newItems = content.integrations.items.filter((_: any, i: number) => i !== idx);
                            setContent({ ...content, integrations: { ...content.integrations, items: newItems } });
                          }}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                          title="Entegrasyonu Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-semibold text-[#8C8C8C] mb-1">Entegrasyon Adı:</label>
                          <input
                            type="text"
                            value={item.name || ""}
                            onChange={(e) => {
                              const newItems = [...content.integrations.items];
                              newItems[idx].name = e.target.value;
                              setContent({ ...content, integrations: { ...content.integrations, items: newItems } });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-bold bg-[#FAF9F6]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-[#8C8C8C] mb-1">Kategori / Etiket:</label>
                          <input
                            type="text"
                            value={item.category || ""}
                            onChange={(e) => {
                              const newItems = [...content.integrations.items];
                              newItems[idx].category = e.target.value;
                              setContent({ ...content, integrations: { ...content.integrations, items: newItems } });
                            }}
                            placeholder="örn: Finans, Operasyon"
                            className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs bg-[#FAF9F6]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#8C8C8C] mb-1">Açıklama Metni:</label>
                        <textarea
                          rows={2}
                          value={item.desc || ""}
                          onChange={(e) => {
                            const newItems = [...content.integrations.items];
                            newItems[idx].desc = e.target.value;
                            setContent({ ...content, integrations: { ...content.integrations, items: newItems } });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs bg-[#FAF9F6] resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#EAE6E1]">
                  <p className="text-xs text-[#8C8C8C]">
                    Yaptığınız değişikliklerin canlı sitede hemen görünmesi için kaydedin.
                  </p>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition shadow-sm disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Kaydediliyor...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Değişiklikleri Kaydet</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* TAB: PRICING */}
            {activeTab === "pricing" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE6E1]">
                  <div>
                    <h2 className="text-xl font-bold text-[#1A1A1A]">Fiyatlandırma Paketleri & Butonları</h2>
                    <p className="text-xs text-[#605F5F] mt-1">Paket ekleyin, silin, fiyatları, özellikleri ve buton linklerini düzenleyin</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-[#FAF9F6] border border-[#DDD7D0] px-3 py-1.5 rounded-full">
                      <span className="text-[11px] font-semibold text-[#8C8C8C]">Para Birimi:</span>
                      <input
                        type="text"
                        value={content.pricing.currency || "€"}
                        onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, currency: e.target.value } })}
                        className="w-10 text-xs font-bold text-center bg-white border border-[#DDD7D0] rounded px-1 py-0.5"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newPlans = [
                          ...(content.pricing.plans || []),
                          {
                            name: "Yeni Paket",
                            badge: "Özel Fırsat",
                            popular: false,
                            priceMonthly: 79,
                            priceAnnual: 59,
                            description: "Acentenizin ihtiyaçlarına yönelik özel modül ve hizmet paketi.",
                            cta: "Demoyu İncele",
                            ctaHref: "#contact",
                            features: [
                              "Temel Operasyon Modülleri",
                              "Excel İçe/Dışa Aktarım Desteği",
                              "E-Posta & Canlı Destek"
                            ]
                          }
                        ];
                        setContent({ ...content, pricing: { ...content.pricing, plans: newPlans } });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition shadow-sm self-start sm:self-auto shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Yeni Paket Ekle</span>
                    </button>
                  </div>
                </div>

                {/* Section Header & Toggle Settings */}
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Üst Başlık (Eyebrow)
                      </label>
                      <input
                        type="text"
                        value={content.pricing?.eyebrow || ""}
                        onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, eyebrow: e.target.value } })}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Bölüm Başlığı
                      </label>
                      <input
                        type="text"
                        value={content.pricing?.title || ""}
                        onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, title: e.target.value } })}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Alt Açıklama
                    </label>
                    <textarea
                      rows={2}
                      value={content.pricing?.subtitle || ""}
                      onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, subtitle: e.target.value } })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Toggle & Social Proof Labels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Aylık Etiketi</label>
                      <input
                        type="text"
                        value={content.pricing?.monthlyLabel || "Aylık"}
                        onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, monthlyLabel: e.target.value } })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Yıllık Etiketi</label>
                      <input
                        type="text"
                        value={content.pricing?.annualLabel || "Yıllık"}
                        onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, annualLabel: e.target.value } })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Yıllık İndirim Rozeti</label>
                      <input
                        type="text"
                        value={content.pricing?.annualDiscountBadge || "%20 İndirim"}
                        onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, annualDiscountBadge: e.target.value } })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Süre Yazısı (/ ay)</label>
                      <input
                        type="text"
                        value={content.pricing?.perMonthLabel || "/ ay"}
                        onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, perMonthLabel: e.target.value } })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Puanlama Rozeti</label>
                      <input
                        type="text"
                        value={content.pricing?.socialProofRating || "4.9 / 5 Memnuniyet"}
                        onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, socialProofRating: e.target.value } })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Sosyal Kanıt Metni</label>
                      <input
                        type="text"
                        value={content.pricing?.socialProofText || "50+ MICE & Acente Ekibi"}
                        onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, socialProofText: e.target.value } })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Özellikler Başlığı</label>
                      <input
                        type="text"
                        value={content.pricing?.featuresHeader || "Pakete Dahil Özellikler"}
                        onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, featuresHeader: e.target.value } })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {content.pricing.plans?.map((pl: any, idx: number) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4 relative shadow-2xs">
                      {/* Plan Header Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE6E1]">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-[#1A1A1A] text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="font-bold text-sm text-[#1A1A1A]">{pl.name || "Paket"}</span>
                            {pl.popular && (
                              <span className="ml-2 px-2 py-0.5 rounded-full bg-[#FEF7AF] text-[#594C00] text-[10px] font-bold">
                                En Çok Tercih Edilen
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <label className="flex items-center gap-1.5 text-xs text-[#605F5F] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!pl.popular}
                              onChange={(e) => {
                                const newPlans = [...content.pricing.plans];
                                newPlans[idx].popular = e.target.checked;
                                setContent({ ...content, pricing: { ...content.pricing, plans: newPlans } });
                              }}
                              className="rounded border-[#DDD7D0] text-[#1A1A1A] focus:ring-0"
                            />
                            <span>Öne Çıkar (Popüler Rozeti)</span>
                          </label>

                          {content.pricing.plans.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newPlans = content.pricing.plans.filter((_: any, pIdx: number) => pIdx !== idx);
                                setContent({ ...content, pricing: { ...content.pricing, plans: newPlans } });
                              }}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                              title="Paketi Sil"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Main Fields Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">Paket Adı:</label>
                          <input
                            type="text"
                            value={pl.name || ""}
                            onChange={(e) => {
                              const newPlans = [...content.pricing.plans];
                              newPlans[idx].name = e.target.value;
                              setContent({ ...content, pricing: { ...content.pricing, plans: newPlans } });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-bold bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">Paket Rozeti:</label>
                          <input
                            type="text"
                            value={pl.badge || ""}
                            onChange={(e) => {
                              const newPlans = [...content.pricing.plans];
                              newPlans[idx].badge = e.target.value;
                              setContent({ ...content, pricing: { ...content.pricing, plans: newPlans } });
                            }}
                            placeholder="örn: Hızlı Başlangıç"
                            className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">
                            Aylık Fiyat ({content.pricing.currency || "€"}):
                          </label>
                          <input
                            type="number"
                            value={pl.priceMonthly}
                            onChange={(e) => {
                              const newPlans = [...content.pricing.plans];
                              newPlans[idx].priceMonthly = Number(e.target.value);
                              setContent({ ...content, pricing: { ...content.pricing, plans: newPlans } });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-bold bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">
                            Yıllık Fiyat ({content.pricing.currency || "€"}):
                          </label>
                          <input
                            type="number"
                            value={pl.priceAnnual}
                            onChange={(e) => {
                              const newPlans = [...content.pricing.plans];
                              newPlans[idx].priceAnnual = Number(e.target.value);
                              setContent({ ...content, pricing: { ...content.pricing, plans: newPlans } });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-bold bg-white"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">Paket Açıklaması:</label>
                        <input
                          type="text"
                          value={pl.description || ""}
                          onChange={(e) => {
                            const newPlans = [...content.pricing.plans];
                            newPlans[idx].description = e.target.value;
                            setContent({ ...content, pricing: { ...content.pricing, plans: newPlans } });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs bg-white"
                        />
                      </div>

                      {/* CTA button fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">Buton Yazısı:</label>
                          <input
                            type="text"
                            value={pl.cta || ""}
                            onChange={(e) => {
                              const newPlans = [...content.pricing.plans];
                              newPlans[idx].cta = e.target.value;
                              setContent({ ...content, pricing: { ...content.pricing, plans: newPlans } });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-[#8C8C8C] mb-1">Buton Hedef Linki:</label>
                          <input
                            type="text"
                            value={pl.ctaHref || "#contact"}
                            onChange={(e) => {
                              const newPlans = [...content.pricing.plans];
                              newPlans[idx].ctaHref = e.target.value;
                              setContent({ ...content, pricing: { ...content.pricing, plans: newPlans } });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs font-mono bg-white"
                          />
                        </div>
                      </div>

                      {/* Features Checklist */}
                      <div className="pt-3 border-t border-[#EAE6E1]">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider">
                            Pakete Dahil Özellik Maddeleri ({pl.features?.length || 0})
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const newPlans = [...content.pricing.plans];
                              newPlans[idx].features = [...(newPlans[idx].features || []), "Yeni Özellik Maddesi"];
                              setContent({ ...content, pricing: { ...content.pricing, plans: newPlans } });
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1A1A1A] hover:underline"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Özellik Maddesi Ekle</span>
                          </button>
                        </div>
                        <div className="space-y-1.5">
                          {pl.features?.map((feat: string, fIdx: number) => (
                            <div key={fIdx} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={feat}
                                onChange={(e) => {
                                  const newPlans = [...content.pricing.plans];
                                  newPlans[idx].features[fIdx] = e.target.value;
                                  setContent({ ...content, pricing: { ...content.pricing, plans: newPlans } });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs bg-white"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newPlans = [...content.pricing.plans];
                                  newPlans[idx].features = newPlans[idx].features.filter((_: any, i: number) => i !== fIdx);
                                  setContent({ ...content, pricing: { ...content.pricing, plans: newPlans } });
                                }}
                                className="p-1 text-neutral-400 hover:text-rose-600 transition"
                                title="Özelliği Sil"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: REFERENCES & LOGOS */}
            {activeTab === "references" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Referanslar & Marka Logoları</h2>
                  <p className="text-xs text-[#605F5F] mt-1">
                    Birlikte çalıştığınız MICE & seyahat acentelerinin logolarını, başarı hikayelerini ve yönetici yorumlarını yönetin.
                  </p>
                </div>

                {/* 1. SECTION HEADERS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <h3 className="text-sm font-bold text-[#1A1A1A]">Bölüm Başlıkları</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Üst Etiket (Eyebrow)
                      </label>
                      <input
                        type="text"
                        value={content.references?.eyebrow || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            references: { ...content.references, eyebrow: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 rounded-xl border border-[#DDD7D0] text-xs font-medium"
                        placeholder="Örn: İş Ortaklarımız & Referanslar"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Ana Başlık
                      </label>
                      <input
                        type="text"
                        value={content.references?.title || ""}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            references: { ...content.references, title: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2 rounded-xl border border-[#DDD7D0] text-xs font-bold"
                        placeholder="Örn: Sektörün Öncü Acentelerinin Güvenilir Tercihi"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Alt Açıklama
                    </label>
                    <textarea
                      rows={2}
                      value={content.references?.subtitle || ""}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          references: { ...content.references, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl border border-[#DDD7D0] text-xs resize-none"
                      placeholder="Referanslar bölümünü anlatan açıklama..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Logolar Kutusu Üst Başlığı
                    </label>
                    <input
                      type="text"
                      value={content.references?.logosTitle || "Birlikte Başardığımız Önde Gelen Markalar & Acenteler"}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          references: { ...content.references, logosTitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl border border-[#DDD7D0] text-xs"
                      placeholder="Örn: Birlikte Başardığımız Önde Gelen Markalar & Acenteler"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Kartları Genişletme Butonu Metni
                      </label>
                      <input
                        type="text"
                        value={content.references?.ctaText || "Daha Fazla Göster"}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            references: { ...content.references, ctaText: e.target.value },
                          })
                        }
                        placeholder="Örn: Daha Fazla Göster"
                        className="w-full px-4 py-2 rounded-xl border border-[#DDD7D0] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Kartları Daraltma Butonu Metni
                      </label>
                      <input
                        type="text"
                        value={content.references?.ctaLessText || "Daha Az Göster"}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            references: { ...content.references, ctaLessText: e.target.value },
                          })
                        }
                        placeholder="Örn: Daha Az Göster"
                        className="w-full px-4 py-2 rounded-xl border border-[#DDD7D0] text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. LOGO MANAGEMENT */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">Referans Marka Logoları</h3>
                      <p className="text-xs text-[#8C8C8C]">
                        Vitrin alanında yan yana listelenecek müşteri & acente logoları ({content.references?.logos?.length || 0} logo)
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newLogos = [
                          ...(content.references?.logos || []),
                          {
                            id: Date.now().toString(),
                            name: "Yeni Acente",
                            logoUrl: "",
                            category: "MICE & Kongre",
                          },
                        ];
                        setContent({
                          ...content,
                          references: { ...content.references, logos: newLogos },
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Yeni Logo Ekle</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {(content.references?.logos || []).map((logo: any, idx: number) => (
                      <div
                        key={logo.id || idx}
                        className="bg-white p-4 rounded-xl border border-[#DDD7D0] shadow-2xs space-y-3 relative group"
                      >
                        <div className="flex items-center gap-3">
                          {/* Logo Preview */}
                          <div className="w-14 h-14 rounded-lg bg-[#FAF9F6] border border-[#EAE6E1] flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                            {logo.logoUrl ? (
                              <img
                                src={logo.logoUrl}
                                alt={logo.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <span className="text-xs font-bold text-[#8C8C8C]">
                                {logo.name?.slice(0, 2)?.toUpperCase() || "LOG"}
                              </span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-0.5">
                              Marka / Firma Adı
                            </label>
                            <input
                              type="text"
                              value={logo.name}
                              onChange={(e) => {
                                const newLogos = [...content.references.logos];
                                newLogos[idx].name = e.target.value;
                                setContent({
                                  ...content,
                                  references: { ...content.references, logos: newLogos },
                                });
                              }}
                              className="w-full px-2.5 py-1 text-xs font-bold rounded-lg border border-[#DDD7D0]"
                              placeholder="Örn: Atlas MICE"
                            />
                          </div>

                          <button
                            onClick={() => {
                              const newLogos = content.references.logos.filter((_: any, i: number) => i !== idx);
                              setContent({
                                ...content,
                                references: { ...content.references, logos: newLogos },
                              });
                            }}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                            title="Logoyu Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[#F0ECE6]">
                          <div>
                            <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-0.5">
                              Kategori / Etiket
                            </label>
                            <input
                              type="text"
                              value={logo.category || ""}
                              onChange={(e) => {
                                const newLogos = [...content.references.logos];
                                newLogos[idx].category = e.target.value;
                                setContent({
                                  ...content,
                                  references: { ...content.references, logos: newLogos },
                                });
                              }}
                              className="w-full px-2.5 py-1 text-[11px] rounded-lg border border-[#DDD7D0]"
                              placeholder="Örn: Kongre & Event"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-0.5">
                              Logo Görsel URL'si
                            </label>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={logo.logoUrl || ""}
                                onChange={(e) => {
                                  const newLogos = [...content.references.logos];
                                  newLogos[idx].logoUrl = e.target.value;
                                  setContent({
                                    ...content,
                                    references: { ...content.references, logos: newLogos },
                                  });
                                }}
                                className="w-full px-2 py-1 text-[11px] font-mono rounded-lg border border-[#DDD7D0]"
                                placeholder="/logo.png veya https://..."
                              />
                              <label className="cursor-pointer p-1.5 rounded-lg bg-[#F4F2EE] hover:bg-[#EAE6E1] text-[#1A1A1A] shrink-0" title="Görsel Yükle">
                                <Upload className="w-3.5 h-3.5" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const formData = new FormData();
                                    formData.append("file", file);
                                    try {
                                      const res = await fetch("/api/upload", { method: "POST", body: formData });
                                      const data = await res.json();
                                      if (res.ok && data.success && data.url) {
                                        const newLogos = [...content.references.logos];
                                        newLogos[idx].logoUrl = data.url;
                                        const updatedContent = {
                                          ...content,
                                          references: { ...content.references, logos: newLogos },
                                        };
                                        setContent(updatedContent);
                                        loadMedia();

                                        // Auto-save
                                        fetch("/api/content", {
                                          method: "POST",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify(updatedContent),
                                        }).catch(() => {});
                                      } else {
                                        setSaveError(data.error || "Görsel yüklenemedi!");
                                        setTimeout(() => setSaveError(null), 6000);
                                      }
                                    } catch (err: any) {
                                      console.error("Upload error:", err);
                                      setSaveError("Görsel yüklenirken bağlantı hatası oluştu.");
                                      setTimeout(() => setSaveError(null), 6000);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. CASE STUDIES / REFERENCE STORIES */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">Referans Başarı Kartları</h3>
                      <p className="text-xs text-[#8C8C8C]">
                        Metrikli ve detaylı operasyon başarı hikayeleri ({content.references?.items?.length || 0} kart)
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newItems = [
                          ...(content.references?.items || []),
                          {
                            client: "Yeni Referans Firması",
                            year: new Date().getFullYear().toString(),
                            industry: "MICE & Kongre",
                            logoUrl: "",
                            description: "Operasyonel süreçlerin dijitalleştirilmesi hikayesi...",
                            impact: "+%50 Hız & Sıfır Hata",
                            tag: "MICE",
                          },
                        ];
                        setContent({
                          ...content,
                          references: { ...content.references, items: newItems },
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Yeni Referans Kartı Ekle</span>
                    </button>
                  </div>

                  <div className="space-y-4 pt-2">
                    {(content.references?.items || []).map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DDD7D0] shadow-2xs space-y-3.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1A1A1A]">Kart #{idx + 1}</span>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FEF7AF] text-[#594C00] font-semibold">
                              {item.client || "İsimsiz Referans"}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              const newItems = content.references.items.filter((_: any, i: number) => i !== idx);
                              setContent({
                                ...content,
                                references: { ...content.references, items: newItems },
                              });
                            }}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                            title="Kartı Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Firma Adı</label>
                            <input
                              type="text"
                              value={item.client}
                              onChange={(e) => {
                                const newItems = [...content.references.items];
                                newItems[idx].client = e.target.value;
                                setContent({
                                  ...content,
                                  references: { ...content.references, items: newItems },
                                });
                              }}
                              className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-[#DDD7D0]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Sektör / Operasyon</label>
                            <input
                              type="text"
                              value={item.industry}
                              onChange={(e) => {
                                const newItems = [...content.references.items];
                                newItems[idx].industry = e.target.value;
                                setContent({
                                  ...content,
                                  references: { ...content.references, items: newItems },
                                });
                              }}
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Yıl</label>
                            <input
                              type="text"
                              value={item.year}
                              onChange={(e) => {
                                const newItems = [...content.references.items];
                                newItems[idx].year = e.target.value;
                                setContent({
                                  ...content,
                                  references: { ...content.references, items: newItems },
                                });
                              }}
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Logo URL (İsteğe Bağlı)</label>
                            <input
                              type="text"
                              value={item.logoUrl || ""}
                              onChange={(e) => {
                                const newItems = [...content.references.items];
                                newItems[idx].logoUrl = e.target.value;
                                setContent({
                                  ...content,
                                  references: { ...content.references, items: newItems },
                                });
                              }}
                              className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-[#DDD7D0]"
                              placeholder="/logo.png veya https://..."
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Sağlanan Etki / KPI Rozeti</label>
                            <input
                              type="text"
                              value={item.impact}
                              onChange={(e) => {
                                const newItems = [...content.references.items];
                                newItems[idx].impact = e.target.value;
                                setContent({
                                  ...content,
                                  references: { ...content.references, items: newItems },
                                });
                              }}
                              className="w-full px-3 py-1.5 text-xs font-bold text-emerald-700 rounded-lg border border-[#DDD7D0]"
                              placeholder="Örn: 0 Hata · 120 Araç Koordinasyonu"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Hikaye & Operasyon Açıklaması</label>
                          <textarea
                            rows={2}
                            value={item.description}
                            onChange={(e) => {
                              const newItems = [...content.references.items];
                              newItems[idx].description = e.target.value;
                              setContent({
                                ...content,
                                references: { ...content.references, items: newItems },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0] resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. TESTIMONIALS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">Yönetici & Müşteri Yorumları</h3>
                      <p className="text-xs text-[#8C8C8C]">
                        Acente direktörleri ve yöneticilerinin gerçek referans geri bildirimleri ({content.references?.testimonials?.length || 0} yorum)
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newTestimonials = [
                          ...(content.references?.testimonials || []),
                          {
                            quote: "Sistem sayesinde saha koordinasyonumuz kusursuzlaştı.",
                            author: "Yeni Yönetici",
                            role: "Operasyon Direktörü",
                            initials: "YY",
                          },
                        ];
                        setContent({
                          ...content,
                          references: { ...content.references, testimonials: newTestimonials },
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Yeni Yorum Ekle</span>
                    </button>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    {(content.references?.testimonials || []).map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl border border-[#DDD7D0] shadow-2xs space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1A1A1A]">Yorum #{idx + 1}</span>
                          <button
                            onClick={() => {
                              const newTestimonials = content.references.testimonials.filter((_: any, i: number) => i !== idx);
                              setContent({
                                ...content,
                                references: { ...content.references, testimonials: newTestimonials },
                              });
                            }}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                            title="Yorumu Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Alıntı Sözü (Quote)</label>
                          <textarea
                            rows={2}
                            value={item.quote}
                            onChange={(e) => {
                              const newTestimonials = [...content.references.testimonials];
                              newTestimonials[idx].quote = e.target.value;
                              setContent({
                                ...content,
                                references: { ...content.references, testimonials: newTestimonials },
                              });
                            }}
                            className="w-full px-3 py-1.5 text-xs italic rounded-lg border border-[#DDD7D0] resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Ad Soyad</label>
                            <input
                              type="text"
                              value={item.author}
                              onChange={(e) => {
                                const newTestimonials = [...content.references.testimonials];
                                newTestimonials[idx].author = e.target.value;
                                setContent({
                                  ...content,
                                  references: { ...content.references, testimonials: newTestimonials },
                                });
                              }}
                              className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-[#DDD7D0]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Ünvan & Acente</label>
                            <input
                              type="text"
                              value={item.role}
                              onChange={(e) => {
                                const newTestimonials = [...content.references.testimonials];
                                newTestimonials[idx].role = e.target.value;
                                setContent({
                                  ...content,
                                  references: { ...content.references, testimonials: newTestimonials },
                                });
                              }}
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DDD7D0]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Baş Harfler (İkon)</label>
                            <input
                              type="text"
                              maxLength={3}
                              value={item.initials}
                              onChange={(e) => {
                                const newTestimonials = [...content.references.testimonials];
                                newTestimonials[idx].initials = e.target.value;
                                setContent({
                                  ...content,
                                  references: { ...content.references, testimonials: newTestimonials },
                                });
                              }}
                              className="w-full px-3 py-1.5 text-xs uppercase font-bold rounded-lg border border-[#DDD7D0]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FAQ */}
            {activeTab === "faq" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#1A1A1A]">Sıkça Sorulan Sorular</h2>
                    <p className="text-xs text-[#605F5F] mt-1">Soru ve cevapları düzenleyin veya yenilerini ekleyin</p>
                  </div>
                  <button
                    onClick={() => {
                      const newFaqs = [...content.faq.items, { q: "Yeni Soru Başlığı", a: "Cevap metni buraya gelecek." }];
                      setContent({ ...content, faq: { ...content.faq, items: newFaqs } });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Yeni Soru</span>
                  </button>
                </div>

                <div className="space-y-3.5">
                  {content.faq.items.map((fq: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={fq.q}
                          onChange={(e) => {
                            const newFaqs = [...content.faq.items];
                            newFaqs[idx].q = e.target.value;
                            setContent({ ...content, faq: { ...content.faq, items: newFaqs } });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-sm font-bold focus:border-[#1A1A1A] focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            const newFaqs = content.faq.items.filter((_: any, i: number) => i !== idx);
                            setContent({ ...content, faq: { ...content.faq, items: newFaqs } });
                          }}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                          title="Soruyu Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={fq.a}
                        onChange={(e) => {
                          const newFaqs = [...content.faq.items];
                          newFaqs[idx].a = e.target.value;
                          setContent({ ...content, faq: { ...content.faq, items: newFaqs } });
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD7D0] text-xs focus:border-[#1A1A1A] focus:outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CONTACT */}
            {activeTab === "contact" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">İletişim & Slogan Alanı</h2>
                  <p className="text-xs text-[#605F5F] mt-1">İletişim bölümünün manşet sloganını, açıklamasını ve iletişim bilgilerini düzenleyin</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Üst Rozet (Eyebrow)
                    </label>
                    <input
                      type="text"
                      value={content.contact.eyebrow || ""}
                      onChange={(e) => setContent({ ...content, contact: { ...content.contact, eyebrow: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Ana Slogan / Başlık
                    </label>
                    <input
                      type="text"
                      value={content.contact.title}
                      onChange={(e) => setContent({ ...content, contact: { ...content.contact, title: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm font-bold focus:border-[#1A1A1A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Açıklama / Alt Metin
                    </label>
                    <textarea
                      rows={3}
                      value={content.contact.subtitle}
                      onChange={(e) => setContent({ ...content, contact: { ...content.contact, subtitle: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7D0] text-sm focus:border-[#1A1A1A] focus:outline-none resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        İletişim E-Posta
                      </label>
                      <input
                        type="text"
                        value={content.contact.email || ""}
                        onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
                        className="w-full px-4 py-2 rounded-xl border border-[#DDD7D0] text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        İletişim Telefon
                      </label>
                      <input
                        type="text"
                        value={content.contact.phone || ""}
                        onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })}
                        className="w-full px-4 py-2 rounded-xl border border-[#DDD7D0] text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Sosyal Kanıt Puanı (Rating)
                      </label>
                      <input
                        type="text"
                        value={content.contact.socialProofRating || "4.9 / 5 Memnuniyet"}
                        onChange={(e) => setContent({ ...content, contact: { ...content.contact, socialProofRating: e.target.value } })}
                        placeholder="Örn: 4.9 / 5 Memnuniyet"
                        className="w-full px-4 py-2 rounded-xl border border-[#DDD7D0] text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                        Sosyal Kanıt Müşteri Hacmi
                      </label>
                      <input
                        type="text"
                        value={content.contact.socialProofText || "50+ MICE & Acente Ekibi"}
                        onChange={(e) => setContent({ ...content, contact: { ...content.contact, socialProofText: e.target.value } })}
                        placeholder="Örn: 50+ MICE & Acente Ekibi"
                        className="w-full px-4 py-2 rounded-xl border border-[#DDD7D0] text-xs font-medium"
                      />
                    </div>
                  </div>

                  {/* Form Labels & Placeholders */}
                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                    <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                      İletişim Formu Etiketleri & Yer Tutucuları (Placeholders)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Ad Soyad Etiketi</label>
                        <input
                          type="text"
                          value={content.contact.nameLabel || "Ad Soyad"}
                          onChange={(e) => setContent({ ...content, contact: { ...content.contact, nameLabel: e.target.value } })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Ad Soyad Yer Tutucu</label>
                        <input
                          type="text"
                          value={content.contact.namePlaceholder || "Adınız Soyadınız"}
                          onChange={(e) => setContent({ ...content, contact: { ...content.contact, namePlaceholder: e.target.value } })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">E-Posta Etiketi</label>
                        <input
                          type="text"
                          value={content.contact.emailLabel || "E-Posta Adresi"}
                          onChange={(e) => setContent({ ...content, contact: { ...content.contact, emailLabel: e.target.value } })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">E-Posta Yer Tutucu</label>
                        <input
                          type="text"
                          value={content.contact.emailPlaceholder || "ornek@acente.com"}
                          onChange={(e) => setContent({ ...content, contact: { ...content.contact, emailPlaceholder: e.target.value } })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Mesaj Alanı Etiketi</label>
                        <input
                          type="text"
                          value={content.contact.messageLabel || "Operasyonel İhtiyaçlarınız & Notunuz"}
                          onChange={(e) => setContent({ ...content, contact: { ...content.contact, messageLabel: e.target.value } })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Mesaj Alanı Yer Tutucu</label>
                        <input
                          type="text"
                          value={content.contact.messagePlaceholder || "Acentenizin büyüklüğü, yıllık pax hacminiz ve ilgilendiğiniz modüller..."}
                          onChange={(e) => setContent({ ...content, contact: { ...content.contact, messagePlaceholder: e.target.value } })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#EAE6E1] space-y-3">
                      <h4 className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider">Form Gönderim Başarı Mesajı</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Başarı Başlığı</label>
                          <input
                            type="text"
                            value={content.contact.successTitle || "Mesajınız Başarıyla İletildi"}
                            onChange={(e) => setContent({ ...content, contact: { ...content.contact, successTitle: e.target.value } })}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Açıklama</label>
                          <input
                            type="text"
                            value={content.contact.successMessage || "Teşekkür ederiz! MICE ve operasyon uzmanımız en kısa sürede sizinle iletişime geçecektir."}
                            onChange={(e) => setContent({ ...content, contact: { ...content.contact, successMessage: e.target.value } })}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Yeni Mesaj Buton Yazısı</label>
                          <input
                            type="text"
                            value={content.contact.successButton || "Yeni bir mesaj gönder"}
                            onChange={(e) => setContent({ ...content, contact: { ...content.contact, successButton: e.target.value } })}
                            className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Newsletter Settings */}
                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-3">
                    <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                      E-Bülten Aboneliği Alanı
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Bülten Başlığı</label>
                        <input
                          type="text"
                          value={content.contact.newsletterTitle || "MICE & Acente Gelişmelerinden Haberdar Olun"}
                          onChange={(e) => setContent({ ...content, contact: { ...content.contact, newsletterTitle: e.target.value } })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Bülten Alt Metni</label>
                        <input
                          type="text"
                          value={content.contact.newsletterSubtitle || "Turizm teknolojileri, saha yönetimi ve acente kârlılığı üzerine pratik rehberler."}
                          onChange={(e) => setContent({ ...content, contact: { ...content.contact, newsletterSubtitle: e.target.value } })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">E-Posta Yer Tutucu</label>
                        <input
                          type="text"
                          value={content.contact.newsletterPlaceholder || "E-posta adresiniz"}
                          onChange={(e) => setContent({ ...content, contact: { ...content.contact, newsletterPlaceholder: e.target.value } })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">Abonelik Başarı Bildirimi</label>
                        <input
                          type="text"
                          value={content.contact.newsletterSuccess || "✓ Bülten aboneliğiniz başarıyla kaydedildi!"}
                          onChange={(e) => setContent({ ...content, contact: { ...content.contact, newsletterSuccess: e.target.value } })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: BLOG & CONTENT MANAGEMENT */}
            {activeTab === "blog" && (
              <div className="space-y-8">
                {/* Header with Stats & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#EAE6E1]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-[#FEF7AF] text-[#1A1A1A] flex items-center justify-center font-bold text-sm">
                        ✍️
                      </span>
                      <h2 className="text-xl font-bold text-[#1A1A1A]">Blog & İçerik Yönetimi</h2>
                    </div>
                    <p className="text-xs text-[#605F5F] mt-1">
                      MICE ve acente operasyonlarına özel sektörel makaleleri yönetin veya yapay zeka ile otomatik yeni içerikler üretin.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setAiError(null);
                        setIsAiModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FEF7AF] text-[#1A1A1A] text-xs font-bold hover:bg-[#FCEE71] transition shadow-xs"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>🤖 YZ ile Yazı Üret</span>
                    </button>

                    <button
                      onClick={() => {
                        setEditingPost({
                          slug: "",
                          title: "",
                          excerpt: "",
                          category: "Operasyon",
                          coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
                          published: true,
                          publishedAt: new Date().toISOString().split("T")[0],
                          readingTime: "5 dk okuma",
                          author: {
                            name: "CODEICON Ekibi",
                            role: "MICE & Teknoloji Editörü",
                            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                          },
                          tags: ["MICE", "Operasyon"],
                          content: "## Giriş\n\nBu makalede acente süreçlerini kolaylaştıracak kritik adımları ele alıyoruz...\n\n### Önemli Noktalar\n- Madde 1\n- Madde 2\n\n> [!NOTE]\n> Operasyonel süreçlerde dijitalleşme ekiplerin hata payını en aza indirir.",
                        });
                        setPostEditorTab("edit");
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Yeni Blog Yazısı</span>
                    </button>
                  </div>
                </div>

                {/* Quick Stats Cards */}
                {(() => {
                  const posts = content.blog?.posts || [];
                  const publishedCount = posts.filter((p: any) => p.published !== false).length;
                  const draftCount = posts.filter((p: any) => p.published === false).length;
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-bold text-[#8C8C8C] uppercase">Toplam Yazı</p>
                          <p className="text-2xl font-bold text-[#1A1A1A] mt-0.5">{posts.length}</p>
                        </div>
                        <span className="w-10 h-10 rounded-xl bg-white border border-[#DDD7D0] flex items-center justify-center text-sm shadow-2xs">
                          📚
                        </span>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-bold text-emerald-600 uppercase">Yayında</p>
                          <p className="text-2xl font-bold text-[#1A1A1A] mt-0.5">{publishedCount}</p>
                        </div>
                        <span className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center text-sm shadow-2xs">
                          ✓
                        </span>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-bold text-amber-600 uppercase">Taslak</p>
                          <p className="text-2xl font-bold text-[#1A1A1A] mt-0.5">{draftCount}</p>
                        </div>
                        <span className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center text-sm shadow-2xs">
                          📝
                        </span>
                      </div>
                    </div>
                  );
                })()}

                {/* 1. BLOG GENERAL SETTINGS */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">Genel Blog Sayfası Ayarları</h3>
                      <p className="text-xs text-[#8C8C8C]">
                        Blog başlıkları ve menü görünürlüğü (Kapalıyken Google SEO ve doğrudan linkler kesintisiz çalışır)
                      </p>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer bg-white px-3.5 py-1.5 rounded-full border border-[#DDD7D0] shadow-2xs hover:bg-[#FAF9F6] transition">
                      <input
                        type="checkbox"
                        checked={content.blog?.enabled !== false}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            blog: { ...(content.blog || {}), enabled: e.target.checked },
                          })
                        }
                        className="rounded border-[#DDD7D0] text-[#1A1A1A] focus:ring-black"
                      />
                      <span className="text-xs font-semibold text-[#1A1A1A]">
                        {content.blog?.enabled !== false ? "Menüde Göster (Açık)" : "Menüde Gizle (Sadece SEO Aktif)"}
                      </span>
                    </label>
                  </div>

                  {content.blog?.enabled === false && (
                    <div className="p-3 bg-[#FEF7AF]/40 border border-[#E6DD82] rounded-xl text-xs text-[#594C00] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 shrink-0 text-[#594C00]" />
                      <span>
                        <strong>Google &amp; SEO Modu Aktif:</strong> Blog bağlantısı sitenin üst menüsünde (Navbar) ve alt bilgisinde (Footer) ziyaretçilere gösterilmez; ancak tüm blog sayfaları (`/blog`), `sitemap.xml` ve Google arama indekslemesi arama motorlarında öne çıkmanız için %100 aktif kalır.
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                        Üst Başlık (Eyebrow)
                      </label>
                      <input
                        type="text"
                        value={content.blog?.eyebrow || "CODEICON BLOG"}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            blog: { ...(content.blog || {}), eyebrow: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#DDD7D0] text-xs bg-white focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                        Sayfa Ana Başlığı
                      </label>
                      <input
                        type="text"
                        value={content.blog?.title || "MICE ve Turizm Teknolojileri Rehberi"}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            blog: { ...(content.blog || {}), title: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#DDD7D0] text-xs bg-white focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                        Açıklama / Alt Başlık
                      </label>
                      <input
                        type="text"
                        value={
                          content.blog?.subtitle ||
                          "Acente kârlılığı, saha operasyonları ve seyahat yazılımları üzerine pratik analizler ve ipuçları."
                        }
                        onChange={(e) =>
                          setContent({
                            ...content,
                            blog: { ...(content.blog || {}), subtitle: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#DDD7D0] text-xs bg-white focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. POST LIST & FILTERS */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-[#8C8C8C] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Blog yazılarında ara (başlık, etiket veya özet)..."
                        value={blogSearchQuery}
                        onChange={(e) => setBlogSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#DDD7D0] text-xs focus:outline-none focus:border-black"
                      />
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                      {["Tümü", "Operasyon", "Finans", "Saha Yönetimi", "Teknoloji", "Vaka Analizi"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setBlogCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition ${
                            blogCategoryFilter === cat
                              ? "bg-[#1A1A1A] text-white"
                              : "bg-[#FAF9F6] text-[#605F5F] hover:text-[#1A1A1A] border border-[#DDD7D0]"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Posts List */}
                  {(() => {
                    const allPosts: any[] = content.blog?.posts || [];
                    const filteredPosts = allPosts.filter((p: any) => {
                      const matchesCategory =
                        blogCategoryFilter === "Tümü" ||
                        (p.category && p.category.toLowerCase() === blogCategoryFilter.toLowerCase());
                      const q = blogSearchQuery.toLowerCase().trim();
                      const matchesQuery =
                        !q ||
                        p.title?.toLowerCase().includes(q) ||
                        p.excerpt?.toLowerCase().includes(q) ||
                        p.category?.toLowerCase().includes(q) ||
                        (Array.isArray(p.tags) && p.tags.some((t: string) => t.toLowerCase().includes(q)));
                      return matchesCategory && matchesQuery;
                    });

                    if (filteredPosts.length === 0) {
                      return (
                        <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-[#DDD7D0] bg-[#FAF9F6]">
                          <BookOpen className="w-10 h-10 text-[#8C8C8C] mx-auto mb-2 opacity-50" />
                          <h4 className="text-sm font-bold text-[#1A1A1A]">Blog Yazısı Bulunamadı</h4>
                          <p className="text-xs text-[#605F5F] mt-1 max-w-sm mx-auto">
                            {blogSearchQuery
                              ? "Arama kriterinize uygun blog yazısı bulunamadı."
                              : "Henüz yayınlanmış bir blog yazısı yok. İlk yazınızı yapay zeka ile 10 saniyede üretebilirsiniz!"}
                          </p>
                          <div className="mt-4 flex items-center justify-center gap-2">
                            <button
                              onClick={() => setIsAiModalOpen(true)}
                              className="px-4 py-2 rounded-full bg-[#FEF7AF] text-[#1A1A1A] text-xs font-bold hover:bg-[#FCEE71] transition"
                            >
                              🤖 YZ ile Yazı Üret
                            </button>
                            <button
                              onClick={() => {
                                setEditingPost({
                                  slug: "",
                                  title: "",
                                  excerpt: "",
                                  category: "Operasyon",
                                  coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
                                  published: true,
                                  publishedAt: new Date().toISOString().split("T")[0],
                                  readingTime: "5 dk okuma",
                                  author: {
                                    name: "CODEICON Ekibi",
                                    role: "MICE & Teknoloji Editörü",
                                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                                  },
                                  tags: ["MICE"],
                                  content: "## Giriş\n\nİçerik...",
                                });
                                setPostEditorTab("edit");
                              }}
                              className="px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition"
                            >
                              Manuel Ekle
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-3">
                        {filteredPosts.map((post: any) => {
                          const isPublished = post.published !== false;
                          const isDeletingThis = deleteConfirmSlug === post.slug;

                          return (
                            <div
                              key={post.slug}
                              className="bg-white rounded-2xl border border-[#DDD7D0] p-4 sm:p-5 shadow-2xs hover:shadow-xs transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                            >
                              {/* Left Post Thumbnail & Details */}
                              <div className="flex items-start gap-4 min-w-0 flex-1">
                                {post.coverImage ? (
                                  <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 border border-[#DDD7D0]"
                                  />
                                ) : (
                                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#FAF9F6] border border-[#DDD7D0] flex items-center justify-center text-xl shrink-0">
                                    📄
                                  </div>
                                )}

                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF9F6] text-[#1A1A1A] border border-[#DDD7D0]">
                                      {post.category || "Genel"}
                                    </span>
                                    <span className="text-[11px] text-[#8C8C8C] flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {post.readingTime || "5 dk"}
                                    </span>
                                    <span className="text-[11px] text-[#8C8C8C] flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {post.publishedAt || "Yeni"}
                                    </span>
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                        isPublished
                                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                          : "bg-amber-50 text-amber-700 border border-amber-200"
                                      }`}
                                    >
                                      {isPublished ? "● Yayında" : "○ Taslak"}
                                    </span>
                                  </div>

                                  <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A] truncate hover:text-black">
                                    {post.title}
                                  </h4>

                                  <p className="text-xs text-[#605F5F] line-clamp-2 mt-1">
                                    {post.excerpt}
                                  </p>

                                  <div className="flex items-center gap-3 mt-2 text-[11px] text-[#8C8C8C]">
                                    <span className="font-mono text-[10px] bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600">
                                      /{post.slug}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Right Actions */}
                              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#F0ECE6] justify-end">
                                {/* Fast Status Toggle */}
                                <button
                                  onClick={() => handleTogglePostPublished(post.slug)}
                                  title={isPublished ? "Taslağa Al" : "Yayınla"}
                                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
                                    isPublished
                                      ? "bg-neutral-50 text-neutral-700 border-[#DDD7D0] hover:bg-neutral-100"
                                      : "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
                                  }`}
                                >
                                  {isPublished ? "Taslağa Al" : "Hemen Yayınla"}
                                </button>

                                {/* Live Preview Link */}
                                <Link
                                  href={`/blog/${post.slug}`}
                                  target="_blank"
                                  className="p-2 rounded-xl bg-[#FAF9F6] border border-[#DDD7D0] text-[#1A1A1A] hover:bg-[#F4F2EE] transition"
                                  title="Sitede Canlı Görüntüle"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Link>

                                {/* Edit Button */}
                                <button
                                  onClick={() => {
                                    setEditingPost({ ...post });
                                    setPostEditorTab("edit");
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-neutral-800 transition"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>Düzenle</span>
                                </button>

                                {/* Delete Confirmation */}
                                {isDeletingThis ? (
                                  <div className="flex items-center gap-1 bg-red-50 p-1 rounded-xl border border-red-200">
                                    <span className="text-[10px] font-bold text-red-700 px-1">Silinsin mi?</span>
                                    <button
                                      onClick={() => handleDeleteBlogPost(post.slug)}
                                      className="px-2 py-1 rounded bg-red-600 text-white text-[10px] font-bold hover:bg-red-700 transition"
                                    >
                                      Evet
                                    </button>
                                    <button
                                      onClick={() => setDeleteConfirmSlug(null)}
                                      className="px-2 py-1 rounded bg-white text-[#1A1A1A] text-[10px] font-semibold border border-neutral-300"
                                    >
                                      İptal
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setDeleteConfirmSlug(post.slug)}
                                    className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                                    title="Yazıyı Sil"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Bottom Save Bar */}
            <div className="mt-8 pt-6 border-t border-[#F0ECE6] flex items-center justify-between">
              <span className="text-xs text-[#8C8C8C]">
                Değişikliklerin sitede görünmesi için sağdaki butona basın.
              </span>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-bold hover:bg-neutral-800 transition shadow-sm"
              >
                {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🤖 AI BLOG GENERATOR MODAL */}
      {/* ========================================================================= */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-[#DDD7D0] shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#F0ECE6]">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-[#FEF7AF] text-[#1A1A1A] flex items-center justify-center text-lg font-bold shadow-2xs">
                  🤖
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A]">
                    Yapay Zeka ile Sektörel Blog Yazısı Üret
                  </h3>
                  <p className="text-xs text-[#605F5F] mt-0.5">
                    MICE acenteleri için SEO uyumlu, profesyonel ve sektörel makale oluşturun.
                  </p>
                </div>
              </div>

              <button
                onClick={() => !aiLoading && setIsAiModalOpen(false)}
                className="p-1.5 rounded-full text-[#8C8C8C] hover:text-[#1A1A1A] hover:bg-neutral-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Topic Chips */}
            <div>
              <label className="block text-[11px] font-bold text-[#8C8C8C] uppercase mb-2">
                ⚡ Hızlı Konu Önerileri (Tıklayarak Seçin):
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {AI_SUGGESTIONS.map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAiTopic(sug)}
                    className={`text-left text-xs px-3 py-1.5 rounded-xl border transition ${
                      aiTopic === sug
                        ? "bg-[#1A1A1A] text-white border-black font-semibold"
                        : "bg-[#FAF9F6] text-[#605F5F] border-[#DDD7D0] hover:text-[#1A1A1A] hover:bg-[#F4F2EE]"
                    }`}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Makale Konusu veya Anahtar Kelimeler:
              </label>
              <textarea
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                placeholder="Örn: Havalimanı transfer operasyonlarında şoför ve rehber WhatsApp görev emri otomasyonu ve zaman tasarrufu..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-[#DDD7D0] text-xs focus:outline-none focus:border-black bg-white shadow-2xs resize-none"
              />
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                  Hedef Okuyucu Kitlesi
                </label>
                <select
                  value={aiAudience}
                  onChange={(e) => setAiAudience(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD7D0] text-xs bg-white focus:outline-none focus:border-black"
                >
                  <option value="MICE Acenteleri & Operasyon Yöneticileri">MICE & Kongre Operasyon Yöneticileri</option>
                  <option value="Seyahat Acentesi Sahipleri & Genel Müdürler">Acente Sahipleri & Genel Müdürler</option>
                  <option value="Saha & Transfer Operasyon Ekipleri">Saha & Transfer Operasyon Ekipleri</option>
                  <option value="Muhasebe & Finans Yöneticileri">Muhasebe & Finans Ekipleri</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                  Yazı Dili & Üslubu
                </label>
                <select
                  value={aiTone}
                  onChange={(e) => setAiTone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD7D0] text-xs bg-white focus:outline-none focus:border-black"
                >
                  <option value="profesyonel">Profesyonel & Güven Verici</option>
                  <option value="egitici">Eğitici & Adım Adım Rehber</option>
                  <option value="cozum-odakli">Çözüm Odaklı & Vaka Analizi</option>
                  <option value="vizyoner">Vizyoner & İnovatif</option>
                </select>
              </div>
            </div>

            {/* Provider Selection */}
            <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1A1A1A]">YZ Motoru Tercihi:</label>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  {aiProvider === "builtin" ? "Ücretsiz & Hazır" : "Gelişmiş LLM"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "builtin", label: "Dahili MICE YZ (Varsayılan)" },
                  { id: "gemini", label: "Google Gemini AI" },
                  { id: "openai", label: "OpenAI GPT-4o" },
                ].map((prov) => (
                  <button
                    key={prov.id}
                    type="button"
                    onClick={() => setAiProvider(prov.id as any)}
                    className={`py-2 px-2.5 rounded-xl text-center text-[11px] font-medium transition border ${
                      aiProvider === prov.id
                        ? "bg-[#1A1A1A] text-white border-black font-semibold shadow-xs"
                        : "bg-white text-[#605F5F] border-[#DDD7D0] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {prov.label}
                  </button>
                ))}
              </div>

              {aiProvider !== "builtin" && (
                <div>
                  <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                    Özel API Anahtarı (İsteğe Bağlı)
                  </label>
                  <input
                    type="password"
                    placeholder="Boş bırakırsanız sistem ortam değişkeni kullanılır"
                    value={aiCustomKey}
                    onChange={(e) => setAiCustomKey(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#DDD7D0] text-xs bg-white focus:outline-none focus:border-black"
                  />
                </div>
              )}
            </div>

            {aiError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{aiError}</span>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={aiLoading}
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2 rounded-full border border-[#DDD7D0] text-xs font-semibold text-[#605F5F] hover:bg-neutral-100 transition"
              >
                Vazgeç
              </button>

              <button
                type="button"
                disabled={aiLoading || !aiTopic.trim()}
                onClick={handleGenerateBlogWithAi}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-bold hover:bg-neutral-800 transition disabled:opacity-50 shadow-sm"
              >
                {aiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#FEF7AF]" />
                    <span>Yapay Zeka İçeriği Hazırlıyor...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#FEF7AF]" />
                    <span>✨ Makaleyi Üret ve Düzenle</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ✍️ BLOG POST EDIT / CREATE MODAL */}
      {/* ========================================================================= */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-4xl h-[90vh] rounded-3xl border border-[#DDD7D0] shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#F0ECE6] flex items-center justify-between shrink-0 bg-[#FAF9F6]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#1A1A1A] text-[#FEF7AF] flex items-center justify-center text-sm font-bold">
                  ✍️
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                    {editingPost.slug ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı Oluştur"}
                  </h3>
                  <p className="text-[11px] text-[#8C8C8C]">
                    Başlık, görsel, kategori, etiketler ve markdown içeriğini özelleştirin.
                  </p>
                </div>
              </div>

              {/* Edit / Preview Switcher */}
              <div className="flex items-center gap-2">
                <div className="flex items-center p-1 bg-white border border-[#DDD7D0] rounded-xl shadow-2xs">
                  <button
                    onClick={() => setPostEditorTab("edit")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      postEditorTab === "edit"
                        ? "bg-[#1A1A1A] text-white shadow-2xs"
                        : "text-[#605F5F] hover:text-[#1A1A1A]"
                    }`}
                  >
                    ✏️ Düzenle
                  </button>
                  <button
                    onClick={() => setPostEditorTab("preview")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      postEditorTab === "preview"
                        ? "bg-[#1A1A1A] text-white shadow-2xs"
                        : "text-[#605F5F] hover:text-[#1A1A1A]"
                    }`}
                  >
                    👁️ Canlı Önizleme
                  </button>
                </div>

                <button
                  onClick={() => setEditingPost(null)}
                  className="p-1.5 rounded-full text-[#8C8C8C] hover:text-[#1A1A1A] hover:bg-neutral-200 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {postEditorTab === "edit" ? (
                <>
                  {/* Meta Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE6E1]">
                    {/* Title */}
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                        Makale Başlığı *
                      </label>
                      <input
                        type="text"
                        value={editingPost.title || ""}
                        onChange={(e) => {
                          const title = e.target.value;
                          setEditingPost({
                            ...editingPost,
                            title,
                            slug: editingPost.slug || generateSlug(title),
                          });
                        }}
                        placeholder="Örn: MICE Kongrelerinde Rooming List Yönetimi"
                        className="w-full px-3 py-2 rounded-xl border border-[#DDD7D0] text-sm font-semibold bg-white focus:outline-none focus:border-black"
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold text-[#8C8C8C] uppercase">
                          URL Bağlantısı (Slug)
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            if (editingPost.title) {
                              setEditingPost({
                                ...editingPost,
                                slug: generateSlug(editingPost.title),
                              });
                            }
                          }}
                          className="text-[10px] font-semibold text-blue-600 hover:underline"
                        >
                          Başlıktan Yenile
                        </button>
                      </div>
                      <div className="flex items-center">
                        <span className="px-2.5 py-2 bg-neutral-100 border border-r-0 border-[#DDD7D0] rounded-l-xl text-xs text-[#8C8C8C] font-mono">
                          /blog/
                        </span>
                        <input
                          type="text"
                          value={editingPost.slug || ""}
                          onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                          className="w-full px-3 py-2 rounded-r-xl border border-[#DDD7D0] text-xs font-mono bg-white focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                        Kategori
                      </label>
                      <select
                        value={editingPost.category || "Operasyon"}
                        onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#DDD7D0] text-xs bg-white focus:outline-none focus:border-black"
                      >
                        <option value="Operasyon">Operasyon</option>
                        <option value="Finans">Finans & Muhasebe</option>
                        <option value="Saha Yönetimi">Saha Yönetimi</option>
                        <option value="Teknoloji">Teknoloji & Yazılım</option>
                        <option value="Vaka Analizi">Vaka Analizi</option>
                      </select>
                    </div>

                    {/* Excerpt */}
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                        Kısa Özet (Meta Description / Listeleme Açıklaması)
                      </label>
                      <textarea
                        rows={2}
                        value={editingPost.excerpt || ""}
                        onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                        placeholder="Yazının kartlarda ve Google arama sonuçlarında görünecek 1-2 cümlelik özeti..."
                        className="w-full px-3 py-2 rounded-xl border border-[#DDD7D0] text-xs bg-white focus:outline-none focus:border-black resize-none"
                      />
                    </div>

                    {/* Cover Image */}
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                        Kapak Görseli URL
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={editingPost.coverImage || ""}
                          onChange={(e) => setEditingPost({ ...editingPost, coverImage: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 px-3 py-2 rounded-xl border border-[#DDD7D0] text-xs bg-white focus:outline-none focus:border-black"
                        />
                        {editingPost.coverImage && (
                          <img
                            src={editingPost.coverImage}
                            alt="Preview"
                            className="w-10 h-10 rounded-lg object-cover border border-[#DDD7D0]"
                          />
                        )}
                      </div>
                    </div>

                    {/* Reading Time & Date */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                        Okuma Süresi
                      </label>
                      <input
                        type="text"
                        value={editingPost.readingTime || "5 dk okuma"}
                        onChange={(e) => setEditingPost({ ...editingPost, readingTime: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#DDD7D0] text-xs bg-white focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                        Yayın Tarihi
                      </label>
                      <input
                        type="text"
                        value={editingPost.publishedAt || new Date().toISOString().split("T")[0]}
                        onChange={(e) => setEditingPost({ ...editingPost, publishedAt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#DDD7D0] text-xs bg-white focus:outline-none focus:border-black"
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#8C8C8C] uppercase mb-1">
                        Etiketler (Virgülle ayırın)
                      </label>
                      <input
                        type="text"
                        value={
                          Array.isArray(editingPost.tags)
                            ? editingPost.tags.join(", ")
                            : editingPost.tags || ""
                        }
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            tags: e.target.value.split(",").map((t: string) => t.trim()),
                          })
                        }
                        placeholder="MICE, Kongre, Transfer, Otomasyon"
                        className="w-full px-3 py-2 rounded-xl border border-[#DDD7D0] text-xs bg-white focus:outline-none focus:border-black"
                      />
                    </div>

                    {/* Published Switch */}
                    <div className="flex items-center gap-3 pt-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingPost.published !== false}
                          onChange={(e) =>
                            setEditingPost({ ...editingPost, published: e.target.checked })
                          }
                          className="rounded border-[#DDD7D0] text-[#1A1A1A] focus:ring-black"
                        />
                        <span className="text-xs font-bold text-[#1A1A1A]">
                          {editingPost.published !== false ? "✓ Yazı Yayında" : "○ Taslak Olarak Sakla"}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Markdown Content Editor */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wide">
                        Makale İçeriği (Markdown)
                      </label>
                      <span className="text-[11px] text-[#8C8C8C]">
                        Başlıklar (##, ###), listeler (-) ve vurgu kutuları (&gt; [!NOTE]) desteklenir.
                      </span>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#FAF9F6] border border-[#DDD7D0] rounded-xl text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          const current = editingPost.content || "";
                          setEditingPost({ ...editingPost, content: current + "\n\n## Yeni Başlık\n" });
                        }}
                        className="px-2.5 py-1 bg-white border border-[#DDD7D0] rounded-lg font-bold hover:bg-neutral-100"
                        title="Ana Başlık (H2)"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const current = editingPost.content || "";
                          setEditingPost({ ...editingPost, content: current + "\n\n### Alt Başlık\n" });
                        }}
                        className="px-2.5 py-1 bg-white border border-[#DDD7D0] rounded-lg font-bold hover:bg-neutral-100"
                        title="Alt Başlık (H3)"
                      >
                        H3
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const current = editingPost.content || "";
                          setEditingPost({ ...editingPost, content: current + " **kalın metin** " });
                        }}
                        className="px-2.5 py-1 bg-white border border-[#DDD7D0] rounded-lg font-bold hover:bg-neutral-100"
                        title="Kalın"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const current = editingPost.content || "";
                          setEditingPost({ ...editingPost, content: current + " *italik metin* " });
                        }}
                        className="px-2.5 py-1 bg-white border border-[#DDD7D0] rounded-lg italic hover:bg-neutral-100"
                        title="İtalik"
                      >
                        I
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const current = editingPost.content || "";
                          setEditingPost({ ...editingPost, content: current + "\n- Liste öğesi 1\n- Liste öğesi 2\n" });
                        }}
                        className="px-2.5 py-1 bg-white border border-[#DDD7D0] rounded-lg hover:bg-neutral-100"
                        title="Liste"
                      >
                        • Liste
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const current = editingPost.content || "";
                          setEditingPost({ ...editingPost, content: current + "\n> Alıntı metni buraya...\n" });
                        }}
                        className="px-2.5 py-1 bg-white border border-[#DDD7D0] rounded-lg hover:bg-neutral-100"
                        title="Alıntı"
                      >
                        “ Alıntı
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const current = editingPost.content || "";
                          setEditingPost({
                            ...editingPost,
                            content: current + "\n> [!NOTE]\n> MICE operasyonlarında kritik ipucu burada yer alır.\n",
                          });
                        }}
                        className="px-2.5 py-1 bg-[#FEF7AF] text-[#1A1A1A] border border-[#DDD7D0] rounded-lg font-semibold hover:bg-[#FCEE71]"
                        title="Vurgu / İpucu Kutusu"
                      >
                        💡 Bilgi Kutusu
                      </button>
                    </div>

                    <textarea
                      rows={14}
                      value={editingPost.content || ""}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      placeholder="## Başlık..."
                      className="w-full p-4 rounded-2xl border border-[#DDD7D0] font-mono text-xs leading-relaxed focus:outline-none focus:border-black bg-white shadow-2xs"
                    />
                  </div>
                </>
              ) : (
                /* LIVE PREVIEW TAB */
                <div className="space-y-6 max-w-2xl mx-auto py-4">
                  {editingPost.coverImage && (
                    <img
                      src={editingPost.coverImage}
                      alt={editingPost.title}
                      className="w-full h-64 rounded-2xl object-cover border border-[#DDD7D0] shadow-xs"
                    />
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF7AF] text-[#1A1A1A]">
                        {editingPost.category || "Genel"}
                      </span>
                      <span className="text-xs text-[#8C8C8C]">{editingPost.readingTime || "5 dk okuma"}</span>
                      <span className="text-xs text-[#8C8C8C]">• {editingPost.publishedAt}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-tight">
                      {editingPost.title || "Başlık Girilmedi"}
                    </h1>

                    <p className="text-sm text-[#605F5F] italic border-l-2 border-[#1A1A1A] pl-3 py-1">
                      {editingPost.excerpt}
                    </p>
                  </div>

                  <hr className="border-[#EAE6E1]" />

                  {/* Rendered markdown body */}
                  <div className="prose prose-neutral max-w-none text-xs sm:text-sm leading-relaxed space-y-3">
                    {(editingPost.content || "").split("\n").map((line: string, i: number) => {
                      const t = line.trim();
                      if (!t) return null;
                      if (t.startsWith("### ")) {
                        return (
                          <h3 key={i} className="text-base font-bold text-[#1A1A1A] mt-4 mb-1">
                            {t.replace("### ", "")}
                          </h3>
                        );
                      }
                      if (t.startsWith("## ")) {
                        return (
                          <h2 key={i} className="text-xl font-bold text-[#1A1A1A] mt-6 mb-2">
                            {t.replace("## ", "")}
                          </h2>
                        );
                      }
                      if (t.startsWith("> [!NOTE]") || t.startsWith("> [!TIP]") || t.startsWith("> [!IMPORTANT]")) {
                        return (
                          <div key={i} className="p-3 my-3 bg-[#FEF7AF]/30 border-l-4 border-[#1A1A1A] rounded-r-xl text-xs font-medium text-[#1A1A1A]">
                            {t.replace(/^>\s*\[!\w+\]\s*/, "")}
                          </div>
                        );
                      }
                      if (t.startsWith("> ")) {
                        return (
                          <blockquote key={i} className="border-l-4 border-[#DDD7D0] pl-3 italic my-3 text-xs text-[#605F5F]">
                            {t.replace("> ", "")}
                          </blockquote>
                        );
                      }
                      if (t.startsWith("- ") || t.startsWith("* ")) {
                        return (
                          <li key={i} className="list-disc list-inside text-neutral-700 ml-2">
                            {t.slice(2)}
                          </li>
                        );
                      }
                      return (
                        <p key={i} className="text-neutral-700 leading-relaxed">
                          {t}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#F0ECE6] flex items-center justify-between shrink-0 bg-[#FAF9F6]">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    editingPost.published !== false ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                <span className="text-xs font-semibold text-[#605F5F]">
                  Durum: {editingPost.published !== false ? "Yayında" : "Taslak"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 rounded-full border border-[#DDD7D0] text-xs font-semibold text-[#605F5F] hover:bg-neutral-100 transition"
                >
                  Kapat
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSaveBlogPost(editingPost)}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-bold hover:bg-neutral-800 transition shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? "Kaydediliyor..." : "Yazıyı Kaydet"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
