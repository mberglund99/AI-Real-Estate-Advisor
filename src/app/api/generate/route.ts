import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPropertyPrompt, SYSTEM_PROMPT } from "@/lib/prompts";
import { generateDemoContent } from "@/lib/demo-content";
import type { GeneratedContent, PropertyDetails } from "@/types/property";

function isPropertyDetails(body: unknown): body is PropertyDetails {
  if (!body || typeof body !== "object") return false;
  const p = body as Record<string, unknown>;
  return (
    typeof p.address === "string" &&
    typeof p.city === "string" &&
    typeof p.state === "string" &&
    typeof p.price === "number"
  );
}

function parseGeneratedContent(raw: string): GeneratedContent {
  const parsed = JSON.parse(raw) as GeneratedContent;
  if (!parsed.listingDescription || !parsed.socialMedia) {
    throw new Error("Invalid AI response structure");
  }
  return parsed;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isPropertyDetails(body)) {
      return NextResponse.json(
        { error: "Invalid property details" },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        content: generateDemoContent(body),
        mode: "demo" as const,
      });
    }

    const openai = new OpenAI({ apiKey });
    const userPrompt = buildPropertyPrompt(body);

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) {
      throw new Error("Empty response from AI");
    }

    const content = parseGeneratedContent(text);

    return NextResponse.json({
      content,
      mode: "ai" as const,
    });
  } catch (error) {
    console.error("Generate error:", error);
    const message =
      error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
