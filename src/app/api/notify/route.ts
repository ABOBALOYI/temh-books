import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, province, city, userType, selectedBooks } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const bookList = selectedBooks?.length
      ? selectedBooks.map((b: string) => `<li>${b}</li>`).join("")
      : "<li>None selected</li>";

    await transporter.sendMail({
      from: `"Temh Books" <${process.env.GMAIL_USER}>`,
      to: "temh8821@gmail.com",
      subject: `New Interest Registration — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1A1A2E; border-bottom: 2px solid #E8734A; padding-bottom: 10px;">New Interest Registration</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 10px 0; font-weight: bold; color: #555; width: 120px;">Name</td><td style="padding: 10px 0;">${name}</td></tr>
            <tr style="background: #f9f9f7;"><td style="padding: 10px; font-weight: bold; color: #555;">Email</td><td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold; color: #555;">Phone</td><td style="padding: 10px 0;">${phone}</td></tr>
            <tr style="background: #f9f9f7;"><td style="padding: 10px; font-weight: bold; color: #555;">Province</td><td style="padding: 10px;">${province || "Not specified"}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold; color: #555;">City</td><td style="padding: 10px 0;">${city || "Not specified"}</td></tr>
            <tr style="background: #f9f9f7;"><td style="padding: 10px; font-weight: bold; color: #555;">User Type</td><td style="padding: 10px;">${userType}</td></tr>
          </table>
          <h3 style="color: #1A1A2E; margin-top: 20px;">Selected Books</h3>
          <ul style="padding-left: 20px;">${bookList}</ul>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
          <p style="color: #999; font-size: 12px; margin-top: 10px;">Sent from temh.co.za interest form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 });
  }
}
