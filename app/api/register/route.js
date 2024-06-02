import { NextRequest, NextResponse } from "next/server";
require("dotenv").config();
import axios from 'axios'

const YOUR_PLAYFAB_TITLE_ID = process.env.YOUR_PLAYFAB_TITLE_ID;

export async function POST(req) {
  const body = await req.text();
  const { username, email, password } = JSON.parse(body);

  const titleId = YOUR_PLAYFAB_TITLE_ID;
  const apiUrl = `https://${titleId}.playfabapi.com/Client/RegisterPlayFabUser`;
  const requestBody = {
    TitleId: titleId,
    Email: email,
    Username: username,
    Password: password,
  };

  try {
    const response = await axios.post(apiUrl, requestBody);
    if (response.data && response.data.data && response.data.data.PlayFabId) {
      return  NextResponse.json({ message: "User registered successfully" }, { status: 200 });
    } else {
      return  NextResponse.json({ message: "Error registering user" }, { status: 400 });
    }
  } catch (error) {
    return  NextResponse.json({ message: "Register failed", error: error.message }, { message: 500 });
  }
}
