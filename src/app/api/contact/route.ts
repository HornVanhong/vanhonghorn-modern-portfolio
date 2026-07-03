import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json({ error: "Invalid message data." }, { status: 400 });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (
      trimmedName.length > 100 ||
      trimmedEmail.length > 100 ||
      trimmedMessage.length > 1000
    ) {
      return NextResponse.json({ error: "Input is too long." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const emailHost = process.env.EMAIL_HOST;
    const emailPortStr = process.env.EMAIL_PORT;
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || emailUser;

    const hasTelegramConfig = !!(botToken && chatId);
    const hasEmailConfig = !!(emailHost && emailUser && emailPass);

    if (!hasTelegramConfig && !hasEmailConfig) {
      return NextResponse.json({
        error: "Contact form is not configured on the server. Please set Telegram or SMTP variables.",
      }, { status: 500 });
    }

    let telegramSuccess = false;
    let emailSuccess = false;
    let telegramErrorMsg = "";
    let emailErrorMsg = "";

    // 1. Send via Telegram Bot
    if (hasTelegramConfig) {
      const text = [
        "📬 New Portfolio Message!",
        `👤 Name: ${trimmedName}`,
        `✉️ Email: ${trimmedEmail}`,
        `📝 Message:`,
        trimmedMessage,
      ].join("\n");

      try {
        const telegramRes = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text,
            }),
          }
        );

        if (telegramRes.ok) {
          telegramSuccess = true;
        } else {
          const data = await telegramRes.json().catch(() => null);
          telegramErrorMsg = data?.description || "Telegram API failed";
        }
      } catch (err) {
        telegramErrorMsg = err instanceof Error ? err.message : "Telegram network error";
      }
    }

    // 2. Send via Email (Nodemailer)
    if (hasEmailConfig) {
      const emailPort = emailPortStr ? parseInt(emailPortStr, 10) : 587;

      try {
        const transporter = nodemailer.createTransport({
          host: emailHost,
          port: emailPort,
          secure: emailPort === 465,
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        const currentYear = new Date().getFullYear();

        const htmlContent = `
          <div style="font-family: sans-serif; background-color: #030712; color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <h2 style="color: #60a5fa;">📬 New Portfolio Message</h2>
            <p><strong>Name:</strong> ${trimmedName}</p>
            <p><strong>Email:</strong> <a href="mailto:${trimmedEmail}" style="color: #60a5fa;">${trimmedEmail}</a></p>
            <p><strong>Message:</strong></p>
            <blockquote style="border-left: 4px solid #60a5fa; padding-left: 16px; margin-left: 0; color: #d1d5db;">
              ${trimmedMessage.replace(/\n/g, "<br>")}
            </blockquote>
            <hr style="border: 0; border-top: 1px solid #1f2937; margin: 20px 0;" />
            <p style="font-size: 12px; color: #9ca3af;">Sent from Portfolio Website © ${currentYear}</p>
          </div>
        `;

        await transporter.sendMail({
          from: `"${trimmedName}" <${emailUser}>`,
          to: emailTo,
          replyTo: trimmedEmail,
          subject: `Portfolio Message from ${trimmedName}`,
          html: htmlContent,
          text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nMessage: ${trimmedMessage}`,
        });

        emailSuccess = true;
      } catch (err) {
        emailErrorMsg = err instanceof Error ? err.message : "Email error";
      }
    }

    if (telegramSuccess || emailSuccess) {
      return NextResponse.json({
        success: true,
        telegram: telegramSuccess,
        email: emailSuccess,
      });
    } else {
      return NextResponse.json({
        error: `Failed to send message. Telegram error: ${telegramErrorMsg || "none"}. Email error: ${emailErrorMsg || "none"}.`,
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Failed to parse request."
    }, { status: 400 });
  }
}
