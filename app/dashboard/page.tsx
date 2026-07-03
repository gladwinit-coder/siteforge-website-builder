import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const user = session.user as any;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Header */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 32px", display: "flex", alignItems: "center", height: "56px" }}>
        <div style={{ fontWeight: 800, fontSize: "18px", color: "#1e3a5f" }}>Site<span style={{ color: "#2563eb" }}>Forge</span></div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "13px", color: "#64748b" }}>{user.email}</span>
          {user.role === "admin" && <span style={{ background: "#eff6ff", color: "#2563eb", padding: "2px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600 }}>Admin</span>}
          <Link href="/api/auth/signout" style={{ background: "#f1f5f9", color: "#64748b", padding: "6px 14px", borderRadius: "8px", fontSize: "13px", textDecoration: "none" }}>Sign out</Link>
        </div>
      </nav>

      <div style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
        {/* Sidebar */}
        <aside style={{ width: "220px", background: "#fff", borderRight: "1px solid #e2e8f0", padding: "16px 0", flexShrink: 0 }}>
          {[
            { href: "/dashboard", icon: "⬛", label: "Dashboard" },
            { href: "/domains", icon: "🌐", label: "Domains" },
            { href: "/builder", icon: "🔧", label: "Website Builder" },
            { href: "/templates", icon: "🎨", label: "Templates" },
            { href: "/images", icon: "🖼", label: "Images" },
            { href: "/seo", icon: "🔍", label: "SEO Settings" },
            { href: "/preview", icon: "👁", label: "Preview" },
            { href: "/publish", icon: "🚀", label: "Publish" },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 16px", color: "#4b5563", textDecoration: "none", fontSize: "13px", borderRadius: "6px", margin: "1px 8px" }}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
          {user.role === "admin" && (
            <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 16px", color: "#4b5563", textDecoration: "none", fontSize: "13px", borderRadius: "6px", margin: "1px 8px", borderTop: "1px solid #e2e8f0", marginTop: "8px", paddingTop: "16px" }}>
              <span>👮</span> Admin Panel
            </Link>
          )}
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: "32px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1e293b", marginBottom: "8px" }}>Welcome back, {user.name || user.email?.split("@")[0]}!</h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "32px" }}>Manage your websites from your SiteForge dashboard.</p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
            {[
              { label: "Total Websites", value: "0", sub: "Get started →", color: "#2563eb" },
              { label: "Published", value: "0", sub: "Live sites", color: "#16a34a" },
              { label: "Pending DNS", value: "0", sub: "Awaiting setup", color: "#d97706" },
              { label: "Domains", value: "0", sub: "Connected", color: "#7c3aed" },
            ].map(stat => (
              <div key={stat.label} style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "12px", fontWeight: 500, color: "#64748b" }}>{stat.label}</div>
                <div style={{ fontSize: "32px", fontWeight: 700, color: stat.color, margin: "4px 0" }}>{stat.value}</div>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", marginBottom: "16px" }}>Quick Actions</h2>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/domains" style={{ background: "#2563eb", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>+ Add Domain</Link>
              <Link href="/builder" style={{ background: "#f1f5f9", color: "#374151", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>✏️ Build Website</Link>
              <Link href="/publish" style={{ background: "#f1f5f9", color: "#374151", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>🚀 Publish</Link>
            </div>
          </div>

          {/* GoDaddy Notice */}
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "20px", marginTop: "20px" }}>
            <div style={{ fontWeight: 600, color: "#1d4ed8", marginBottom: "6px" }}>🌐 Connect maize-cargo.com from GoDaddy</div>
            <p style={{ fontSize: "13px", color: "#3b82f6", margin: "0 0 12px" }}>Add your GoDaddy domain and follow the DNS setup guide to go live.</p>
            <Link href="/domains" style={{ background: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: "6px", textDecoration: "none", fontSize: "13px", fontWeight: 500 }}>Set Up Domain →</Link>
          </div>
        </main>
      </div>
    </div>
  );
                     }
