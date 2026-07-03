import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BuilderPage() {
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
      <div style={{ maxWidth:"900px", margin:"40px auto", padding:"0 24px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"32px" }}>
          <div>
            <h1 style={{ fontSize:"24px", fontWeight:700, color:"#1e293b", margin:0 }}>Website Builder</h1>
            <p style={{ color:"#64748b", fontSize:"14px", marginTop:"4px" }}>Create your static website with AI assistance</p>
          </div>
          <Link href="/templates" style={{ background:"#2563eb", color:"#fff", padding:"10px 20px", borderRadius:"8px", fontSize:"14px", fontWeight:600, textDecoration:"none" }}>
            Browse Templates
          </Link>
        </div>

        {/* Steps */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px", marginBottom:"32px" }}>
          {[
            { step:"1", icon:"🎨", title:"Choose Template", desc:"Pick from pre-built designs or start blank" },
            { step:"2", icon:"✏️", title:"Customize", desc:"Edit content, colors, fonts and layout" },
            { step:"3", icon:"🚀", title:"Publish", desc:"Deploy to your domain with one click" },
          ].map(s => (
            <div key={s.step} style={{ background:"#fff", borderRadius:"12px", padding:"24px", border:"1px solid #e2e8f0", textAlign:"center" }}>
              <div style={{ fontSize:"32px", marginBottom:"8px" }}>{s.icon}</div>
              <div style={{ background:"#eff6ff", color:"#2563eb", borderRadius:"20px", padding:"2px 10px", fontSize:"11px", fontWeight:700, display:"inline-block", marginBottom:"8px" }}>Step {s.step}</div>
              <h3 style={{ fontSize:"14px", fontWeight:600, color:"#1e293b", margin:"0 0 4px" }}>{s.title}</h3>
              <p style={{ fontSize:"12px", color:"#64748b", margin:0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Business info form */}
        <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #e2e8f0", padding:"32px" }}>
          <h2 style={{ fontSize:"18px", fontWeight:600, color:"#1e293b", margin:"0 0 8px" }}>Tell us about your business</h2>
          <p style={{ fontSize:"13px", color:"#64748b", margin:"0 0 24px" }}>Our AI will generate the perfect website content for you</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
            {[
              { label:"Business Name", placeholder:"Mitsumi Distribution" },
              { label:"Industry", placeholder:"Distribution & Logistics" },
              { label:"Location", placeholder:"Dubai, UAE" },
              { label:"Primary Goal", placeholder:"Generate leads, showcase products..." },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display:"block", fontSize:"13px", fontWeight:500, color:"#374151", marginBottom:"6px" }}>{f.label}</label>
                <input type="text" placeholder={f.placeholder}
                  style={{ width:"100%", padding:"10px 14px", border:"1.5px solid #d1d5db", borderRadius:"8px", fontSize:"14px", fontFamily:"inherit", boxSizing:"border-box" }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop:"16px" }}>
            <label style={{ display:"block", fontSize:"13px", fontWeight:500, color:"#374151", marginBottom:"6px" }}>Business Description</label>
            <textarea placeholder="Describe your business, services, and what makes you unique..." rows={4}
              style={{ width:"100%", padding:"10px 14px", border:"1.5px solid #d1d5db", borderRadius:"8px", fontSize:"14px", fontFamily:"inherit", boxSizing:"border-box", resize:"vertical" }} />
          </div>
          <div style={{ marginTop:"24px", display:"flex", gap:"12px" }}>
            <button style={{ background:"#2563eb", color:"#fff", border:"none", padding:"12px 24px", borderRadius:"8px", fontSize:"14px", fontWeight:600, cursor:"pointer" }}>
              ✨ Generate with AI
            </button>
            <Link href="/templates" style={{ background:"#f1f5f9", color:"#374151", padding:"12px 24px", borderRadius:"8px", fontSize:"14px", fontWeight:500, textDecoration:"none" }}>
              Browse Templates Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
        }
