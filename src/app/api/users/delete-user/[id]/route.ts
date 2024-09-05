import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { validateToken } from "@/middleware/validator";


connect();
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const validationResponse = await validateToken(request);
    if (validationResponse instanceof NextResponse) {
      return validationResponse; // Return the validation error response
    }

    // Extract user ID from the validation response
    const { userId } = validationResponse;

    // Extract user ID from the request URL
    const slug = params.id;
    if (!slug) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Find and delete the user in the database
    const user = await User.findOneAndDelete({ _id: slug });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    // Handle other errors and return an error response
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function DELETE(request: NextRequest) {
//     // Validate the token
//     const validationResponse = await validateToken(request);
//     if (validationResponse instanceof NextResponse) {
//         return validationResponse; // Return the validation error response
//     }
    
//     // Extract user ID from the validation response
//     const { userId } = validationResponse;
    
//     try {
//         // Find the user in the database
//         const searchParams = new URL(request.url);
//         const id = searchParams.get("id");
//         const user = await User.findOneAndDelete({
//           _id:id,
//         });
//         if (!user) {
//         return NextResponse.json({ error: "User not found" }, { status: 404 });
//         }
    
       
//         return NextResponse.json({
//         message: "User deleted successfully",
//         success: true,
//         });
//     } catch (error: any) {
//         // Handle other errors and return an error response
//         console.error(error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//     }

// export async function DELETE(request : NextRequest) {
//   const id = request.nextUrl.searchParams.get("id");
  
//   await User.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
// }