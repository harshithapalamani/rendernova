import { NextResponse } from "next/server";
import { createUser } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  try {
    console.log("Testing manual user creation...");
    
    // Test user data (similar to what Clerk would send)
    const testUserData = {
      clerkId: "user_test_" + Date.now(),
      email: "testuser@example.com",
      username: "testuser" + Date.now(),
      firstName: "Test",
      lastName: "User",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    };

    console.log("Creating test user with data:", testUserData);
    
    const newUser = await createUser(testUserData);
    
    if (newUser) {
      console.log("User created successfully:", newUser);
      return NextResponse.json({
        success: true,
        message: "User created successfully",
        user: newUser
      });
    } else {
      console.log("Failed to create user");
      return NextResponse.json({
        success: false,
        message: "Failed to create user"
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in manual user creation test:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
