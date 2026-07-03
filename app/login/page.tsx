"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#1e3a5f,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "420px", boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1e3a5f" }}>Site<span style={{ color: "#2563eb" }}>Forge</span></h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "6px" }}>Sign in to your account</p>
        </div>
        {error && <div style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px", fontSize: "13px" }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
              placeholder="gladwin@mitsumi.ae" />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>
          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "12px", background: loading ? "#93c5fd" : "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p style={{ textAlign: "center", fontSize: "13px", color: "#94a3b8", marginTop: "20px" }}>
          Don&apos;t have an account? <Link href="/register" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>Register</Link>
        </p>
      </div>
    </div>
  );
}
