import { NextResponse } from "next/server";

const DEV_NO_STORE =
  "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";

export function proxy() {
  const response = NextResponse.next();

  if (process.env.NODE_ENV === "development") {
    response.headers.set("Cache-Control", DEV_NO_STORE);
    response.headers.set("CDN-Cache-Control", DEV_NO_STORE);
    response.headers.set("Vercel-CDN-Cache-Control", DEV_NO_STORE);
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Clear-Site-Data", '"cache", "storage"');
  }

  return response;
}

export const config = {
  matcher: "/:path*",
};
