import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PublishPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", fontFamily:"Inter,system-ui,sans-serif" }}>
      <nav style={{ background:"#fff", borderBottom:"1px solid #e2e8f0", padding:"0 32px", display:"flex", alignItems:"center", height:"56px" }}>
        <Link href="/dashboard" style={{ fontWeight:800, fontSize:"18px", color:"#1e3a5f", textDecoration:"none" }}>Site<span style={{ color:"#2563eb" }}>Forge</span></Link>
        <div style={{ marginLeft:"auto", display:"flex", gap:"16px" }}>
          <Link href="/dashboard" style={{ color:"#64748b", textDecoration:"none", fontSize:"13px" }}>Dashboard</Link>
          <Link href="/domains" style={{ color:"#64748b", textDecoration:"none", fontSize:"13px" }}>Domains</Link>
          <Link href="/api/auth/signout" style={{ background:"#f1f5f9", color:"#64748b", padding:"6px 14px", borderRadius:"8px", fontSize:"13px", textDecoration:"none" }}>Sign out</Link>
        </div>
      </nav>
      <div style={{ maxWidth:"700px", margin:"60px auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:"40px" }}>
          <div style={{ fontSize:"56px", marginBottom:"16px" }}>🚀</div>
          <h1 style={{ fontSize:"28px", fontWeight:700, color:"#1e293b", margin:0 }}>Publish Your Website</h1>
          <p style={{ color:"#64748b", fontSize:"15px", marginTop:"8px" }}>Deploy your site live to your custom domain</p>
        </div>

        {/* Steps checklist */}
        <div style={{ background:"#fff", borderRadius:"16px", border:"1px solid #e2e8f0", padding:"32px", marginBottom:"24px" }}>
          <h2 style={{ fontSize:"16px", fontWeight:600, color:"#1e293b", margin:"0 0 20px" }}>Pre-launch Checklist</h2>
          {[
            { done: false, label:"Build your website with the builder", link:"/builder" },
            { done: false, label:"Connect your domain (maize-cargo.com)", link:"/domains" },
            { done: false, label:"Configure DNS in GoDaddy", link:"/domains" },
            { done: false, label:"Preview your website", link:"/builder" },
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"12px 0", borderBottom: i < 3 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ width:"20px", height:"20px", borderRadius:"50%", border:`2px solid ${item.done ? "#16a34a" : "#d1d5db"}`, background: item.done ? "#16a34a" : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {item.done && <span style={{ color:"#fff", fontSize:"11px" }}>✓</span>}
              </div>
              <span style={{ flex:1, fontSize:"14px", color: item.done ? "#16a34a" : "#374151" }}>{item.label}</span>
              <Link href={item.link} style={{ fontSize:"12px", color:"#2563eb", textDecoration:"none" }}>Set up →</Link>
            </div>
          ))}
        </div>

        <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:"12px", padding:"24px", marginBottom:"24px" }}>
          <h3 style={{ fontSize:"15px", fontWeight:600, color:"#15803d", margin:"0 0 8px" }}>✅ How publishing works</h3>
          <ol style={{ margin:0, paddingLeft:"20px", fontSize:"13px", color:"#166534", lineHeight:"1.8" }}>
            <li>Build your website in the Website Builder</li>
            <li>Add your GoDaddy domain in the Domains section</li>
            <li>Update GoDaddy DNS records as instructed</li>
            <li>Click Publish — your site goes live in seconds!</li>
          </ol>
        </div>

        <div style={{ display:"flex", gap:"12px" }}>
          <button disabled style={{ flex:1, background:"#9ca3af", color:"#fff", border:"none", padding:"14px", borderRadius:"10px", fontSize:"15px", fontWeight:600, cursor:"not-allowed" }}>
            🚀 Publish (Complete checklist first)
          </button>
          <Link href="/builder" style={{ padding:"14px 20px", background:"#f1f5f9", color:"#374151", borderRadius:"10px", fontSize:"14px", fontWeight:500, textDecoration:"none" }}>
            ← Back to Builder
          </Link>
        </div>
      </div>
    </div>
  );
            }
