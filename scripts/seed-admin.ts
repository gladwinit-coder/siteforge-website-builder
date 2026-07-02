// Run: npx tsx scripts/seed-admin.ts
// Creates the initial admin user in MongoDB

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD!;

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Missing env: MONGODB_URI, ADMIN_EMAIL, ADMIN_INITIAL_PASSWORD");
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

async function seedAdmin() {
  await mongoose.connect(MONGODB_URI, { dbName: "siteforge" });
  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log("✅ Admin already exists:", ADMIN_EMAIL);
    process.exit(0);
  }

  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await User.create({ name: "Admin", email: ADMIN_EMAIL, password: hashed, role: "admin" });
  console.log("✅ Admin created:", ADMIN_EMAIL);
  process.exit(0);
}

seedAdmin().catch((e) => { console.error(e); process.exit(1); });
