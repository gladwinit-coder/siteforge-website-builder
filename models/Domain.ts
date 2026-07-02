import mongoose, { Schema, Document, Types } from "mongoose";

export type DomainStatus = "pending" | "verified" | "published" | "unpublished" | "failed";

export interface IDomain extends Document {
  domainName: string;
  subdomain: string;
  registrar: "godaddy" | "namecheap" | "google" | "cloudflare" | "other";
  userId: Types.ObjectId;
  websiteId?: Types.ObjectId;
  status: DomainStatus;
  dnsVerified: boolean;
  verifiedAt?: Date;
  publishedAt?: Date;
  liveUrl?: string;
  vercelProjectId?: string;
  vercelDeploymentId?: string;
  sslStatus: "none" | "pending" | "active";
}

const DomainSchema = new Schema<IDomain>(
  {
    domainName: { type: String, required: true, trim: true, lowercase: true },
    subdomain: { type: String, default: "www" },
    registrar: { type: String, enum: ["godaddy","namecheap","google","cloudflare","other"], default: "other" },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    websiteId: { type: Schema.Types.ObjectId, ref: "Website" },
    status: { type: String, enum: ["pending","verified","published","unpublished","failed"], default: "pending" },
    dnsVerified: { type: Boolean, default: false },
    verifiedAt: Date,
    publishedAt: Date,
    liveUrl: String,
    vercelProjectId: String,
    vercelDeploymentId: String,
    sslStatus: { type: String, enum: ["none","pending","active"], default: "none" },
  },
  { timestamps: true }
);

DomainSchema.index({ domainName: 1, userId: 1 }, { unique: true });

export default mongoose.models.Domain || mongoose.model<IDomain>("Domain", DomainSchema);
