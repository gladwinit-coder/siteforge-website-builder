import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

const templates = [
  { id:"business", name:"Business Pro", desc:"Clean professional look for B2B companies", color:"#2563eb", emoji:"💼", tags:["Corporate","Services","B2B"] },
  { id:"ecommerce", name:"Shop Ready", desc:"Product showcase with contact & inquiry forms", color:"#16a34a", emoji:"🛍️", tags:["Products","E-Commerce","Catalog"] },
  { id:"portfolio", name:"Portfolio", desc:"Showcase your work and services elegantly", color:"#7c3aed", emoji:"🎨", tags:["Creative","Portfolio","Agency"] },
  { id:"restaurant", name:"Restaurant", desc:"Menu, hours, location for food businesses", color:"#dc2626", emoji:"🍽️", tags:["Food","Local","Menu"] },
  { id:"logistics", name:"Logistics Pro", desc:"Fleet, routes, and tracking for logistics", color:"#0891b2", emoji:"🚛", tags:["Logistics","Shipping","Tracking"] },
  { id:"realestate", name:"Real Estate", desc:"Property listings and agent profiles", color:"#d97706", emoji:"🏠", tags:["Property","Real Estate","Listings"] },
];

export default async function TemplatesPage() {
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
      <div style={{ maxWidth:"1100px", margin:"40px auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:"40px" }}>
          <h1 style={{ fontSize:"28px", fontWeight:700, color:"#1e293b", margin:0 }}>Choose a Template</h1>
          <p style={{ color:"#64748b", fontSize:"15px", marginTop:"8px" }}>Start with a professionally designed template, then customize it</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"20px" }}>
          {templates.map(t => (
            <div key={t.id} style={{ background:"#fff", borderRadius:"16px", border:"1px solid #e2e8f0", overflow:"hidden", transition:"transform 0.2s" }}>
              <div style={{ height:"140px", background:`linear-gradient(135deg,${t.color}22,${t.color}44)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"56px" }}>
                {t.emoji}
              </div>
              <div style={{ padding:"20px" }}>
                <h3 style={{ fontSize:"16px", fontWeight:600, color:"#1e293b", margin:"0 0 6px" }}>{t.name}</h3>
                <p style={{ fontSize:"13px", color:"#64748b", margin:"0 0 12px" }}>{t.desc}</p>
                <div style={{ display:"flex", gap:"6px", marginBottom:"16px", flexWrap:"wrap" }}>
                  {t.tags.map(tag => (
                    <span key={tag} style={{ background:"#f1f5f9", color:"#475569", padding:"2px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:500 }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display:"flex", gap:"8px" }}>
                  <button style={{ flex:1, background:t.color, color:"#fff", border:"none", padding:"10px", borderRadius:"8px", fontSize:"13px", fontWeight:600, cursor:"pointer" }}>
                    Use Template
                  </button>
                  <button style={{ padding:"10px 14px", background:"#f1f5f9", border:"none", borderRadius:"8px", fontSize:"13px", cursor:"pointer", color:"#374151" }}>
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
