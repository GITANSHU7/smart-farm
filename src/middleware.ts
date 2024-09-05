import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside

// connect();
const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log("path", path);

  const isPublicPath =
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password" ||
    path === "/reset-password" ||
    path === "/sign-up" ||
    path === "/verifyemail";

  const cookie = request.cookies.get("token")?.value || "";

  if (cookie) {
    let isValid = false;

    try {
      const data = await jwtVerify(cookie, secret, {
        // issuer: "localhost",
        // audience: "localhost",
      });
      console.log("data", data.payload);

      isValid = true;
    } catch (error) {
      isValid = false;
    }

    if (isValid) {
      if (isPublicPath) {
        return NextResponse.redirect(new URL("/admin/home", request.url));
      } else {
        return NextResponse.next();
      }
    } else {
      if (isPublicPath) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  } else {
    if (isPublicPath) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/login",
    "/dashboard",
    "/home",
    "/forget-password",
    "/reset-password",
    "/verifyemail",
    "/sign-up",
    "/user-list",
  ],
};
