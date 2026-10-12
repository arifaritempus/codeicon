import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    // Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Lütfen adınızı ve soyadınızı belirtin." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Lütfen geçerli bir e-posta adresi girin." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Lütfen mesajınızı veya operasyonel ihtiyaçlarınızı yazın." },
        { status: 400 }
      );
    }

    // Send email via Hostinger SMTP
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? String(phone).trim() : undefined,
      company: company ? String(company).trim() : undefined,
      message: message.trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Mesajınız başarıyla iletildi.",
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        error:
          "Mesaj gönderilirken bir hata oluştu: " +
          (error?.message || "Lütfen daha sonra tekrar deneyin."),
      },
      { status: 500 }
    );
  }
}
