import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const rawBody = await request.text();
    if (!rawBody) {
      return NextResponse.json(
        { error: "Request body is empty." },
        { status: 400 }
      );
    }

    let params;
    try {
      params = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    if (!params?.prompt || typeof params.prompt !== "string") {
      return NextResponse.json(
        { error: "Field 'prompt' is required and must be a string." },
        { status: 400 }
      );
    }

    // Passing it to Chat GPT API
    const response = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [
        {
          role: "system",
          content:
            "Dar toda la información encontrada sobre temas de cemento y concreto realcionadas con la construcción. No agregar la bibliografía de las fuentes consultadas. Al final de la consulta colocar el texto biblioteca digital IMCYC",
          //content: "You are very grumpy. Please answer my questions with sarcasm, grumpiness, and anger."
        },
        {
          role: "user",
          content: params.prompt, // string that the user passes in
        },
      ],
      temperature: 1,
      max_completion_tokens: 14369,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const answer = response?.choices?.[0]?.message?.content ?? "";

    // Send a plain, JSON-serializable payload to the front end
    return NextResponse.json({
      answer,
      id: response?.id,
      model: response?.model,
      usage: response?.usage,
    });
  } catch (error) {
    console.error("/api/chatgpt error:", error);
    return NextResponse.json(
      {
        error: "Internal server error.",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
