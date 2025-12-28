import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const messages = [
      {
        role: "system",
        content:
          "You are a professional wellness and fitness assistant. Keep responses friendly, safe, concise, and helpful.",
      },
      ...(history || []),
      {
        role: "user",
        content: message,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.6,
    });

    const reply = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      { success: false, message: "AI response failed" },
      { status: 500 }
    );
  }
}
