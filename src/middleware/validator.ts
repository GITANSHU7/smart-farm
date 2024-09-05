import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { SignJWT } from "jose";
import { createSecretKey } from "crypto";

// export async function validateToken(request: NextRequest) {
//   const authHeader = request.headers.get("Authorization");
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
//     return { userId: (decoded as any).id, email: (decoded as any).email };
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 401 }
//     );
//   }
// }
const secretKey = createSecretKey(Buffer.from(process.env.TOKEN_SECRET!, "utf-8"));

export async function validateToken(request: NextRequest, fromCookie = false) {
  let token = "";

  if (fromCookie) {
    token = request.cookies.get("token")?.value || "";
   
  } else {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    token = authHeader.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
    const userId = (decoded as any).id;
    const email = (decoded as any).email;


    // Retrieve the user from the database
    const user = await User.findById(userId);
    // if (!user) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    // Check if the token matches the one stored in the database
    if (user.apiToken !== token) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    return { userId, email };
  } catch (error) {

    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
