import { createHash } from "crypto";

export async function deployToVercel({ files, domainName, projectName }: {
  files: Record<string, string>;
  domainName: string;
  projectName: string;
}) {
  const token = process.env.VERCEL_API_TOKEN!;
  const teamId = process.env.VERCEL_TEAM_ID;
  const base = "https://api.vercel.com";
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  const qs = teamId ? `?teamId=${teamId}` : "";

  // Step 1: Upload all files
  const fileUploads = await Promise.all(
    Object.entries(files).map(async ([filename, content]) => {
      const body = Buffer.from(content, "utf-8");
      // Use Node.js crypto (not browser crypto.subtle)
      const sha = createHash("sha1").update(body).digest("hex");
      
      await fetch(`${base}/v2/files`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/octet-stream",
          "x-vercel-digest": sha,
          "Content-Length": String(body.length),
        },
        body,
      });
      return { file: filename, sha, size: body.length };
    })
  );

  // Step 2: Create deployment
  const deployRes = await fetch(`${base}/v13/deployments${qs}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: projectName,
      files: fileUploads,
      projectSettings: { framework: null },
      target: "production",
    }),
  });
  const deployment = await deployRes.json();
  if (!deployRes.ok) throw new Error(deployment.error?.message || "Vercel deploy failed");

  // Step 3: Add custom domain
  await fetch(`${base}/v10/projects/${projectName}/domains${qs}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name: domainName }),
  });

  return { id: deployment.id, url: deployment.url };
}
