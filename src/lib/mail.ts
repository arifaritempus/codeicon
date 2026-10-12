import nodemailer from "nodemailer";
import { getSiteContent } from "./contentStore";

export interface ContactMailPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export async function sendContactEmail(payload: ContactMailPayload) {
  const content = await getSiteContent();

  const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER || "hello@codeicon.co";
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || "..Q1w2E3r4..";
  const fromName = process.env.SMTP_FROM_NAME || content?.brand?.name || "CODEICON";
  const fromEmail = process.env.SMTP_FROM_EMAIL || smtpUser;

  // The email that should receive contact submissions
  const recipientEmail =
    content?.brand?.contactEmail ||
    content?.contact?.email ||
    process.env.SMTP_TO_EMAIL ||
    "hello@codeicon.co";

  const isSecure = smtpPort === 465;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: isSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const now = new Date();
  const dateFormatted = now.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Istanbul",
  });

  // Premium, modern Grovia-styled responsive HTML email
  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yeni İletişim Formu Mesajı</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F2EE; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1A1A1A;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F4F2EE; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 28px; border: 1px solid #E6E1DC; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.05); overflow: hidden;">
          
          <!-- Top Accent Bar (Grovia Signature Dark & Gold) -->
          <tr>
            <td style="background: linear-gradient(90deg, #1A1A1A 0%, #2A2E37 60%, #594C00 100%); height: 6px;"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 36px 36px 24px 36px; border-bottom: 1px solid #F0ECE6;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <!-- Brand Pill Badge -->
                    <span style="display: inline-block; padding: 5px 12px; background-color: #FEF7AF; color: #594C00; font-size: 11px; font-weight: 700; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.04em;">
                      Yeni İletişim Talebi
                    </span>
                    <h1 style="margin: 14px 0 6px 0; font-size: 24px; font-weight: 700; color: #1A1A1A; letter-spacing: -0.03em; line-height: 1.25;">
                      Web Sitesinden Yeni Mesaj Var
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #7A7570;">
                      ${dateFormatted} tarihinde web sitesi iletişim formundan gönderildi.
                    </p>
                  </td>
                  <td align="right" valign="top" style="width: 52px;">
                    <div style="width: 48px; height: 48px; border-radius: 14px; background-color: #1A1A1A; display: inline-block; text-align: center; line-height: 48px; color: #FEF7AF; font-size: 20px; font-weight: bold;">
                      ✉
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Details Grid -->
          <tr>
            <td style="padding: 28px 36px 12px 36px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                
                <!-- Ad Soyad -->
                <tr>
                  <td style="padding-bottom: 16px;">
                    <div style="font-size: 10px; font-weight: 700; color: #8C8C8C; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px;">
                      Gönderen Kişi
                    </div>
                    <div style="font-size: 16px; font-weight: 600; color: #1A1A1A;">
                      ${escapeHtml(payload.name || "Belirtilmedi")}
                    </div>
                  </td>
                </tr>

                <!-- E-Posta -->
                <tr>
                  <td style="padding-bottom: 16px;">
                    <div style="font-size: 10px; font-weight: 700; color: #8C8C8C; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px;">
                      E-Posta Adresi
                    </div>
                    <div style="font-size: 15px; color: #1A1A1A;">
                      <a href="mailto:${escapeHtml(payload.email)}" style="color: #1A1A1A; font-weight: 600; text-decoration: underline;">
                        ${escapeHtml(payload.email)}
                      </a>
                    </div>
                  </td>
                </tr>

                ${
                  payload.phone
                    ? `<!-- Telefon -->
                <tr>
                  <td style="padding-bottom: 16px;">
                    <div style="font-size: 10px; font-weight: 700; color: #8C8C8C; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px;">
                      Telefon Numarası
                    </div>
                    <div style="font-size: 15px; font-weight: 600; color: #1A1A1A;">
                      <a href="tel:${escapeHtml(payload.phone)}" style="color: #1A1A1A; text-decoration: none;">
                        ${escapeHtml(payload.phone)}
                      </a>
                    </div>
                  </td>
                </tr>`
                    : ""
                }

                ${
                  payload.company
                    ? `<!-- Firma / Acente -->
                <tr>
                  <td style="padding-bottom: 16px;">
                    <div style="font-size: 10px; font-weight: 700; color: #8C8C8C; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px;">
                      Firma / Acente Adı
                    </div>
                    <div style="font-size: 15px; font-weight: 600; color: #1A1A1A;">
                      ${escapeHtml(payload.company)}
                    </div>
                  </td>
                </tr>`
                    : ""
                }

              </table>
            </td>
          </tr>

          <!-- Message Box Section -->
          <tr>
            <td style="padding: 0 36px 32px 36px;">
              <div style="font-size: 10px; font-weight: 700; color: #8C8C8C; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">
                Operasyonel Talep & Mesaj İçeriği
              </div>
              <div style="background-color: #FAF9F6; border: 1px solid #EAE6E1; border-left: 4px solid #1A1A1A; border-radius: 16px; padding: 18px 22px; font-size: 14px; line-height: 1.6; color: #2A2A2A; white-space: pre-wrap; font-family: inherit;">
${escapeHtml(payload.message)}
              </div>
            </td>
          </tr>

          <!-- Action Button Row -->
          <tr>
            <td style="padding: 0 36px 36px 36px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="background-color: #1A1A1A; border-radius: 999px;">
                    <a href="mailto:${escapeHtml(payload.email)}?subject=Re:%20CODEICON%20%C4%B0leti%C5%9Fim%20Talebiniz" style="display: block; padding: 14px 28px; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; text-align: center; letter-spacing: 0.02em;">
                      Bu Mesajı E-Posta ile Yanıtla &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="background-color: #FAF9F6; padding: 22px 36px; border-top: 1px solid #F0ECE6; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #1A1A1A;">
                CODEICON — MICE & Seyahat Acentesi İşletim Sistemi
              </p>
              <p style="margin: 0; font-size: 11px; color: #8C8C8C;">
                Bu bildirim codeicon.co üzerindeki iletişim formundan otomatik olarak üretilmiştir.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Yeni İletişim Formu Mesajı (${dateFormatted})
--------------------------------------------------
Gönderen: ${payload.name}
E-Posta: ${payload.email}
${payload.phone ? `Telefon: ${payload.phone}\n` : ""}${payload.company ? `Firma: ${payload.company}\n` : ""}
Mesaj:
${payload.message}
--------------------------------------------------
Bu mesaj codeicon.co iletişim formundan gönderildi.`;

  const info = await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: recipientEmail,
    replyTo: payload.email,
    subject: `[Yeni Mesaj] ${payload.name} — Web İletişim Formu`,
    text,
    html,
  });

  return info;
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
