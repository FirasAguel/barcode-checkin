import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  // Get the file path securely
  const filePath = path.join(process.cwd(), "data", "attendees.json");

  // Read the file (ensure this path exists)
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const attendees = JSON.parse(data);

    return NextResponse.json(attendees);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load attendees" }, { status: 500 });
  }
}
