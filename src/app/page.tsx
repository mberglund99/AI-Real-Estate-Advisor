"use client";

import { useState } from "react";
import { PropertyForm } from "@/components/PropertyForm";
import { ResultsPanel } from "@/components/ResultsPanel";
import {
  defaultPropertyDetails,
  type GeneratedContent,
  type PropertyDetails,
} from "@/types/property";

export default function Home() {
  const [details, setDetails] = useState<PropertyDetails>({
    ...defaultPropertyDetails,
    address: "742 Maple Street",
    city: "Austin",
    state: "TX",
    zip: "78704",
    features:
      "Open floor plan, quartz counters, covered patio, two-car garage, smart thermostat",
    neighborhoodNotes: "Walkable to South Congress dining and live music.",
  });
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [mode, setMode] = useState<"ai" | "demo">("demo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      setContent(data.content);
      setMode(data.mode);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-stone-100 via-stone-50 to-teal-50/30">
      <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
              AI Real Estate Advisor
            </p>
            <h1 className="text-xl font-bold text-stone-900 sm:text-2xl">
              Property marketing kit generator
            </h1>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-stone-500 sm:block">
            Turn listing details into descriptions, social posts, buyer personas,
            and investment insights.
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-2 lg:gap-10 sm:px-6 lg:py-12">
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="mb-6 text-sm text-stone-600">
            Enter your property details below. We will generate a full marketing
            package you can copy into your MLS, social channels, and client
            materials.
          </p>
          <PropertyForm
            details={details}
            onChange={setDetails}
            onSubmit={generate}
            loading={loading}
          />
          {error ? (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </p>
          ) : null}
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white/90 p-6 shadow-sm sm:p-8">
          {content ? (
            <ResultsPanel content={content} mode={mode} />
          ) : (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-teal-100 text-2xl">
                🏡
              </div>
              <h2 className="text-lg font-semibold text-stone-900">
                Ready when you are
              </h2>
              <p className="mt-2 max-w-sm text-sm text-stone-500">
                Fill in the property form and click{" "}
                <strong className="font-medium text-stone-700">
                  Generate marketing kit
                </strong>{" "}
                to see listing copy, social posts, buyer personas, and investment
                analysis.
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-stone-200/80 py-6 text-center text-xs text-stone-500">
        AI output is for drafting only. Verify all facts, comps, and compliance
        requirements before publishing.
      </footer>
    </div>
  );
}
