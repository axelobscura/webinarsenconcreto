import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

async function handleChatRequest(request) {
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

    const promptFromQuery =
      request.nextUrl.searchParams.get("prompt") ||
      request.nextUrl.searchParams.get("consulta") ||
      "";

    phase = "read-request-body";
    const normalizedPrompt = promptFromQuery.trim();

    if (!normalizedPrompt) {
      return NextResponse.json({
        answer:
          "Por favor escribe una consulta para que el Asistente Concretón pueda ayudarte.",
        id: null,
        model: null,
        usage: null,
      });
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
          content: normalizedPrompt,
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

export async function GET(request) {
  return handleChatRequest(request);
}