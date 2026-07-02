import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)" }}>
      {/* Header */}
      <nav style={{ padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ color: "#fff", fontSize: "24px", fontWeight: 700, letterSpacing: "-0.5px" }}>
          Site<span style={{ color: "#93c5fd" }}>Forge</span>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/login" style={{ color: "rgba(255,255,255,.85)", textDecoration: "none", padding: "8px 16px", fontSize: "14px" }}>
            Sign In
          </Link>
          <Link href="/register" style={{ background: "#fff", color: "#1e3a5f", textDecoration: "none", padding: "8px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 600 }}>
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "80px 20px 60px", color: "#fff" }}>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,.15)", color: "#bfdbfe", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 500, marginBottom: "24px" }}>
          🚀 Static Website Builder & Publisher SaaS
        </div>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.15, marginBottom: "20px", maxWidth: "800px", margin: "0 auto 20px" }}>
          Build & Publish Your Website<br />
          <span style={{ color: "#93c5fd" }}>in Minutes</span>
        </h1>
        <p style={{ fontSize: "18px", opacity: 0.85, maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.6 }}>
          Enter your business details, pick a template, generate AI content, and deploy to your GoDaddy domain instantly — no coding required.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/register" style={{ background: "#fff", color: "#1e3a5f", textDecoration: "none", padding: "14px 32px", borderRadius: "10px", fontSize: "16px", fontWeight: 700 }}>
            Start Building Free →
          </Link>
          <Link href="/login" style={{ background: "rgba(255,255,255,.15)", color: "#fff", textDecoration: "none", padding: "14px 32px", borderRadius: "10px", fontSize: "16px", fontWeight: 600, border: "1px solid rgba(255,255,255,.3)" }}>
            Sign In
          </Link>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: "#fff", margin: "0 20px 0", borderRadius: "20px 20px 0 0", padding: "60px 40px" }}>
        <h2 style={{ textAlign: "center", fontSize: "32px", fontWeight: 700, color: "#1e3a5f", marginBottom: "48px" }}>
          Everything you need to go live
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
          {[
            { icon: "🤖", title: "AI Content Generation", desc: "Generate taglines, about text, services, SEO titles and FAQs with one click using OpenAI GPT-4o." },
            { icon: "🎨", title: "6 Pro Templates", desc: "Corporate, Cargo, Restaurant, Portfolio, Mobile Shop, Landing Page — fully customizable colors & fonts." },
            { icon: "🌐", title: "GoDaddy Domain Support", desc: "Connect your maize-cargo.com or any GoDaddy domain with step-by-step DNS instructions." },
            { icon: "🚀", title: "One-Click Publish", desc: "Build static HTML + deploy to Vercel CDN automatically. SSL certificate provisioned free." },
            { icon: "📐", title: "Drag-Drop Sections", desc: "Hero, About, Services, Gallery, Testimonials, FAQ, Contact — enable, disable and reorder sections." },
            { icon: "🖼", title: "Image Upload & Compress", desc: "Upload logo, banner, product images — auto-compressed via Cloudinary, delivered on global CDN." },
            { icon: "🔍", title: "Full SEO Control", desc: "Set meta titles, descriptions, keywords. Auto-generates sitemap.xml and robots.txt on publish." },
            { icon: "👁", title: "Live Preview", desc: "Preview your website across Desktop, Tablet, and Mobile before publishing." },
            { icon: "👮", title: "Admin Dashboard", desc: "Manage all users, domains, published sites and deployment logs from one admin panel." },
          ].map((f, i) => (
            <div key={i} style={{ background: "#f8fafc", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{f.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e3a5f", marginBottom: "8px" }}>{f.title}</h3>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* DNS Quick Reference */}
        <div style={{ maxWidth: "800px", margin: "60px auto 0", background: "#1e3a5f", borderRadius: "16px", padding: "32px", color: "#fff" }}>
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>🔧 GoDaddy DNS for maize-cargo.com</h3>
          <p style={{ opacity: 0.7, fontSize: "14px", marginBottom: "20px" }}>Add these two records in your GoDaddy DNS Manager:</p>
          <div style={{ background: "#0f2444", borderRadius: "10px", padding: "16px", fontFamily: "monospace", fontSize: "13px", lineHeight: 2 }}>
            <div><span style={{ color: "#93c5fd" }}>Type: A</span> &nbsp;&nbsp; | Host: @ &nbsp;&nbsp; | Value: <span style={{ color: "#34d399" }}>76.76.21.21</span> &nbsp;&nbsp; | TTL: 600</div>
            <div><span style={{ color: "#93c5fd" }}>Type: CNAME</span> | Host: www | Value: <span style={{ color: "#34d399" }}>cname.vercel-dns.com</span> | TTL: 600</div>
          </div>
          <p style={{ opacity: 0.6, fontSize: "12px", marginTop: "12px" }}>DNS propagates in 15–30 minutes. SSL auto-provisioned by Vercel.</p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <Link href="/register" style={{ background: "#2563eb", color: "#fff", textDecoration: "none", padding: "16px 40px", borderRadius: "12px", fontSize: "18px", fontWeight: 700, display: "inline-block" }}>
            Create Your Free Account →
          </Link>
          <p style={{ marginTop: "16px", color: "#94a3b8", fontSize: "13px" }}>
            Already have an account? <Link href="/login" style={{ color: "#2563eb", textDecoration: "none" }}>Sign in</Link>
          </p>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "60px", paddingTop: "24px", borderTop: "1px solid #e2e8f0", color: "#94a3b8", fontSize: "13px" }}>
          © {new Date().getFullYear()} SiteForge — Built for Mitsumi Distribution & Beyond
        </div>
      </div>
    </div>
  );
}
