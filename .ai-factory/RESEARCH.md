# Research

Updated: 2026-11-05 21:22
Status: active

## Active Summary (input for /aif-plan)
<!-- aif:active-summary:start -->
Topic: Fix Spotify login, which fails with "response_type must be code"

Goal: Get login working again by moving from Spotify's removed Implicit Grant flow to Authorization Code with PKCE, which runs fully in the browser with no client secret and no backend.

Constraints:
- Spotify's `/authorize` endpoint rejects `response_type=token`. This was seen in the browser as the error page "response_type must be code". The claim that Spotify removed Implicit Grant in 2025 (new apps in April 2025, all apps in November 2025) comes from Spotify's announcements and was not re-checked this session.
- The redirect URI must match the Spotify dashboard exactly. Spotify's 2025 redirect-URI rules (also not re-checked this session) do not accept `localhost`; a local address must be the loopback IP over http, e.g. `http://127.0.0.1:3000/login-callback`. The current value in `.env.local` is `https://localhost:3000/login-callback`.
- The fix must stay client-only. It is a Next.js pages-router app and has no auth backend.

Decisions:
- Use Authorization Code with PKCE (S256). Store the `code_verifier` in `sessionStorage` between `/login` and `/login-callback`.
- The code-for-token exchange (POST `https://accounts.spotify.com/api/token` with code, verifier, client_id, redirect_uri) happens in `pages/login-callback/index.tsx`.
- `TokenContextProvider` (`contexts/token.context.tsx`) must not redirect to `/login` while on `/login` or `/login-callback`. Otherwise it would send the user away before the exchange finishes.

Known issues found in the code (evidence: file paths):
1. `components/molecules/login-form/login-form.tsx:10` sends `response_type=token`. This blocks login.
2. `.env.local` sets `NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=https://localhost:3000/login-callback`, which breaks Spotify's redirect-URI rules (inference from those rules, not tested). The `dev` script is plain `next dev` with no HTTPS, even though there is a `certificates/` folder.
3. `contexts/token.context.tsx:17-20` reads the token only from the URL `#fragment` and redirects whenever `window.token` is missing.
4. The token lives only in `window.token` (`contexts/token.context.tsx`, `api/api.axios.tsx`, `features/player/context/PlayerProvider.tsx`). It is lost on reload, and nothing uses a refresh token.
5. `features/auth/slice.ts` exists but nothing uses it. It also has a typo, `expiers_in`.
6. No env file defines `NEXT_PUBLIC_SPOTIFY_API_URL`, which `api/api.axios.tsx:4` uses. Only `.env.local` exists, and it has just the client ID and redirect URI.
7. The scope string lists `app-remote-control` twice (`login-form.tsx:11`).

Open questions:
- Where should the token live: keep `window.token`, move it into the Redux `auth` slice, or keep it in `localStorage` so users stay logged in after a reload?
- Should refresh-token handling be part of this fix, or should users accept being logged out after about an hour for now?
- Is the redirect URI in the Spotify dashboard still `https://localhost:3000/login-callback`? Not checked. Only the user can see the dashboard.
- What value should `NEXT_PUBLIC_SPOTIFY_API_URL` have (probably `https://api.spotify.com/v1`)? Not confirmed.

Success signals:
- `/login` reaches the Spotify consent screen with no "response_type must be code" error.
- After consent, `/login-callback?code=...` exchanges the code and lands on `/search` with a working token.
- Search API calls and the Web Playback SDK both authenticate.

Next step: `/aif-plan fast migrate Spotify login from implicit grant to PKCE`. Before testing, the user must change the redirect URI in both `.env.local` and the Spotify dashboard.
<!-- aif:active-summary:end -->

## Sessions
<!-- aif:sessions:start -->
### 2026-11-05 21:22 — Login flow failure diagnosis
What changed: Traced the login flow from start to finish. Found that `response_type=token` (Implicit Grant) is the cause of Spotify's "response_type must be code" error, and decided to move to Authorization Code with PKCE.
Key notes: Current flow: `/login` → `/authorize` → `#access_token` → `TokenContextProvider` → `window.token`. Under PKCE the callback receives `?code=`, so the app has to add an exchange step and a redirect exception in `TokenContextProvider`. The redirect URI, `NEXT_PUBLIC_SPOTIFY_API_URL`, token persistence, and refresh are the next likely failures. Coherence gate passed: the summary separates what was seen (the error page, code locations) from what is inferred (the redirect-URI rules), and lists the unchecked points as open questions.
Links (paths): components/molecules/login-form/login-form.tsx, pages/login-callback/index.tsx, contexts/token.context.tsx, api/api.axios.tsx, features/auth/slice.ts, features/player/context/PlayerProvider.tsx, .env.local
<!-- aif:sessions:end -->
