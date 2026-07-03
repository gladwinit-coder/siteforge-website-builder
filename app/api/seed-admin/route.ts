import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  const adminEmail = process.env.ADMIN_EMAIL || "gladwin.it@gmail.com";
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "SiteForge@Admin2025!";

  try {
    const { connectDB } = await import("@/lib/db");
    const conn = await connectDB();
    const db = conn.connection.db;
    const users = db.collection("users");

    // Delete any old admin with old email
    await users.deleteMany({ email: { $in: ["gladwin@mitsumi.ae", "gladwin.it@gmail.com"] } });

    // Hash and create fresh admin
    const hashed = await bcrypt.hash(adminPassword, 12);
    await users.insertOne({
      name: "Gladwin Admin",
      email: adminEmail,
      password: hashed,
      role: "admin",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Admin user created",
      email: adminEmail,
      password: adminPassword,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
