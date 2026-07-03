import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const { connectDB } = await import("./db");
          await connectDB();

          // Use mongoose directly to bypass select:false restriction
          const mongoose = (await import("mongoose")).default;
          const UserModel = mongoose.models.User || 
            (await import("@/models/User") as any).default;

          // Explicitly select password field
          const user = await UserModel
            .findOne({ email: String(credentials.email).toLowerCase() })
            .select("name email password role isActive")
            .lean();

          if (!user || !user.password) {
            console.log("User not found or no password:", credentials.email);
            return null;
          }

          if (!user.isActive) {
            console.log("User inactive:", credentials.email);
            return null;
          }

          const valid = await bcrypt.compare(
            String(credentials.password), 
            user.password
          );
          
          if (!valid) {
            console.log("Invalid password for:", credentials.email);
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: { signIn: "/login", error: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
