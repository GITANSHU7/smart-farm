import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { validateToken } from "@/middleware/validator";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  const validationResponse = await validateToken(request);
  if (validationResponse instanceof NextResponse) {
    return validationResponse; // Return the validation error response
  }

  const { userId } = validationResponse;
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    // remove the apiToken from the user
    await User.findByIdAndUpdate(userId, { apiToken: "" }); 
     response.cookies.set("token", "", {
       httpOnly: true,
       expires: new Date(0),
     });
    return response; 
  
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
