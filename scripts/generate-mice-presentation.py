#!/usr/bin/env python3
"""
Generate a professional, high-end widescreen (16:9) PowerPoint presentation for MICE OS.
"""

import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_presentation(output_path):
    prs = Presentation()
    # 16:9 Widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6] # Blank slide

    # Color Palette (CODEICON / Grovia Brand Tokens)
    C_DARK = RGBColor(26, 26, 26)       # #1A1A1A
    C_CREAM = RGBColor(244, 242, 238)   # #F4F2EE
    C_WHITE = RGBColor(255, 255, 255)   # #FFFFFF
    C_ORANGE = RGBColor(255, 77, 45)    # #FF4D2D
    C_YELLOW = RGBColor(254, 247, 175)  # #FEF7AF
    C_YELLOW_TEXT = RGBColor(89, 76, 0) # #594C00
    C_EMERALD = RGBColor(16, 185, 129)  # #10B981
    C_MUTED = RGBColor(100, 116, 139)   # #64748B
    C_BORDER = RGBColor(226, 221, 214)  # #E2DDD6
    C_LIGHT_BG = RGBColor(250, 249, 246)# #FAF9F6

    def set_slide_background(slide, color):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = color
        bg.line.fill.background()
        return bg

    def add_header(slide, tag_text, title_text, subtitle_text=None, is_dark=False):
        # Category Tag Pill
        tag_box = slide.shapes.add_textbox(Inches(0.9), Inches(0.6), Inches(4.5), Inches(0.45))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = f"●  {tag_text.upper()}"
        p_tag.font.size = Pt(10)
        p_tag.font.bold = True
        p_tag.font.color.rgb = C_ORANGE if is_dark else C_ORANGE

        # Title
        t_box = slide.shapes.add_textbox(Inches(0.9), Inches(1.0), Inches(11.5), Inches(0.8))
        tf = t_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.size = Pt(28)
        p.font.bold = True
        p.font.color.rgb = C_WHITE if is_dark else C_DARK

        # Subtitle
        if subtitle_text:
            s_box = slide.shapes.add_textbox(Inches(0.9), Inches(1.75), Inches(11.5), Inches(0.6))
            tf_s = s_box.text_frame
            tf_s.word_wrap = True
            p_s = tf_s.paragraphs[0]
            p_s.text = subtitle_text
            p_s.font.size = Pt(13)
            p_s.font.color.rgb = RGBColor(203, 213, 225) if is_dark else C_MUTED

    # =========================================================================
    # SLIDE 1: COVER SLIDE (Executive Dark Theme)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1, C_DARK)

    # Accent Top Strip
    accent_bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.9), Inches(0.9), Inches(1.5), Inches(0.08))
    accent_bar.fill.solid()
    accent_bar.fill.fore_color.rgb = C_ORANGE
    accent_bar.line.fill.background()

    # Brand Pill
    pill = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(1.3), Inches(3.2), Inches(0.42))
    pill.fill.solid()
    pill.fill.fore_color.rgb = RGBColor(40, 40, 40)
    pill.line.color.rgb = RGBColor(70, 70, 70)
    pill.text_frame.text = "✦  CODEICON TEKNOLOJİ EKOSİSTEMİ"
    pill.text_frame.paragraphs[0].font.size = Pt(10.5)
    pill.text_frame.paragraphs[0].font.bold = True
    pill.text_frame.paragraphs[0].font.color.rgb = C_WHITE
    pill.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER

    # Main Headline
    title_box = s1.shapes.add_textbox(Inches(0.9), Inches(2.0), Inches(11.5), Inches(2.2))
    tf1 = title_box.text_frame
    tf1.word_wrap = True
    p1 = tf1.paragraphs[0]
    p1.text = "MICE Agency OS"
    p1.font.size = Pt(46)
    p1.font.bold = True
    p1.font.color.rgb = C_WHITE

    p1_sub = tf1.add_paragraph()
    p1_sub.text = "Yeni Nesil B2B MICE Acente İşletim Sistemi & Finans Omurgası"
    p1_sub.font.size = Pt(22)
    p1_sub.font.color.rgb = C_ORANGE

    desc_box = s1.shapes.add_textbox(Inches(0.9), Inches(4.4), Inches(10.5), Inches(1.4))
    tf_desc = desc_box.text_frame
    tf_desc.word_wrap = True
    p_desc = tf_desc.paragraphs[0]
    p_desc.text = "TCMB 15:30 Canlı Kur Sabitleme, Otomatik Şoför WhatsApp Görev Emirleri, Tek Tıkla Excel Rooming Listesi Eşleme ve Sejour/ERP Entegrasyonu ile Operasyonel Hataları Sıfırlayan Bulut Çözümü."
    p_desc.font.size = Pt(13.5)
    p_desc.font.color.rgb = RGBColor(203, 213, 225)

    # 3 Stat Metrics at Bottom
    metrics = [
        ("0% Kur Zararı", "TCMB 15:30 Check-in Kuru Kilitleme"),
        ("%85 Zaman Tasarrufu", "Excel'den Tek Tıkla Rooming Eşleme"),
        ("Sıfır İletişim Hatası", "Rötara Duyarlı Otonom WhatsApp Emri"),
    ]
    for i, (m_val, m_lbl) in enumerate(metrics):
        mx = Inches(0.9 + i * 3.8)
        card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, mx, Inches(5.9), Inches(3.5), Inches(1.0))
        card.fill.solid()
        card.fill.fore_color.rgb = RGBColor(34, 34, 34)
        card.line.color.rgb = RGBColor(60, 60, 60)
        c_tf = card.text_frame
        c_tf.word_wrap = True
        cp1 = c_tf.paragraphs[0]
        cp1.text = m_val
        cp1.font.size = Pt(15)
        cp1.font.bold = True
        cp1.font.color.rgb = C_ORANGE
        cp2 = c_tf.add_paragraph()
        cp2.text = m_lbl
        cp2.font.size = Pt(10)
        cp2.font.color.rgb = RGBColor(160, 174, 192)

    # =========================================================================
    # SLIDE 2: SEKTÖRÜN PROBLEM VE RİSK ANALİZİ
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2, C_CREAM)
    add_header(s2, "Sektörel Zorluklar", "MICE Acentelerinin Karşılaştığı 4 Kritik Operasyonel Risk",
               "Geleneksel ve manuel yöntemlerle yönetilen MICE operasyonlarında yaşanan gelir kaybı ve insan hataları.")

    problems = [
        ("1. Kur Dalgalanması & Finansal Zarar",
         "Teklif tarihi ile misafirin otele giriş yaptığı (check-in) gün arasındaki kur farkı, acentenin kâr marjını tamamen eritir ve tedarikçi mutabakatlarında bütçe açığı yaratır.",
         C_ORANGE),
        ("2. Dağınık Excel & Rooming Kaosu",
         "Müşteri kurumlardan gelen karmaşık ve formatı bozuk Excel listelerini otel oda tiplerine (SGL/DBL/TWN) manuel eşlemek saatler alır; mükerrer oda ve no-show cezalarına yol açar.",
         C_DARK),
        ("3. Saha & Transfer İletişimsizliği",
         "Uçak rötarları havalimanındaki karşılama ekiplerine ve şoförlere anlık iletilemez; araç bekleme ücretleri, kaçırılan transferler ve müşteri şikayetleri oluşur.",
         C_DARK),
        ("4. Finansal Körlük & Geç Mutabakat",
         "Otel, transfer, rehber ve aktivite maliyetleri etkinlik bittikten haftalar sonra derlenebildiği için gerçek net kârlılık anlık olarak bilinemez ve nakit akışı bozulur.",
         C_DARK),
    ]

    for i, (p_title, p_desc, bar_col) in enumerate(problems):
        row = i // 2
        col = i % 2
        cx = Inches(0.9 + col * 5.8)
        cy = Inches(2.6 + row * 2.2)

        p_card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, cy, Inches(5.5), Inches(1.95))
        p_card.fill.solid()
        p_card.fill.fore_color.rgb = C_WHITE
        p_card.line.color.rgb = C_BORDER

        # Left accent stripe
        stripe = s2.shapes.add_shape(MSO_SHAPE.RECTANGLE, cx + Inches(0.02), cy + Inches(0.2), Inches(0.08), Inches(1.55))
        stripe.fill.solid()
        stripe.fill.fore_color.rgb = bar_col
        stripe.line.fill.background()

        ptf = p_card.text_frame
        ptf.word_wrap = True
        ptf.margin_left = Inches(0.25)
        pp1 = ptf.paragraphs[0]
        pp1.text = p_title
        pp1.font.size = Pt(14)
        pp1.font.bold = True
        pp1.font.color.rgb = C_DARK

        pp2 = ptf.add_paragraph()
        pp2.text = p_desc
        pp2.font.size = Pt(11)
        pp2.font.color.rgb = C_MUTED

    # =========================================================================
    # SLIDE 3: ÇÖZÜM MİMARİSİ — MICE AGENCY OS
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3, C_CREAM)
    add_header(s3, "Uçtan Uca Çözüm", "MICE Agency OS ile Tanışın: Acentenizin Akıllı Bulut Omurgası",
               "Satış teklifinden faturalandırmaya kadar tüm MICE ve kurumsal seyahat döngüsünü birbirine bağlayan tek platform.")

    pillars = [
        ("TCMB Kur Sabitleme", "Giriş günü saat 15:30 kurunu kilitleyerek kur farkı zararını sıfırlayan akıllı kur motoru."),
        ("Excel Rooming Otomasyonu", "Karmaşık katılımcı listelerini tek tıkla şablonlara dönüştüren akıllı eşleme altyapısı."),
        ("WhatsApp Şoför Görev Emri", "Uçuş API entegreli canlı rötar takibi ve şoför telefonuna giden otonom görev emri."),
        ("Canlı P&L ve Karlılık Analizi", "Her etkinliğin gelir, gider, otel, transfer ve rehber maliyetlerini anlık hesaplayan finans ekranı."),
        ("Online Müşteri Onay Portalı", "Kurumsal müşterilere interaktif teklif sunma, token onaylı kilit ve anında projeye dönüş."),
        ("Sejour & Muhasebe Köprüsü", "Sejour, Logo, Netsis ve Dia sistemleriyle çift yönlü konuşan entegrasyon havuzu."),
    ]

    for i, (pil_title, pil_desc) in enumerate(pillars):
        row = i // 3
        col = i % 3
        cx = Inches(0.9 + col * 3.85)
        cy = Inches(2.6 + row * 2.2)

        card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, cy, Inches(3.6), Inches(1.95))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_BORDER

        ctf = card.text_frame
        ctf.word_wrap = True
        ctf.margin_left = Inches(0.2)
        cp1 = ctf.paragraphs[0]
        cp1.text = f"✓  {pil_title}"
        cp1.font.size = Pt(13)
        cp1.font.bold = True
        cp1.font.color.rgb = C_DARK

        cp2 = ctf.add_paragraph()
        cp2.text = pil_desc
        cp2.font.size = Pt(10.5)
        cp2.font.color.rgb = C_MUTED

    # =========================================================================
    # SLIDE 4: DERİNLEMESİNE MODÜL 1 — TCMB CANLI KUR SABİTLEME
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4, C_CREAM)
    add_header(s4, "Finans & Kur Güvencesi", "TCMB Canlı Kur Sabitleme: Kur Riski Kalkanı",
               "Dövizli teklif hazırlayan ve TL harcama yapan MICE acenteleri için kur farkı zararını sıfırlayan mekanizma.")

    # Left Column: Features
    f_box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(2.5), Inches(5.8), Inches(4.3))
    f_box.fill.solid()
    f_box.fill.fore_color.rgb = C_WHITE
    f_box.line.color.rgb = C_BORDER
    ftf = f_box.text_frame
    ftf.word_wrap = True
    ftf.margin_left = Inches(0.3)
    ftf.margin_top = Inches(0.3)

    p = ftf.paragraphs[0]
    p.text = "Nasıl Çalışır?"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = C_DARK

    bullets1 = [
        "Otomatik 15:30 Kur Çekimi: TCMB'nin her iş günü saat 15:30'da yayımladığı gösterge niteliğindeki efektif satış kurları sisteme otomatik akar.",
        "Check-in Günü Sabitleme: Misafirlerin otele giriş yaptığı tarihteki kur baz alınarak projeye kilitlenir; daha sonraki dalgalanmalar maliyet bütçesini etkilemez.",
        "Fatura Farkı & Sapma Analizi: Teklif günü kuru ile fatura kesim tarihindeki kur farkı kuruşu kuruşuna raporlanır.",
        "Otel ve Tedarikçi Mutabakatı: Tedarikçilere ödenecek dövizli ve TL tutarlar tek ekrandan eşleştirilerek kur uyuşmazlıkları önlenir.",
    ]
    for b in bullets1:
        bp = ftf.add_paragraph()
        bp.text = f"• {b}"
        bp.font.size = Pt(11)
        bp.font.color.rgb = C_DARK
        bp.space_before = Pt(8)

    # Right Column: Visual Simulation Box
    sim_box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.0), Inches(2.5), Inches(5.4), Inches(4.3))
    sim_box.fill.solid()
    sim_box.fill.fore_color.rgb = C_DARK
    sim_box.line.color.rgb = C_DARK
    stf = sim_box.text_frame
    stf.word_wrap = True
    stf.margin_left = Inches(0.35)
    stf.margin_top = Inches(0.35)

    sp1 = stf.paragraphs[0]
    sp1.text = "CANLI SİSTEM SİMÜLASYONU"
    sp1.font.size = Pt(11)
    sp1.font.bold = True
    sp1.font.color.rgb = C_ORANGE

    sim_lines = [
        ("Etkinlik:", "Global Finans Zirvesi 2026 (Antalya)"),
        ("Grup Check-in:", "24 Kasım 2026 - 180 Pax"),
        ("TCMB EUR/TRY:", "€ 38.4520 (Saat 15:30 Sabitlendi)"),
        ("TCMB USD/TRY:", "$ 35.1200 (Saat 15:30 Sabitlendi)"),
        ("Kur Kilitleme:", "ONAYLANDI (Sistem Kilitlendi ✓)"),
        ("Kur Riski Koruma:", "€ 4.250,00 Net Tasarruf"),
    ]
    for lbl, val in sim_lines:
        lp = stf.add_paragraph()
        lp.text = f"{lbl} {val}"
        lp.font.size = Pt(12)
        lp.font.color.rgb = C_WHITE
        lp.space_before = Pt(8)

    # =========================================================================
    # SLIDE 5: DERİNLEMESİNE MODÜL 2 — TRANSFER & WHATSAPP GÖREV EMRİ
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5, C_CREAM)
    add_header(s5, "Saha & Lojistik", "Uçuş API Entegrasyonu & Şoför WhatsApp Görev Emri",
               "Havalimanı karşılamalarında rötar stresine son veren tam otonom transfer koordinasyon altyapısı.")

    t_cards = [
        ("1. Canlı Uçuş Entegrasyonu",
         "THY, Pegasus, SunExpress ve uluslararası hava yolu API'leriyle uçuş numarasını yazmanız yeterlidir. Sistem rötarları, kapı numaralarını ve erken inişleri saniyelik takip eder.",
         "Uçuş No: TK2412 | Canlı Rötar: +45 Dk | Revize İniş: 14:15"),
        ("2. Akıllı Araç & Pax Dağılımı",
         "Aynı zaman diliminde inen misafirleri araç kapasitesine göre (Vito 6 Pax, Sprinter 16 Pax, Midibüs 27 Pax) otomatik gruplar ve rotayı en verimli şekilde optimize eder.",
         "Araç: 34 MICE 01 (Sprinter 16 Pax) | Doluluk: 14/16"),
        ("3. Otonom WhatsApp Görev Emri",
         "Şoförün telefonuna uygulama yüklemeden doğrudan WhatsApp üzerinden karşılama tabelası, misafir isimleri, uçuş kodu ve otel bırakış noktası interaktif mesajla iletilir.",
         "Şoför: 'Görev alındı' butonuna tıklar, operasyon paneli anlık yeşile döner."),
    ]

    for i, (tc_title, tc_desc, tc_code) in enumerate(t_cards):
        cx = Inches(0.9 + i * 3.85)
        card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, Inches(2.5), Inches(3.6), Inches(4.3))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_BORDER

        ctf = card.text_frame
        ctf.word_wrap = True
        ctf.margin_left = Inches(0.25)
        ctf.margin_top = Inches(0.25)

        p = ctf.paragraphs[0]
        p.text = tc_title
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_DARK

        p2 = ctf.add_paragraph()
        p2.text = tc_desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = C_MUTED
        p2.space_before = Pt(8)

        # Code/Simulation box
        p3 = ctf.add_paragraph()
        p3.text = f"\n[Örnek Veri]:\n{tc_code}"
        p3.font.size = Pt(9.5)
        p3.font.color.rgb = C_ORANGE
        p3.space_before = Pt(12)

    # =========================================================================
    # SLIDE 6: DERİNLEMESİNE MODÜL 3 — EXCEL ROOMING LİSTESİ EŞLEME
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6, C_CREAM)
    add_header(s6, "Otel & Konaklama", "Tek Tıkla Excel Rooming Listesi Eşleme Motoru",
               "Yüzlerce kişilik katılımcı listelerini format farkı gözetmeksizin saniyeler içinde hatasız oda şablonuna çevirin.")

    # 3-Step Process Graphic
    steps = [
        ("ADIM 1: Dağınık Excel Yükleme",
         "Müşterinizden gelen liste hangi sütun düzeninde olursa olsun (İsim-Soyisim birleşik, T.C. başta, giriş tarihi farklı formatta) sisteme sürükleyip bırakın."),
        ("ADIM 2: Akıllı Sütun Eşleştirme",
         "MICE OS şablon motoru 'Ad', 'Soyad', 'Oda Tipi', 'Giriş', 'Çıkış' ve 'Özel İstek' sütunlarını otomatik algılar ve oda konfigürasyonuna (SGL/DBL) eşler."),
        ("ADIM 3: Otel Formatında Matbu Çıktı",
         "Otele doğrudan iletilebilecek standart rooming listesini Excel veya PDF formatında tek tıkla üretin. Mükerrer kayıt ve oda tipi karmaşasını sıfırlayın."),
    ]

    for i, (st_title, st_desc) in enumerate(steps):
        cx = Inches(0.9 + i * 3.85)
        card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, Inches(2.6), Inches(3.6), Inches(3.2))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_BORDER

        ctf = card.text_frame
        ctf.word_wrap = True
        ctf.margin_left = Inches(0.25)
        ctf.margin_top = Inches(0.3)

        p = ctf.paragraphs[0]
        p.text = st_title
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = C_ORANGE

        p2 = ctf.add_paragraph()
        p2.text = st_desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = C_MUTED
        p2.space_before = Pt(8)

    # Bottom Stat Callout Bar
    bar = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.9), Inches(6.0), Inches(11.5), Inches(0.9))
    bar.fill.solid()
    bar.fill.fore_color.rgb = C_DARK
    bar.line.color.rgb = C_DARK
    btf = bar.text_frame
    btf.word_wrap = True
    bp = btf.paragraphs[0]
    bp.text = "⚡  SAHA SONUCU: 250 kişilik bir kongre grubunun rooming listesi hazırlığı 4 saatten sadece 45 saniyeye iner."
    bp.font.size = Pt(13)
    bp.font.bold = True
    bp.font.color.rgb = C_WHITE
    bp.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 7: DERİNLEMESİNE MODÜL 4 — PROJE BÜTÇELEME & CANLI P&L
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7, C_CREAM)
    add_header(s7, "Finansal Hakimiyet", "Etkinlik Karlılığı ve Canlı Gelir/Gider (P&L) Yönetimi",
               "Etkinliğin son gününü beklemeden, her kalemin kâr marjını ve maliyet sapmasını anlık olarak takip edin.")

    # 4 Financial Cards
    f_cards = [
        ("Otel & Konaklama Bütçesi", "Oda başı maliyet, ek yatak, kontenjan kotaları ve komisyon hesaplamaları.", "Otel Cari Bakiyesi Anlık Eşlenir"),
        ("Transfer & Filo Maliyeti", "Şoför yevmiyesi, akaryakıt, otoyol geçişleri ve araç kiralama giderleri.", "Araç Başı Karlılık Oranı Çıkar"),
        ("Rehber & Aktivite Bütçesi", "Rehber taban ücretleri, müze/ören yeri biletleri, gala yemeği ve ikramlar.", "Kişi Başı Net Maliyet Hesaplanır"),
        ("Tedarikçi Cari Mutabakatı", "Tedarikçi faturalarının onay havuzuna düşmesi ve Sejour/ERP senkronizasyonu.", "Döviz / TL Farkı Kapatılır"),
    ]

    for i, (fc_title, fc_desc, fc_stat) in enumerate(f_cards):
        cx = Inches(0.9 + i * 2.85)
        card = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, Inches(2.6), Inches(2.65), Inches(3.8))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_BORDER

        ctf = card.text_frame
        ctf.word_wrap = True
        ctf.margin_left = Inches(0.2)
        ctf.margin_top = Inches(0.25)

        p = ctf.paragraphs[0]
        p.text = fc_title
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = C_DARK

        p2 = ctf.add_paragraph()
        p2.text = fc_desc
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = C_MUTED
        p2.space_before = Pt(8)

        p3 = ctf.add_paragraph()
        p3.text = f"\n✓ {fc_stat}"
        p3.font.size = Pt(10)
        p3.font.bold = True
        p3.font.color.rgb = C_EMERALD
        p3.space_before = Pt(12)

    # =========================================================================
    # SLIDE 8: ENTEGRASYON VE BULUT MİMARİSİ
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8, C_CREAM)
    add_header(s8, "Teknoloji Mimarisi", "Acentenizin Mevcut Sistemleriyle Kusursuz Entegrasyon",
               "MICE OS var olan yazılımlarınızı çöpe atmaz; onları tek bir akıllı platformda birbirine bağlar.")

    integrations = [
        ("TCMB Canlı Kur Servisi", "Her iş günü 15:30 gösterge kurlarını otomatik çeker ve projelere kilitler."),
        ("Sejour Acente Sistemi", "Otel rezervasyonları ve münferit konaklama kayıtlarını çift yönlü aktarır."),
        ("THY & Pegasus Uçuş API", "Canlı uçuş durumu, kalkış/varış ve rötar bilgilerini anlık çeker."),
        ("WhatsApp Business Cloud API", "Şoför görev emirleri ve müşteri bilgilendirmelerini otonom iletir."),
        ("Logo, Netsis & Dia ERP", "Onaylanan cari hesap mutabakatlarını muhasebe sisteminize işler."),
        ("Supabase & PostgreSQL Cloud", "Uluslararası bankacılık düzeyinde veri güvenliği, yedekleme ve izolasyon."),
    ]

    for i, (in_title, in_desc) in enumerate(integrations):
        row = i // 3
        col = i % 3
        cx = Inches(0.9 + col * 3.85)
        cy = Inches(2.6 + row * 2.1)

        card = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, cy, Inches(3.6), Inches(1.85))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_BORDER

        ctf = card.text_frame
        ctf.word_wrap = True
        ctf.margin_left = Inches(0.2)
        cp1 = ctf.paragraphs[0]
        cp1.text = f"🔌  {in_title}"
        cp1.font.size = Pt(12.5)
        cp1.font.bold = True
        cp1.font.color.rgb = C_DARK

        cp2 = ctf.add_paragraph()
        cp2.text = in_desc
        cp2.font.size = Pt(10)
        cp2.font.color.rgb = C_MUTED
        cp2.space_before = Pt(4)

    # =========================================================================
    # SLIDE 9: RAKAMLARLA ROI VE SAHA KAZANIMLARI
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9, C_CREAM)
    add_header(s9, "Yatırım Getirisi", "MICE Agency OS Yatırımının Acentenize Somut Geri Dönüşü",
               "MICE OS kullanan acentelerin ilk 60 gün içinde elde ettiği ölçülebilir operasyonel kazanımlar.")

    roi_stats = [
        ("%85", "Zaman Tasarrufu", "Rooming listesi eşleme ve transfer planlama süresinde net düşüş."),
        ("%0", "Kur Farkı Zararı", "Giriş günü kur sabitleme mekanizmasıyla sıfır finansal kur açığı."),
        ("3 Kat", "Hızlı Teklif Dönüşü", "Müşteriye özel online teklif linkiyle satış döngüsünde hızlanma."),
        ("%100", "Saha Koordinasyonu", "WhatsApp görev emirleri sayesinde sıfır kayıp transfer ve no-show."),
    ]

    for i, (val, lbl, sub) in enumerate(roi_stats):
        cx = Inches(0.9 + i * 2.85)
        card = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, Inches(2.6), Inches(2.65), Inches(3.8))
        card.fill.solid()
        card.fill.fore_color.rgb = C_WHITE
        card.line.color.rgb = C_BORDER

        ctf = card.text_frame
        ctf.word_wrap = True
        ctf.margin_left = Inches(0.2)
        ctf.margin_top = Inches(0.3)

        p = ctf.paragraphs[0]
        p.text = val
        p.font.size = Pt(36)
        p.font.bold = True
        p.font.color.rgb = C_ORANGE

        p2 = ctf.add_paragraph()
        p2.text = lbl
        p2.font.size = Pt(14)
        p2.font.bold = True
        p2.font.color.rgb = C_DARK
        p2.space_before = Pt(4)

        p3 = ctf.add_paragraph()
        p3.text = sub
        p3.font.size = Pt(10.5)
        p3.font.color.rgb = C_MUTED
        p3.space_before = Pt(8)

    # =========================================================================
    # SLIDE 10: LİSANSLAMA VE PAKETLER (TEKLİF SEÇENEKLERİ)
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10, C_CREAM)
    add_header(s10, "Yatırım Seçenekleri", "MICE OS Lisanslama & Hizmet Paketleri",
               "Acentenizin operasyon hacmine ve ekip büyüklüğüne göre ölçeklenen şeffaf lisanslama modelleri.")

    tiers = [
        ("Starter MICE", "€ 199 / Ay", "Butik Acenteler İçin",
         ["2 Kullanıcı Hesabı", "Münferit Konaklama & Sejour Aktarımı", "Hızlı Teklif Hazırlama Portalı", "Excel Rooming Listesi Eşleme", "Standart Destek Hattı"],
         False),
        ("MICE Pro (Önerilen)", "€ 399 / Ay", "Büyüyen Profesyonel Acenteler",
         ["5 Kullanıcı Hesabı", "TCMB Canlı Kur Sabitleme Motoru", "Akıllı Transfer & WhatsApp Görev Emri", "Uçuş API Canlı Rötar Takibi", "Canlı P&L & Karlılık Raporları", "Öncelikli 7/24 Destek"],
         True),
        ("Enterprise Ekosistem", "€ 599 / Ay", "Büyük Kongre & Grup Firmaları",
         ["Sınırsız Kullanıcı Hesabı", "Tüm MICE Pro Özellikleri Dahil", "Özel ERP / Muhasebe Entegrasyonu (Logo/Netsis)", "Özel SLA & Dedicated Sunucu Altyapısı", "Kişisel Müşteri Temsilcisi & Saha Eğitimi"],
         False),
    ]

    for i, (t_name, t_price, t_sub, t_feats, is_pop) in enumerate(tiers):
        cx = Inches(0.9 + i * 3.85)
        card = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, Inches(2.5), Inches(3.6), Inches(4.3))
        card.fill.solid()
        card.fill.fore_color.rgb = C_DARK if is_pop else C_WHITE
        card.line.color.rgb = C_ORANGE if is_pop else C_BORDER

        ctf = card.text_frame
        ctf.word_wrap = True
        ctf.margin_left = Inches(0.25)
        ctf.margin_top = Inches(0.25)

        p = ctf.paragraphs[0]
        p.text = t_name
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_ORANGE if is_pop else C_DARK

        p_pr = ctf.add_paragraph()
        p_pr.text = t_price
        p_pr.font.size = Pt(20)
        p_pr.font.bold = True
        p_pr.font.color.rgb = C_WHITE if is_pop else C_DARK

        p_s = ctf.add_paragraph()
        p_s.text = t_sub
        p_s.font.size = Pt(9.5)
        p_s.font.color.rgb = RGBColor(160, 174, 192) if is_pop else C_MUTED
        p_s.space_before = Pt(2)

        for feat in t_feats:
            fp = ctf.add_paragraph()
            fp.text = f"✓  {feat}"
            fp.font.size = Pt(10)
            fp.font.color.rgb = C_WHITE if is_pop else C_DARK
            fp.space_before = Pt(4)

    # =========================================================================
    # SLIDE 11: CANLI DEMO & İLETİŞİM (KAPANIŞ SLAYTI)
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    set_slide_background(s11, C_DARK)

    # Accent Strip
    bar = s11.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.9), Inches(1.0), Inches(1.5), Inches(0.08))
    bar.fill.solid()
    bar.fill.fore_color.rgb = C_ORANGE
    bar.line.fill.background()

    c_box = s11.shapes.add_textbox(Inches(0.9), Inches(1.3), Inches(11.5), Inches(2.2))
    ctf = c_box.text_frame
    ctf.word_wrap = True
    cp = ctf.paragraphs[0]
    cp.text = "Acentenizi Geleceğin Teknolojisiyle\nBuluşturmaya Hazır mısınız?"
    cp.font.size = Pt(36)
    cp.font.bold = True
    cp.font.color.rgb = C_WHITE

    sub_cp = ctf.add_paragraph()
    sub_cp.text = "MICE Agency OS canlı demosu için hemen randevu planlayın. Kendi operasyonel verilerinizle sistemi 15 dakikada test edin."
    sub_cp.font.size = Pt(14)
    sub_cp.font.color.rgb = RGBColor(203, 213, 225)
    sub_cp.space_before = Pt(10)

    # Contact Info Cards
    contacts = [
        ("Web Sitesi", "https://www.codeicon.co", "Canlı Bilgi & Ekosistem"),
        ("E-Posta", "hello@codeicon.co", "Kurumsal Teklif & Demo"),
        ("Telefon & WhatsApp", "+90 (533) 889 99 44", "Hızlı Destek & Randevu"),
    ]
    for i, (c_label, c_val, c_sub) in enumerate(contacts):
        cx = Inches(0.9 + i * 3.85)
        card = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, Inches(4.5), Inches(3.6), Inches(1.8))
        card.fill.solid()
        card.fill.fore_color.rgb = RGBColor(34, 34, 34)
        card.line.color.rgb = RGBColor(60, 60, 60)
        ctf = card.text_frame
        ctf.word_wrap = True
        ctf.margin_left = Inches(0.25)
        ctf.margin_top = Inches(0.2)

        p = ctf.paragraphs[0]
        p.text = c_label
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = C_ORANGE

        p2 = ctf.add_paragraph()
        p2.text = c_val
        p2.font.size = Pt(13)
        p2.font.bold = True
        p2.font.color.rgb = C_WHITE
        p2.space_before = Pt(4)

        p3 = ctf.add_paragraph()
        p3.text = c_sub
        p3.font.size = Pt(9.5)
        p3.font.color.rgb = RGBColor(160, 174, 192)
        p3.space_before = Pt(2)

    # Save presentation
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    out_file = sys.argv[1] if len(sys.argv) > 1 else "/Users/arifari/Desktop/MICE_OS_Kurumsal_Sunum_2026.pptx"
    create_presentation(out_file)
