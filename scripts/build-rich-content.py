# -*- coding: utf-8 -*-
import json
import os

site_content_path = '/Users/arifari/Desktop/CODEICON/src/data/siteContent.json'

with open(site_content_path, 'r', encoding='utf-8') as f:
    content = json.load(f)

# 1. Update Brand & Site Title
content['brand']['name'] = "CODEICON"
content['brand']['siteTitle'] = "CODEICON — MICE Acente Sistemi, Kongre SaaS, ARCH OS & KKTC Bordro ERP"
content['brand']['badge'] = "Kurumsal Yazılım & Bulut İşletim Sistemleri Ekosistemi"
content['brand']['description'] = "CODEICON; B2B MICE acente işletim sistemi (MICE OS), çok kiracılı kongre platformu (KONGRE), mimarlık ve şantiye yönetim sistemi (ARCH OS), KKTC mevzuat uyumlu bordro ERP'si (BORDRO CY) ve randevu pazaryeri (hepp) ile kurumsal süreçleri tek çatı altında buluta taşıyan yeni nesil teknoloji ekosistemidir."

# 2. Update Hero section
content['hero']['title'] = "MICE Acente Sistemi, Kongre"
content['hero']['titleAccent'] = "& Kurumsal Mimari Yazılımlar"
content['hero']['subtitle'] = "B2B MICE acente işletim sisteminden (MICE OS), dernek & kongre platformuna (KONGRE), mimarlık ve anahtar teslim şantiye yönetimine (ARCH OS) ve KKTC bordro ERP'sine (BORDRO CY) uzanan entegre bulut ekosistemi."
content['hero']['customerCount'] = "85+ MICE, Kongre & Mimarlık Ofisi"

# 3. KONGRE Platform Config
content['kongre'] = {
    "enabled": True,
    "eyebrow": "KONGRE & ETKİNLİK SAAS",
    "statusBadge": "Multi-Tenant Bulut Mimarisi",
    "title": "KONGRE Cloud",
    "headline": "Bağımsız Domainli Kongre & Etkinlik SaaS",
    "subtitle": "Dernekler, acenteler ve kongre organizatörleri için kendi domaininde açılan web sitesi, bilimsel program, bildiri (abstract) hakemliği, QR akıllı geçiş ve sponsor stant yönetim platformu.",
    "primaryImage": "/images/kongre/kongre-dashboard.png",
    "secondaryImage": "/images/kongre/kongre-portal.webp",
    "ctaText": "Kongre Demosu Al",
    "ctaHref": "#contact",
    "pills": [
        "Özel Domain (kongre2026.org) & Tema",
        "Bildiri (Abstract) & Çift Kör Hakem",
        "QR Kodlu Hızlı Akredite & Yaka Kartı",
        "Sponsor Portalı & Stant Kota Dağılımı"
    ],
    "highlights": [
        "Tek altyapıdan sınırsız sayıda bağımsız kongre ve kurumsal etkinlik sitesi açma",
        "Sözel ve poster bildiri toplama, çift kör hakem puanlaması ve kabul mektupları",
        "Kayıt masasında sıra bekletmeyen QR kodlu yaka kartı anlık baskı entegrasyonu",
        "Platin, altın ve gümüş sponsorların kendi kotalarını yönettiği bağımsız portal"
    ]
}

# 4. ARCH OS Config
content['arch'] = {
    "enabled": True,
    "eyebrow": "MİMARLIK & ŞANTİYE SAAS",
    "statusBadge": "TR & KKTC Standartları",
    "title": "ARCH OS",
    "headline": "Mimarlık Ofis & Şantiye Operasyonları",
    "subtitle": "Röleve'den ruhsata, şantiye günlüğünden taşeron hakedişine ve müşteri tasarım dondurma (Design Freeze) onayına kadar mimarlık ve anahtar teslim inşaat stüdyolarının bulut işletim sistemi.",
    "primaryImage": "/images/arch/arch-dashboard.jpg",
    "secondaryImage": "/images/arch/arch-siteops.jpg",
    "projectsImage": "/images/arch/arch-projects.jpg",
    "logoSvg": "/images/arch/arch-logo.svg",
    "ctaText": "Mimarlık Demosu Al",
    "ctaHref": "#contact",
    "pills": [
        "Müşteri Tasarım Dondurma (Design Freeze)",
        "Fotoğraflı Şantiye Snagging (Punch List)",
        "Taşeron BOQ Metrajı & Hakediş Motoru",
        "Çift Kasa (Ofis & Müşteri Emanet Kasası)"
    ],
    "highlights": [
        "Tek tıkla token korumalı müşteri onay linki (/approve/[token]) ile revizyon dondurma",
        "Şantiyede mobil fotoğraf üstüne canvas çizimle anlık kusur (snag) raporlama",
        "Avans mahsubu, %5 teminat kesintisi ve KDV tevkifatlı taşeron hakediş raporları",
        "Ofis Turnkey kasası ile İşveren Escrow kasasını ayıran çift cüzdan mimarisi"
    ]
}

# 5. BORDRO CY Config
content['bordro'] = {
    "enabled": True,
    "eyebrow": "KKTC BORDRO & İK YAZILIMI",
    "statusBadge": "%100 KKTC Mevzuat Uyumlu",
    "title": "BORDRO CY",
    "headline": "KKTC Standartlarında Bulut Bordro & İK ERP",
    "subtitle": "KKTC Sosyal Sigorta, İhtiyat Sandığı ve Gelir Vergisi (PAYE) mevzuatına tam uyumlu; Net'ten Brüt'e hatasız kuruşu kuruşuna hesaplama ve resmi matbu bildirgeler.",
    "primaryImage": "/images/bordro/bordro-matbu-bos.svg",
    "secondaryImage": "/images/bordro/bordro-matbu-bos.svg",
    "ctaText": "Bordro Demosu Al",
    "ctaHref": "#contact",
    "pills": [
        "Net'ten Brüt'e Kuruşu Kuruşuna",
        "70.893 ₺ Asgari Ücret Vergi Koruması",
        "Resmi VD 17a, SS14, İ.S. 22A Bildirgeleri",
        "Toplu Puantaj & 4 Kutulu Resmi Pusula"
    ]
}

# 6. Feature Tabs (Directly matching the 4 flagship systems)
content['features'] = {
    "eyebrow": "Kurumsal Platform Modülleri",
    "title": "Sektörlere Özel Entegre Bulut Çözümleri",
    "subtitle": "MICE acentelerinden kongre organizasyonlarına, mimarlık ofislerinden KKTC işletmelerine kadar operasyonları sıfır hataya indiren modüler sistemler.",
    "tabs": [
        {
            "id": "mice-os-tab",
            "label": "MICE Agency OS",
            "mockupBadge": "MICE & ACENTE OPERASYONU",
            "title": "MICE Acenteleri İçin Uçtan Uca Operasyon & Finans",
            "description": "Kongre, bayi toplantısı ve kurumsal etkinliklerde TCMB canlı kur sabitleme, uçuş API entegreli şoför WhatsApp görev emri ve matbu Excel rooming listelerini tek tıkla sisteme aktarma.",
            "bullets": [
                "TCMB saat 15:30 efektif kuruyla giriş günü kur kilitleme",
                "THY & Pegasus API ile rötarları algılayan şoför WhatsApp görev emri",
                "Otel rooming listelerini dağınık Excel'den tek tıkla hatasız eşleme",
                "Sejour, Logo ve Netsis ile çift yönlü cari mutabakat altyapısı"
            ],
            "ctaText": "MICE Sistemini Keşfet",
            "ctaHref": "#mice-os"
        },
        {
            "id": "kongre-os-tab",
            "label": "KONGRE SaaS",
            "mockupBadge": "KONGRE & ETKİNLİK PLATFORMU",
            "title": "Bağımsız Domainli Kongre, Sempozyum & Etkinlik Sitesi",
            "description": "Dernek ve acentelerin tek tıkla kendi domaininde kongre sitesi açtığı; bildiri (abstract) toplama, çift kör hakemlik, QR kodlu hızlı akredite ve sponsor portallarını yönettiği çok kiracılı SaaS.",
            "bullets": [
                "Her kongre için özel domain (kongre2026.org) ve kurumsal blok editör",
                "Sözel/Poster bildiri toplama, hakem puanlaması ve kabul mektupları",
                "Kayıt masasında sıra bekletmeyen QR kodlu yaka kartı anlık baskı",
                "Platin, altın, gümüş sponsorlar için stant yerleşimi ve davetli kotaları"
            ],
            "ctaText": "Kongre Platformunu İncele",
            "ctaHref": "#kongre-os"
        },
        {
            "id": "arch-os-tab",
            "label": "ARCH OS Mimarlık",
            "mockupBadge": "MİMARLIK & ŞANTİYE SAAS",
            "title": "Mimarlık Ofisleri & Anahtar Teslim Şantiye İşletim Sistemi",
            "description": "Tasarım aşamalarında müşteriden token korumalı dijital tasarım dondurma (Design Freeze) onayı alma, şantiyede fotoğraflı snag listesi tutma ve taşeron kümülatif hakediş motoru.",
            "bullets": [
                "Token korumalı link (/approve/[token]) ile müşteri tasarım dondurma",
                "Mobil fotoğraf üstüne canvas çizimle şantiyede anlık kusur (snag) raporu",
                "Birim fiyatlı BOQ metrajı, avans mahsubu ve %5 teminatlı hakediş",
                "Ofis Turnkey kasası ile İşveren Escrow kasasını ayıran çift cüzdan"
            ],
            "ctaText": "ARCH OS'u Keşfet",
            "ctaHref": "#arch-os"
        },
        {
            "id": "bordro-cy-tab",
            "label": "BORDRO CY",
            "mockupBadge": "KKTC BORDRO & İK ERP",
            "title": "KKTC Standartlarında Resmi Matbu Bildirgeli Bordro & İK",
            "description": "Kuzey Kıbrıs mevzuatına tam uyumlu; 70.893 ₺ asgari ücret vergi koruması, resmi Form VD 17a Stopaj Beyannamesi, Form SS14 Sigorta Bordrosu ve İ.S. 22A İhtiyat Sandığı cetvelleri.",
            "bullets": [
                "Net'ten Brüt'e ve Brüt'ten Net'e kuruşu kuruşuna hatasız hesaplama motoru",
                "Gelir ve Vergi Dairesi resmi Form VD 17a Stopaj Beyannamesi (Tablo 1-4)",
                "Sosyal Sigortalar Form SS14 (D1/D2 bordro tipleri ve sigorta no sıralaması)",
                "KVKK uyumlu resmi matbu 4 kutulu ücret hesap pusulası dökümü"
            ],
            "ctaText": "Bordro ERP'sini İncele",
            "ctaHref": "#bordro-cy"
        }
    ]
}

# 7. Process Steps (Clear 3-step onboarding)
content['process'] = {
    "eyebrow": "Hızlı Entegrasyon & Devreye Alma",
    "title": "Üç Adımda Kurumsal Yazılım Altyapınızı Dönüştürün",
    "subtitle": "Dakikalar içinde firmanıza özel bulut ortamınızı ayağa kaldırıyor, verilerinizi aktarıyor ve operasyonlarınızı sıfır hata seviyesine taşıyoruz.",
    "steps": [
        {
            "number": "01",
            "title": "Anında Bulut Kurulumu",
            "description": "Şirketinize özel tenant veritabanı, domain yönlendirmeleri ve kullanıcı rolleri dakikalar içinde güvenli izole altyapıda açılır.",
            "preview": {
                "badge": "LİVE SAAS",
                "title": "Kurumsal Kimlik & Erişim",
                "items": [
                    {"label": "Domain & SSL Yapılandırması", "status": "Tamamlandı"},
                    {"label": "Kullanıcı Rolleri & Fiyat Maskeleme", "status": "Aktif"},
                    {"label": "Modüler Lisans Aktivasyonu", "status": "Hazır"}
                ]
            }
        },
        {
            "number": "02",
            "title": "Parametrik Veri & API Bağlantısı",
            "description": "TCMB döviz kurları, uçuş takip API'leri, WhatsApp şablonları, metraj cetvelleri ve KKTC vergi parametreleri sisteme bağlanır.",
            "preview": {
                "badge": "ENTEGRASYON",
                "title": "Veri Havuzu & API",
                "items": [
                    {"label": "TCMB 15:30 Canlı Kur Beslemesi", "status": "Bağlandı"},
                    {"label": "Uçuş Takip & WhatsApp Botu", "status": "Canlı"},
                    {"label": "Otel & Tedarikçi Havuzu", "status": "Senkron"}
                ]
            }
        },
        {
            "number": "03",
            "title": "Sahada & Ofiste Sıfır Hata",
            "description": "Ekibiniz cep telefonundan şantiye snagging'ini yönetir, acente transfer emirlerini tek tıkla yollar, hakediş ve bordrolar anında basılır.",
            "preview": {
                "badge": "OPERASYON",
                "title": "Canlı Göstergeler",
                "items": [
                    {"label": "Transfer & Rooming Listesi", "status": "Sıfır Hata"},
                    {"label": "Hakediş & Bütçe Mutabakatı", "status": "%100 Uyumlu"},
                    {"label": "Resmi Bildirgeler (VD17a/SS14)", "status": "Hazır"}
                ]
            }
        }
    ]
}

# 8. Integrations section
content['integrations'] = {
    "eyebrow": "Bağlantılı Ekosistem",
    "title": "İşinizin Omurgasını Oluşturan Sistemlerle Tam Entegre",
    "subtitle": "Kullandığınız muhasebe yazılımları, hava yolu API'leri, bankalar ve resmi kurum formatlarıyla çift yönlü konuşan güçlü altyapı.",
    "items": [
        {"name": "TCMB Canlı Kur", "category": "Finans & Döviz", "description": "Saat 15:30 resmi kurlarını çekip projelere kilitler."},
        {"name": "THY & Pegasus API", "category": "Uçuş & Havalimanı", "description": "Rötarları anlık algılayarak transfer saatini revize eder."},
        {"name": "WhatsApp Cloud API", "category": "İletişim & Görev", "description": "Şoför görev emirlerini ve randevu hatırlatmalarını iletir."},
        {"name": "Sejour Acente Sistemi", "category": "Turizm ERP", "description": "Uçuş, yolcu ve otel listelerini çift yönlü senkronize eder."},
        {"name": "Logo & Netsis ERP", "category": "Muhasebe", "description": "Onaylanan hakediş ve faturaları muhasebeye otomatik aktarır."},
        {"name": "KKTC Maliye & Sigorta", "category": "Resmi Bildirgeler", "description": "Form VD 17a, SS14 ve İ.S. 22A formatında e-beyan çıktıları."}
    ]
}

# 9. FAQ section
content['faq'] = {
    "eyebrow": "Sıkça Sorulan Sorular",
    "title": "Aklınıza Takılan Her Detay İçin Buradayız",
    "subtitle": "Platformlarımızın lisanslaması, veri güvenliği, mevzuat uyumu ve geçiş süreçleri hakkında merak edilenler.",
    "items": [
        {
            "question": "MICE Agency OS kur dalgalanmalarına karşı acentemizi nasıl korur?",
            "answer": "Sistem, misafirlerin otele giriş yaptığı (check-in) tarihteki TCMB efektif satış kurunu projeye kilitler. Teklif aşamasındaki döviz tutarı ile faturanın kesildiği günkü kur arasındaki farkı otomatik hesaplar; tedarikçilerle (otel, rehber, transfer) yapılan mutabakatlarda kur farkı zararını tamamen ortadan kaldırır."
        },
        {
            "question": "KONGRE SaaS ile kendi dernek veya kongre domainimizi kullanabilir miyiz?",
            "answer": "Evet! Çok müşterili (multi-tenant) mimarimiz sayesinde her kongre veya dernek kendi alan adını (örneğin: kongre2026.org veya tipkongresi.com) sisteme bağlayabilir. Otomatik SSL sertifikası üretilir; bilimsel program, bildiri (abstract) toplama, hakem değerlendirmesi ve kayıt formları kendi markanızla çalışır."
        },
        {
            "question": "ARCH OS şantiyede internetsiz ortamda çalışabilir mi ve fiyat maskeleme nedir?",
            "answer": "ARCH OS, PWA ve çevrimdışı önbellekleme desteği sayesinde şantiyede internet kesilse dahi günlük tutmanıza ve fotoğraflı kusur (snag) işaretlemenize izin verir; bağlantı sağlandığında bulutla senkronize olur. Fiyat maskeleme (Financial Privacy) özelliği ise şantiye şefleri ve çizer mimarların metraj ve çizimleri yönetirken sözleşme kâr marjlarını ve gizli birim fiyatları görmesini engeller."
        },
        {
            "question": "BORDRO CY KKTC'nin güncel vergi ve sosyal güvenlik yasalarına tam uyumlu mu?",
            "answer": "Evet! BORDRO CY, KKTC 24/1982 sayılı Gelir Vergisi Yasası, 70.893 ₺ asgari ücret vergi koruması, Gelir ve Vergi Dairesi Form VD 17a Ücretliler Stopaj Beyannamesi, Sosyal Sigortalar Dairesi Form SS14 (D1/D2 bordro tipleri) ve İhtiyat Sandığı İ.S. 22A mevzuatlarına %100 uyumludur. Net'ten Brüt'e hatasız kuruşu kuruşuna hesaplama yapar."
        },
        {
            "question": "Verilerimiz nerede saklanıyor, KVKK ve veri güvenliği nasıl sağlanıyor?",
            "answer": "Tüm verileriniz endüstri standardı PostgreSQL ve Supabase izole altyapısında şifrelenmiş olarak saklanır. Her müşterinin verisi mantıksal olarak diğerlerinden izole edilir (Tenant Isolation). Günlük otomatik yedeklemeler alınır ve tüm hassas bordro/kimlik verileri KVKK standartlarına uygun olarak maskelenir."
        }
    ]
}

# Save updated JSON
with open(site_content_path, 'w', encoding='utf-8') as f:
    json.dump(content, f, ensure_ascii=False, indent=2)

print("Updated siteContent.json successfully!")
