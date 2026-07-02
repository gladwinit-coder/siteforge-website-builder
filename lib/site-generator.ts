// Static Site Generator — builds HTML pages from website data

export async function buildStaticSite(website: any, domain: any) {
  const files: Record<string, string> = {};
  const enabled = (website.sections || []).filter((s: any) => s.enabled).sort((a: any, b: any) => a.order - b.order);

  files["index.html"] = generatePage(website, domain.domainName, enabled);
  files["about.html"] = generateAboutPage(website, domain.domainName);
  files["services.html"] = generateServicesPage(website, domain.domainName);
  files["contact.html"] = generateContactPage(website, domain.domainName);
  files["sitemap.xml"] = generateSitemap(domain.domainName);
  files["robots.txt"] = `User-agent: *\nAllow: /\nSitemap: https://${domain.domainName}/sitemap.xml`;

  return { files, pageCount: Object.keys(files).length };
}

function generatePage(w: any, domain: string, sections: any[]): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${w.seoTitle || w.businessName}</title>
  <meta name="description" content="${w.seoDescription || ""}">
  <meta name="keywords" content="${(w.keywords || []).join(", ")}">
  <meta property="og:title" content="${w.seoTitle || w.businessName}">
  <meta property="og:url" content="https://${domain}">
  <link rel="canonical" href="https://${domain}">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif;color:#1f2937}
    nav{background:${w.primaryColor || "#2563eb"};padding:16px 32px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
    .logo{color:#fff;font-size:20px;font-weight:700;text-decoration:none}
    .nav-links a{color:rgba(255,255,255,.9);margin-left:24px;text-decoration:none;font-size:14px}
    .hero{background:linear-gradient(135deg,${w.primaryColor || "#2563eb"},#1e40af);color:#fff;padding:80px 32px;text-align:center}
    .hero h1{font-size:48px;font-weight:700;margin-bottom:16px}
    .hero p{font-size:18px;opacity:.9;max-width:600px;margin:0 auto 32px}
    .btn{display:inline-block;padding:14px 32px;border-radius:8px;font-weight:600;text-decoration:none;transition:all .2s}
    .btn-white{background:#fff;color:${w.primaryColor || "#2563eb"}}
    section{padding:64px 32px}
    section:nth-child(even){background:#f9fafb}
    h2{font-size:32px;font-weight:700;text-align:center;margin-bottom:32px}
    .services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;max-width:1200px;margin:0 auto}
    .card{background:#fff;border-radius:12px;padding:24px;border:1px solid #e5e7eb}
    .card h3{font-size:18px;font-weight:600;margin-bottom:8px;color:${w.primaryColor || "#2563eb"}}
    footer{background:#111827;color:#fff;padding:40px 32px;text-align:center}
    .wa{position:fixed;bottom:24px;right:24px;background:#25d366;color:#fff;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;text-decoration:none;z-index:999}
    @media(max-width:768px){.hero h1{font-size:32px}.nav-links{display:none}}
  </style>
</head>
<body>
<nav>
  <a href="/" class="logo">${w.businessName}</a>
  <div class="nav-links">
    <a href="/">Home</a><a href="/about.html">About</a>
    <a href="/services.html">Services</a><a href="/contact.html">Contact</a>
  </div>
</nav>
<div class="hero">
  <h1>${w.heroTitle || w.tagline || w.businessName}</h1>
  <p>${w.heroSubtitle || w.about || ""}</p>
  <a href="/contact.html" class="btn btn-white">Get In Touch</a>
</div>
${(w.services || []).length ? `<section>
  <h2>Our Services</h2>
  <div class="services-grid">
    ${(w.services || []).map((s: any) => `<div class="card"><h3>${s.title}</h3><p>${s.description || ""}</p></div>`).join("")}
  </div>
</section>` : ""}
<section>
  <h2>About Us</h2>
  <p style="max-width:700px;margin:0 auto;text-align:center;color:#4b5563">${w.about || ""}</p>
</section>
<section id="contact">
  <h2>Contact Us</h2>
  <p style="text-align:center">${w.phone ? "📞 " + w.phone + " &nbsp; " : ""}${w.email ? "📧 " + w.email : ""}</p>
</section>
${w.whatsapp ? `<a href="https://wa.me/${w.whatsapp.replace(/\D/g,"")}" class="wa" target="_blank">💬</a>` : ""}
<footer>© ${new Date().getFullYear()} ${w.businessName}. All rights reserved. Built with SiteForge.</footer>
</body></html>`;
}

function generateAboutPage(w: any, domain: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>About | ${w.businessName}</title><meta name="description" content="${w.about || ""}"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Inter,sans-serif;color:#1f2937}nav{background:${w.primaryColor||"#2563eb"};padding:16px 32px}.logo{color:#fff;font-size:20px;font-weight:700;text-decoration:none}section{padding:64px 32px;max-width:900px;margin:0 auto}h1{font-size:40px;font-weight:700;margin-bottom:24px}p{color:#4b5563;line-height:1.7;font-size:16px}</style></head><body><nav><a href="/" class="logo">${w.businessName}</a></nav><section><h1>About Us</h1><p>${w.about || "We are committed to excellence."}</p></section></body></html>`;
}

function generateServicesPage(w: any, domain: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Services | ${w.businessName}</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Inter,sans-serif;color:#1f2937}nav{background:${w.primaryColor||"#2563eb"};padding:16px 32px}.logo{color:#fff;font-size:20px;font-weight:700;text-decoration:none}section{padding:64px 32px}h1{font-size:40px;font-weight:700;text-align:center;margin-bottom:40px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;max-width:1100px;margin:0 auto}.card{background:#fff;border-radius:12px;padding:24px;border:1px solid #e5e7eb}.card h3{font-size:18px;font-weight:600;color:${w.primaryColor||"#2563eb"};margin-bottom:8px}</style></head><body><nav><a href="/" class="logo">${w.businessName}</a></nav><section><h1>Our Services</h1><div class="grid">${(w.services||[]).map((s:any)=>`<div class="card"><h3>${s.title}</h3><p>${s.description||""}</p></div>`).join("")}</div></section></body></html>`;
}

function generateContactPage(w: any, domain: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Contact | ${w.businessName}</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Inter,sans-serif;color:#1f2937}nav{background:${w.primaryColor||"#2563eb"};padding:16px 32px}.logo{color:#fff;font-size:20px;font-weight:700;text-decoration:none}section{padding:64px 32px;max-width:700px;margin:0 auto}h1{font-size:40px;font-weight:700;margin-bottom:32px}p{margin-bottom:12px;color:#374151}input,textarea{width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;margin-bottom:12px;font-family:Inter,sans-serif}button{background:${w.primaryColor||"#2563eb"};color:#fff;border:none;padding:12px 28px;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer}</style></head><body><nav><a href="/" class="logo">${w.businessName}</a></nav><section><h1>Contact Us</h1>${w.phone?`<p>📞 ${w.phone}</p>`:""}${w.email?`<p>📧 ${w.email}</p>`:""}${w.address?`<p>📍 ${w.address}</p>`:""}${w.whatsapp?`<p>💬 <a href="https://wa.me/${w.whatsapp.replace(/\D/g,"")}">WhatsApp Us</a></p>`:""}<form style="margin-top:32px"><input type="text" placeholder="Your Name"><input type="email" placeholder="Your Email"><textarea rows="5" placeholder="Your Message"></textarea><button type="submit">Send Message</button></form></section></body></html>`;
}

function generateSitemap(domain: string): string {
  const pages = ["", "about", "services", "contact"];
  const now = new Date().toISOString().split("T")[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>https://${domain}/${p ? p + ".html" : ""}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>${p === "" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>`;
    }
