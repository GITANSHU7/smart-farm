import { getDataFromToken } from "@/app/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { validateToken } from "@/middleware/validator";

connect();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
const validationResponse = await validateToken(request);
if (validationResponse instanceof NextResponse) {
  return validationResponse; // Return the validation error response
}

const { userId } = validationResponse;

  try {
    // write a code for update the user
    const reqBody = await request.json();
    const { name, email, password, username } = reqBody;
    const slug = params.id;
    const user = await User.findOne({ _id: slug });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    user.name = name;
    user.email = email;
    user.username = username;
    const savedUser = await user.save();
    return NextResponse.json({
      message: "User updated successfully",
      success: true,
      data: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
