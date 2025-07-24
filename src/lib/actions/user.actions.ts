"use server";

import { revalidatePath } from "next/cache";
import type { CreateUserParams, UpdateUserParams } from "@/types";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    console.log("User created successfully:", newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    handleError(error);
    return null;
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      // Create a minimal user if not found
      console.log("User not found, creating minimal user record");
      
      const newUserData = {
        clerkId: userId,
        email: '',
        username: `user_${userId.slice(-8)}`,
        firstName: '',
        lastName: '',
        photo: '',
      };
      
      user = await createUser(newUserData);
      
      if (!user) {
        throw new Error("Failed to create user record");
      }
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error in getUserById:", error);
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    )

    if(!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}

