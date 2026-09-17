# VDABY Método v1.6 — Complete Surgical Patch

## What this patch does

### `/` visual enhancement
Replace only:
- `/assets/daby-experience.css`
- `/assets/daby-experience.js`

This adds the mission statement:
> Inglês estratégico não é memorizar mais. É saber como agir quando a conversa pede presença.

It uses the Uiverse-inspired animated CTA and keeps the component additive, accessible, responsive, and reduced-motion friendly.

### Canonical production SEO/GEO/AI layer
The root-level files in this patch are for the canonical production URLs:
- `/index.html`
- `/metodo/index.html`
- `/corporate/index.html`
- `/seo-geo/index.html`
- `/linkedin/index.html`
- `/ai-discovery/index.html`
- `/blog/index.html`
- the three existing blog article pages
- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`

These production canonical pages are changed from `noindex,follow` to `index,follow`. `/corporativo/` is deliberately left out because it canonicalizes to `/corporate/`.

## Why this matters
The current canonical production pages were carrying `noindex,follow`, which prevents them from being indexed even though the sitemap lists them. Google explicitly warns that if a page might be indexed, a `noindex` tag should not be present in the original HTML. Canonical URLs, sitemap inclusion, and indexability now agree.

## AI discovery
The patch explicitly permits OAI-SearchBot, GPTBot, OAI-AdsBot, Claude-SearchBot, ClaudeBot, Claude-User, PerplexityBot, Google-Extended, Applebot, Applebot-Extended and CCBot. The site also has an expanded `llms.txt` and a first-party `DefinedTerm` describing Lego Block Chain.

Allowing crawlers improves crawlability and discoverability. It cannot force Google, ChatGPT, Claude, Gemini, Perplexity or another system to recommend Daby. Recommendation depends on relevance, content quality, authority, links/citations, user intent and each provider's ranking systems.

## Do not break the runtime
This patch intentionally keeps the existing `/assets/` runtime asset paths. Do not change the React/Tailwind bundle as part of this deployment.

## After deployment
1. Keep `/metodo/` as `noindex` while it is a test/staging URL.
2. Deploy the canonical production pages at `/metodo/`, `/corporate/`, etc.
3. Submit `https://vdaby.com/sitemap.xml` in Google Search Console.
4. Use URL Inspection on `https://vdaby.com/metodo/` and request indexing.
5. Test the page in Google's Rich Results Test and check that Googlebot receives `index,follow`.
6. If Hostinger/Cloudflare has bot protection, verify that legitimate crawler requests are not being returned 403/429.
