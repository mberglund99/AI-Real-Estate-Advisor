# AI Real Estate Advisor

An experiment exploring how AI can assist buyers, sellers, and real estate professionals by transforming property data into actionable insights.

This repo includes a **Next.js web app** that turns property details into AI-generated marketing content: listing descriptions, social posts, buyer personas, and investment insights.

## Features

- **Listing description** — MLS-style copy ready to edit and publish
- **Selling points** — Bullet highlights for flyers and show sheets
- **Social media** — Drafts for Instagram, Facebook, LinkedIn, and X
- **Buyer personas** — Three distinct target buyer profiles
- **Investment insights** — ROI considerations, market outlook, and risks

  ## Screenshots

![Home Page](home-page.png)

![Property Analysis](property-analysis.png)

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — enables live OpenAI generation
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), enter property details, and click **Generate marketing kit**.

Without `OPENAI_API_KEY`, the app runs in **demo mode** and returns locally generated sample content so you can try the UI immediately.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | OpenAI API key for live AI generation |
| `OPENAI_MODEL` | No | Model id (default: `gpt-4o-mini`) |

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/)

## Disclaimer

Generated content is for drafting only. Always verify facts, comparables, fair housing compliance, and local regulations before publishing listings or investment advice.

## Why

With 25+ years in UX and digital product leadership, I'm exploring how AI changes the way people make complex real estate decisions.
