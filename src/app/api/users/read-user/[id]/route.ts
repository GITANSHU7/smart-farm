import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { validateToken } from "@/middleware/validator";


connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Validate the token
  const validationResponse = await validateToken(request);
  if (validationResponse instanceof NextResponse) {
    return validationResponse; // Return the validation error response
  }

  // Extract user ID from the validation response
  const { userId } = validationResponse;

  try {
     const slug = params.id;

    const user = await User.findOne({ _id: slug });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found successfully",
      success: true,
      data: user,
    });
  } catch (error: any) {
    // Handle other errors and return an error response
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
