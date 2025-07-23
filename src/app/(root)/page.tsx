import { currentUser } from "@clerk/nextjs/server";
import { getUserById, createUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Check if user exists in database
  let dbUser;
  try {
    dbUser = await getUserById(user.id);
  } catch (error) {
    // User doesn't exist in database, create them
    console.log("User not found in database, creating new user");
    
    const userData = {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      username: user.username || user.emailAddresses[0].emailAddress.split('@')[0],
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      photo: user.imageUrl,
    };

    try {
      dbUser = await createUser(userData);
      console.log("New user created in database:", dbUser);
    } catch (createError) {
      console.error("Failed to create user:", createError);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-gray-50 to-white">
      <h1 className="text-4xl font-bold mb-4 gradient-text">Welcome to RenderNova</h1>
      <p className="text-lg text-gray-600 mb-8">Your AI-powered image transformation platform</p>
      
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-black">User Info</h2>
        <p className="mb-2 text-gray-700"><strong className="text-black">Name:</strong> {user.firstName} {user.lastName}</p>
        <p className="mb-2 text-gray-700"><strong className="text-black">Email:</strong> {user.emailAddresses[0].emailAddress}</p>
        <p className="mb-2 text-gray-700"><strong className="text-black">Username:</strong> {user.username}</p>
        <p className="mb-4 text-gray-700"><strong className="text-black">Clerk ID:</strong> {user.id}</p>
        {dbUser ? (
          <div className="mt-4 p-4 bg-green-50 rounded border border-green-200">
            <p className="text-green-800 font-semibold mb-2">✓ User found in database</p>
            <p className="text-sm text-gray-600"><strong className="text-black">Database ID:</strong> {dbUser._id}</p>
            <p className="text-sm text-gray-600"><strong className="text-black">Credits:</strong> {dbUser.creditBalance}</p>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-red-50 rounded border border-red-200">
            <p className="text-red-800 font-semibold">⚠ User not found in database</p>
            <p className="text-sm text-gray-600">Check console for error details</p>
          </div>
        )}
      </div>
    </div>
  );
}