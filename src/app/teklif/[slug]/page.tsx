import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/contentStore";
import PrintProposalButton from "@/components/PrintProposalButton";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getSiteContent();
  const proposal = content?.proposals?.find((p: any) => 
    p.slug === slug || 
    p.slug?.startsWith(slug + "-") || 
    slug.startsWith(p.slug + "-") ||
    p.id === `prop-${slug}` ||
    p.id === slug
  );

  if (!proposal) {
    return {
      title: "Teklif Bulunamadı | CODEICON",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: `${proposal.clientCompany} — MICE Agency OS Kurumsal Teklif | CODEICON`,
    description: `CODEICON MICE Agency OS B2B Kurumsal Teklif ve Hizmet Şablonu (${proposal.clientCompany})`,
    robots: "noindex, nofollow",
  };
}

export default async function ProposalPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getSiteContent();
  const proposal = content?.proposals?.find((p: any) => 
    p.slug === slug || 
    p.slug?.startsWith(slug + "-") || 
    slug.startsWith(p.slug + "-") ||
    p.id === `prop-${slug}` ||
    p.id === slug
  );

  if (!proposal) {
    notFound();
  }

  // Format currency helpers
  const formatTL = (val: number | string) => {
    const num = typeof val === "string" ? parseFloat(val) : val;
    if (isNaN(num)) return "0 TL";
    return num.toLocaleString("tr-TR") + " TL";
  };

  const monthlyPriceStr = formatTL(proposal.monthlyPrice || 35000);
  const yearlyPriceStr = formatTL(proposal.yearlyPrice || 350000);
  const setupFeeStr = formatTL(proposal.setupFee || 100000);
  const yearlyTotalFromMonthly = formatTL((parseFloat(proposal.monthlyPrice || 35000) * 12));
  const yearlySavings = formatTL((parseFloat(proposal.monthlyPrice || 35000) * 12) - parseFloat(proposal.yearlyPrice || 350000));

  const escalationText = proposal.escalationClause || "Müteakip hizmet yıllarındaki lisans bedeli artış oranı, Türkiye İstatistik Kurumu (TÜİK) tarafından açıklanan bir önceki yılın TÜFE 12 aylık ortalamasını geçmeyecek şekilde belirlenir ve acenteye yenileme tarihinden en az 30 gün önce bildirilir.";

  const references = [
    { name: "Tempus Travel", url: "https://tempustravel.co" },
    { name: "La Tour Event", url: "https://latour.com.tr" },
    { name: "Cyprus Royal Tourism", url: "https://cyprusroyalturizm.com/" },
    { name: "Ravento Travel", url: "https://raventotravel.com/" },
    { name: "Eventalist Dmc", url: "https://eventalist-dmc.com" },
    { name: "Royal Tur", url: "https://royaltur.com/" },
    { name: "Atlantis Tur", url: "https://atlantistur.com/" },
    { name: "Duca Tour", url: "https://ducatour.com/" },
  ];

  return (
    <div className="proposal-root min-h-screen bg-[#F4F2EE] text-[#1A1A1A] py-8 px-4 font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .proposal-root {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.55;
        }

        .proposal-container {
          max-width: 960px;
          margin: 0 auto;
          background: #FFFFFF;
          border-radius: 14px;
          padding: 40px;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.06);
          border: 1px solid #E5E7EB;
        }

        .proposal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #E5E7EB;
          padding-bottom: 20px;
          margin-bottom: 26px;
        }

        .proposal-h2 {
          font-size: 16.5px;
          font-weight: 800;
          color: #111;
          margin-top: 32px;
          margin-bottom: 14px;
          border-left: 4px solid #FF4D2D;
          padding-left: 10px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .proposal-table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0 22px;
          font-size: 13px;
        }

        .proposal-table th, .proposal-table td {
          padding: 10px 14px;
          text-align: left;
          border-bottom: 1px solid #E5E7EB;
        }

        .proposal-table th {
          background-color: #FAFAFA;
          font-weight: 700;
          color: #111;
          font-size: 12.5px;
        }

        .highlight-col {
          background: rgba(255, 77, 45, 0.04);
          font-weight: 600;
          border-left: 2px solid #FF4D2D;
          border-right: 2px solid #FF4D2D;
        }

        .highlight-header {
          background: rgba(255, 77, 45, 0.12) !important;
          color: #FF4D2D !important;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 14px;
          margin-bottom: 22px;
        }

        .module-card {
          background: #FAFAFA;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .module-card:hover {
          border-color: rgba(255, 77, 45, 0.25);
          background: #FFFFFF;
        }

        .module-route-tag {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 700;
          color: #FF4D2D;
          background: rgba(255, 77, 45, 0.08);
          padding: 2px 7px;
          border-radius: 5px;
          margin-bottom: 6px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        .module-card ul {
          list-style-type: none;
          padding-left: 0;
          font-size: 12.5px;
          color: #374151;
        }

        .module-card ul li {
          position: relative;
          padding-left: 16px;
          margin-bottom: 5px;
          line-height: 1.4;
        }

        .module-card ul li::before {
          content: "•";
          color: #FF4D2D;
          position: absolute;
          left: 3px;
          font-size: 15px;
          line-height: 1;
        }

        .submodule-highlight {
          background: #FFFFFF;
          border-left: 3px solid #FF4D2D;
          padding: 8px 12px;
          margin-top: 8px;
          border-radius: 0 6px 6px 0;
          font-size: 12px;
          color: #1F2937;
        }

        .pricing-section {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          margin-top: 24px;
        }

        .references-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin: 16px 0 24px;
        }

        @media (max-width: 768px) {
          .references-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .reference-card {
          background: #FAFAFA;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 12px 14px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.15s ease-in-out;
        }

        .reference-card:hover {
          border-color: #FF4D2D;
          background: #FFFFFF;
          box-shadow: 0 2px 8px rgba(255, 77, 45, 0.08);
        }

        .reference-name {
          font-size: 13px;
          font-weight: 700;
          color: #111;
          margin-bottom: 2px;
        }

        .reference-url {
          font-size: 11px;
          color: #6B7280;
          word-break: break-all;
        }

        .sign-box {
          margin-top: 36px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          padding-top: 24px;
          border-top: 2px dashed #E5E7EB;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .sign-block {
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 18px;
          font-size: 12.5px;
        }

        .sign-line {
          margin-top: 36px;
          border-bottom: 1px solid #9CA3AF;
          width: 85%;
        }

        @media print {
          body, .proposal-root {
            background: #fff !important;
            padding: 0 !important;
          }
          .proposal-container {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
          .no-print {
            display: none !important;
          }
          .module-card {
            border: 1px solid #E5E7EB !important;
            background: #FFFFFF !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .pricing-section {
            page-break-before: auto !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .references-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 8px !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .reference-card {
            background: #FAFAFA !important;
            border: 1px solid #E5E7EB !important;
            padding: 8px 10px !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          table, tr, td, th {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          @page {
            margin: 1.2cm;
          }
        }
      `}</style>

      <div className="proposal-container">
        {/* Print / Top Action Bar */}
        <div className="no-print flex items-center justify-between mb-4">
          <a
            href="https://www.codeicon.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition flex items-center gap-1"
          >
            ← CODEICON Ana Sayfasına Git
          </a>
          <PrintProposalButton />
        </div>

        {/* Header */}
        <div className="proposal-header">
          <div>
            <span className="inline-block bg-[rgba(255,77,45,0.08)] text-[#FF4D2D] py-1 px-2.5 rounded-full text-[11px] font-bold mb-1.5 tracking-wide">
              B2B KURUMSAL TEKLİF & HİZMET SÖZLEŞMESİ
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              CODEICON <span className="text-[#FF4D2D]">MICE AGENCY OS</span>
            </h1>
            <p className="text-[12.5px] text-neutral-500 font-semibold uppercase tracking-wider mt-0.5">
              MICE Acente İşletim Sistemi & Finans
            </p>
          </div>
          <div className="text-right text-[12.5px] text-neutral-500">
            <p><strong>Doküman No:</strong> {proposal.proposalNo || "TEK-2026-MICE-009"}</p>
            <p><strong>Tarih:</strong> {proposal.date || "24 Kasım 2026"}</p>
            <p><strong>Geçerlilik:</strong> {proposal.validDays || 30} Gün</p>
            <p><strong>Hazırlayan:</strong> CODEICON Teknoloji Ekibi</p>
          </div>
        </div>

        {/* 1. Taraflar */}
        <h2 className="proposal-h2">1. Taraflar ve Hizmet Alıcısı</h2>
        <table className="proposal-table">
          <thead>
            <tr>
              <th style={{ width: "25%" }}>Bilgi Alanı</th>
              <th style={{ width: "37.5%" }}>Hizmet Sağlayıcı</th>
              <th style={{ width: "37.5%" }}>Hizmet Alıcısı (Müşteri Acente)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Firma Unvanı</strong></td>
              <td>CODEICON Teknoloji Çözümleri</td>
              <td><strong>{proposal.clientCompany}</strong></td>
            </tr>
            <tr>
              <td><strong>Yetkili Kişi</strong></td>
              <td>Arif Arı</td>
              <td>{proposal.clientContact}</td>
            </tr>
            <tr>
              <td><strong>Unvan / Pozisyon</strong></td>
              <td>Ekosistem Yöneticisi</td>
              <td>{proposal.clientTitle || `${proposal.clientCompany} Adına`}</td>
            </tr>
            <tr>
              <td><strong>İletişim</strong></td>
              <td>hello@codeicon.co | +90 533 889 99 44</td>
              <td>{proposal.clientEmail} | {proposal.clientPhone}</td>
            </tr>
            <tr>
              <td><strong>Web / Adres</strong></td>
              <td>https://www.codeicon.co</td>
              <td>{proposal.clientWebsite || "—"}</td>
            </tr>
          </tbody>
        </table>

        {/* 2. Yönetici Özeti */}
        <h2 className="proposal-h2">2. Yönetici Özeti (Executive Summary)</h2>
        <p className="text-[14px] text-neutral-700 mb-3">
          İşbu teklif; <strong>{proposal.clientCompany}</strong> bünyesinde yürütülen MICE (Toplantı, Kongre, Teşvik Gezisi ve Lansman) operasyonlarının, transfer ve filo lojistiğinin, otel rooming listesi eşlemelerinin ve döviz kurlu finansal mutabakatlarının tek bir bulut işletim sistemi üzerinden otonomlaştırılması amacıyla hazırlanmıştır.
        </p>
        <p className="text-[14px] text-neutral-700 mb-3">
          <strong>MICE Agency OS</strong>; acentelerin teklif tarihi ile giriş günü arasındaki döviz kur dalgalanmalarından doğan kur farkı zararını sıfırlayan <strong>TCMB 15:30 kur sabitleme motoru</strong>, karmaşık Excel listelerini tek tıkla otel formatına dönüştüren <strong>akıllı rooming motoru</strong>, transfer listelerini tedarikçiler bazında filtreleyip özet çıkaran, mutabakat sağlayan yapısı ve Projeler ekranındaki <strong>Sejour modülü</strong> ile operasyonel hata payını en aza indirmeyi taahhüt eder.
        </p>

        {/* 3. Proje Kapsamı ve Sayfa Bazlı Modüler Mimari */}
        <h2 className="proposal-h2">3. Proje Kapsamı ve Sayfa Bazlı Modüler Mimari</h2>
        <p className="text-[13px] text-neutral-500 mb-3.5">
          MICE Agency OS, acentenin günlük operasyon akışını birebir yansıtan 7 amiral sayfadan oluşur:
        </p>

        <div className="modules-grid">
          {/* Sayfa 1 */}
          <div className="module-card">
            <div>
              <div className="mb-1.5">
                <span className="module-route-tag">/requests</span>
                <h3 className="text-[14px] font-extrabold text-neutral-900">1. Talepler Sayfası</h3>
              </div>
              <p className="text-[12px] text-neutral-600 mb-2 leading-relaxed">
                Gelen kurumsal etkinlik taleplerinin toplandığı ve durumlarının izlendiği başlangıç ekranıdır.
              </p>
              <ul>
                <li><strong>Talep Havuzu:</strong> Tarih aralığı, pax sayısı, bütçe ve sorumlu personel atama.</li>
                <li><strong>Statü & Aktarım:</strong> Yeni, Teklif, Revize ve Onay statüleri; tek tıkla teklife aktarım.</li>
              </ul>
            </div>
          </div>

          {/* Sayfa 2 */}
          <div className="module-card">
            <div>
              <div className="mb-1.5">
                <span className="module-route-tag">/quotes</span>
                <h3 className="text-[14px] font-extrabold text-neutral-900">2. Teklifler Sayfası</h3>
              </div>
              <p className="text-[12px] text-neutral-600 mb-2 leading-relaxed">
                Tüm MICE gider kalemlerinin kâr marjlarıyla bütçelendiği ve interaktif sunulduğu ekrandır.
              </p>
              <ul>
                <li><strong>Çoklu Hizmet Bütçeleme:</strong> Konaklama, transfer, gala ve teknik kalemlerin tek ekranda toplanması.</li>
                <li><strong>TCMB Kur & Simülasyon:</strong> EUR/USD/TL kurlarıyla anlık maliyet ve kâr marjı hesabı.</li>
                <li><strong>İnteraktif Web Portalı:</strong> Müşteriye özel link ile online interaktif teklif ve onay.</li>
              </ul>
            </div>
          </div>

          {/* Sayfa 3 */}
          <div className="module-card" style={{ gridColumn: "span 2" }}>
            <div>
              <div className="mb-1.5">
                <span className="module-route-tag">/projects</span>
                <h3 className="text-[14px] font-extrabold text-neutral-900">3. Projeler Sayfası (Operasyon & Finans Kartı + Sejour Modülü)</h3>
              </div>
              <p className="text-[12px] text-neutral-600 mb-2 leading-relaxed">
                Onaylanan etkinliklerin canlı finans tablosu, operasyonel kumanda merkezi ve Sejour veri köprüsüdür.
              </p>
              <ul>
                <li><strong>Canlı Proje P&L:</strong> Bütçe ve gerçekleşen harcamaların anlık kâr/zarar takibi.</li>
                <li><strong>Kur Kilitleme & Servis Bedeli:</strong> Check-in günü kur sabitleme ve acente hizmet bedeli hesaplama.</li>
              </ul>
              <div className="submodule-highlight">
                <strong>Sejour Modülü:</strong> Sejour'daki rezervasyon ve voucher verilerini tek tıkla projeye aktararak mükerrer veri girişini sonlandırır.
              </div>
            </div>
          </div>

          {/* Sayfa 4 */}
          <div className="module-card">
            <div>
              <div className="mb-1.5">
                <span className="module-route-tag">/operations</span>
                <h3 className="text-[14px] font-extrabold text-neutral-900">4. Operasyonlar & Transfer Sayfası</h3>
              </div>
              <p className="text-[12px] text-neutral-600 mb-2 leading-relaxed">
                Havalimanı karşılama, transfer operasyonu ve araç filo lojistiğinin yönetim merkezidir.
              </p>
              <ul>
                <li><strong>Tedarikçi Gruplama:</strong> Araç firması bazında ayrı listeler, özetler ve operasyon mutabakatı.</li>
                <li><strong>Araç & Pax Dağıtımı:</strong> Yolcuların araç tiplerine ve güzergahlara göre otonom eşlenmesi.</li>
              </ul>
            </div>
          </div>

          {/* Sayfa 5 */}
          <div className="module-card">
            <div>
              <div className="mb-1.5">
                <span className="module-route-tag">/hotels</span>
                <h3 className="text-[14px] font-extrabold text-neutral-900">5. Oteller & Rooming Sayfası</h3>
              </div>
              <p className="text-[12px] text-neutral-600 mb-2 leading-relaxed">
                Otel blokajları ve karmaşık misafir konaklama listelerinin otonom eşlendiği modüldür.
              </p>
              <ul>
                <li><strong>Akıllı Excel Rooming Eşleme:</strong> Dağınık kurumsal Excel listelerini sürükle-bırak ile sisteme alma.</li>
                <li><strong>Oda Tipi Dağıtımı & Çıktı:</strong> SGL/DBL/TWN eşlemesi ve tek tıkla otele hazır şablon çıktısı.</li>
              </ul>
            </div>
          </div>

          {/* Sayfa 6 */}
          <div className="module-card">
            <div>
              <div className="mb-1.5">
                <span className="module-route-tag">/accounting & /suppliers</span>
                <h3 className="text-[14px] font-extrabold text-neutral-900">6. Muhasebe & Tedarikçi Carileri Sayfası</h3>
              </div>
              <p className="text-[12px] text-neutral-600 mb-2 leading-relaxed">
                Tedarikçi carileri, dövizli mutabakatlar ve kur farkı denetiminin yapıldığı finans ekranıdır.
              </p>
              <ul>
                <li><strong>TCMB 15:30 Kur Kalkanı:</strong> Günlük gösterge kurlarıyla döviz cari ve fatura mutabakatı.</li>
                <li><strong>ERP Köprüsü (Logo/Netsis/Dia):</strong> Kurumsal muhasebe programlarıyla opsiyonel entegrasyon.</li>
              </ul>
            </div>
          </div>

          {/* Sayfa 7 */}
          <div className="module-card">
            <div>
              <div className="mb-1.5">
                <span className="module-route-tag">/dashboard & /reports</span>
                <h3 className="text-[14px] font-extrabold text-neutral-900">7. Yönetim Paneli & Raporlar Sayfası</h3>
              </div>
              <p className="text-[12px] text-neutral-600 mb-2 leading-relaxed">
                Acente yöneticileri için şirket cirosu, operasyon kârlılığı ve genel performans özetidir.
              </p>
              <ul>
                <li><strong>Kârlılık Analizi:</strong> Tamamlanan projelerin net kâr marjları ve bütçe gerçekleşme oranları.</li>
                <li><strong>Yönetici Çıktıları:</strong> Tek tıkla yönetim kuruluna sunulabilir anlık PDF ve Excel raporları.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Kurulum Takvimi */}
        <h2 className="proposal-h2">4. Kurulum ve Canlıya Geçiş Takvimi (Hızlı Entegrasyon)</h2>
        <table className="proposal-table">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Aşama</th>
              <th style={{ width: "15%" }}>Süre</th>
              <th style={{ width: "45%" }}>Yapılacak İşlemler</th>
              <th style={{ width: "25%" }}>Milestone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Aşama</strong></td>
              <td>1 İş Günü</td>
              <td>Bulut ortamının açılması, acente kullanıcı hesaplarının ve rol yetkilerinin tanımlanması.</td>
              <td>Canlı Sistem Erişimi</td>
            </tr>
            <tr>
              <td><strong>2. Aşama</strong></td>
              <td>1 İş Günü</td>
              <td>Operasyon, satış ve muhasebe ekiplerine uygulamalı canlı sistem eğitimi verilmesi.</td>
              <td>Personel Sertifikasyonu</td>
            </tr>
            <tr>
              <td><strong>3. Aşama</strong></td>
              <td>1 İş Günü</td>
              <td>İlk gerçek MICE etkinliğinin sistem üzerinden baştan sona yönetilmesi ve süpervizör desteği.</td>
              <td>%100 Canlı Operasyon</td>
            </tr>
          </tbody>
        </table>

        {/* 5. Lisanslama ve Fiyatlandırma */}
        <div className="pricing-section">
          <h2 className="proposal-h2">5. Lisanslama ve Fiyatlandırma Seçenekleri</h2>
          <table className="proposal-table">
            <thead>
              <tr>
                <th style={{ width: "44%" }}>Paket & Hizmet Kapsamı</th>
                <th style={{ textAlign: "center", width: "28%" }}>
                  <div className="text-[15px] font-extrabold text-neutral-900 mb-0.5">Aylık Plan</div>
                  <div className="text-[18px] font-extrabold text-neutral-900">{monthlyPriceStr}</div>
                  <span className="block text-[10.5px] font-semibold text-neutral-500 mt-0.5">Net / KDV Dahil</span>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Aylık Esnek Lisans</div>
                </th>
                <th className="highlight-header" style={{ textAlign: "center", width: "28%" }}>
                  <span className="inline-block bg-[#FF4D2D] text-white text-[9.5px] font-extrabold py-0.5 px-1.5 rounded mb-1 tracking-wide">
                    TAVSİYE EDİLEN
                  </span>
                  <div className="text-[15px] font-extrabold text-[#FF4D2D] mb-0.5">Yıllık Plan</div>
                  <div className="text-[18px] font-extrabold text-[#FF4D2D]">{yearlyPriceStr}</div>
                  <span className="block text-[10.5px] font-semibold text-neutral-500 mt-0.5">Net / KDV Dahil</span>
                  <div className="text-[11px] text-emerald-600 font-bold mt-0.5">
                    2 Ay Hediye ({yearlySavings} Avantaj)
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Kullanıcı Lisansı</strong></td>
                <td style={{ textAlign: "center" }}><strong>Sınırsız Kullanıcı</strong></td>
                <td className="highlight-col" style={{ textAlign: "center", color: "#FF4D2D" }}><strong>Sınırsız Kullanıcı</strong></td>
              </tr>
              <tr>
                <td><strong>Talepler Modülü (/requests)</strong></td>
                <td style={{ textAlign: "center" }}>Dahil</td>
                <td className="highlight-col" style={{ textAlign: "center" }}>Dahil</td>
              </tr>
              <tr>
                <td><strong>Teklifler Modülü (/quotes)</strong></td>
                <td style={{ textAlign: "center" }}>Dahil</td>
                <td className="highlight-col" style={{ textAlign: "center" }}>Dahil</td>
              </tr>
              <tr>
                <td><strong>Projeler & Sejour Modülü (/projects)</strong></td>
                <td style={{ textAlign: "center" }}>Dahil</td>
                <td className="highlight-col" style={{ textAlign: "center" }}>Dahil</td>
              </tr>
              <tr>
                <td><strong>Operasyonlar & Transfer Modülü (/operations)</strong></td>
                <td style={{ textAlign: "center" }}>Dahil</td>
                <td className="highlight-col" style={{ textAlign: "center" }}>Dahil</td>
              </tr>
              <tr>
                <td><strong>Oteller & Rooming Modülü (/hotels)</strong></td>
                <td style={{ textAlign: "center" }}>Dahil</td>
                <td className="highlight-col" style={{ textAlign: "center" }}>Dahil</td>
              </tr>
              <tr>
                <td><strong>Muhasebe & Tedarikçiler Modülü (/accounting & /suppliers)</strong></td>
                <td style={{ textAlign: "center" }}>Dahil</td>
                <td className="highlight-col" style={{ textAlign: "center" }}>Dahil</td>
              </tr>
              <tr>
                <td><strong>Yönetim Paneli & Raporlar Modülü (/dashboard & /reports)</strong></td>
                <td style={{ textAlign: "center" }}>Dahil</td>
                <td className="highlight-col" style={{ textAlign: "center" }}>Dahil</td>
              </tr>
              <tr>
                <td><strong>ERP & Muhasebe Köprüsü (Logo/Netsis/Dia vb.)</strong></td>
                <td style={{ textAlign: "center", color: "#6B7280" }}>Opsiyonel</td>
                <td className="highlight-col" style={{ textAlign: "center", color: "#6B7280" }}>Opsiyonel</td>
              </tr>
              <tr>
                <td><strong>Destek ve Danışmanlık Düzeyi</strong></td>
                <td style={{ textAlign: "center" }}><strong>Öncelikli 7/24</strong></td>
                <td className="highlight-col" style={{ textAlign: "center", color: "#FF4D2D" }}><strong>Öncelikli 7/24</strong></td>
              </tr>
              <tr>
                <td><strong>Giriş / Kurulum Bedeli</strong></td>
                <td style={{ textAlign: "center" }}>
                  <span className="line-through text-neutral-400">{setupFeeStr}</span>{" "}
                  <strong className="text-emerald-600">0 TL (%100 Hediye)</strong>
                </td>
                <td className="highlight-col" style={{ textAlign: "center" }}>
                  <span className="line-through text-neutral-400">{setupFeeStr}</span>{" "}
                  <strong className="text-emerald-600">0 TL (%100 Hediye)</strong>
                </td>
              </tr>
              <tr>
                <td><strong>Lisans Yatırımı (Nihai Net Bedel)</strong></td>
                <td style={{ textAlign: "center", fontSize: "14.5px", fontWeight: 800 }}>{monthlyPriceStr} / Ay</td>
                <td className="highlight-col" style={{ textAlign: "center", fontSize: "15.5px", fontWeight: 800, color: "#FF4D2D" }}>
                  {yearlyPriceStr} / Yıl
                </td>
              </tr>
              <tr>
                <td><strong>Yıllık Toplam Maliyet</strong></td>
                <td style={{ textAlign: "center", color: "#6B7280" }}>{yearlyTotalFromMonthly} / Yıl</td>
                <td className="highlight-col" style={{ textAlign: "center", fontWeight: 800, color: "#111" }}>
                  {yearlyPriceStr} / Yıl <br />
                  <span className="inline-block bg-[rgba(16,185,129,0.1)] text-emerald-600 font-bold text-[11px] py-0.5 px-2 rounded-full">
                    {yearlySavings} Avantaj
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-[12.5px] text-neutral-500 italic mt-1.5 leading-relaxed">
            <strong>* Yasal ve Vergisel Açıklama:</strong> Belirtilen fiyatlar net nihai tutarlar olup, faturalandırma yurt dışı merkezli teknoloji şirketi üzerinden hizmet satışı olarak gerçekleştirileceğinden yerel Katma Değer Vergisi (KDV) doğmamakta / KDV dahil nihai bedel olarak yansıtılmaktadır (Ek KDV eklenmez). Yıllık peşin ödemede 2 aylık lisans bedeli hediye edilerek 10 aylık ücret yansıtılır. Sistem kurulum, veri aktarımı ve personel eğitimi 100.000 TL yerine %100 indirimle <strong>0 TL (Ücretsiz)</strong> olarak sağlanmaktadır. {escalationText}
          </p>
        </div>

        {/* 6. SLA & Güvenlik */}
        <h2 className="proposal-h2">6. Servis Seviyesi Taahhüdü (SLA) & Güvenlik</h2>
        <p className="text-[14px] text-neutral-700 mb-3">
          <strong>%99.9 Uptime:</strong> CODEICON, sistem altyapısının kesintisiz çalışması için yıllık %99.9 uptime garantisi sunar.<br />
          <strong>AES-256 Şifreleme:</strong> Tüm operasyonel ve finansal veriler izole PostgreSQL veritabanında şifrelenir. Başka kurumlarla paylaşılamaz.<br />
          <strong>Otomatik Coğrafi Yedekleme:</strong> Veriler her 24 saatte bir farklı bir coğrafi veri merkezine yedeklenir.
        </p>

        {/* 7. Sektörel Referanslarımız */}
        <h2 className="proposal-h2">7. Sektörel Referanslarımız</h2>
        <p className="text-[13px] text-neutral-600 mb-3">
          Türkiye ve KKTC turizm & MICE sektörünün öncü acenteleri operasyon ve finans süreçlerinde teknolojimize güveniyor:
        </p>
        <div className="references-grid">
          {references.map((ref) => (
            <a
              key={ref.name}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="reference-card"
            >
              <div className="reference-name">{ref.name}</div>
              <div className="reference-url">{ref.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</div>
            </a>
          ))}
        </div>

        {/* İmza Blokları */}
        <div className="sign-box">
          <div className="sign-block">
            <p><strong>HİZMET SAĞLAYICI:</strong></p>
            <p><strong>CODEICON Teknoloji Çözümleri</strong></p>
            <p className="mt-2 text-neutral-700">Yetkili: Arif Arı</p>
            <p className="text-neutral-400 text-[11.5px]">Ekosistem Yöneticisi</p>
            <div className="sign-line"></div>
            <p className="mt-1.5 text-neutral-400 text-[11.5px]">İmza & Kaşe</p>
          </div>
          <div className="sign-block">
            <p><strong>HİZMET ALICISI (MÜŞTERİ ACENTE):</strong></p>
            <p><strong>{proposal.clientCompany}</strong></p>
            <p className="mt-2 text-neutral-700">Yetkili: {proposal.clientContact}</p>
            <p className="text-neutral-400 text-[11.5px]">{proposal.clientTitle || `${proposal.clientCompany} Adına`}</p>
            <div className="sign-line"></div>
            <p className="mt-1.5 text-neutral-400 text-[11.5px]">İmza & Kaşe</p>
          </div>
        </div>
      </div>
    </div>
  );
}
