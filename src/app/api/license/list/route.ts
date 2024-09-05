import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/middleware/validator";
import { connect } from "@/dbConfig/dbConfig";
import License from "@/models/licenseModel";
import User from "@/models/userModel";

connect();

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const validationResponse = await validateToken(request);
//   if (validationResponse instanceof NextResponse) {
//     return validationResponse; // Return the validation error response
//   }

//   const { userId } = validationResponse;

//   try {

    
//     const license = await License.find()
//       .populate("user", "-password")
//       .sort({ createdAt: -1 });

//     return NextResponse.json({ message: "License List", data: license });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// export async function POST(request: NextRequest) {
//   const validationResponse = await validateToken(request);
//   if (validationResponse instanceof NextResponse) {
//     return validationResponse; // Return the validation error response
//   }

//   const { userId } = validationResponse;

//   // Get pagination parameters from the request (defaulting to page 1 and limit 10)
//   const { searchParams } = new URL(request.url);
//   const page = parseInt(searchParams.get("page") || "1", 10);
//   const limit = parseInt(searchParams.get("limit") || "10", 10);
//   const skip = (page - 1) * limit;

//   try {
//     const licenses = await License.find()
//       .populate("user", "-password")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     // Get the total count of documents for pagination
//     const total = await License.countDocuments();

//     return NextResponse.json({
//       message: "License List",
//       data: licenses,
//       pagination: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   const validationResponse = await validateToken(request);
//   if (validationResponse instanceof NextResponse) {
//     return validationResponse; // Return the validation error response
//   }

//   const { userId } = validationResponse;

//   // Get pagination parameters from the request (defaulting to page 1 and limit 10)
//   const { searchParams } = new URL(request.url);
//   const page = parseInt(searchParams.get("page") || "1", 10);
//   const per_page_record = parseInt(searchParams.get("limit") || "10", 10);
//   const startIndex = (page - 1) * per_page_record;

//   try {
//     const total = await License.countDocuments();
//     const licenses = await License.find()
//       .populate("user", "-password")
//       .sort({ createdAt: -1 })
//       .skip(startIndex)
//       .limit(per_page_record);

//     return NextResponse.json({
//       message: "Licenses retrieved successfully",
//       licenses: licenses,
//       total: total,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   const validationResponse = await validateToken(request);
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
//     const total = await License.countDocuments();
//     const licenses = await License.find()
//       .populate("user", "-password")
//       .sort({ createdAt: -1 })
//       .skip(startIndex)
//       .limit(per_page_record);

//     return NextResponse.json({
//       message: "Licenses retrieved successfully",
//       data: licenses,
//       total: total,
//     });
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

    let licenses;
    let total;

    if (page && per_page_record) {
      const pageInt = parseInt(page);
      const perPageRecordInt = parseInt(per_page_record);
      const startIndex = (pageInt - 1) * perPageRecordInt;
      total = await License.countDocuments();
      licenses = await License.find()
        .populate("user", "-password")
        .sort({ issuedAt: -1 })
        .skip(startIndex)
        .limit(perPageRecordInt);
    } else {
      licenses = await License.find()
        .populate("user", "-password")
        .sort({ issuedAt: -1 });
      total = licenses.length;
    }

    return NextResponse.json({
      message: "License list retrieved successfully",
      data: licenses,
      total: total,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}