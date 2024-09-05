import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import jose, { SignJWT } from "jose";
import { createSecretKey } from "crypto";

connect();

function generateOTP() {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();
//     const { email, password } = reqBody;
//     console.log(reqBody);

//     //check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json(
//         { error: "User does not exist" },
//         { status: 400 }
//       );
//     }
//     console.log("user exists");

//     //check if password is correct
//     const validPassword = await bcryptjs.compare(password, user.password);
//     if (!validPassword) {
//       return NextResponse.json({ error: "Invalid password" }, { status: 400 });
//     }
//     console.log(user);

//     //create token data
//     const tokenData = {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     };
//     //create token
//     const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
//       expiresIn: "1d",
//     });

//     const response = NextResponse.json({
//       message: "Login successful",
//       success: true,
//     });
//     response.cookies.set("token", token, {
//       httpOnly: true,
//     });
//     return response;
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("user exists");

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    // console.log(user);

    // // Generate a JWT
    // const token = jwt.sign(
    //   { id: user._id, email: user.email },
    //   process.env.TOKEN_SECRET!,
    //   { expiresIn: "1d" }
    // );
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

    // create token using jose
    const newToken = await new SignJWT({
      id: user._id,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
    //   .setIssuer("localhost")
    //   .setAudience("localhost")
      .setExpirationTime("1d")
      .sign(createSecretKey(secret));

    user.apiToken = newToken;
    await user.save();
    // add cookie to the response

    // Set token in the response header
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user,
    });
    // response.headers.set("Authorization", `Bearer ${token}`);
    response.cookies.set("token", newToken, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
