import User from "../../../app/models/User";
import { connectToDatabase } from "../../lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse(
      JSON.stringify({ message: "User already exists" }),
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    email,
    password: hashedPassword,
    name,
  });

  try {
    await newUser.save();
    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
