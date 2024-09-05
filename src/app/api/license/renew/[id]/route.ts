import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/middleware/validator";
import { connect } from "@/dbConfig/dbConfig";
import License from "@/models/licenseModel";
import User from "@/models/userModel";

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
    const reqBody = await request.json();
    const { start_date, end_date } = reqBody;
    const slug = params.id;
    const license = await License.findOne({ _id: slug });

    if (!license) {
      return NextResponse.json({ error: "License not found" }, { status: 404 });
    }
    license.start_date = start_date;
    license.end_date = end_date;
    const savedLicense = await license.save();
    return NextResponse.json({
      message: "License updated successfully",
      success: true,
      data: savedLicense,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
