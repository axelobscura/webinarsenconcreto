import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request) {
  let phase = "init";
  try {
    phase = "read-env";
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY environment variable." },
        { status: 500 }
      );
    }

    phase = "read-request-body";
    let params;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      try {
        params = await request.json();
      } catch {
        return NextResponse.json(
          { error: "Invalid JSON body." },
          { status: 400 }
        );
      }
    } else {
      let rawBody = "";
      try {
        rawBody = await request.text();
      } catch {
        return NextResponse.json(
          { error: "Unable to read request body." },
          { status: 400 }
        );
      }

      if (!rawBody || !rawBody.trim()) {
        return NextResponse.json(
          { error: "Request body is empty." },
          { status: 400 }
        );
      }

      try {
        params = JSON.parse(rawBody);
      } catch {
        return NextResponse.json(
          { error: "Invalid JSON body." },
          { status: 400 }
        );
      }
    }

    if (!params?.prompt || typeof params.prompt !== "string") {
      return NextResponse.json(
        { error: "Field 'prompt' is required and must be a string." },
        { status: 400 }
      );
    }

    // Passing it to OpenAI API via HTTP to avoid SDK runtime/private-field issues.
    phase = "call-openai";
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

    phase = "parse-openai-response";
    const openaiRaw = await openaiRes.text();
    let response = null;
    try {
      response = openaiRaw ? JSON.parse(openaiRaw) : null;
    } catch {
      response = null;
    }

    if (!openaiRes.ok || !response) {
      return NextResponse.json(
        {
          error: "OpenAI request failed.",
          details:
            response?.error?.message ||
            `HTTP ${openaiRes.status} ${openaiRes.statusText}`,
          phase,
        },
        { status: 502 }
      );
    }

    phase = "build-success-response";
    const answer = response?.choices?.[0]?.message?.content ?? "";

    // Send a plain, JSON-serializable payload to the front end
    return NextResponse.json({
      answer,
      id: response?.id,
      model: response?.model,
      usage: response?.usage,
    });
  } catch {
    // Keep catch handling minimal and avoid touching unknown error objects.
    console.error("/api/chatgpt error in phase:", phase);
    return NextResponse.json(
      {
        error: "Internal server error.",
        details: `Unhandled exception at phase: ${phase}`,
      },
      { status: 500 }
    );
  }
}