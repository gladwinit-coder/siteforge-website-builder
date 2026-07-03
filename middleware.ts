export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/domains/:path*",
    "/builder/:path*",
    "/sections/:path*",
    "/templates/:path*",
    "/images/:path*",
    "/seo/:path*",
    "/preview/:path*",
    "/publish/:path*",
    "/admin/:path*",
  ],
};
