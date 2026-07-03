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

          // Use raw MongoDB driver — bypasses Mongoose select:false on password field
          const user = await conn.connection.db
            .collection("users")
            .findOne(
              { email: String(credentials.email).toLowerCase().trim() },
              { projection: { _id: 1, name: 1, email: 1, password: 1, role: 1, isActive: 1 } }
            );

          if (!user || !user.password) return null;
          if (user.isActive === false) return null;

          const valid = await bcrypt.compare(
            String(credentials.password),
            String(user.password)
          );
          if (!valid) return null;

          return {
            id: String(user._id),
            email: user.email,
            name: user.name || "User",
            role: user.role || "user",
          };
        } catch (err) {
          console.error("[auth] authorize error:", err);
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
