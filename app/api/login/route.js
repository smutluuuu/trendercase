import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
require("dotenv").config();

const YOUR_PLAYFAB_TITLE_ID = process.env.YOUR_PLAYFAB_TITLE_ID;
const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request) {
  return new Response(JSON.stringify({ message: "Hello World!" }));
}



export async function POST(req, res) {
  const body = await req.text();
  const { username, password } = JSON.parse(body);
 
  const titleId = YOUR_PLAYFAB_TITLE_ID;
  const apiUrl = `https://${YOUR_PLAYFAB_TITLE_ID}.playfabapi.com/Client/LoginWithPlayFab`;
  const requestBody = {
    TitleId: titleId,
    Username: username,
    Password: password,
  };

  try {
    const response = await axios.post(apiUrl, requestBody);
    if (response.data && response.data.status == "OK" && response.data.data.SessionTicket) {
      const user = response.data;
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
      return NextResponse.json({ token, message: "Successfully logged in." }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error logging in", error: error.message }, { status: 500 });
  }
}
