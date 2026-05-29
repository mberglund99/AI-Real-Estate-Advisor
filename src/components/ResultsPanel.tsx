"use client";

import { useState } from "react";
import type { GeneratedContent } from "@/types/property";

interface ResultsPanelProps {
  content: GeneratedContent;
  mode: "ai" | "demo";
}

type TabId =
  | "listing"
  | "social"
  | "personas"
  | "investment"
  | "selling";

const tabs: { id: TabId; label: string }[] = [
  { id: "listing", label: "Listing" },
  { id: "selling", label: "Selling points" },
  { id: "social", label: "Social" },
  { id: "personas", label: "Personas" },
  { id: "investment", label: "Investment" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 rounded-md border border-stone-200 bg-white px-2.5 py-1 text-xs font-medium text-stone-600 transition hover:bg-stone-50"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function Card({
  title,
  children,
  copyText,
}: {
  title: string;
  children: React.ReactNode;
  copyText?: string;
}) {
  return (
    <article className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-semibold text-stone-900">{title}</h3>
        {copyText ? <CopyButton text={copyText} /> : null}
      </div>
      {children}
    </article>
  );
}

export function ResultsPanel({ content, mode }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("listing");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-stone-900">Your marketing kit</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            mode === "ai"
              ? "bg-teal-100 text-teal-800"
              : "bg-amber-100 text-amber-900"
          }`}
        >
          {mode === "ai" ? "AI generated" : "Demo mode — add OPENAI_API_KEY for live AI"}
        </span>
      </div>

      <div
        role="tablist"
        className="flex flex-wrap gap-1 rounded-xl bg-stone-100 p-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-white text-teal-800 shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeTab === "listing" && (
          <Card title="Listing description" copyText={content.listingDescription}>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-stone-700">
              {content.listingDescription}
            </p>
          </Card>
        )}

        {activeTab === "selling" && (
          <Card
            title="Key selling points"
            copyText={content.sellingPoints.map((p) => `• ${p}`).join("\n")}
          >
            <ul className="space-y-2">
              {content.sellingPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-stone-700 before:text-teal-600 before:content-['•']"
                >
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {activeTab === "social" && (
          <div className="grid gap-4">
            {(
              [
                ["Instagram", content.socialMedia.instagram],
                ["Facebook", content.socialMedia.facebook],
                ["LinkedIn", content.socialMedia.linkedin],
                ["X (Twitter)", content.socialMedia.x],
              ] as const
            ).map(([platform, text]) => (
              <Card key={platform} title={platform} copyText={text}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-stone-700">
                  {text}
                </p>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "personas" && (
          <div className="grid gap-4 md:grid-cols-1">
            {content.buyerPersonas.map((persona) => (
              <Card
                key={persona.name}
                title={persona.name}
                copyText={`${persona.name}\n${persona.description}\nBudget: ${persona.budgetRange}\nMotivations:\n${persona.motivations.map((m) => `• ${m}`).join("\n")}`}
              >
                <p className="mb-3 text-sm text-stone-700">{persona.description}</p>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">
                  Budget range
                </p>
                <p className="mb-3 text-sm font-medium text-teal-800">
                  {persona.budgetRange}
                </p>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">
                  Motivations
                </p>
                <ul className="space-y-1">
                  {persona.motivations.map((m, i) => (
                    <li key={i} className="text-sm text-stone-700">
                      • {m}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "investment" && (
          <div className="space-y-4">
            <Card
              title="Summary"
              copyText={content.investmentInsights.summary}
            >
              <p className="text-sm leading-relaxed text-stone-700">
                {content.investmentInsights.summary}
              </p>
            </Card>
            <Card
              title="ROI considerations"
              copyText={content.investmentInsights.roiConsiderations
                .map((r) => `• ${r}`)
                .join("\n")}
            >
              <ul className="space-y-2">
                {content.investmentInsights.roiConsiderations.map((item, i) => (
                  <li key={i} className="text-sm text-stone-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card
              title="Market outlook"
              copyText={content.investmentInsights.marketOutlook}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-stone-700">
                {content.investmentInsights.marketOutlook}
              </p>
            </Card>
            <Card
              title="Risks"
              copyText={content.investmentInsights.risks
                .map((r) => `• ${r}`)
                .join("\n")}
            >
              <ul className="space-y-2">
                {content.investmentInsights.risks.map((item, i) => (
                  <li key={i} className="text-sm text-stone-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
