import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/middleware/validator";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { FM } from "@/utils/i18helper";

connect();

// export async function POST(request: NextRequest) {
//     const validationResponse = await validateToken(request);
//   if (validationResponse instanceof NextResponse) {
//     return validationResponse; // Return the validation error response
//   }

//   const { userId } = validationResponse;
//   try {
//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get("page") || "1", 10);
//     const per_page_record = parseInt(
//       searchParams.get("per_page_record") || "10",
//       10
//     );
//     const startIndex = (page - 1) * per_page_record;
//     const total = await User.countDocuments();
//     const user = await User.find()
//       .select("-password")
//       .sort({ createdAt: -1 })
//       .skip(startIndex)
//       .limit(per_page_record);;
//     return NextResponse.json({ message: FM("user-list"), data: user, total: total, success: true});
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }



export async function POST(request: NextRequest) {
  const validationResponse = await validateToken(request);
  if (validationResponse instanceof NextResponse) {
    return validationResponse; // Return the validation error response
  }

  const { userId } = validationResponse;

  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const per_page_record = searchParams.get("per_page_record");

    let users;
    let total;

    if (page && per_page_record) {
      const pageInt = parseInt(page);
      const perPageRecordInt = parseInt(per_page_record);
      const startIndex = (pageInt - 1) * perPageRecordInt;
      total = await User.countDocuments();
      users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(perPageRecordInt);
    } else {
      users = await User.find().select("-password").sort({ createdAt: -1 });
      total = users.length;
    }

    return NextResponse.json({
      message: "User list retrieved successfully",
      data: users,
      total: total,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}