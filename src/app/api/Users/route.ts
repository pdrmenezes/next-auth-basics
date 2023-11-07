import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();
    const userData = body.formData;

    // validate necessary data
    if (!userData.email || userData.password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // check if email already exists
    const duplicateEmail = await User.findOne({ email: userData.email.toLowerCase() }).lean().exec();

    if (duplicateEmail) {
      return NextResponse.json({ message: "There already exists an account with this email" }, { status: 409 });
    }

    // if everything is ok and this is in fact a valid new user, we'll replace the user's typed password with a hashed version of it before storing it on the db
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    await User.create(userData);
    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
