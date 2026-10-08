import crypto from "crypto";

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  sanitizedName: string;
  mimeType: string;
  extension: string;
}

// Magic bytes signatures for trusted media formats
export function inspectMagicBytes(buffer: Buffer): { mime: string; ext: string } | null {
  if (buffer.length >= 8 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4E &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0D &&
      buffer[5] === 0x0A &&
      buffer[6] === 0x1A &&
      buffer[7] === 0x0A) {
    return { mime: "image/png", ext: "png" };
  }

  if (buffer.length >= 3 &&
      buffer[0] === 0xFF &&
      buffer[1] === 0xD8 &&
      buffer[2] === 0xFF) {
    return { mime: "image/jpeg", ext: "jpg" };
  }

  if (buffer.length >= 4 &&
      buffer[0] === 0x47 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46) {
    return { mime: "image/gif", ext: "gif" };
  }

  if (buffer.length >= 12 &&
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP") {
    return { mime: "image/webp", ext: "webp" };
  }

  if (buffer.length >= 4 &&
      buffer[0] === 0x00 &&
      buffer[1] === 0x00 &&
      buffer[2] === 0x01 &&
      buffer[3] === 0x00) {
    return { mime: "image/x-icon", ext: "ico" };
  }

  return null;
}

// Sanitize SVG and ensure it doesn't contain scripts, event handlers, or foreign elements
export function sanitizeSvg(content: string): boolean {
  const lower = content.toLowerCase();
  // Check for SVG tag
  if (!lower.includes("<svg") || !lower.includes("</svg>")) {
    return false;
  }
  // Disallow scripts, objects, embeds, iframes, and event handlers
  const forbiddenPatterns = [
    /<script\b/i,
    /<\/script>/i,
    /javascript:/i,
    /data:/i,
    /<iframe\b/i,
    /<object\b/i,
    /<embed\b/i,
    /<foreignobject\b/i,
    /onload\s*=/i,
    /onerror\s*=/i,
    /onclick\s*=/i,
    /onmouseover\s*=/i,
  ];

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(lower)) {
      return false;
    }
  }

  return true;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export function validateImageUpload(buffer: Buffer, originalFileName: string): FileValidationResult {
  if (buffer.length === 0) {
    return { valid: false, error: "Dosya içeriği boş olamaz.", sanitizedName: "", mimeType: "", extension: "" };
  }

  if (buffer.length > MAX_IMAGE_SIZE) {
    return { valid: false, error: "Dosya boyutu 5 MB'dan büyük olamaz.", sanitizedName: "", mimeType: "", extension: "" };
  }

  const rawExt = (originalFileName.split(".").pop() || "").toLowerCase();

  // Handle SVG specifically
  if (rawExt === "svg") {
    const text = buffer.toString("utf-8");
    if (!sanitizeSvg(text)) {
      return {
        valid: false,
        error: "Güvenlik Uyarısı: SVG dosyasında zararlı veya geçersiz komutlar tespit edildi.",
        sanitizedName: "",
        mimeType: "",
        extension: "",
      };
    }

    const randomSuffix = crypto.randomBytes(16).toString("hex");
    const sanitizedBase = originalFileName
      .replace(/\.svg$/i, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 40);
    const sanitizedName = `${sanitizedBase}-${randomSuffix}.svg`;

    return {
      valid: true,
      sanitizedName,
      mimeType: "image/svg+xml",
      extension: "svg",
    };
  }

  // Check magic bytes for binary images
  const inspected = inspectMagicBytes(buffer);
  if (!inspected) {
    return {
      valid: false,
      error: "Güvenlik Uyarısı: Geçersiz veya desteklenmeyen görsel formatı! Yalnızca PNG, JPEG, GIF, WEBP, ICO veya güvenli SVG yüklenebilir.",
      sanitizedName: "",
      mimeType: "",
      extension: "",
    };
  }

  // Generate cryptographically secure unguessable name
  const randomSuffix = crypto.randomBytes(16).toString("hex");
  const sanitizedBase = originalFileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 40);
  const sanitizedName = `${sanitizedBase}-${randomSuffix}.${inspected.ext}`;

  return {
    valid: true,
    sanitizedName,
    mimeType: inspected.mime,
    extension: inspected.ext,
  };
}
