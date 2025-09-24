import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import {connectMongoDB} from "@/lib/mongodb"; 

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to DB
    await connectMongoDB();

    // Save user
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user.", error: error.message },
      { status: 500 }
    );
  }
}
