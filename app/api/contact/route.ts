import { GMAIL_APP_PASSWORD, GMAIL_APP_USER } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as Sentry from "@sentry/nextjs";

export async function POST(req: NextRequest) {
  try {
    const { subject, message } = await req.json();
    if (!subject || !message) {
      return NextResponse.json(
        { error: "제목과 내용을 모두 입력해주세요." },
        { status: 400 },
      );
    }

    // Gmail SMTP 설정
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_APP_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "익명의 유저",
      to: GMAIL_APP_USER,
      subject: `[할인탐정 문의] ${subject}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json(
      { error: `메일 전송에 실패했습니다. ${err}` },
      { status: 500 },
    );
  }
}
