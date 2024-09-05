import { getDataFromToken } from "@/app/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { validateToken } from "@/middleware/validator";
import License from "@/models/licenseModel";

// get all information from the database such as no of users, no of licenses, no of active users, no of active licenses
connect();

export async function POST(request: NextRequest) {
  const validationResponse = await validateToken(request);
  if (validationResponse instanceof NextResponse) {
    return validationResponse; // Return the validation error response
  }

  const { userId } = validationResponse;

  try {
    const users = await User.find();
    const licenses = await License.find();
    const activeLicenses = licenses.filter((license) => license.isActive === true);
    const inAcTiveLicenses = licenses.filter((license) => license.isActive === false);
    // const activeUsers = users.filter((user) => user.isActive === true);
    // const licenses = users.map((user) => user.license);
    // const activeLicenses = licenses.filter(
    //   (license) => license.isActive === true
    // );

    return NextResponse.json({
      success: true,
      data: {
        no_of_users: users.length,
        no_of_license: licenses.length,

        active_license: activeLicenses.length,

        inactive_license: inAcTiveLicenses.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
