import { sendEmail, sendResetPasswordEmail } from "@/app/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();
// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();
//     const { email } = reqBody;

//     console.log(reqBody);

//     //check if user exists
//     const user = await User.findOne({ email });

//     if (!user) {
//       return NextResponse.json(
//         { error: "User does not exist" },
//         { status: 400 }
//       );
//     }

//     await sendResetPasswordEmail({ email });

//     return NextResponse.json({
//       message: "Email sent successfully",
//       success: true,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    console.log(reqBody);

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log(user._id, "user Id");

        await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "Email sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
