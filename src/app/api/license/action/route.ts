import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/middleware/validator";
import { connect } from "@/dbConfig/dbConfig";
import License from "@/models/licenseModel";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  const validationResponse = await validateToken(request);
  if (validationResponse instanceof NextResponse) {
    return validationResponse; // Return the validation error response
  }

  const { userId } = validationResponse;

  try {
    const reqBody = await request.json();
    const ids = reqBody.ids;
    const status = reqBody.status;
    const updateStatus = await License.updateMany(
      { _id: { $in: ids } },
      { isActive: status }
    );
    return NextResponse.json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
