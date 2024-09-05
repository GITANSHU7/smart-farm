import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/app/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, name } = reqBody;

    // Check if all required fields are provided
    if (!username || !email || !password || !name) {
      return NextResponse.json(
        { error: "All fields (username, email, password, name) are required" },
        { status: 400 }
      );
    }

    // Check if password length is at least 6 characters
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    console.log(reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    console.log(username, "sadfr");

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      name,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      data: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/app/helpers/mailer";

// connect();

// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();
//     const { username, email, password, name } = reqBody;

//     console.log(reqBody);

//     //check if user already exists
//     const user = await User.findOne({ email });

//     if (user) {
//       return NextResponse.json(
//         { error: "User already exists" },
//         { status: 400 }
//       );
//     }
//     console.log(username, "sadfr");

//     //hash password
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(password, salt);

//     // send error message if password is not entered

//     const newUser = new User({
//       username,
//       email,
//       name,
//       password: hashedPassword,
//     });

//     const savedUser = await newUser.save();
//     console.log(savedUser);

//     //send verification email

//     await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

//     return NextResponse.json({
//       message: "User created successfully",
//       success: true,
//       data: savedUser,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
