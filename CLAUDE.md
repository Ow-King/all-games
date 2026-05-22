@AGENTS.md


# Game Ranking App — Architecture Feedback & Pre-Launch Optimizations

> A surface-level review of your proposed stack and feature set before you start building.
> Stack revised for a **free-to-start** budget with a clear upgrade path when you're ready to scale.

---

## 1. Database: Supabase (PostgreSQL) + MongoDB Atlas Hybrid

**The Issue**

MongoDB is document-oriented, which works great for user profiles and game libraries. However, your core feature — the 1v1 ranking system and social graph (friends, shared lists) — is inherently *relational*. Modeling that purely in MongoDB leads to denormalized data duplication, complex manual joins, and painful consistency issues as your user base grows.

**Recommended Free-Tier Hybrid**

- **MongoDB Atlas (free 512MB cluster)** for: IGDB game metadata cache, user libraries, "Want to Play" lists, and activity feeds — anything document-shaped and read-heavy.
- **Supabase (free PostgreSQL)** for: the social graph (friend relationships), ranking comparison pairs, and anything requiring transactional consistency. Supabase also supports the `pgvector` extension for your GNN embeddings later.

> ⚠️ **Supabase free tier caveat**: Projects pause after **1 week of inactivity**. Fine for development, but set a reminder to keep it warm. Their Pro plan is $25/month when you're ready to go live.

**Why not Google Cloud SQL?** Cloud SQL has no meaningful free tier — it starts at ~$7–10/month minimum. Supabase gives you the same managed PostgreSQL experience at zero cost.

**Quick Rule of Thumb**

```
MongoDB Atlas  → "What games has user X played and rated?"
Supabase/PG   → "Who are user X's friends, and what did they rate in common?"
pgvector      → "Which games are most similar to user X's top-rated titles?"
```

---

## 2. The 1v1 Ranking System

**How Beli Does It**

Beli uses a variation of the **Elo rating system** fed by pairwise comparisons to derive a continuous score. This is the right approach.

**What to Watch Out For**

- **Cold Start Problem**: New users have no comparisons. You need a sensible default seeding strategy — either a short onboarding bracket (5–10 mandatory comparisons) or a genre-based pre-seed from popular games.
- **Comparison Fatigue**: Users with 200+ games will face thousands of potential pairs. Use a **smart pairing algorithm** that prioritizes:
  - Games with high uncertainty (few comparisons)
  - Games in the same genre (more meaningful signal)
  - Recently played games (recency bias is a feature, not a bug)
- **Score Volatility**: Early scores swing wildly with few comparisons. Add a **confidence interval** to each score and only show the derived 0.0–10.0 number once a game has N comparisons (recommend N ≥ 5).

**Suggested Elo Variant**

The **TrueSkill** algorithm (originally by Microsoft for Xbox matchmaking) handles uncertainty better than pure Elo and is well-suited for ranking with limited comparison data. There are open-source Python implementations.

---

## 3. Recommendation Engine & GNNs

**Your Goal**: Learn GNN design through a practical implementation. Good call — this is a genuinely strong use case.

**Reality Check on Complexity Curve**

| Phase | Approach | Effort |
|---|---|---|
| MVP | Collaborative filtering (user-user or item-item) | Low |
| V1 | Matrix factorization (ALS or SVD) | Medium |
| V2 | Graph Neural Network (GraphSAGE or LightGCN) | High |

Don't start with GNNs on day one. Build the collaborative filter first — it will generate the training data and ground truth labels your GNN will eventually need. Skipping this step means you'll have a sophisticated model with nothing meaningful to train on.

**GNN Architecture Recommendation**

When you're ready, **LightGCN** is the best starting point for recommendation systems:
- Designed specifically for collaborative filtering
- Lighter than GraphSAGE (fewer parameters, easier to tune)
- Well-documented with PyTorch Geometric implementations

**Graph Structure to Model**

```
Nodes:  Users, Games, Genres, Developers
Edges:  
  user  --[rated:score]-->    game
  user  --[friends_with]-->   user
  user  --[wants_to_play]-->  game
  game  --[belongs_to]-->     genre
  game  --[made_by]-->        developer
```

**Hosting the Model (Free Tier Approach)**: Don't host it at all at MVP stage. Run recommendations as a **scheduled batch job** — a simple Python script triggered by a free **GitHub Actions cron job** — that writes results back to your DB. Only productionize the model into a dedicated service once you have real users and real traffic.

---

## 4. Tech Stack — Expo & Mobile

**Expo is the right call** for a solo developer learning mobile. A few things to know upfront:

**What Works Well**
- Expo Go for rapid prototyping
- EAS Build for production builds without managing native toolchains
- `expo-notifications` for push notifications (critical for social features)

**What to Plan For**

- **Expo SDK upgrades are breaking**: Pin your SDK version and schedule dedicated upgrade sprints. Don't upgrade mid-feature.
- **Bare workflow vs. Managed workflow**: Start Managed. You'll likely need to eject to Bare workflow if you integrate deep-link social sharing or custom native modules. Plan for this transition at V1.
- **Performance on Android**: Expo/RN has known jank on Android for animated lists. Use `FlashList` (by Shopify) instead of the default `FlatList` for your game library screens — it's a drop-in replacement with 10x better performance.

---

## 5. Social Features & Viral Mechanics

**"Attributes Locked Behind Spreading the App"**

This is a referral-gate mechanic. Done poorly it feels punishing and drives churn. Done well (like Robinhood's waitlist or Duolingo streaks) it creates FOMO-driven sharing.

**Recommended Approach**

- **Don't lock core functionality.** Lock *social amplifiers* instead:
  - Free: Rate games, maintain your list, see your own recommendations
  - Unlocked via referral: See friends' full ranked lists, unlock "compatibility score" with friends, unlock list comparison view
- **Make sharing frictionless**: The share artifact should be a beautiful, auto-generated image card (game cover + your score + your username). Use **Supabase Edge Functions** with the `sharp` library to generate these server-side — it's within the free tier and avoids needing a separate Cloud Run service.

**"Want to Play" List Visibility**

Think carefully about privacy defaults. Recommend:
- Default: visible to friends only
- Options: Public, Friends Only, Private
- **Wishlist notifications**: Notify a friend when you add a game they rated 8.0+ to your Want to Play list. High-engagement social hook.

---

## 6. Free-Tier Architecture

**Revised Service Map**

```
Client (Expo)
    │
    ▼
Railway or Render (Node/Express or FastAPI)  ← Main API (free tier, sleeps on inactivity)
    ├── MongoDB Atlas                         ← Game metadata cache, libraries (512MB free)
    ├── Supabase (PostgreSQL)                 ← Social graph, rankings, user data (free)
    └── Firebase Auth                         ← Auth (10k users free)

GitHub Actions (cron)  ← Batch recommendation refresh (free)
Cloud Storage / Supabase Storage  ← Profile images, share cards (free tier)
```

**Free Tier Summary**

| Service | What It Handles | Free Limit | Paid Upgrade |
|---|---|---|---|
| Supabase | PostgreSQL (social graph, rankings) | 500MB DB, pauses after inactivity | $25/mo Pro |
| MongoDB Atlas | Game metadata cache, libraries | 512MB | $9/mo M2 |
| Firebase Auth | Authentication, OAuth | 10k users/month | Pay-as-you-go |
| Railway / Render | API hosting | Limited hours / sleeps | ~$5–7/mo |
| GitHub Actions | Batch ML jobs, cron tasks | 2,000 min/month | Minimal cost |
| Expo EAS | Mobile builds | 30 builds/month | $99/mo Production |

**API Hosting Note**: Both Railway and Render have free tiers that spin down after inactivity (cold starts ~30s). This is fine for development and early users. When you launch publicly, budget ~$5–7/month for an always-on instance.

**Don't Roll Your Own Auth**

Use **Firebase Authentication** from day one. It handles OAuth (Sign in with Apple is *required* for iOS App Store), token refresh, and session management. Implementing this yourself is a significant time sink with security risk.

---

## 7. Game Data Source

This is a gap not mentioned in your plan. You need a source of game metadata (titles, cover art, genres, release dates).

**Best Options**

| API | Cost | Notes |
|---|---|---|
| IGDB (via Twitch) | Free | Best coverage, requires Twitch auth |
| RAWG | Free tier available | Good coverage, simpler auth |
| GiantBomb | Free | Good but older data |

**Recommendation**: Use **IGDB**. It's the most comprehensive and is backed by Twitch/Amazon so it's not going anywhere. Cache aggressively in your **MongoDB Atlas free cluster** — game metadata is read-heavy and rarely changes, making it a perfect fit for the 512MB free tier. You don't want to hit IGDB's API on every search, and the free Atlas cluster is more than enough to store tens of thousands of game records.

---

## 8. Quick Wins & Things to Decide Early

| Decision | Recommendation | Cost |
|---|---|---|
| Auth provider | Firebase Auth (not custom) | Free |
| Game data API | IGDB | Free |
| Game metadata cache | MongoDB Atlas | Free (512MB) |
| Relational DB | Supabase (PostgreSQL) | Free (with inactivity caveat) |
| API hosting | Railway or Render | Free (sleeps) → ~$7/mo |
| List rendering | FlashList, not FlatList | Free |
| Ranking algorithm | TrueSkill (start), LightGCN (later) | Free |
| ML jobs | GitHub Actions cron batch script | Free |
| Image generation | Supabase Edge Functions + sharp | Free tier |
| Onboarding | Mandatory 5-game seed bracket to avoid cold start | — |

---

## 9. What's Missing From the Feature List

A few features common to apps in this space worth considering early (they affect your data model):

- **"Currently Playing" status** — affects how comparisons are surfaced
- **Platform tracking** (PS5, PC, Switch, etc.) — users often want to filter by platform
- **Backlog vs. Abandoned vs. Completed** — more granular than just "played"
- **Session-based activity feed** — what your friends rated this week drives retention

## 10. Upgrade Path (When You're Ready to Scale)

When free tiers start to pinch, here's the natural progression:

| Milestone | What to Upgrade | Monthly Cost Added |
|---|---|---|
| First real users | Render/Railway always-on dyno | ~$7 |
| Supabase pausing hurts | Supabase Pro | $25 |
| Atlas 512MB fills up | MongoDB M2 cluster | $9 |
| ML batch jobs need more compute | GitHub Actions larger runner | Minimal |
| Heavy traffic | Migrate API to Google Cloud Run | Pay-per-use |

Total cost at "small but real" scale: **~$40–50/month**, which is very manageable once the app has even a small engaged user base.

---