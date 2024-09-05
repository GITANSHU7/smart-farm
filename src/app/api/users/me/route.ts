import { getDataFromToken } from "@/app/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { validateToken } from "@/middleware/validator";

connect();

export async function GET(request: NextRequest) {
  
   const validationResponse = await validateToken(request);
   if (validationResponse instanceof NextResponse) {
     return validationResponse; // Return the validation error response
   }

   const { userId } = validationResponse;
    try {
    
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
