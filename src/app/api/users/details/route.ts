import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/middleware/validator";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

// export async function GET(request: NextRequest) {
//   const validationResponse = await validateToken(request);
//   if (validationResponse instanceof NextResponse) {
//     return validationResponse; // Return the validation error response
//   }

//   const { userId } = validationResponse;

//   // Proceed with the protected route logic
//   const user = await User.findById(userId)
//     .select("-otp")
//     .select("-apiToken")
//     .select("-password")
//     ;
//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   return NextResponse.json({ message: "User Details fetched", user, success: true});
// }

export async function GET(request: NextRequest) {
  const validationResponse = await validateToken(request);
  if (validationResponse instanceof NextResponse) {
    return validationResponse; // Return the validation error response
  }

  const { userId } = validationResponse;

  // Proceed with the protected route logic
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Protected data", user });
}
