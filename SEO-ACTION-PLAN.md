# SEO Action Plan — replicant.band

Audit date: April 15, 2026

---

## Already Done (seo branch)

- [x] Album title tags: `[Album] by Replicant | Technical Death Metal`
- [x] BreadcrumbList schema on all album pages
- [x] Discography page title + meta description include genre and NJ location
- [x] Discography H1: "Replicant Discography" (was just "Discography")
- [x] Homepage merch H2: "Replicant Merch"

---

## Quick Wins — Do This Week

### 1. Add meta description to tour page

**File:** `src/pages/tombs-replicant-2026.astro`

The current desc (`"Tombs and Replicant hit the road together in 2026..."`) lacks genre keywords. Update:

```astro
const desc = 'Tombs and Replicant — death metal on the East Coast in 2026. Tour dates, tickets, and info for the 5-date run through Philadelphia, Connecticut, New Hampshire, Quebec City, and Albany.';
```

**Impact:** Medium | **Effort:** 15 min

---

### 2. Fix homepage H2 headings

**File:** `src/pages/index.astro`

| Current          | Suggested                                                          |
| ---------------- | ------------------------------------------------------------------ |
| `Transmissions`  | `Latest News & Releases`                                           |
| `Communications` | `Contact & Booking`                                                |
| `Build`          | Check what this section contains — rename to something descriptive |

**Impact:** Medium | **Effort:** 30 min

---

## Strategic Investments — This Quarter

### 3. Create an `/about/` page

**New file:** `src/pages/about.astro`

The site has no page about the band itself. Anyone searching "Replicant band", "Replicant NJ death metal", or a member's name lands on the merch page. An About page would:

- Target informational searches
- Enable `Person` schema for each member
- Give internal pages something to link to

**Content to include:**

- Band bio (est. 2014, New Brunswick NJ, current lineup)
- Member bios: Mike Gonçalves, Pete Lloyd, James Applegate, Itay Keren
- Label history (Self-released → CDN → Blood Harvest → PRC → Transcending Obscurity)
- A note on the sound: dissonant, technical, groove-oriented death metal

**Schema to add:**

```json
{
    "@type": "MusicGroup",
    "member": [
        { "@type": "Person", "name": "Mike Gonçalves", "roleName": "Vocals, Bass, Guitars" },
        { "@type": "Person", "name": "Pete Lloyd", "roleName": "Guitar, Synthesizers" },
        { "@type": "Person", "name": "Justin Spaeth", "roleName": "Drums" },
        { "@type": "Person", "name": "Itay Keren", "roleName": "Guitar" }
    ]
}
```

**Impact:** High | **Effort:** Half day

---

### 4. Create a `/news/` page

**New file:** `src/pages/news/index.astro` + individual post pages

Every release, tour, and press feature is a search event that currently goes unindexed because there's nowhere to put it. A simple news page — even just static `.md` files in a content collection — solves this.

**Suggested content collection entries to start:**

- Infinite Mortality out now on Transcending Obscurity (April 2024)
- Tombs × Replicant East Coast tour (March 2026)
- Link to Angry Metal Guy / Noob Heavy / Burning Ambulance reviews

**Impact:** High | **Effort:** 1 day setup, ~30 min per post ongoing

---

### 5. Move tour to a persistent `/tour/` page

**New file:** `src/pages/tour.astro` (replace one-off slug pages per tour)

Each tour currently lives at a hardcoded slug (`/tombs-replicant-2026/`). After the tour ends, that page becomes an orphan. A single `/tour/` URL accumulates link equity, schema history, and fan bookmarks over time.

Structure: upcoming dates at top, past tours archived below.

**Impact:** Medium | **Effort:** 2–3 hrs

---

### 6. Submit to metal directories

Each submission is a backlink and an additional SERP presence for branded searches. All are free.

| Directory                                    | Status                   | Action                         |
| -------------------------------------------- | ------------------------ | ------------------------------ |
| [Rate Your Music](https://rateyourmusic.com) | Likely exists            | Claim/verify, add all releases |
| [Metal Storm](https://metalstorm.net)        | Unknown                  | Submit band profile            |
| [Last.fm](https://last.fm)                   | Likely auto-generated    | Claim artist page, add bio     |
| [AllMusic](https://allmusic.com)             | Unknown                  | Submit or claim                |
| [MusicBrainz](https://musicbrainz.org)       | Exists (found in search) | Verify data accuracy           |

**Impact:** Medium | **Effort:** 2–3 hrs total

---

### 7. Run PageSpeed Insights

No SEO tool needed — free at [pagespeed.web.dev](https://pagespeed.web.dev).

Check:

- LCP on homepage (hero image load time)
- CLS from Snipcart JS injection
- Mobile score vs. desktop score

Fix whatever's in the red. Snipcart and CrazyEgg both load third-party JS that could be dragging scores.

**Impact:** Medium | **Effort:** 2 hrs

---

### 8. Write one genre explainer post

Target keyword: `what is dissonant death metal` — low competition, informational intent, zero results currently pointing to replicant.band.

A 600–800 word post on the About or News page explaining the genre through the lens of Replicant's sound positions the site as an authority and captures fans new to the subgenre.

**Impact:** Medium | **Effort:** 3–5 hrs

---

## Metrics to Watch

Google Search Console is already integrated. Use it to track progress.

**Baseline to pull from GSC now, before the `seo` branch ships:**

- Current impressions + clicks for "technical death metal New Jersey"
- Current impressions + clicks for "Replicant band" / "Replicant death metal"
- Average position for album name queries (Infinite Mortality, Malignant Reality, etc.)
- Any crawl errors or coverage issues flagged under Pages

**Optional additions (free):**

- **Ahrefs Webmaster Tools** — domain rating, backlink profile, broken links
- **Ahrefs / Semrush** (paid) — full keyword tracking, competitor gap analysis
