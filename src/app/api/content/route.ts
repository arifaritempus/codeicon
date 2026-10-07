import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const contentFilePath = path.join(process.cwd(), "src/data/siteContent.json");

export async function GET() {
  try {
    const fileData = fs.readFileSync(contentFilePath, "utf8");
    const json = JSON.parse(fileData);
    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read content file" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    fs.writeFileSync(contentFilePath, JSON.stringify(body, null, 2), "utf8");
    return NextResponse.json({ success: true, message: "Content updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
