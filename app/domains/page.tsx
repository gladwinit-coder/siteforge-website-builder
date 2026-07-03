import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DomainsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", fontFamily:"Inter,system-ui,sans-serif" }}>
      <nav style={{ background:"#fff", borderBottom:"1px solid #e2e8f0", padding:"0 32px", display:"flex", alignItems:"center", height:"56px" }}>
        <Link href="/dashboard" style={{ fontWeight:800, fontSize:"18px", color:"#1e3a5f", textDecoration:"none" }}>Site<span style={{ color:"#2563eb" }}>Forge</span></Link>
        <div style={{ marginLeft:"auto", display:"flex", gap:"16px" }}>
          <Link href="/dashboard" style={{ color:"#64748b", textDecoration:"none", fontSize:"13px" }}>Dashboard</Link>
          <Link href="/builder" style={{ color:"#64748b", textDecoration:"none", fontSize:"13px" }}>Builder</Link>
          <Link href="/api/auth/signout" style={{ background:"#f1f5f9", color:"#64748b", padding:"6px 14px", borderRadius:"8px", fontSize:"13px", textDecoration:"none" }}>Sign out</Link>
        </div>
      </nav>
      <div style={{ maxWidth:"900px", margin:"40px auto", padding:"0 24px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"32px" }}>
          <div>
            <h1 style={{ fontSize:"24px", fontWeight:700, color:"#1e293b", margin:0 }}>Domains</h1>
            <p style={{ color:"#64748b", fontSize:"14px", marginTop:"4px" }}>Connect your GoDaddy domain to deploy your website</p>
          </div>
          <button style={{ background:"#2563eb", color:"#fff", border:"none", padding:"10px 20px", borderRadius:"8px", fontSize:"14px", fontWeight:600, cursor:"pointer" }}>
            + Add Domain
          </button>
        </div>

        {/* DNS Guide */}
        <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:"12px", padding:"24px", marginBottom:"24px" }}>
          <h2 style={{ fontSize:"16px", fontWeight:600, color:"#1d4ed8", margin:"0 0 12px" }}>📡 GoDaddy DNS Setup for maize-cargo.com</h2>
          <p style={{ fontSize:"13px", color:"#3730a3", margin:"0 0 12px" }}>Add these records in your GoDaddy DNS panel:</p>
          <div style={{ background:"#fff", borderRadius:"8px", padding:"16px", fontFamily:"monospace", fontSize:"13px" }}>
            <div style={{ marginBottom:"8px", display:"flex", gap:"32px" }}>
              <span style={{ color:"#6366f1", width:"60px" }}>Type</span>
              <span style={{ color:"#6366f1", width:"60px" }}>Name</span>
              <span style={{ color:"#6366f1" }}>Value</span>
            </div>
            <div style={{ marginBottom:"6px", display:"flex", gap:"32px" }}>
              <span style={{ width:"60px" }}>A</span>
              <span style={{ width:"60px" }}>@</span>
              <span>76.76.21.21</span>
            </div>
            <div style={{ display:"flex", gap:"32px" }}>
              <span style={{ width:"60px" }}>CNAME</span>
              <span style={{ width:"60px" }}>www</span>
              <span>cname.vercel-dns.com</span>
            </div>
          </div>
        </div>

        {/* Empty state */}
        <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", padding:"60px 24px", textAlign:"center" }}>
          <div style={{ fontSize:"48px", marginBottom:"16px" }}>🌐</div>
          <h3 style={{ fontSize:"18px", fontWeight:600, color:"#1e293b", margin:"0 0 8px" }}>No domains yet</h3>
          <p style={{ color:"#64748b", fontSize:"14px", margin:"0 0 24px" }}>Add a domain to deploy your SiteForge website live</p>
          <button style={{ background:"#2563eb", color:"#fff", border:"none", padding:"12px 24px", borderRadius:"8px", fontSize:"14px", fontWeight:600, cursor:"pointer" }}>
            + Add Your First Domain
          </button>
        </div>
      </div>
    </div>
  );
            }
