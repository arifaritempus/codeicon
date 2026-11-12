# -*- coding: utf-8 -*-
import json

site_content_path = '/Users/arifari/Desktop/CODEICON/src/data/siteContent.json'

with open(site_content_path, 'r', encoding='utf-8') as f:
    content = json.load(f)

posts = [
    # --- MICE AGENCY OS (TT Sistem) ---
    {
        "id": "post-mice-1",
        "slug": "mice-operasyonlarinda-tcmb-canli-kur-sabitleme-ve-kur-riski-kalkani",
        "title": "MICE Operasyonlarında TCMB Canlı Kur Sabitleme ve Kur Riski Kalkanı",
        "excerpt": "Kongre ve grup operasyonlarında döviz kuru dalgalanmalarına karşı acente kârlılığını koruyan TCMB 15:30 efektif bülteni ve check-in kuru kitleme stratejileri.",
        "category": "MICE & Finans",
        "tags": ["MICE Acente Sistemi", "TCMB", "Kur Sabitleme", "Acente Finansı", "Döviz Riski"],
        "readingTime": "6 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "MICE & Finans Direktörü", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-11-12",
        "published": True,
        "featured": True,
        "content": """## Giriş: MICE Acentelerinde Kur Dalgalanması ve Kâr Erozyonu

Kurumsal etkinlik, kongre ve bayi toplantısı (MICE) organizasyonlarında bütçe çoğunlukla aylar öncesinden döviz (EUR/USD/GBP) üzerinden kararlaştırılırken; yerel tedarikçilere (otel, transfer, restoran, rehber) yapılan ödemeler ve müşteri tahsilatları farklı tarihlerde Türk Lirası veya çapraz kur üzerinden gerçekleşmektedir.

Birçok acente, Excel tablolarında manuel girilen kurlarla işlem yapmaya çalıştığında, **teklif tarihi ile otel faturasının kesildiği gün arasındaki kur farkı nedeniyle proje kârlılığının %15 ila %30'unu kontrolsüzce kaybetmektedir.**

---

## TCMB Canlı Kur Motoru Nasıl Çalışır?

CODEICON MICE Agency OS, Türkiye Cumhuriyet Merkez Bankası (TCMB) resmi kur servisiyle doğrudan entegredir:

1. **Giriş Günü (Check-in) Kur Kilitleme:** Misafirlerin otele giriş yaptığı günkü TCMB saat 15:30 bültenindeki efektif satış kuru sistem tarafından otomatik çekilir ve ilgili projeye mühürlenir.
2. **Tedarikçi ile Anlık Mutabakat:** Otel, araç filosu ve yan hizmet tedarikçilerine kesilecek faturalar kilitlenen kur üzerinden kuruşu kuruşuna doğrulanır.
3. **ERP & Muhasebe Köprüsü:** Logo, Netsis, Dia ve Sejour gibi turizm muhasebe sistemlerine onaylanan faturalar tam kur tutarıyla çift yönlü aktarılır.

```
[Müşteri Teklifi] ---> [TCMB Check-in Kuru Kilitleme] ---> [Tedarikçi Faturası Doğrulama] ---> [Muhasebe ERP Aktarımı]
```

---

## Kur Riski Önleme Kontrol Listesi

- [x] Sözleşmelere TCMB check-in günü efektif satış kuru maddesi eklendi mi?
- [x] Dövizli harcamalar tekil bir bütçe havuzunda konsolide ediliyor mu?
- [x] Tedarikçi faturaları gelmeden önce sistemde kur farkı simülasyonu yapıldı mı?
- [x] Muhasebe departmanı ile operasyon ekibi aynı güncel kur verisine bakıyor mu?

> [!NOTE]
> **Sektörel Sonuç:** CODEICON TCMB kur kilitleme motorunu kullanan kurumsal MICE acentelerinde, kur farkından kaynaklanan beklenmedik maliyet açıkları **%100 oranında engellenmektedir**."""
    },
    {
        "id": "post-mice-2",
        "slug": "saha-transferlerinde-sifir-hata-thy-pegasus-ucus-api-ve-whatsapp-sofor-gorev-emri",
        "title": "Saha Transferlerinde Sıfır Hata: THY/Pegasus Uçuş API ve WhatsApp Şoför Görev Emri Otomasyonu",
        "excerpt": "Havalimanı karşılamalarında rötarlı uçuşları anlık tespit eden ve şoförlere tek tıkla dinamik WhatsApp görev emri ileten saha yönetim mimarisi.",
        "category": "Saha Operasyonu",
        "tags": ["Transfer Operasyonu", "WhatsApp Görev Emri", "Uçuş API", "MICE OS", "Saha Yönetimi"],
        "readingTime": "5 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "Saha Koordinatörü", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-11-11",
        "published": True,
        "featured": False,
        "content": """## Havalimanı Karşılamalarında Yaşanan Klasik Krizler

Büyük ölçekli kurumsal organizasyonlarda aynı gün içinde 30 farklı şehirden gelen yüzlerce misafirin transferini koordine etmek, operasyon amirlerinin en yoğun stres yaşadığı anlardan biridir:

- **Uçak Rötarları:** Uçak 45 dakika rötar yaptığında şoförün bundan haberi olmaz ve erken gidip otopark/bekleme maliyeti yaratır veya terminali terk eder.
- **WhatsApp Bilgi Kirliliği:** Excel kopyaları ve ekran görüntüleri şoför gruplarında kaybolur; yanlış yolcu yanlış araca biner.
- **İsim Listesi Uyuşmazlığı:** Karşılama tabelasında eksik veya yanlış yazılan isimler kurumsal müşteri nezdinde marka prestijini zedeler.

---

## CODEICON Otonom Saha Motoru Çözümü

CODEICON MICE Agency OS, THY ve Pegasus uçuş takip API'lerini doğrudan operasyon havuzuna bağlar:

1. **Canlı Rötar Algılama:** Uçuş saatindeki revizyon tespit edildiğinde karşılama saati ve araç kalkış zamanı sistemde otomatik ötelenir.
2. **Tek Tıkla WhatsApp Görev Emri:** Şoföre araç plakası, misafir isimleri, uçuş kodu, terminal kapısı ve özel karşılama tabelası tek tıkla şablon mesaj olarak WhatsApp üzerinden iletilir.
3. **QR Kodlu Karşılama Doğrulaması:** Araca binen misafirler QR kod okutularak sisteme "Karşılandı" olarak işlenir; merkez ofis canlı gösterge panelinden anlık araç doluluğunu izler."""
    },
    {
        "id": "post-mice-3",
        "slug": "excel-cilesine-son-yuzlerce-kisilik-oda-rooming-listelerini-tek-tikla-sisteme-aktarma",
        "title": "Excel Çilesine Son: Yüzlerce Kişilik Oda (Rooming) Listelerini Tek Tıkla Sisteme Aktarma",
        "excerpt": "Farklı formatlardaki müşteri Excel şablonlarını veri kaybı olmadan Sejour ve otel standartlarına dönüştüren akıllı veri eşleme rehberi.",
        "category": "Acente Teknolojileri",
        "tags": ["Rooming List", "Otel Yönetimi", "Excel Haritalama", "MICE Acente Yazılımı", "Otomasyon"],
        "readingTime": "5 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "Yazılım Direktörü", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-11-10",
        "published": True,
        "featured": False,
        "content": """## Kurumsal Müşterilerin Dağınık Excel Dosyaları

Her kurumsal müşteri kendi şirket formatında bir oda listesi gönderir:
- Kimisinde Ad ve Soyad tek sütundadır, kimisinde ayrıdır.
- T.C. kimlik numaraları veya pasaport numaraları eksik ya da hatalıdır.
- Oda tipleri (Single, Double, Twin, Suit) otelin kullandığı kodlarla uyuşmaz.
- Giriş-çıkış tarihleri farklı yazım formatlarındadır (DD.MM.YYYY vs YYYY/MM/DD).

Operasyon ekipleri bu listeleri otel şablonuna uydurmak için saatlerce manuel kopyala-yapıştır yapmak zorunda kalır ve insan kaynaklı hatalar yüzünden check-in sırasında misafirler kapıda bekletilir.

---

## Akıllı Veri Eşleme ve Ayrıştırma Motoru

CODEICON Rooming Modülü bu süreci saniyeler seviyesine indirir:

- **Akıllı Başlık Tanıma:** Sürükleyip bıraktığınız Excel dosyasındaki sütun başlıklarını (İsim, TC, Giriş, Çıkış, Oda Tipi) otomatik analiz eder ve eşleştirir.
- **Kritik Doğrulama (Data Validation):** Eksik TC/Pasaport, çakışan tarihler veya mükerrer isimleri kırmızı uyarı ile vurgulayarak düzeltmenizi sağlar.
- **Sejour & Otel Formatına Tek Tıkla Dönüştürme:** Onaylanan liste Sejour sistemine veya otelin istediği resmi matbu formata dönüştürülerek doğrudan otele iletilir."""
    },
    {
        "id": "post-mice-4",
        "slug": "acentelerde-proje-bazli-karlilik-etkinlik-aktivite-butcesi-ve-tedarikci-cari-mutabakati",
        "title": "Acentelerde Proje Bazlı Kârlılık: Etkinlik & Aktivite Bütçesi ve Tedarikçi Cari Mutabakatı",
        "excerpt": "Kongre ve bayi toplantılarında sahne, ses, otel ve transfer maliyetlerini tek tabloda konsolide ederek proje net kârlılığını garanti altına alma.",
        "category": "Acente Yönetimi",
        "tags": ["Proje Bütçeleme", "MICE Yönetim Sistemi", "Tedarikçi Mutabakatı", "Cari Yönetim", "ERP"],
        "readingTime": "5 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "MICE & Teknoloji Editörü", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-11-09",
        "published": True,
        "featured": False,
        "content": """## Proje Kapandıktan Sonra Ortaya Çıkan Gizli Maliyetler

MICE acentelerinin en büyük kabuslarından biri, operasyon başarıyla bittikten haftalar sonra gelen beklenmedik tedarikçi faturalarıdır (ekstra salon kirası, jeneratör yakıtı, rehber mesaisi, araç bekleme ücreti).

Operasyon sırasında anlık bütçeye işlenmeyen bu kalemler, projenin %25 olarak hedeflenen kâr marjını %5'e kadar düşürebilmektedir.

### CODEICON Inline Bütçe ve Tedarikçi Havuzu

- **Tek Ekrandan Hızlı Giriş:** Excel rahatlığında çalışan inline tablo görünümü ile tüm etkinlik harcamaları tek tuşla girilir.
- **Tutar x Kur Otomatik TL Karşılığı:** Dövizli girilen tedarikçi kalemleri proje kuruyla çarpılarak anlık bütçeye yansıtılır.
- **Avans ve Fatura Kilit Sistemi:** Ödenen avanslar tedarikçi cari kartına otomatik işlenir; faturası gelmeyen kalemler kırmızı alarm verir."""
    },

    # --- KONGRE SAAS PLATFORMU ---
    {
        "id": "post-kongre-1",
        "slug": "kongre-ve-sempozyumlar-icin-cok-musterili-bagimsiz-domainli-web-mimarisi",
        "title": "Kongre ve Sempozyumlar İçin Çok Müşterili (Multi-Tenant) Bağımsız Domainli Web Mimarisi",
        "excerpt": "Dernek ve acentelerin tek altyapıdan kendi özel alan adlarıyla (kongre2026.org) tam teşekküllü etkinlik sitesi açmasını sağlayan modern SaaS mimarisi.",
        "category": "Kongre Teknolojileri",
        "tags": ["Kongre Yönetim Sistemi", "Multi-Tenant SaaS", "Özel Domain", "Etkinlik Yazılımı", "KONGRE"],
        "readingTime": "6 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "Kongre Teknolojileri Direktörü", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-11-08",
        "published": True,
        "featured": True,
        "content": """## Her Kongre İçin Sıfırdan Web Sitesi Yapma Devri Bitti

Geleneksel kongre organizasyonlarında her sempozyum veya uluslararası kongre için web ajanslarına gidilip sıfırdan site yaptırılır; bu süreç haftalarca sürer ve yüz binlerce liralık maliyet yaratır. Üstelik kayıt formları, bildiri gönderme sistemleri ve ödeme altyapıları siteye yama şeklinde entegre edildiğinde güvenlik açıkları ve veri kayıpları kaçınılmaz olur.

---

## KONGRE Cloud Çok Kiracılı (Multi-Tenant) Mimarisi

KONGRE SaaS, derneklerin ve acentelerin dakikalar içinde kendi markaları ve özel alan adlarıyla site açmasını sağlar:

1. **Özel Alan Adı (Custom Domain) & Otomatik SSL:** Örneğin `kardiyoloji2026.org` alan adınızı CNAME ile bağladığınız anda sistem Let's Encrypt SSL sertifikasını otomatik üretir.
2. **Hazır Blok Editörü & Tema Kataloğu:** Kongre kurulları, davetli konuşmacılar, bilimsel program takvimi ve sponsor logoları kod yazmadan görsel bloklarla dizilir.
3. **Merkezi Katılımcı Veritabanı:** Farklı yıllarda düzenlenen kongrelerin katılımcı ve bildiri verileri tek bir güvenli müşteri havuzunda toplanır; böylece bir sonraki kongrenin duyurusu tek tıkla eski katılımcılara ulaştırılır."""
    },
    {
        "id": "post-kongre-2",
        "slug": "bilimsel-kongrelerde-bildiri-abstract-toplama-cift-kor-hakem-ve-oturum-yonetimi",
        "title": "Bilimsel Kongrelerde Bildiri (Abstract) Toplama, Çift Kör Hakem ve Oturum Yönetimi",
        "excerpt": "Akademik ve tıbbi kongrelerde sözel/poster bildiri süreçlerini, çift kör hakem puanlamasını ve salon yerleşimini dijitalleştiren uçtan uca rehber.",
        "category": "Kongre Teknolojileri",
        "tags": ["Bildiri Yönetimi", "Abstract Sistemi", "Hakem Değerlendirme", "Bilimsel Program", "Kongre SaaS"],
        "readingTime": "6 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "Akademik Koordinatör", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-11-07",
        "published": True,
        "featured": False,
        "content": """## Bildiri Süreçlerinde Yaşanan Kaos

Büyük ölçekli bilimsel kongrelerde 500 ila 2.000 arasında sözel ve poster bildiri toplanır. Bu bildirilerin e-posta üzerinden toplanması ve hakemlere Word dosyası olarak dağıtılması tam bir felakettir:
- Hakemlerin kimlikleri yazarlara sızabilir (Çift kör hakemlik ilkesi ihlal edilir).
- Revizyon takibi kaybolur; hangi hakemin hangi bildiriye kaç puan verdiği karışır.
- Kabul edilen bildirilerin salonlara ve oturumlara atanması günlerce sürer.

---

## KONGRE Abstract ve Hakem Motoru

- **Çift Kör (Double-Blind) Hakemlik:** Yazarın adı ve kurumu hakemlerden, hakemin adı ise yazardan otomatik gizlenir.
- **Parametrik Puanlama Cetveli:** Bilimsel kurulun belirlediği kriterlere (Özgünlük, Metodoloji, Sonuçlar) göre hakemler online puanlama yapar.
- **Tek Tıkla Kabul/Ret Mektupları:** Onaylanan bildiri sahiplerine otomatik onay mektubu ve sunum saati iletilir.
- **Dinamik Kongre Bildiri Kitapçığı (Abstract Book):** Onaylanan tüm bildiriler tek tıkla sayfa numaraları ve indeksleriyle PDF kitapçık haline getirilir."""
    },
    {
        "id": "post-kongre-3",
        "slug": "kongre-sahasinda-hizli-akredite-qr-kodlu-akilli-gecis-yaka-karti-ve-katilimci-portali",
        "title": "Kongre Sahasında Hızlı Akredite: QR Kodlu Akıllı Geçiş, Yaka Kartı ve Katılımcı Portalı",
        "excerpt": "Kayıt masalarındaki uzun sıraları yok eden QR akredite, anlık termal yaka kartı baskısı ve kişisel katılımcı ajandası teknolojileri.",
        "category": "Etkinlik Yönetimi",
        "tags": ["QR Akredite", "Yaka Kartı Basımı", "Katılımcı Portalı", "Kayıt Masası", "Saha Otomasyonu"],
        "readingTime": "5 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "Saha Operasyon Direktörü", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-11-06",
        "published": True,
        "featured": False,
        "content": """## Kayıt Masalarındaki Kuyruklar Marka İtibarını Vuruyor

Sabah saat 08:30'da kongre merkezine aynı anda giriş yapan 1.500 doktor veya kurumsal delegenin yaka kartı arama masalarında dakikalarca beklemesi, organizasyonun ilk dakikadan negatif puan almasına sebep olur.

### KONGRE 3 Saniyede Akredite Sistemi

1. **SMS / WhatsApp QR Bileti:** Katılımcı alana yaklaşırken telefonuna kişisel QR kodlu giriş kartı iletilir.
2. **Kiosktan veya Bankodan Anlık Baskı:** Masadaki tablete veya QR okuyucuya telefon tutulduğu anda termal yaka kartı 3 saniyede basılır.
3. **Kişisel Katılımcı Portalı:** Katılımcı giriş yaptıktan sonra cebinden hangi salonda hangi oturum olduğunu, kayıtlı olduğu workshop'ları ve havalimanı dönüş transfer saatini canlı görür."""
    },
    {
        "id": "post-kongre-4",
        "slug": "etkinlik-sponsorluk-yonetimi-sponsor-firma-portali-stant-yerlesimi-ve-davetli-kotalari",
        "title": "Etkinlik Sponsorluk Yönetimi: Sponsor Firma Portalı, Stant Yerleşimi ve Davetli Kotaları",
        "excerpt": "Kongre ve kurumsal etkinliklerde sponsor firmaların stant alanlarını, dijital materyallerini ve davetli kotalarını bağımsız portallarından yönetmesi.",
        "category": "Kongre Teknolojileri",
        "tags": ["Sponsor Yönetimi", "Stant Yerleşimi", "Davetli Kotası", "Kongre SaaS", "Kurumsal Etkinlik"],
        "readingTime": "5 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "Sponsorluk Koordinatörü", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-11-05",
        "published": True,
        "featured": False,
        "content": """## Sponsorluk Süreçlerinde Kota ve İletişim Karmaşası

Bir kongrede 20 farklı ilaç veya teknoloji firması sponsor olduğunda; her birinin paketine göre kaç davetli getirebileceği, stant görevlilerinin kimler olacağı ve web sitesine konulacak yüksek çözünürlüklü logoların toplanması organizatörün günlerini alır.

### KONGRE Bağımsız Sponsor Portalı

- **Firma Özel Portalı:** Sponsor firmaya özel bir yönetim linki verilir. Firma yetkilisi sisteme girerek kendi logosunu, broşürlerini ve tanıtım videosunu yükler.
- **Kota Kontrolü:** Örneğin Platin sponsora tanımlanan 10 kişilik ücretsiz delege kotası dolduğunda sistem otomatik olarak ek kayıtları ücretlendirir.
- **İnteraktif Stant Haritası:** Sponsorlar fuaye alanındaki boş stantları plan üzerinden görerek yerleşim seçimini online tamamlar."""
    },

    # --- ARCH OS (MİMARLIK & ŞANTİYE SAAS) ---
    {
        "id": "post-arch-1",
        "slug": "mimarlik-ofislerinde-musteri-tasarim-dondurma-design-freeze-ve-token-korumali-dijital-onay",
        "title": "Mimarlık Ofislerinde Müşteri Tasarım Dondurma (Design Freeze) ve Token Korumalı Dijital Onay",
        "excerpt": "Müşterinin bitmek bilmeyen son dakika revizyonlarını engelleyen, röleve'den ruhsata aşamaları kilitleyen yasal dijital onay mekanizması.",
        "category": "Mimarlık & Proje",
        "tags": ["ARCH OS", "Design Freeze", "Tasarım Dondurma", "Mimarlık Ofis Yazılımı", "Proje Yönetimi"],
        "readingTime": "6 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "Baş Mimar & ARCH OS Lideri", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-11-04",
        "published": True,
        "featured": True,
        "content": """## Mimarların En Büyük Çilesi: 'Scope Creep' ve Bitmeyen Revizyonlar

İç mimarlık ve mimari proje stüdyolarında projenin en büyük kâr düşmanı, inşaat veya uygulama aşamasına geçildikten sonra işverenin "Banyodaki seramiğin rengini değiştirelim", "Mutfak adasını sola kaydıralım" gibi geriye dönük istekleridir.

Bu istekler resmi olarak kayıt altına alınmadığında mimarlık ofisi hem zaman kaybeder hem de sahada kırıp dökme masraflarını kendi cebinden karşılamak zorunda kalır.

---

## ARCH OS Design Freeze Protokolü

ARCH OS, projeyi 4 ana aşamada dondurarak ilerletir:
1. **Röleve & Konsept Tasarım**
2. **Ruhsat & Kesin Proje**
3. **Uygulama & Detay Çizimleri**
4. **Şantiye Teslimi**

Her aşama tamamlandığında sistem işverene özel şifreli bir token linki üretir (`/approve/[token]`). İşveren linke tıklar, tasarım paftalarını inceler ve dijital imza/onay verir.

> [!IMPORTANT]
> **Yasal Kalkan:** Onay verildikten sonra aşama kilitlenir (Freeze). Bundan sonra işverenden gelen her yeni değişiklik sisteme **"Ek Tasarım Revizyonu"** olarak işlenir ve otomatik ek bütçe faturası üretilir."""
    },
    {
        "id": "post-arch-2",
        "slug": "santiyede-dijital-devrim-fotograf-ustune-canvas-cizimle-snag-kusur-listesi-ve-taseron-takibi",
        "title": "Şantiyede Dijital Devrim: Fotoğraf Üstüne Canvas Çizimle Snag (Kusur) Listesi ve Taşeron Takibi",
        "excerpt": "Şantiye şefinin çektiği fotoğraf üstüne kırmızı kalemle çizim yaparak kusurları ilgili taşerona teslim tarihiyle görev atayan yeni nesil saha sistemi.",
        "category": "Şantiye Operasyonları",
        "tags": ["Şantiye Takip Programı", "Snag List", "Punch List", "Şantiye Günlüğü", "Taşeron Yönetimi"],
        "readingTime": "5 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "Şantiye Koordinatörü", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-11-03",
        "published": True,
        "featured": False,
        "content": """## Şantiyedeki Kusurlar Neden Zamanında Düzeltilmez?

Şantiyede yapılan imalat hataları (çatlak sıva, yanlış priz yeri, hatalı su yalıtımı) geleneksel olarak defterlere not alınır veya WhatsApp'tan taşeronlara sözlü söylenir. Birkaç gün sonra bu notlar unutulur ve boya bittikten sonra fark edilen kusur binlerce liralık kırım masrafına yol açar.

### ARCH OS Fotoğraflı Snag (Punch) Listesi

1. **Sahada Fotoğraf Çek:** Şantiye mühendisi cep telefonundan kusurlu imalatın fotoğrafını çeker.
2. **Canvas Üzerinde İşaretle:** Parmak dokunuşuyla fotoğrafın üzerine kırmızı daire çizer, ok ekler veya not yazar.
3. **Taşerona Görev Ata:** Kusuru doğrudan "Alçıpan Taşeronu"na atar, termin tarihi (örneğin 48 saat) ve lokasyon (Blok A, Daire 4 Salon) belirler.
4. **Çözüldü Doğrulaması:** Taşeron hatayı düzelttiğinde yeni fotoğrafı yükler; mimar onaylamadan görev kapanmaz."""
    },
    {
        "id": "post-arch-3",
        "slug": "birim-fiyatli-metraj-cetveli-boq-ve-kumulatif-taseron-hakedis-motoru",
        "title": "Birim Fiyatlı Metraj Cetveli (BOQ) ve Kümülatif Taşeron Hakediş Motoru: Avans Mahsubu & %5 Teminat Kesintisi",
        "excerpt": "Taşeron hakedişlerinde fazla ödeme riskini sıfırlayan kümülatif metraj hesabı, avans mahsubu ve yasal teminat kesintisi matematiği.",
        "category": "Şantiye Operasyonları",
        "tags": ["Taşeron Hakediş Programı", "BOQ Metraj Cetveli", "Avans Mahsubu", "Teminat Kesintisi", "ARCH OS"],
        "readingTime": "6 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "Maliyet & Hakediş Mühendisi", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-11-02",
        "published": True,
        "featured": False,
        "content": """## Taşeron Hakedişlerinde En Sık Yapılan Kritik Hatalar

İnşaat ve mimari taahhüt işlerinde taşeronlara yapılan ödemelerde en büyük kayıplar şunlardan kaynaklanır:
- **Dönemsel değil kümülatif hesaplanmaması:** Önceki hakedişlerde ödenen miktarlar düşülmeden yapılan mükerrer ödemeler.
- **Avansların unutulması:** İşe başlarken verilen malzeme avansının hakedişten mahsup edilmemesi.
- **Teminat kesintisinin yapılmaması:** İş tesliminde çıkabilecek kusurlara karşı yasal %5 teminat kesintisinin uygulanmaması.

---

## ARCH OS Hakediş Hesaplama Formülü

ARCH OS hakediş motoru her taşeron için kuruşu kuruşuna şu parametrik formülü uygular:

$$\\text{Ödenecek Net Tutar} = (\\text{Kümülatif İmalat Tutarı} - \\text{Önceki Hakedişler}) - \\text{Avans Mahsubu} - \\text{\\%5 Teminat Kesintisi} + \\text{KDV Tevkifatı}$$

Tek tıkla resmi hakediş icmali, metraj ataşmanı ve banka ödeme talimatı PDF formatında oluşturulur."""
    },
    {
        "id": "post-arch-4",
        "slug": "anahtar-teslim-insaatta-cift-kasa-modeli-ofis-kasasi-ile-musteri-emanet-escrow-kasasi",
        "title": "Anahtar Teslim İnşaatta Çift Kasa Modeli: Ofis Kasası ile Müşteri Emanet (Escrow) Kasasının Yasal Ayrımı",
        "excerpt": "Mimarlık ve müteahhitlik şirketlerinde işveren emanet parasının şirket işletme sermayesine karışmasını engelleyen çift cüzdan finans mimarisi.",
        "category": "Finans & İnşaat",
        "tags": ["Çift Kasa", "Emanet Kasa Escrow", "İnşaat Muhasebesi", "Mimarlık Finansı", "Proje Kârlılığı"],
        "readingTime": "5 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "Finans Direktörü", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-11-01",
        "published": True,
        "featured": False,
        "content": """## İnşaat Firmalarını İflasa Sürükleyen 'Kasa Karışması'

Anahtar teslim proje yapan birçok ofis, işverenden şantiye masrafları için aldığı 2 milyon lirayı şirketin ana banka hesabına koyar. Bu para ofisin kârı zannedilerek ofis kirası, personel maaşı veya başka projenin borcu için harcanır.

Malzeme alma günü geldiğinde kasada para kalmadığı anlaşılır ve şirket nakit akışı krizine girer.

### ARCH OS Çift Cüzdan (Dual-Wallet) Mimarisi

- **Ofis Kasası (Turnkey Wallet):** Mimarlık ofisinin kendi hakediş kârı, tasarım bedeli ve yönetim komisyonlarının tutulduğu hesap.
- **İşveren Emanet Kasası (Client Escrow Wallet):** Sadece ve sadece o şantiyenin demir, beton, seramik ve taşeron giderleri için harcanabilen kilitli hesap.
- **Şeffaf Müşteri Ekstresi:** İşveren istediği an emanet parasının nereye harcandığını fatura görselleriyle online inceler."""
    },
    {
        "id": "post-arch-5",
        "slug": "mimarlik-studyolarinda-fiyat-maskeleme-ve-cizer-mimar-timesheet-maliyet-analizi",
        "title": "Mimarlık Stüdyolarında Fiyat Maskeleme (Financial Privacy) ve Çizer Mimar Timesheet Maliyet Analizi",
        "excerpt": "Şantiye şefi ve çizer mimarların metrajı yönetirken şirket kâr marjlarını görmesini engelleyen rol bazlı güvenlik maskelemesi ve saatlik efor hesabı.",
        "category": "Mimarlık & Proje",
        "tags": ["Fiyat Maskeleme", "Timesheet", "Mimar Maliyet Hesabı", "ARCH OS", "Ofis Yönetimi"],
        "readingTime": "5 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "Yazılım Mimarı", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-10-31",
        "published": True,
        "featured": False,
        "content": """## Ticari Sırların Ofis İçinde Korunması

Mimarlık ofisinde çalışan yeni mezun bir mimar veya şantiye stajyeri, AutoCAD veya Revit paftalarını düzenlerken müşteriye kesilen fatura tutarlarını veya taşeronla anlaşılan birim kâr marjlarını görmemelidir.

### ARCH OS Financial Masking Interceptor

- **Metrajı Gör, Fiyatı Görme:** Çizer mimar metrajı (kaç metrekare parke, kaç adet kapı) görür ve düzenler; fakat birim fiyat ve toplam tutar alanları `***` olarak maskelenir.
- **Timesheet Saatlik Efor Maliyeti:** Mimarın projeye harcadığı saatler girilir; sistem ofis sahibine o projenin gerçek işçilik maliyetini ve net kârlılığını anlık raporlar."""
    },

    # --- BORDRO CY (KKTC BORDRO ERP) ---
    {
        "id": "post-bordro-1",
        "slug": "kktc-2026-gelir-vergisi-paye-mevzuati-70893-asgari-ucret-vergi-korumasi-ve-dilim-hesaplari",
        "title": "KKTC 2026 Gelir Vergisi (PAYE) Mevzuatı: 70.893 ₺ Asgari Ücret Vergi Koruması ve Dilim Hesapları",
        "excerpt": "KKTC 24/1982 sayılı Gelir Vergisi Yasası kapsamında 70.893 ₺ asgari ücrete kadar uygulanan tam vergi muafiyeti ve kuruşu kuruşuna Net'ten Brüt'e bordro hesabı.",
        "category": "KKTC Bordro & İK",
        "tags": ["KKTC Bordro Programı", "PAYE Gelir Vergisi", "70.893 Asgari Ücret", "BORDRO CY", "KKTC Mevzuatı"],
        "readingTime": "6 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "KKTC Bordro & Vergi Uzmanı", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-10-30",
        "published": True,
        "featured": True,
        "content": """## KKTC Bordro Mevzuatında Türkiye'den Farklı Kritik Kurallar

Kuzey Kıbrıs Türk Cumhuriyeti'nde (KKTC) bordro ve maaş hesaplamaları Türkiye mevzuatından tamamen farklı yasal parametrelere dayanır. Türkiye bordro yazılımlarını KKTC'de kullanmaya çalışan şirketler cezai yaptırımlarla ve ciddi vergi cezalarıyla karşılaşmaktadır.

---

## 70.893 ₺ Asgari Ücret Vergi Koruması Nedir?

KKTC 24/1982 sayılı Gelir Vergisi Yasası gereğince; **yürürlükteki brüt asgari ücrete (70.893 ₺) kadar olan kazançlar Gelir Vergisinden (PAYE) tamamen muaftır.**

Bir çalışan asgari ücretin üzerinde maaş aldığında dahi asgari ücrete tekabül eden matrah vergiden düşülür ve yalnızca aşan kısım artan oranlı vergi dilimlerine (%10, %20, %25, %30, %37) tabi tutulur.

### BORDRO CY Hassas Hesaplama Motoru

BORDRO CY, KKTC Sosyal Sigortalar Dairesi ve Gelir ve Vergi Dairesi yönergelerine uygun olarak:
- **Sosyal Sigorta Kesintisi:** KKTC vatandaşı (%9 işçi + %11 işveren), TC vatandaşı (%8.25 işçi + %8.71 işveren), 3. Ülke vatandaşı (%13 işçi + %13 işveren).
- **İhtiyat Sandığı Kesintisi:** %4 veya %5 işçi primi + %4 veya %5 işveren katkısı.
- **PAYE Stopajı:** Asgari ücret matrah indirimi kuruşu kuruşuna düşüldükten sonra hesaplanan net stopaj."""
    },
    {
        "id": "post-bordro-2",
        "slug": "kktc-gelir-ve-vergi-dairesi-resmi-form-vd-17a-stopaj-beyannamesi-doldurma-rehberi",
        "title": "KKTC Gelir ve Vergi Dairesi Resmi Form VD 17a Stopaj Beyannamesi Doldurma ve E-Beyan Rehberi",
        "excerpt": "KKTC Maliye Bakanlığı Form VD 17a Tablo 1-4 alanları, safi kazanç dökümü ve resmi matbu beyannamenin tek tıkla oluşturulması.",
        "category": "KKTC Bordro & İK",
        "tags": ["VD 17a", "Stopaj Beyannamesi", "KKTC Maliye", "BORDRO CY", "E-Bordro"],
        "readingTime": "5 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "Mevzuat Baş Danışmanı", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-10-29",
        "published": True,
        "featured": False,
        "content": """## Form VD 17a Nedir?

KKTC Gelir ve Vergi Dairesi'ne her ay verilmesi zorunlu olan **Form VD 17a (Ücretlilerle İlgili Stopaj Beyannamesi)**, işverenin ilgili ayda çalıştırdığı personellerden kestiği PAYE gelir vergilerini beyan ettiği resmi belgedir.

### Beyannamenin 4 Ana Tablosu:

1. **Tablo 1 (Vergi Sorumlusuna Ait Bilgiler):** VKN, Şirket MŞ Tescil No, faaliyet alanı ve kurumsal yasal iletişim bilgileri.
2. **Tablo 2 (Ödemeler ve Vergiler Özeti):** Toplam brüt maaş ödemesi, toplam sosyal güvence katkıları (SSK + İhtiyat Sandığı), toplam safi kazanç ve hesaplanan stopaj.
3. **Tablo 3 (Ödenek Elde Eden Kişilerin Ayrıntılı Dökümü):** Her çalışanın kimlik/pasaport no, brüt kazancı, sosyal sigorta kesintisi, hayat sigortası indirimi ve kesilen PAYE vergisi.
4. **Tablo 4 (Beyan ve Onay):** Vergi sorumlusunun yasal imza alanı.

BORDRO CY, bu formu kuruş hatası olmadan tek tıkla resmi matbu PDF ve Gelir ve Vergi Dairesi e-beyan XML/Excel formatında üretir."""
    },
    {
        "id": "post-bordro-3",
        "slug": "kktc-sosyal-sigortalar-dairesi-form-ss14-prim-bordrosu-ve-ihtiyat-sandigi-is-22a",
        "title": "KKTC Sosyal Sigortalar Dairesi Form SS14 Prim Bordrosu, D1-D2 Bordro Tipleri ve İhtiyat Sandığı İ.S. 22A",
        "excerpt": "Form SS14 sigorta numarası sıralama kuralı, D1/D2 bordro tipi gruplamaları ve 4 kutulu resmi matbu ücret hesap pusulası.",
        "category": "KKTC Bordro & İK",
        "tags": ["Form SS14", "İ.S. 22A", "Sosyal Sigortalar KKTC", "İhtiyat Sandığı", "BORDRO CY"],
        "readingTime": "5 dk okuma",
        "coverImage": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80",
        "author": {"name": "CODEICON Ekibi", "role": "Mevzuat Baş Danışmanı", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"},
        "publishedAt": "2026-10-28",
        "published": True,
        "featured": False,
        "content": """## Form SS14 Sıralama ve Gruplama Kuralları

KKTC Sosyal Sigortalar Dairesi resmi yönergelerine göre hazırlanan **Form SS14 (Aylık Sigorta Primleri Bordrosu)** rastgele doldurulamaz:

- **Bordro Tipi Gruplaması:** Personeller teşvik durumuna ve sigorta prim oranına göre **D1, D2, D3** gibi ayrı bordro sayfalarına bölünmelidir.
- **Sigorta Numarası Sıralaması:** Sayfa içindeki tüm çalışanlar **Sigorta Sicil Numarasına göre küçükten büyüğe** dizilmek zorundadır.

### Resmi 4 Kutulu Ücret Hesap Pusulası

Çalışanlara verilen bordro pusulaları KKTC Çalışma Bakanlığı standartlarında 4 bağımsız kutudan oluşur:
1. **Kazançlar:** Aylık Brüt Maaş, Ek Ödenekler, Primler.
2. **Yasal Kesintiler:** Sigorta İşçi Primi, İhtiyat Sandığı İşçi Primi, Gelir Vergisi (PAYE).
3. **İşveren Maliyeti:** Sigorta İşveren Payı, İhtiyat Sandığı İşveren Payı, Toplam Personel Maliyeti.
4. **Net Ödenen:** Çalışanın banka hesabına yatan net tutar.

BORDRO CY, tüm bu resmi matbu formları sıfır hata ve tam yasal güvenceyle üretir."""
    }
]

content['blog']['posts'] = posts
content['blog']['enabled'] = True
content['blog']['title'] = "CODEICON Teknoloji & Mevzuat Rehberi"
content['blog']['subtitle'] = "MICE operasyonları, kongre teknolojileri, mimarlık & şantiye yönetimi ve KKTC bordro mevzuatında sektörel uzman analizleri ve derinlemesine rehberler."
content['updatedAt'] = "2026-11-12T20:00:00.000Z"

with open(site_content_path, 'w', encoding='utf-8') as f:
    json.dump(content, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {len(posts)} rich, authoritative blog posts and updated siteContent.json!")
