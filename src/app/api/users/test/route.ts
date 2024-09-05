import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/middleware/validator";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
//      const validationResponse = await validateToken(request);
//   if (validationResponse instanceof NextResponse) {
//     return validationResponse; // Return the validation error response
//   }


try {
return NextResponse.json({ message: "Testing Route" });
} catch (error) {
  console.log(error);
}
}
