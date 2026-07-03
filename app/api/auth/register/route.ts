import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const { connectDB } = await import("@/lib/db");
    await connectDB();
    const mongoose = (await import("mongoose")).default;
    const UserModel = mongoose.models.User || (await import("@/models/User") as any).default;

    const existing = await UserModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await UserModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
      isActive: true,
    });

    return NextResponse.json({ success: true, message: "Account created successfully" });
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
