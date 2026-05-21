import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY environment variable." },
        { status: 500 }
      );
    }

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

    // Passing it to OpenAI API via HTTP to avoid SDK runtime/private-field issues.
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
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
      }),
    });

    const response = await openaiRes.json().catch(() => null);
    if (!openaiRes.ok || !response) {
      return NextResponse.json(
        {
          error: "OpenAI request failed.",
          details:
            response?.error?.message ||
            `HTTP ${openaiRes.status} ${openaiRes.statusText}`,
        },
        { status: 502 }
      );
    }

    const answer = response?.choices?.[0]?.message?.content ?? "";

    // Send a plain, JSON-serializable payload to the front end
    return NextResponse.json({
      answer,
      id: response?.id,
      model: response?.model,
      usage: response?.usage,
    });
  } catch (error) {
    let safeErrorMessage = "Unknown error";
    try {
      safeErrorMessage =
        error && typeof error === "object" && "message" in error
          ? String(error.message)
          : String(error);
    } catch {
      safeErrorMessage = "Unknown error";
    }

    // Avoid logging raw error objects that may fail inspection in some runtimes.
    console.error("/api/chatgpt error:", safeErrorMessage);
    return NextResponse.json(
      {
        error: "Internal server error.",
        details: safeErrorMessage,
      },
      { status: 500 }
    );
  }
}
