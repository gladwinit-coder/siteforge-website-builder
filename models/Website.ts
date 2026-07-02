import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWebsite extends Document {
  domainId: Types.ObjectId;
  userId: Types.ObjectId;
  businessName: string;
  tagline?: string;
  about?: string;
  category?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  googleMapLink?: string;
  socialLinks?: { facebook?:string; instagram?:string; linkedin?:string; twitter?:string; youtube?:string };
  openingHours?: { day:string; open:string; close:string; closed:boolean }[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  ogImage?: string;
  template: "corporate"|"mobile-shop"|"restaurant"|"portfolio"|"landing"|"cargo";
  primaryColor: string;
  fontFamily: string;
  logoUrl?: string;
  bannerUrl?: string;
  services?: { title:string; description?:string; icon?:string }[];
  aiGenerated: boolean;
  status: "draft"|"building"|"published"|"unpublished"|"failed";
  publishedAt?: Date;
}

const WebsiteSchema = new Schema<IWebsite>(
  {
    domainId: { type: Schema.Types.ObjectId, ref: "Domain", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    businessName: { type: String, trim: true, default: "" },
    tagline: String, about: String, category: String,
    heroTitle: String, heroSubtitle: String,
    phone: String, whatsapp: String, email: String, address: String, googleMapLink: String,
    socialLinks: { facebook:String, instagram:String, linkedin:String, twitter:String, youtube:String },
    openingHours: [{ day:String, open:String, close:String, closed:{ type:Boolean, default:false } }],
    seoTitle: String, seoDescription: String, keywords: [String], ogImage: String,
    template: { type:String, enum:["corporate","mobile-shop","restaurant","portfolio","landing","cargo"], default:"corporate" },
    primaryColor: { type:String, default:"#2563eb" },
    fontFamily: { type:String, default:"Inter" },
    logoUrl: String, bannerUrl: String,
    services: [{ title:{ type:String, required:true }, description:String, icon:String }],
    aiGenerated: { type:Boolean, default:false },
    status: { type:String, enum:["draft","building","published","unpublished","failed"], default:"draft" },
    publishedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Website || mongoose.model<IWebsite>("Website", WebsiteSchema);
