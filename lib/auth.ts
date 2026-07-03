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
          const conn = await connectDB();

          // Use native MongoDB driver to bypass Mongoose select:false
          const db = conn.connection.db;
          const user = await db.collection("users").findOne(
            { email: String(credentials.email).toLowerCase().trim() },
            { projection: { _id: 1, name: 1, email: 1, password: 1, role: 1, isActive: 1 } }
          );

          if (!user) {
            console.log("[Auth] User not found:", credentials.email);
            return null;
          }

          if (!user.isActive) {
            console.log("[Auth] User inactive:", credentials.email);
            return null;
          }

          if (!user.password) {
            console.log("[Auth] No password stored for:", credentials.email);
            return null;
          }

          const valid = await bcrypt.compare(
            String(credentials.password),
            String(user.password)
          );

          if (!valid) {
            console.log("[Auth] Wrong password for:", credentials.email);
            return null;
          }

          console.log("[Auth] Login success:", credentials.email);
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || "User",
            role: user.role || "user",
          };
        } catch (error) {
          console.error("[Auth] Error:", error);
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
