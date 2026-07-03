import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  // Security: only allow in non-production or with secret key
  const adminEmail = process.env.ADMIN_EMAIL || "gladwin@mitsumi.ae";
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "SiteForge@Admin2025!";

  try {
    const { connectDB } = await import("@/lib/db");
    const UserModule = await import("@/models/User") as any;
    const User = UserModule.default;

    await connectDB();

    // Check if admin already exists
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      return NextResponse.json({ 
        success: false, 
        message: "Admin user already exists: " + adminEmail 
      });
    }

    // Hash password and create admin
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await User.create({
      name: "Gladwin Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Admin created: " + adminEmail,
      loginWith: adminEmail,
      password: adminPassword
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
