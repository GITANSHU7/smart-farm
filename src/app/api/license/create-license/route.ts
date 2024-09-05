import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/middleware/validator";
import { connect } from "@/dbConfig/dbConfig";
import License from "@/models/licenseModel";
import User from "@/models/userModel";

connect();

//create license with user id

export async function POST(request: NextRequest) {
  const validationResponse = await validateToken(request);
  if (validationResponse instanceof NextResponse) {
    return validationResponse; // Return the validation error response
  }

  const { userId } = validationResponse;

  try {
    const reqBody = await request.json();
    const { macId, start_date, end_date, user } = reqBody;

    console.log(reqBody);

    //check for unique macId and licenseKey
    const existingLicense = await License.findOne({ $or: [{ macId }] });

    if (existingLicense) {
      return NextResponse.json(
        { error: "MacId already exists" },
        { status: 400 }
      );
    }

    const newLicense = new License({
      macId,
      start_date,
      end_date,
      user,
      licenseKey: generateLicenseKey(),
    });

    // save license and update user with license
    const savedLicense = await newLicense.save();
    const updated = await User.findByIdAndUpdate(
      user,
      { $push: { licenses: savedLicense._id } },
      { new: true }
    );
    console.log(updated);
    return NextResponse.json({
      message: "License created successfully",
      success: true,
      savedLicense,
    });
  } catch (error: any) {
    console.error(error);
    // If an error occurs, return an appropriate response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function generateLicenseKey(): string {
  const keyLength = 20;
  const keyChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let licenseKey = "";

  for (let i = 0; i < keyLength; i++) {
    if (i > 0 && i % 4 === 0) {
      licenseKey += "-";
    }
    const randomIndex = Math.floor(Math.random() * keyChars.length);
    licenseKey += keyChars[randomIndex];
  }

  return licenseKey;
}
