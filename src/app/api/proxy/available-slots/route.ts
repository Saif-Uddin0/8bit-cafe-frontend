import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get("gameId");
    const date = searchParams.get("date");
    const durationMinStr = searchParams.get("durationMin");

    if (!gameId || !date || !durationMinStr) {
      return NextResponse.json(
        { success: false, message: "Missing required query parameters" },
        { status: 400 }
      );
    }

    const durationMin = parseInt(durationMinStr, 10);
    const baseURL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

    // Node.js is capable of sending JSON request body in GET requests
    const res = await axios.request({
      method: "GET",
      url: `${baseURL}/api/booking/availableSlote`,
      data: { gameId, date, durationMin },
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("Proxy available slots error:", error.response?.data || error.message);
    return NextResponse.json(
      error.response?.data || { success: false, message: "Sorry! It's an off-day or not available right now." },
      { status: error.response?.status || 400 }
    );
  }
}
