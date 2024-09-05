import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { validateToken } from "@/middleware/validator";

connect();
export async function PUT(
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
    // Parse the request body to get the updated user data
    const reqBody = await request.json();
    const { name, email, username } = reqBody;

    const slug = params.id;
    // Find the user in the database
    const user = await User.findOne({ _id: slug });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user information only if different from current values
    let isUpdated = false;
    if (name && name !== user.name) {
      user.name = name;
      isUpdated = true;
    }
    if (email && email !== user.email) {
      user.email = email;
      isUpdated = true;
    }
    if (username && username !== user.username) {
      user.username = username;
      isUpdated = true;
    }

    // Save the updated user information only if there were changes
    if (isUpdated) {
      const savedUser = await user.save();
      return NextResponse.json({
        message: "User updated successfully",
        success: true,
        data: savedUser,
      });
    } else {
      return NextResponse.json({
        message: "No changes detected",
        success: true,
      });
    }
  } catch (error: any) {
    // Handle other errors and return an error response
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}