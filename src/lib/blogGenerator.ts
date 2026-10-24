// Shared intelligent MICE sectoral blog generator & daily cron engine
// Designed for CODEICON — Next-Gen MICE & Travel Agency Operating System

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  readingTime: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  published: boolean;
  featured?: boolean;
  content: string;
}

export interface SectoralTheme {
  primaryKeyword: string;
  titleVariants: string[];
  category: string;
  baseTags: string[];
  images: string[];
  defaultAudience: string;
  angles: string[];
}

export function slugify(text: string): string {
  const trMap: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i",
    ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u"
  };
  return text
    .split("")
    .map(c => trMap[c] || c)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 12 Distinct Sectoral Themes Rotating Target Keywords:
// "MICE acente sistemi", "MICE yönetim sistemi", "Online MICE sistemi", "MICE programı"
export const SECTORAL_THEMES: SectoralTheme[] = [
  {
    primaryKeyword: "MICE acente sistemi",
    titleVariants: [
      "Modern Bir MICE Acente Sistemi ile Operasyonel Hataları Sıfırlamanın Yolları",
      "MICE Acente Sistemi Seçerken Dikkat Edilmesi Gereken 5 Hayati Özellik",
      "Excel'den Kurtuluş: Acenteler İçin Yeni Nesil MICE Acente Sistemi",
      "Büyüyen Acenteler Neden Bütünleşik Bir MICE Acente Sistemine Geçmeli?",
      "Tekliften Sahaya Kesintisiz Akış: Entegre MICE Acente Sistemi Mimarisi"
    ],
    category: "Acente Yönetimi",
    baseTags: ["MICE Acente Sistemi", "Acente Yönetimi", "Operasyon", "Dijital Dönüşüm"],
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80"
    ],
    defaultAudience: "MICE Acente Sahipleri & Genel Müdürler",
    angles: [
      "Manuel dosya yönetiminin yarattığı veri kaybı ve tek merkezli operasyon mimarisi.",
      "Proje ekibi, finans ve saha liderleri arasındaki kopuklukların önlenmesi.",
      "Acente kârlılığını artıran zaman ve iş gücü tasarrufu metrikleri."
    ]
  },
  {
    primaryKeyword: "MICE yönetim sistemi",
    titleVariants: [
      "Krizleri Önceden Engelleyen Proaktif MICE Yönetim Sistemi Yaklaşımı",
      "MICE Yönetim Sistemi ile Saha ve Ofis Arasındaki Senkronizasyon",
      "Kurumsal Etkinliklerde Hata Payını Sıfırlayan MICE Yönetim Sistemi Modelleri",
      "MICE Yönetim Sisteminde Bütçe, Avans ve Harcama Disiplini",
      "Büyük Katılımlı Bayi Toplantılarında Akıllı MICE Yönetim Sistemi Dinamikleri"
    ],
    category: "Operasyon Teknolojisi",
    baseTags: ["MICE Yönetim Sistemi", "Etkinlik Yönetimi", "Saha Koordinasyonu", "Proje Takibi"],
    images: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80"
    ],
    defaultAudience: "Operasyon Müdürleri & Proje Yöneticileri",
    angles: [
      "Grup dinamiklerini anlık izleyerek kriz çıkmadan önce önlem alma refleksleri.",
      "Katılımcı bazlı harcama ve avans kaçaklarının tek ekranda denetlenmesi.",
      "Departmanlar arası iletişim hızı ve onay mekanizmalarının otonomlaşması."
    ]
  },
  {
    primaryKeyword: "Online MICE sistemi",
    titleVariants: [
      "Online MICE Sistemi ile Kurumsal Müşterilere İnteraktif Teklif Deneyimi",
      "Acentenizi 7/24 Erişilebilir Kılan Bulut Tabanlı Online MICE Sistemi",
      "Online MICE Sistemi Üzerinden Anlık Revizyon ve Müşteri Onay Portalı",
      "E-Posta Trafiğine Son: Online MICE Sistemi ile Şeffaf Müşteri İletişimi",
      "Kurumsal İhalelerde Fark Yaratan Yeni Nesil Online MICE Sistemi Vizyonu"
    ],
    category: "Müşteri Deneyimi",
    baseTags: ["Online MICE Sistemi", "Teklif Portalı", "Kurumsal İletişim", "Müşteri Deneyimi"],
    images: [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80"
    ],
    defaultAudience: "Satış & Müşteri İlişkileri Liderleri",
    angles: [
      "Müşteriye statik PDF göndermek yerine interaktif ve canlı teklif sayfası sunma avantajı.",
      "Bütçe ve program revizyonlarının online portal üzerinden saniyeler içinde onaylanması.",
      "Kurumsal firmaların acente seçiminde aradığı dijital şeffaflık standartları."
    ]
  },
  {
    primaryKeyword: "MICE programı",
    titleVariants: [
      "MICE Programı ile Yüzlerce Kişilik Rooming ve Uçuş Listelerini Otomatikleştirmek",
      "Acenteler İçin Doğru MICE Programı Nasıl Seçilir? Kapsamlı Karşılaştırma",
      "Geleneksel Yazılımlardan Modern MICE Programına Geçiş Rehberi",
      "MICE Programı Kullanarak Kongre ve Bayi Toplantılarında Zamanı Yönetmek",
      "Acente Ekiplerinin Verimliliğini İki Katına Çıkaran Akıllı MICE Programı Pratikleri"
    ],
    category: "Acente Teknolojileri",
    baseTags: ["MICE Programı", "Yazılım Seçimi", "Acente Verimliliği", "Otomasyon"],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&auto=format&fit=crop&q=80"
    ],
    defaultAudience: "Acente Yöneticileri & Operasyon Ekipleri",
    angles: [
      "Karmaşık Excel formüllerinin acenteye maliyeti ve tek tıkla rooming aktarımı.",
      "Yazılım öğrenme eğrisini minimuma indiren modern kullanıcı arayüzü tasarımı.",
      "Acentenin tüm operasyonel hafızasını tek bir veri tabanında toplamanın değeri."
    ]
  },
  {
    primaryKeyword: "TCMB kur sabitleme ve acente finansı",
    titleVariants: [
      "MICE Projelerinde TCMB Canlı Kur ve Sabitleme ile Kâr Marjını Koruma",
      "Döviz Dalgalanmalarına Karşı MICE Acente Sisteminde Akıllı Bütçe Yönetimi",
      "Kur Farkı Zararlarını Sıfırlayan Dinamik Maliyet ve Kur Sabitleme Stratejileri",
      "MICE Faturalandırmasında TCMB Entegrasyonu ve Vergi / KDV Disiplini"
    ],
    category: "Finans & Kur",
    baseTags: ["TCMB", "Kur Sabitleme", "Acente Finansı", "Maliyet Analizi", "Döviz"],
    images: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80"
    ],
    defaultAudience: "Finans Direktörleri & Acente Muhasebe Müdürleri",
    angles: [
      "Teklif verildiği gün ile fatura kesildiği gün arasındaki kur makasının acenteye faturası.",
      "Sözleşme aşamasında kur sabitleme maddeleri ve sistemsel otomatik hesaplama.",
      "Çoklu para birimli bütçelerin tek tıkla konsolide edilmesi."
    ]
  },
  {
    primaryKeyword: "Saha transferi ve WhatsApp görev emri",
    titleVariants: [
      "Saha Transferlerinde Sıfır Hata: Şoför WhatsApp Görev Emri Otomasyonu",
      "Havalimanı Karşılamalarında Uçuş Rötarlarını Anlık Yöneten Akıllı Lojistik",
      "MICE Transfer Operasyonlarında Şoför-Müşteri İletişimini Otonomlaştırma",
      "VIP Karşılamadan Otel Girişine: MICE Saha Transferinde Kusursuz Koordinasyon"
    ],
    category: "Saha & Transfer",
    baseTags: ["Transfer Operasyonu", "WhatsApp Görev Emri", "Havalimanı", "Lojistik"],
    images: [
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?w=1200&auto=format&fit=crop&q=80"
    ],
    defaultAudience: "Transfer & Saha Operasyon Şefleri",
    angles: [
      "Şoförlere SMS veya telefon yerine şablonlu WhatsApp bağlantısıyla canlı görev emri gönderme.",
      "Uçak rötar yaptığında transfer saatlerinin operasyon amirine anında bildirilmesi.",
      "Yolcu bindi/indi statülerinin sahada tek tıkla güncellenmesi."
    ]
  },
  {
    primaryKeyword: "Excel rooming list ve grup rezervasyonu",
    titleVariants: [
      "Yüzlerce Kişilik Rooming Listelerini Excel'den Tek Tıkla Sisteme Aktarma",
      "MICE Otel Rezervasyonlarında No-Show ve Mükerrer Oda Krizlerini Bitirme",
      "Son Dakika Oda Değişikliklerini Kaosa Dönüştürmeyen Dinamik Rooming Sistemi",
      "Otel Satış Ofisleri ile Acente Arasındaki Rooming Mutabakatını Hızlandırma"
    ],
    category: "Acente Teknolojileri",
    baseTags: ["Rooming List", "Otel Yönetimi", "No-Show Önleme", "Excel Otomasyonu"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&auto=format&fit=crop&q=80"
    ],
    defaultAudience: "Rezervasyon & Konaklama Sorumluları",
    angles: [
      "Müşteriden gelen dağınık kolonlu Excel tablolarının akıllı eşleme ile içe aktarılması.",
      "C-in ve C-out tarihlerinde yapılan son dakika revizyonlarının otele anlık iletilmesi.",
      "Grup lideri, VIP ve münferit katılımcı oda tiplerinin otomatik ayrıştırılması."
    ]
  },
  {
    primaryKeyword: "QR check-in ve etkinlik kayıt masaları",
    titleVariants: [
      "Kongre ve Etkinlik Kayıt Masalarında Hızlı QR Check-in ile Sıraları Yok Etme",
      "Karekodlu Yaka Kartı Baskısı ile Katılımcı Karşılama Süresini 3 Saniyeye İndirme",
      "Turnike ve Salon Girişlerinde Canlı Katılımcı Yoklaması ve Güvenlik Takibi",
      "B2B Etkinliklerde Katılımcı Akışını Analiz Eden Akıllı Kayıt Sistemleri"
    ],
    category: "Etkinlik Teknolojisi",
    baseTags: ["QR Check-in", "Yaka Kartı", "Kayıt Masası", "Etkinlik Teknolojisi"],
    images: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&auto=format&fit=crop&q=80"
    ],
    defaultAudience: "Etkinlik Koordinatörleri & Kayıt Ekibi Liderleri",
    angles: [
      "Katılımcıların cep telefonuna giden QR bilet ile kayıt masasında beklemeden geçişi.",
      "Masaüstü termal yazıcılarla saniyeler içinde şık yaka kartı basımı.",
      "Hangi oturuma kaç kişinin katıldığının canlı gösterge panelinden izlenmesi."
    ]
  },
  {
    primaryKeyword: "MICE acentelerinde teklif onay portalı",
    titleVariants: [
      "Kurumsal Şirketlerin Tercihi: İnteraktif MICE Teklif ve Bütçe Onay Portalı",
      "Statik PDF Teklifleri Tarihe Karışıyor: Canlı MICE Portalı ile Hızlı Satış",
      "Müşteriye Güven Veren Şeffaf Teklif Mimarisi: Revizyon Geçmişi ve Onay Kaydı",
      "Tekliften Sözleşmeye: MICE Acentelerinde Satış Kapanış Süresini Kısaltma"
    ],
    category: "Satış & Teklif",
    baseTags: ["Teklif Portalı", "B2B Satış", "Müşteri Onayı", "Şeffaf Bütçeleme"],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80"
    ],
    defaultAudience: "Acente Satış Direktörleri & Müşteri Temsilcileri",
    angles: [
      "Müşterinin kalemi kaleme tüm bütçe detaylarını interaktif web linki üzerinden incelemesi.",
      "Müşteri yorum ve talep girdiğinde satış temsilcisine anında e-posta / bildirim gitmesi.",
      "Resmi onay damgasının dijital imzayla sisteme kaydedilmesi."
    ]
  },
  {
    primaryKeyword: "Acente ERP ve Sejour entegrasyonu",
    titleVariants: [
      "MICE ve Münferit Operasyonları Tek Çatıda Birleştiren ERP ve Sejour Entegrasyonu",
      "Turizm Acentelerinde Muhasebe ve Saha Verilerini Otomatik Eşleştirme",
      "Çift Veri Girişine Son: Sejour ve Muhasebe Yazılımları ile Tam Senkronizasyon",
      "Acentenin Tüm Gelir-Gider Tablosunu Canlı Gösteren Finansal Entegrasyonlar"
    ],
    category: "Entegrasyon & ERP",
    baseTags: ["Sejour", "ERP Entegrasyonu", "Acente Muhasebesi", "Çift Kayıt Önleme"],
    images: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
    ],
    defaultAudience: "Acente Bilgi İşlem (IT) & Finans Yöneticileri",
    angles: [
      "Farklı sistemler arasındaki manuel veri aktarımlarının sebep olduğu insan hataları.",
      "Fatura ve tahsilatların operasyon kapanışında otomatik cari hesaba yansıması.",
      "Tek bir merkezi veritabanı ile acentenin tüm departmanlarını uyumlu çalıştırma."
    ]
  }
];

// Helper: Pick item
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper: Pick multi
function pickMulti<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Selects the next daily topic ensuring rotation and non-repetition
export function selectNextDailyTopic(existingPosts: any[] = []): {
  theme: SectoralTheme;
  title: string;
  tone: string;
  audience: string;
} {
  const existingTitles = (existingPosts || []).map(p => (p.title || "").toLowerCase());
  const existingSlugs = (existingPosts || []).map(p => (p.slug || "").toLowerCase());

  // Score each theme based on how many times its keywords or titles have appeared
  const scoredThemes = SECTORAL_THEMES.map(theme => {
    let matchCount = 0;
    const lowerKeyword = theme.primaryKeyword.toLowerCase();

    for (const title of existingTitles) {
      if (title.includes(lowerKeyword)) matchCount += 2;
    }
    for (const slug of existingSlugs) {
      if (slug.includes(slugify(theme.primaryKeyword))) matchCount += 2;
    }

    return { theme, score: matchCount };
  });

  // Sort by lowest match count (least used)
  scoredThemes.sort((a, b) => a.score - b.score);

  // Take the themes with the lowest score (top candidates)
  const minScore = scoredThemes[0].score;
  const candidates = scoredThemes.filter(st => st.score <= minScore + 1).map(st => st.theme);
  const selectedTheme = pick(candidates);

  // Find a title variant that hasn't been used yet
  let chosenTitle = "";
  for (const variant of selectedTheme.titleVariants) {
    const slug = slugify(variant);
    if (!existingSlugs.includes(slug)) {
      chosenTitle = variant;
      break;
    }
  }

  // If all variants were used, generate an entropy-modified dynamic title
  if (!chosenTitle) {
    const dynamicPrefixes = [
      "2026 MICE Rehberi: ",
      "Operasyonel Mükemmellik: ",
      "Acenteler İçin Stratejik Analiz: ",
      "Kârlılık ve Verimlilik: ",
      "Dijital Dönüşüm Notları: "
    ];
    chosenTitle = `${pick(dynamicPrefixes)}${selectedTheme.primaryKeyword} ve Pratik Saha Çözümleri`;
  }

  const tones = ["profesyonel", "çözüm odaklı", "eğitici", "vizyoner", "analitik"];
  const tone = pick(tones);
  const audience = selectedTheme.defaultAudience;

  return {
    theme: selectedTheme,
    title: chosenTitle,
    tone,
    audience
  };
}

// Built-in intelligent sectoral generative engine with high-entropy combinatorics
export function generateSectoralArticle(
  rawTopic: string,
  rawTone: string = "profesyonel",
  rawAudience: string = "MICE Acenteleri & Operasyon Yöneticileri"
): BlogPost {
  const cleanTopic = rawTopic.trim();
  const lowerTopic = cleanTopic.toLowerCase();

  // Find theme match or fall back to general
  const matchedTheme = SECTORAL_THEMES.find(t => 
    lowerTopic.includes(t.primaryKeyword.toLowerCase()) ||
    t.primaryKeyword.toLowerCase().split(" ").some(w => w.length > 3 && lowerTopic.includes(w))
  ) || SECTORAL_THEMES[0];

  const category = matchedTheme.category;
  const tags = pickMulti(matchedTheme.baseTags, Math.min(matchedTheme.baseTags.length, 4));
  const coverImage = pick(matchedTheme.images);

  let title = cleanTopic;
  if (!title.includes(":") && !title.includes("—") && title.length < 50) {
    const titleTemplates = [
      `${cleanTopic}: Acentelerin Sahada En Sık Düştüğü Tuzaklar ve Çözüm Yolları`,
      `${cleanTopic} Sürecinde Hata Payını Sıfırlayan 5 Kritik Operasyon Adımı`,
      `Acenteler İçin Modern İş Akışı: ${cleanTopic} Rehberi`,
      `${cleanTopic} ile Operasyonel Verimliliği 3 Katına Çıkarma Stratejileri`,
      `MICE Sektöründe Yeni Dönem: ${cleanTopic} Neden Bir Tercih Değil Zorunluluk?`,
      `${cleanTopic} Yönetiminde Manuel Süreçleri Geride Bırakan Otomasyon Pratikleri`,
      `Tekliften Sahaya ${cleanTopic}: Kârlılığı Korumanın İpuçları`
    ];
    title = pick(titleTemplates);
  }
  const slug = slugify(title);

  const excerpts = [
    `${cleanTopic} konusunda acentelerin operasyonel kör noktalarını gideren, ekipler arası iletişim kopukluklarını bitiren ve kârlılığı koruyan pratik saha analizi.`,
    `Geleneksel yöntemlerle yönetildiğinde ciddi maliyet ve zaman kaybı yaratan ${cleanTopic} sürecini dijitalleştirerek kusursuzlaştırma rehberi.`,
    `${cleanTopic} operasyonunda karşılaşılan kronik darboğazlar, sahada test edilmiş çözüm yaklaşımları ve modern acentecilik vizyonu.`,
    `${rawAudience} için özel olarak hazırlanan bu analizde, ${cleanTopic} odağında iş akışlarını hızlandırma ve kontrolü tek merkezde toplama yöntemlerini inceliyoruz.`
  ];
  const excerpt = pick(excerpts);

  // Dynamic Content Generators: 4 Distinct Structural Archetypes
  // 0: Case-study & Diagnostic (Vaka & Kriz Çözümü)
  // 1: Step-by-step Framework (Adım Adım Metodoloji)
  // 2: Risk & Profitability Analysis (Risk & Kârlılık Analizi)
  // 3: Future & Innovation (Geleceğin Acenteciliği & İnovasyon)
  const archetype = Math.floor(Math.random() * 4);
  let contentBody = "";

  if (archetype === 0) {
    contentBody = `## Giriş: Bir Operasyonun Kaderini Belirleyen Kritik Viraj

MICE ve kurumsal seyahat sektöründe bir projenin başarısı, aylarca süren planlamanın sahada nasıl icra edildiğine bağlıdır. **${cleanTopic}** söz konusu olduğunda, en deneyimli acenteler dahi iletişim kopuklukları veya dağınık veri havuzları nedeniyle beklenmedik krizlerle karşılaşabilmektedir.

Özellikle **${rawAudience}** için bu süreç; yalnızca operasyonel bir görev değil, müşteriye verilen sözün ve acente itibarının doğrudan sınavıdır. Bu incelememizde, ${rawTone} bir bakış açısıyla sahadaki kör noktaları teşhis ediyor ve somut çözümler üretiyoruz.

---

## Yaşanmış Saha Senaryosu: Tek Bir Detayın Yarattığı Domino Etkisi

Geçtiğimiz sezon 650 kişilik uluslararası bir organizasyonda yaşanan gerçek bir örneği ele alalım:

- **Sorun:** Katılımcı listesindeki son dakika revizyonları WhatsApp ve e-posta üzerinden parçalı olarak paylaşıldı.
- **Sonuç:** Sahadaki operasyon ekibi revize edilmemiş eski listeyle hareket ettiği için mükerrer tahsisler ve gereksiz transfer maliyetleri doğdu.
- **Maliyet Faturası:** Proje kâr marjının %18'i sadece 4 saat içinde kontrolsüzce buharlaştı.

Bu vaka bize açıkça gösteriyor ki; **${cleanTopic}** manuel kontrollerle sürdürülemeyecek kadar yüksek dinamizme sahiptir.

---

## Darboğazı Kökten Çözen 3 Dönüşüm Hamlesi

### 1. Bilgi Asimetrisini Bitirin: Tekil Doğruluk Kaynağı (Single Source of Truth)
Farklı departmanların (muhasebe, saha, proje yöneticisi) aynı anda aynı güncel veriye baktığından emin olun. Excel sayfalarını bilgisayardan bilgisayara göndermek yerine bulut tabanlı ve anlık senkronize olan bir işletim sistemi kurun.

### 2. Canlı Yetki ve Görev Dağılımı
Kim ne zaman hangi işlemi yaptı? Değişiklik kimin onayıyla gerçekleşti? ${cleanTopic} sürecinde her adımın kayıt altına alınması, sorumluluk bilincini artırır ve kriz anlarında suçlu aramak yerine çözüme odaklanmayı sağlar.

### 3. Otomatik Hata ve Sapma Bildirimleri
Sistem, belirlenen limitlerin dışına çıkan veya saatinde tamamlanmayan adımlarda ilgili operasyon amirine anında alarm üretmelidir.

---

> [!NOTE]
> **Operasyon Notu:** ${cleanTopic} sürecinde otomasyona geçen kurumsal acentelerde, katılımcı başına düşen operasyonel maliyet **ortalama %34 oranında gerilemektedir**.

---

## Süreç Olgunluk Kontrol Listesi

- [ ] Tüm katılımcı ve operasyon verileri anlık olarak tek bir merkezde toplanıyor mu?
- [ ] Sahadaki son dakika değişiklikleri anında finans ve yönetim ekranlarına yansıyor mu?
- [ ] Olası no-show veya aksaklıklarda acil durum prosedürleri önceden tanımlandı mı?
- [ ] Müşteri temsilcisi telefon trafiğine boğulmadan operasyon durumunu görebiliyor mu?

---

## Özet ve Son Söz

Acentecilikte hız önemlidir; ancak kontrolsüz hız felaket getirir. **${cleanTopic}** sürecinizi dijital omurgaya bağlayarak ekibinize nefes aldırabilir, müşterilerinize ise kusursuz bir deneyim sunabilirsiniz.`;

  } else if (archetype === 1) {
    contentBody = `## Yönetici Özeti: ${cleanTopic} Alanında Yeni Standartlar

Kurumsal seyahat ve MICE projelerinde hata kabul etmeyen dinamikler her geçen gün daha da sertleşiyor. Müşteriler daha hızlı raporlama, daha şeffaf bütçe ve sahada milimetrik koordinasyon talep ediyor. Bu doğrultuda **${cleanTopic}**, modern bir acentenin omurgasını oluşturan en stratejik çalışma alanlarından biridir.

Bu rehberde, ${rawTone} bir üslupla **${rawAudience}** için uygulanabilir, net ve doğrudan sahaya adapte edilebilecek 4 aşamalı bir metodoloji paylaşıyoruz.

---

## 4 Adımlı Kusursuzlaştırma Modeli

\`\`\`
[1. Hazırlık & Veri Standardizasyonu]
         ↓
[2. Otomatik Doğrulama & Kontrol]
         ↓
[3. Canlı Saha Entegrasyonu]
         ↓
[4. Kapanış & Finansal Mutabakat]
\`\`\`

### Adım 1: Gelen Veriyi Standart Şablona Oturtun
Müşterilerden gelen ham veriler genellikle hatalı harfler, eksik TC/Pasaport numaraları veya karışık saat formatları içerir. ${cleanTopic} sürecinin ilk kuralı, sisteme giren her girdinin anında doğrulanmasıdır.

### Adım 2: Departmanlar Arası Köprü Kurun
Proje yöneticisi bir onay verdiğinde, bu bilginin saha ekibine ve operasyon amirine eş zamanlı düşmesi gerekir. E-posta trafiğinde onay aramak operasyonel körlük yaratır.

### Adım 3: Sahada Mobil Erişilebilirlik
Masa başında kurgulanan plan sahada uygulanabilir olmalıdır. Sahadaki operasyon ekibi, ${cleanTopic} güncellemelerini anında cebinden görebilmeli ve tek dokunuşla durumu bildirebilmelidir.

### Adım 4: Anında Bütçe & Kur Eşitlemesi
Operasyon bittiği anda gerçekleşen maliyetler ile tahmini bütçe karşılaştırılmalıdır. Günler sonra yapılan mutabakatlar acentenin kur farkı veya ek hizmet maliyetlerini tahsil etmesini imkansızlaştırır.

---

| Süreç Aşaması | Geleneksel Yöntem | Modern İşletim Sistemi Yaklaşımı |
| :--- | :--- | :--- |
| **Veri Girişi** | Manuel Excel kopyala-yapıştır | Akıllı format algılama & tek tıkla aktarım |
| **Değişiklik Bildirimi** | WhatsApp grupları & telefon | Anlık push notification & bildirim merkezi |
| **Risk Kontrolü** | Operasyon sonunda fark edilen hatalar | Önceden uyaran yapay zeka & kural motoru |
| **Kapanış Süresi** | 3 - 7 iş günü | Operasyon bittiği an tek tıkla mutabakat |

---

> [!TIP]
> **En İyi Uygulama (Best Practice):** ${cleanTopic} sürecini haftalık rutin bir toplantı konusu olmaktan çıkarıp, anlık takip edilen bir dijital gösterge paneline (dashboard) dönüştürün.

---

## Karar Vericiler İçin Sonuç

Dijital dönüşüm artık acenteler için pahalı bir lüks değil, kârlılığı ayakta tutan yegane kalkan. **${cleanTopic}** operasyonunuzu modernize ederek rakiplerinizin günlerce uğraştığı süreçleri dakikalar içinde tamamlayabilirsiniz.`;

  } else if (archetype === 2) {
    contentBody = `## Giriş: Acentelerin Gizli Maliyet Kaçağı — ${cleanTopic}

Görünürde başarılı geçen, müşterinin teşekkür ettiği birçok etkinlik veya transfer operasyonunun ardından muhasebe kayıtları açıldığında acı gerçek ortaya çıkar: **Düşük kâr marjı veya beklenmeyen zararlar.**

Bu durumun arkasındaki en büyük fail genellikle **${cleanTopic}** sürecinde gözden kaçan küçük ama biriken operasyonel sapmalardır. Özellikle **${rawAudience}** açısından bu makale, acentenin finansal sağlığını korumak adına kritik ipuçları sunmaktadır.

---

## En Sık Yaşanan 3 Operasyonel Tuzak

### 1. Kur ve Zaman Uyumsuzluğu
TCMB kuru ile piyasa kuru arasındaki makas, projenin onaylandığı gün ile tedarikçiye ödeme yapıldığı gün arasındaki farklar acentenin cebinden çıkar. ${cleanTopic} planlamasında bu dinamik otomatik sabitlenmelidir.

### 2. Şoför, Otel ve Tedarikçi İletişim Kopukluğu
Bir transferin 20 dakika gecikmesi oteldeki check-in kuyruğunu kilitler; check-in kuyruğunun kilitlenmesi salon girişlerini geciktirir. ${cleanTopic} tüm bu zincirin merkezinde yer alır.

### 3. Mükerrer Ödemeler ve Avans Takipsizliği
Sahaya çıkan operasyon sorumlularının yaptığı acil harcamaların fiş/fatura takibi sisteme anında işlenmediğinde, proje sonunda faturasız masraflar acente üzerinde kalır.

---

## Metriklerle Fark: Önce & Sonra

- **Operasyon Hazırlık Süresi:** 14 saatten 2.5 saate düşer (**%82 zaman kazancı**).
- **Müşteri Revizyon Tepki Hızı:** 45 dakikadan 90 saniyeye iner.
- **Mali Kaçak Oranı:** Sıfıra yakın denetim doğruluğu.

---

> [!IMPORTANT]
> **Kritik Hatırlatma:** Bir projenin operasyonel kârı satış masasında değil, sahada ${cleanTopic} gibi kritik operasyonların disiplinle yönetilmesinde kazanılır.

---

## Eylem Planı: Yarın Sabah Nereden Başlamalısınız?

1. **Envanter Çıkarın:** Şu anda ${cleanTopic} için kaç farklı dosya veya mesajlaşma kanalı kullanılıyor?
2. **Kural Seti Belirleyin:** Hangi harcama veya değişiklik kimin yetkisinde?
3. **Teknolojiye Emanet Edin:** İnsan hafızasına güvenmek yerine sistem kurallarına güvenin.

---

## Çözüm

CODEICON mimarisi, acentelerin sahada ve masada yaşadığı bu zorlukları kökten çözmek için tasarlanmıştır. ${cleanTopic} sürecinizi güvene almak ve acentenizi geleceğe taşımak için modern teknolojilerden yararlanın.`;

  } else {
    contentBody = `## Vizyon: Yarının Acentesi ${cleanTopic} Sürecini Nasıl Yönetecek?

Turizm ve etkinlik endüstrisi köklü bir kabuk değişiminin içinde. Yapay zeka ajanları, otomatik görev emirleri, karekodlu geçiş sistemleri ve gerçek zamanlı finansal entegrasyonlar artık geleceğin vizyonu değil, bugünün rekabet şartıdır.

Bu yeni düzende **${cleanTopic}** gibi kritik süreçleri eski usul yöntemlerle yürütmeye çalışmak, yüksek hızla giden bir yarışta el frenini çekili tutmaya benzer. **${rawAudience}** için hazırladığımız bu perspektifte, dönüşümün şifrelerini paylaşıyoruz.

---

## Geleneksel Yaklaşımdan Dijital Ekosisteme Geçiş

Acentelerin büyük çoğunluğu işleri yolunda zannederken arka planda devasa bir iş gücü israfı yaşanmaktadır:

- **Eski Düzen:** Personel gününün %40'ını liste kontrol etmeye, WhatsApp'tan konum sormaya ve excel eşleştirmeye harcar.
- **Yeni Ekosistem:** Rutin veri aktarımları arka planda robotik süreçlerle yürütülür; personel sadece müşteri memnuniyetine ve özel kriz yönetimine odaklanır.

---

## ${cleanTopic} Alanında 3 İnovasyon Dalgası

### 1. Otonom Bildirim Sistemleri
Müşterinin uçağı rötar yaptığında bunu manuel kontrol etmek yerine, uçuş takip API'lerinin transfer şoförüne otomatik bildirim atması.

### 2. Dinamik Liste Senkronizasyonu
Otel rooming listesinde bir isim değiştiğinde, aynı anda kongre kayıt sistemindeki yaka kartının ve gala yemeği masa planının güncellenmesi.

### 3. Akıllı Bütçe Koruma Kalkanı
Operasyonel bir gider girildiği anda projenin kâr-zarar simülasyonunun canlı olarak güncellenmesi.

---

> [!NOTE]
> **Sektör Öngörüsü:** Önümüzdeki 2 yıl içinde ${cleanTopic} süreçlerini tam entegre sistemlerle yönetmeyen acentelerin kurumsal müşteri ihale kazanma oranlarının **%50'nin üzerinde düşeceği** tahmin edilmektedir.

---

## Değerlendirme

**${cleanTopic}** bir külfet değil, doğru kurgulandığında acentenizi rakiplerinizden ayıran en parlak vitrindir. Modern altyapılarla bu süreci sıfır stresli bir başarı hikayesine dönüştürebilirsiniz.`;
  }

  const readingTime = `${Math.floor(Math.random() * 3) + 4} dk okuma`;

  return {
    title,
    slug,
    excerpt,
    category,
    tags,
    readingTime,
    coverImage,
    author: {
      name: "CODEICON Ekibi",
      role: "MICE & Teknoloji Editörü",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    publishedAt: new Date().toISOString().split("T")[0],
    published: true,
    featured: false,
    content: contentBody
  };
}

// Orchestrator: Tries Gemini / OpenAI if configured, otherwise falls back gracefully
export async function generateBlogPostWithAI({
  topic,
  tone = "profesyonel",
  audience = "MICE Acenteleri & Operasyon Yöneticileri",
  provider = "auto",
  apiKey
}: {
  topic: string;
  tone?: string;
  audience?: string;
  provider?: string;
  apiKey?: string;
}): Promise<{ post: BlogPost; source: string }> {
  const geminiKey = apiKey || process.env.GEMINI_API_KEY;
  const openaiKey = apiKey || process.env.OPENAI_API_KEY;

  // 1. If Gemini requested or Auto with Gemini key available
  if ((provider === "gemini" || (provider === "auto" && geminiKey)) && geminiKey) {
    try {
      const prompt = `Sen CODEICON (Turizm, MICE ve Seyahat Acentesi İşletim Sistemi) platformu için kıdemli bir blog yazarı ve SEO uzmanısın.
Aşağıdaki konu hakkında Türkçe, yüksek kaliteli, sektörel terminolojiye (pax, rooming list, Sejour, TCMB kur sabitleme, havalimanı transferi, ERP cari hesap) hakim, akıcı ve tamamen özgün bir blog makalesi oluştur.

Konu: "${topic}"
Yazım Tonu: "${tone}"
Hedef Kitle: "${audience}"

Makale formatı zengin Markdown olmalıdır (Başlıklar ##, ###, maddeler -, alıntılar > [!NOTE], karşılaştırma tabloları).
Yanıtını SADECE geçerli bir JSON nesnesi olarak döndür:
{
  "title": "Çarpıcı ve SEO uyumlu başlık",
  "slug": "turkce-karakter-icermeyen-seo-slug",
  "excerpt": "1-2 cümlelik dikkat çekici özet (140-160 karakter)",
  "category": "Kategori adı (örn: Acente Yönetimi, Finans & Kur, Saha & Transfer, Acente Teknolojileri veya Etkinlik Teknolojisi)",
  "tags": ["Etiket1", "Etiket2", "Etiket3", "Etiket4"],
  "readingTime": "5 dk okuma",
  "coverImage": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
  "content": "## Giriş\\n\\nParagraf içeriği...\\n\\n### İpuçları\\n\\n- Madde 1\\n- Madde 2\\n\\n> [!NOTE]\\n> Vurgu alıntısı"
}`;

      const models = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];
      let rawText: string | null = null;

      for (const model of models) {
        try {
          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
          const aiRes = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.8,
                responseMimeType: "application/json"
              }
            })
          });

          if (aiRes.ok) {
            const aiData = await aiRes.json();
            rawText = aiData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (rawText) break;
          }
        } catch {
          continue;
        }
      }

      if (rawText) {
        const cleanJsonText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleanJsonText);
        const post: BlogPost = {
          title: parsed.title || topic,
          slug: slugify(parsed.slug || parsed.title || topic),
          excerpt: parsed.excerpt || "",
          category: parsed.category || "Acente Yönetimi",
          tags: parsed.tags || ["MICE", "Acente"],
          readingTime: parsed.readingTime || "5 dk okuma",
          coverImage: parsed.coverImage || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
          author: {
            name: "CODEICON Ekibi",
            role: "MICE & Teknoloji Editörü",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
          },
          publishedAt: new Date().toISOString().split("T")[0],
          published: true,
          featured: false,
          content: parsed.content || ""
        };
        return { post, source: "gemini" };
      }
    } catch (err) {
      console.warn("Gemini generation failed, falling back:", err);
    }
  }

  // 2. If OpenAI requested or available
  if ((provider === "openai" || (provider === "auto" && openaiKey)) && openaiKey) {
    try {
      const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Sen turizm teknolojileri ve MICE acente yönetimi üzerine uzmanlaşmış profesyonel bir içerik yazarısın. Çıktıyı SADECE geçerli JSON olarak ver."
            },
            {
              role: "user",
              content: `Konu: "${topic}", Ton: "${tone}", Hedef Kitle: "${audience}". JSON formatında title, slug, excerpt, category, tags, readingTime, coverImage, content üret.`
            }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (aiRes.ok) {
        const aiData = await aiRes.json();
        const parsed = JSON.parse(aiData.choices[0].message.content);
        const post: BlogPost = {
          title: parsed.title || topic,
          slug: slugify(parsed.slug || parsed.title || topic),
          excerpt: parsed.excerpt || "",
          category: parsed.category || "Acente Yönetimi",
          tags: parsed.tags || ["MICE", "Acente"],
          readingTime: parsed.readingTime || "5 dk okuma",
          coverImage: parsed.coverImage || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
          author: {
            name: "CODEICON Ekibi",
            role: "MICE & Teknoloji Editörü",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
          },
          publishedAt: new Date().toISOString().split("T")[0],
          published: true,
          featured: false,
          content: parsed.content || ""
        };
        return { post, source: "openai" };
      }
    } catch (err) {
      console.warn("OpenAI generation failed, falling back:", err);
    }
  }

  // 3. Guaranteed High-Entropy Built-in Sectoral Generator
  const post = generateSectoralArticle(topic, tone, audience);
  return { post, source: "builtin-sectoral-ai" };
}
