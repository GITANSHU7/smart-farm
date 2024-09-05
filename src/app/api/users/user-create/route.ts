import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/middleware/validator";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


connect();


export async function POST(request: NextRequest) {
  const validationResponse = await validateToken(request);
  if (validationResponse instanceof NextResponse) {
    return validationResponse; // Return the validation error response
  }

  const { userId } = validationResponse;
  try {
    const reqBody = await request.json();
    const { name, email, username } = reqBody;
    // Check for unique username and email using findOne with a filter object
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      const existingField = existingUser.email === email ? "Email" : "Username";
      return NextResponse.json(
        { error: `${existingField} already exists` },
        { status: 400 }
      );
    }

    // const salt = await bcryptjs.genSalt(10);
    // const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
    //   password: hashedPassword,
      username,
    });
    const savedUser = await newUser.save();
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      data: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
