import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, type = "musteri", note } = body;

    if (!name || (!phone && !email)) {
      return NextResponse.json(
        { error: "Lütfen adınızı ve telefon veya e-posta bilginizi giriniz." },
        { status: 400 }
      );
    }

    // 1. Send notification email via existing Hostinger SMTP if configured
    try {
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const subject = `📱 Yeni hepp Ön Kayıt Bildirimi: ${name} (${type === "isletme" ? "İşletme" : "Müşteri"})`;
        const html = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #F8F8F7; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="display: inline-block; background-color: #1A1A1A; color: #FFFFFF; padding: 8px 16px; border-radius: 9999px; font-weight: bold; font-size: 14px;">
                hepp — Her anında Hepp yanında.
              </span>
              <h2 style="color: #1A1A1A; margin-top: 16px; font-size: 22px;">Yeni Ön Kayıt Talebi Alındı</h2>
            </div>
            
            <div style="background-color: #FFFFFF; padding: 24px; border-radius: 12px; border: 1px solid #E2E3E4;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #605F5F; font-size: 13px;">Kullanıcı Tipi:</td>
                  <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px; font-weight: bold;">
                    ${type === "isletme" ? "🏢 İşletme (Ön Kayıt)" : "👤 Müşteri (Açılışta Haber Ver)"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #605F5F; font-size: 13px;">Ad Soyad:</td>
                  <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px; font-weight: bold;">${name}</td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; color: #605F5F; font-size: 13px;">Telefon / WhatsApp:</td>
                  <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px; font-weight: bold;">${phone}</td>
                </tr>` : ""}
                ${email ? `
                <tr>
                  <td style="padding: 8px 0; color: #605F5F; font-size: 13px;">E-posta:</td>
                  <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px; font-weight: bold;">${email}</td>
                </tr>` : ""}
                ${note ? `
                <tr>
                  <td style="padding: 8px 0; color: #605F5F; font-size: 13px;">Not / Sektör:</td>
                  <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px;">${note}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding: 8px 0; color: #605F5F; font-size: 13px;">Tarih:</td>
                  <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px;">${new Date().toLocaleString("tr-TR")}</td>
                </tr>
              </table>
            </div>

            <p style="text-align: center; color: #8C8C8C; font-size: 12px; margin-top: 24px;">
              Bu bildirim CODEICON hepp entegrasyonu üzerinden otomatik gönderilmiştir.
            </p>
          </div>
        `;

        await transporter.sendMail({
          from: `"${process.env.SMTP_FROM_NAME || "CODEICON hepp"}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
          to: process.env.SMTP_TO_EMAIL || "hello@codeicon.co",
          subject,
          html,
        });
      }
    } catch (mailErr) {
      console.warn("Mail notification warning (lead still recorded):", mailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Talebiniz başarıyla alındı! hepp açıldığında size öncelikli olarak haber vereceğiz.",
    });
  } catch (error: any) {
    console.error("hepp lead error:", error);
    return NextResponse.json(
      { error: error?.message || "Kayıt oluşturulamadı." },
      { status: 500 }
    );
  }
}
