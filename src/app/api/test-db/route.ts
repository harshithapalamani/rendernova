import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
import User from "@/lib/database/models/user.model";

export async function GET() {
  try {
    console.log("Testing database connection...");
    await connectToDatabase();
    console.log("Database connected successfully");

    // Test creating a user
    const testUser = {
      clerkId: "test_" + Date.now(),
      email: "test@example.com",
      username: "testuser_" + Date.now(),
      photo: "https://example.com/photo.jpg",
      firstName: "Test",
      lastName: "User",
    };

    const newUser = await User.create(testUser);
    console.log("Test user created:", newUser);

    // Clean up test user
    await User.findByIdAndDelete(newUser._id);
    console.log("Test user deleted");

    return NextResponse.json({ 
      success: true, 
      message: "Database connection and user creation working properly",
      testUserId: newUser._id
    });
  } catch (error) {
    console.error("Database test failed:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
