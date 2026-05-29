import type { PropertyDetails } from "@/types/property";

export function buildPropertyPrompt(details: PropertyDetails): string {
  const lines = [
    `Address: ${details.address}, ${details.city}, ${details.state} ${details.zip}`,
    `Type: ${details.propertyType}`,
    `Bedrooms: ${details.bedrooms} | Bathrooms: ${details.bathrooms}`,
    `Square feet: ${details.squareFeet}`,
    details.lotSize ? `Lot size: ${details.lotSize}` : null,
    details.yearBuilt ? `Year built: ${details.yearBuilt}` : null,
    `List price: $${details.price.toLocaleString()}`,
    `Condition: ${details.condition}`,
    `Features & highlights: ${details.features || "Not specified"}`,
    details.neighborhoodNotes
      ? `Neighborhood notes: ${details.neighborhoodNotes}`
      : null,
    details.investmentFocus
      ? "Audience: Include stronger investment and rental-income angles."
      : "Audience: Balance owner-occupier appeal with general market positioning.",
  ].filter(Boolean);

  return lines.join("\n");
}

export const SYSTEM_PROMPT = `You are an expert real estate copywriter and market analyst. Given property details, produce compelling, accurate marketing content.

Respond with valid JSON only (no markdown fences) matching this exact schema:
{
  "listingDescription": "2-4 paragraph MLS-style listing description",
  "sellingPoints": ["5-7 bullet highlights"],
  "socialMedia": {
    "instagram": "caption with emojis, hashtags, under 2200 chars",
    "facebook": "friendly community-focused post",
    "linkedin": "professional tone for agents/investors",
    "x": "concise post under 280 characters"
  },
  "buyerPersonas": [
    {
      "name": "Persona label",
      "description": "2-3 sentences",
      "motivations": ["3-4 items"],
      "budgetRange": "estimated range"
    }
  ],
  "investmentInsights": {
    "summary": "2-3 sentences on investment potential",
    "roiConsiderations": ["4-5 bullets"],
    "marketOutlook": "1-2 paragraphs",
    "risks": ["3-4 bullets"]
  }
}

Rules:
- Never invent specific facts not implied by the input (schools, crime, exact comps).
- Use placeholders like "verify locally" when data is unknown.
- Provide exactly 3 buyer personas with distinct profiles.
- Be persuasive but honest; avoid guaranteed returns.`;
