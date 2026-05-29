import type { GeneratedContent, PropertyDetails } from "@/types/property";

export function generateDemoContent(details: PropertyDetails): GeneratedContent {
  const location = `${details.city}, ${details.state}`;
  const bedsBaths = `${details.bedrooms} bed / ${details.bathrooms} bath`;
  const price = details.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return {
    listingDescription: `Welcome to ${details.address} — a ${details.propertyType.replace("-", " ")} offering ${bedsBaths} across ${details.squareFeet.toLocaleString()} sq ft in ${location}. Listed at ${price}, this home is presented in ${details.condition} condition and ready for its next chapter.

${details.features ? `Standout features include ${details.features}.` : "Configure features in the form to tailor this description."} The layout balances everyday comfort with room to personalize, whether you are upsizing, downsizing, or relocating to the area.

${details.neighborhoodNotes ? details.neighborhoodNotes + " " : ""}Schedule a private showing to experience the flow, natural light, and neighborhood feel firsthand. Your agent can provide current market context and comparable sales — verify all figures locally before making an offer.`,

    sellingPoints: [
      `${bedsBaths} layout in a ${details.squareFeet.toLocaleString()} sq ft ${details.propertyType.replace("-", " ")}`,
      `Listed at ${price} — confirm comps with your agent`,
      `${details.condition.charAt(0).toUpperCase() + details.condition.slice(1)} overall condition`,
      details.yearBuilt ? `Built in ${details.yearBuilt}` : "Flexible floor plan for modern living",
      details.lotSize ? `${details.lotSize} lot` : `Convenient ${location} location`,
      details.investmentFocus
        ? "Potential for rental or long-term hold — run pro forma locally"
        : "Move-in ready appeal for owner-occupiers",
      "AI draft — review and edit before publishing",
    ],

    socialMedia: {
      instagram: `✨ Just listed in ${location}! ${bedsBaths} · ${details.squareFeet.toLocaleString()} sq ft · ${price}\n\n${details.features ? details.features.slice(0, 120) + "…" : "DM for details & private tours."}\n\n#JustListed #RealEstate #${details.city.replace(/\s/g, "")} #HomeForSale #DreamHome`,
      facebook: `New listing alert 📍 ${details.address}, ${location}\n\n${bedsBaths} | ${details.squareFeet.toLocaleString()} sq ft | ${price}\n\nGreat opportunity for families or investors exploring ${location}. Comment "INFO" or message us for open house times and a full feature sheet.`,
      linkedin: `Listing spotlight: ${details.propertyType.replace("-", " ")} in ${location} — ${bedsBaths}, ${details.squareFeet.toLocaleString()} sq ft, ${price}. Ideal for relocation clients and ${details.investmentFocus ? "investors evaluating yield and appreciation" : "buyers seeking quality-of-life upgrades"}. Connect for marketing assets and showing coordination.`,
      x: `🏠 ${location}: ${bedsBaths}, ${details.squareFeet.toLocaleString()} sq ft — ${price}. Tour this ${details.propertyType.replace("-", " ")} today. #RealEstate #JustListed`,
    },

    buyerPersonas: [
      {
        name: "Growing Family",
        description: `Households needing ${details.bedrooms}+ bedrooms near schools and parks in ${location}. They value safe streets, storage, and commute balance.`,
        motivations: [
          "More space for kids and guests",
          "Stable neighborhood feel",
          "Long-term equity building",
        ],
        budgetRange: `${Math.round(details.price * 0.95).toLocaleString()} – ${Math.round(details.price * 1.05).toLocaleString()}`,
      },
      {
        name: "Remote Professional",
        description: `Buyers prioritizing a dedicated office, strong internet, and lifestyle amenities within ${location}. Often first-time or move-up buyers.`,
        motivations: [
          "Home office flexibility",
          "Walkable dining and retail",
          "Low-maintenance living",
        ],
        budgetRange: `${Math.round(details.price * 0.9).toLocaleString()} – ${Math.round(details.price * 1.02).toLocaleString()}`,
      },
      {
        name: details.investmentFocus ? "Cash-Flow Investor" : "Empty Nester",
        description: details.investmentFocus
          ? `Investors analyzing rent vs. ${price} acquisition cost, vacancy assumptions, and capex in ${location}.`
          : `Downsizers seeking single-level living, less yard work, and proximity to healthcare and culture in ${location}.`,
        motivations: details.investmentFocus
          ? ["Rental yield", "Tax advantages", "Portfolio diversification"]
          : ["Less maintenance", "Lock-and-leave travel", "Community amenities"],
        budgetRange: details.investmentFocus
          ? `${Math.round(details.price * 0.85).toLocaleString()} – ${details.price.toLocaleString()} (cash or leveraged)`
          : `${Math.round(details.price * 0.92).toLocaleString()} – ${Math.round(details.price * 1.08).toLocaleString()}`,
      },
    ],

    investmentInsights: {
      summary: `At ${price}, this ${details.propertyType.replace("-", " ")} in ${location} should be evaluated against recent comps, carrying costs, and ${details.investmentFocus ? "rental demand" : "owner-occupier absorption"}. AI output is directional only — confirm with a licensed advisor.`,
      roiConsiderations: [
        "Compare list price to sold comps within 0.5–1 mile (verify with MLS)",
        "Estimate annual taxes, insurance, HOA, and maintenance reserve",
        details.investmentFocus
          ? "Model gross rent, vacancy (5–8%), and property management fees"
          : "Factor appreciation history for the submarket (5–10 year view)",
        "Account for closing costs on both buy and eventual sell side",
        "Stress-test rates +2% if financing",
      ],
      marketOutlook: `${location} markets vary by inventory and rate environment. Monitor days-on-market for similar ${details.bedrooms}-bed homes and seasonal demand. ${details.neighborhoodNotes || "Request a local CMA from your agent for block-level trends."} Avoid relying on national headlines alone.`,
      risks: [
        "Overpaying vs. recent sold data",
        "Undisclosed repair needs — insist on inspection",
        "Regulatory changes (rent control, STR rules) if renting",
        "Liquidity risk if you need to sell within 12–24 months",
      ],
    },
  };
}
