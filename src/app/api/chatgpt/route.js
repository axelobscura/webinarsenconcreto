import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Grabbing the user's input
  const params = await request.json();

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

  console.log(response);

  // Send our response to the front end
  return NextResponse.json(response);
}
