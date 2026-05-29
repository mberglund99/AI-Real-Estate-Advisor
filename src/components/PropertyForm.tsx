"use client";

import type { PropertyDetails, PropertyCondition, PropertyType } from "@/types/property";

interface PropertyFormProps {
  details: PropertyDetails;
  onChange: (details: PropertyDetails) => void;
  onSubmit: () => void;
  loading: boolean;
}

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: "single-family", label: "Single family" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "multi-family", label: "Multi-family" },
  { value: "land", label: "Land" },
];

const conditions: { value: PropertyCondition; label: string }[] = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "needs-work", label: "Needs work" },
];

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-stone-700"
    >
      {children}
    </label>
  );
}

function inputClassName() {
  return "w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-stone-900 shadow-sm transition placeholder:text-stone-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20";
}

export function PropertyForm({
  details,
  onChange,
  onSubmit,
  loading,
}: PropertyFormProps) {
  const update = <K extends keyof PropertyDetails>(
    key: K,
    value: PropertyDetails[K],
  ) => onChange({ ...details, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section>
        <h2 className="mb-4 text-lg font-semibold text-stone-900">Location</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="address">Street address</FieldLabel>
            <input
              id="address"
              required
              className={inputClassName()}
              value={details.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="123 Oak Lane"
            />
          </div>
          <div>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <input
              id="city"
              required
              className={inputClassName()}
              value={details.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="Austin"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel htmlFor="state">State</FieldLabel>
              <input
                id="state"
                required
                maxLength={2}
                className={inputClassName()}
                value={details.state}
                onChange={(e) => update("state", e.target.value.toUpperCase())}
                placeholder="TX"
              />
            </div>
            <div>
              <FieldLabel htmlFor="zip">ZIP</FieldLabel>
              <input
                id="zip"
                required
                className={inputClassName()}
                value={details.zip}
                onChange={(e) => update("zip", e.target.value)}
                placeholder="78701"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-stone-900">Property</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="propertyType">Type</FieldLabel>
            <select
              id="propertyType"
              className={inputClassName()}
              value={details.propertyType}
              onChange={(e) =>
                update("propertyType", e.target.value as PropertyType)
              }
            >
              {propertyTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="condition">Condition</FieldLabel>
            <select
              id="condition"
              className={inputClassName()}
              value={details.condition}
              onChange={(e) =>
                update("condition", e.target.value as PropertyCondition)
              }
            >
              {conditions.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="bedrooms">Bedrooms</FieldLabel>
            <input
              id="bedrooms"
              type="number"
              min={0}
              required
              className={inputClassName()}
              value={details.bedrooms}
              onChange={(e) => update("bedrooms", Number(e.target.value))}
            />
          </div>
          <div>
            <FieldLabel htmlFor="bathrooms">Bathrooms</FieldLabel>
            <input
              id="bathrooms"
              type="number"
              min={0}
              step={0.5}
              required
              className={inputClassName()}
              value={details.bathrooms}
              onChange={(e) => update("bathrooms", Number(e.target.value))}
            />
          </div>
          <div>
            <FieldLabel htmlFor="squareFeet">Square feet</FieldLabel>
            <input
              id="squareFeet"
              type="number"
              min={1}
              required
              className={inputClassName()}
              value={details.squareFeet}
              onChange={(e) => update("squareFeet", Number(e.target.value))}
            />
          </div>
          <div>
            <FieldLabel htmlFor="price">List price ($)</FieldLabel>
            <input
              id="price"
              type="number"
              min={1}
              required
              className={inputClassName()}
              value={details.price}
              onChange={(e) => update("price", Number(e.target.value))}
            />
          </div>
          <div>
            <FieldLabel htmlFor="lotSize">Lot size (optional)</FieldLabel>
            <input
              id="lotSize"
              className={inputClassName()}
              value={details.lotSize ?? ""}
              onChange={(e) => update("lotSize", e.target.value || undefined)}
              placeholder="0.25 acres"
            />
          </div>
          <div>
            <FieldLabel htmlFor="yearBuilt">Year built (optional)</FieldLabel>
            <input
              id="yearBuilt"
              type="number"
              min={1800}
              max={new Date().getFullYear() + 2}
              className={inputClassName()}
              value={details.yearBuilt ?? ""}
              onChange={(e) =>
                update(
                  "yearBuilt",
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
              placeholder="1998"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-stone-900">Details</h2>
        <div className="space-y-4">
          <div>
            <FieldLabel htmlFor="features">Features & highlights</FieldLabel>
            <textarea
              id="features"
              rows={4}
              className={inputClassName()}
              value={details.features}
              onChange={(e) => update("features", e.target.value)}
              placeholder="Renovated kitchen, pool, smart home, walk to trails..."
            />
          </div>
          <div>
            <FieldLabel htmlFor="neighborhoodNotes">
              Neighborhood notes (optional)
            </FieldLabel>
            <textarea
              id="neighborhoodNotes"
              rows={2}
              className={inputClassName()}
              value={details.neighborhoodNotes ?? ""}
              onChange={(e) =>
                update("neighborhoodNotes", e.target.value || undefined)
              }
              placeholder="Quiet cul-de-sac, top-rated schools nearby..."
            />
          </div>
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3">
            <input
              type="checkbox"
              className="size-4 rounded border-stone-300 text-teal-700 focus:ring-teal-600"
              checked={details.investmentFocus}
              onChange={(e) => update("investmentFocus", e.target.checked)}
            />
            <span className="text-sm text-stone-700">
              Emphasize investment & rental angles in generated content
            </span>
          </label>
        </div>
      </section>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-teal-700 px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Generating…" : "Generate marketing kit"}
      </button>
    </form>
  );
}
