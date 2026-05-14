import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate the incoming data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: In a real application, you would integrate a mailer service here.
    // Examples: 
    // - Resend (https://resend.com)
    // - SendGrid
    // - Web3Forms
    // - Nodemailer

    // For now, we simulate a network delay to test the loading UI
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Received contact form submission:", data);

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
