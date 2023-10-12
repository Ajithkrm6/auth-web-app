import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("reqBody", reqBody);
    const { email, password } = reqBody;
    // finding a user and this user is coming from data base
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json("User does not exist", { status: 400 });
    }
    // validate password
    const validatedPassword = await bcryptjs.compare(password, user.password);
    if (!validatedPassword) {
      return NextResponse.json("invaild password", { status: 400 });
    }

    // creating a token data
    const tokenData = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    };

    // creating a jwt token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User logged-in successfully",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
