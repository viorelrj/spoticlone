# Implementation Plan: Migrate Spotify login from Implicit Grant to Authorization Code + PKCE

Branch: ai-test (fast mode — no branch created)
Created: 2026-11-05

## Original Request
migrate Spotify login from implicit grant to PKCE

## Settings
- Testing: no
- Logging: verbose
- Docs: no  # WARN [docs] only; README note for the redirect URI is part of Task 1

## Research Context
Source: `.ai-factory/RESEARCH.md` (Active Summary, Updated: 2026-11-05 21:22, SHA256: 2e02f8749f7369c2ed8f7e971f993adfcd5638e9ffe16daff6136050dad833f9)

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

## Requirements Reconciliation
Authority: user answers in this planning session > research Active Summary > existing code. No conflicts; the user's answers close the research open questions as follows.

| Decision / supported combination | Source path and section | Verification evidence |
|----------------------------------|-------------------------|-----------------------|
| Token storage stays `window.token` (no localStorage, no Redux slice). Refresh token and expiry are kept in module memory only, so a page reload still requires a new login. `features/auth/slice.ts` stays untouched. | User answer (this session) → closes RESEARCH.md "Open questions" #1 | Reload `/search` → lands on `/login` → Spotify (consent auto-skips once granted) → back on `/search` |
| Refresh-token handling is in scope: refresh before expiry and once on a 401, then fall back to `/login` | User answer (this session) → closes "Open questions" #2 | Manual: force `expiresAt` into the past in devtools, run a search, see a `[auth.refresh]` log and a successful request |
| Redirect URI becomes `http://127.0.0.1:3000/login-callback`; the user updates the Spotify dashboard | User answer (this session) + RESEARCH.md "Constraints" #2 | `/login` reaches the consent screen with no redirect_uri error |
| `NEXT_PUBLIC_SPOTIFY_API_URL=https://api.spotify.com/v1` | RESEARCH.md "Open questions" #4. Supported by the request paths `/search`, `/me/player`, `/me/player/devices` in `api/index.ts` | Search request goes to `https://api.spotify.com/v1/search` and returns 200 |
| Callback inputs: (a) `code` + matching `state` + stored verifier → exchange → `/search`; (b) `error` param (e.g. `access_denied`) → error message + "Try again" link to `/login`; (c) `state` mismatch or missing verifier → same error UI, no exchange; (d) the effect runs twice under React StrictMode → only one exchange request | RESEARCH.md "Decisions" #2 + `next.config.js` `reactStrictMode: true` | Manual: (a) normal login; (b) press Cancel on the consent screen; (c) edit `state` in the URL; (d) Network tab shows a single POST `/api/token` in dev |
| Token states: valid → request sent as is; expires within 60s → refresh first; 401 → refresh once, retry once; refresh fails or no refresh token → clear the session and go to `/login` | User answer (refresh) | Manual, via devtools as above. Revoke app access in the Spotify account → next request ends on `/login` |

Meaning preservation: PASS. Research decisions and constraints are copied verbatim. Inferred, unchecked claims (the redirect-URI rules, the API URL) stay marked as assumptions and are confirmed by the manual checks.

## Logging Convention (applies to every task)
- Add `features/auth/log.ts` (Task 2). It exports `authLog.debug/info/warn/error(scope, message, data?)` with the prefix format `[auth.<scope>] message {data}`.
- `debug` and `info` print only when `process.env.NEXT_PUBLIC_LOG_LEVEL === 'debug'` (defaults to on in development via `.env.local`). `warn` and `error` always print.
- **Never log secret values**: access token, refresh token, `code`, `code_verifier`, `state`. Log only whether each is present, its length, the expiry timestamp, HTTP status codes, and Spotify `error` / `error_description`.

## Commit Plan
- **Commit 1** (after tasks 1-3): `feat(auth): add PKCE helpers, token service and 127.0.0.1 redirect config`
- **Commit 2** (after tasks 4-7): `fix(auth): switch Spotify login to authorization code with PKCE and token refresh`

## Tasks

### Phase 1: Config & auth primitives

- [x] **Task 1: Fix environment and dev-server origin**
  - `.env.local` (git-ignored, edit locally): set `NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/login-callback`, add `NEXT_PUBLIC_SPOTIFY_API_URL=https://api.spotify.com/v1` and `NEXT_PUBLIC_LOG_LEVEL=debug`.
  - Create `.env.example` (committed) with the same keys and a placeholder `NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your-client-id`. It must contain no real client ID.
  - `package.json`: change `dev` to `next dev -H 127.0.0.1` so the app is served on the same origin as the redirect URI. `sessionStorage` is per origin: if `/login` runs on `localhost` and the callback lands on `127.0.0.1`, the verifier is missing.
  - `README.md`: replace the "Open http://localhost:3000" line with a short "Spotify setup" note. Open `http://127.0.0.1:3000`, register exactly `http://127.0.0.1:3000/login-callback` in the Spotify dashboard, and copy `.env.example` to `.env.local`.
  - Logging: none needed (config only).
  - **Manual action for the user:** update the redirect URI in the Spotify dashboard.

- [x] **Task 2: PKCE helpers + auth logger** (`features/auth/pkce.ts`, `features/auth/log.ts`)
  - `log.ts`: logger as described in the Logging Convention.
  - `pkce.ts` exports:
    - `generateCodeVerifier()` returns 64 characters from the RFC 7636 unreserved set, using `crypto.getRandomValues`.
    - `generateCodeChallenge(verifier)` returns base64url (no padding) of SHA-256, using `crypto.subtle.digest`. `127.0.0.1` over http counts as a secure context, so `crypto.subtle` is available.
    - `generateState()` returns 16 random bytes as hex.
    - `savePkceSession({ verifier, state })` / `consumePkceSession()` read and write `sessionStorage` keys `spc.pkce.verifier` and `spc.pkce.state`. `consume` returns the values and removes both keys.
    - `buildAuthorizeUrl({ clientId, redirectUri, challenge, state })` builds `https://accounts.spotify.com/authorize` with `response_type=code`, `code_challenge_method=S256`, `code_challenge`, `state`, `client_id`, `redirect_uri`, and the scope list without the duplicate `app-remote-control`: `user-read-private user-read-email app-remote-control streaming user-read-playback-state user-modify-playback-state`.
  - Logging: `debug('pkce', 'generated', { verifierLength, challengeLength })`. `warn('pkce', 'session missing')` when `consumePkceSession` finds no verifier. Also warn when `sessionStorage` throws.

- [x] **Task 3: Token service with refresh** (`features/auth/token.ts`, `types/token.ts`)
  - `types/token.ts`: extend `TokenResponseType` with `refresh_token?: string` and `scope?: string`.
  - Module-level state: `refreshToken: string | null`, `expiresAt: number | null` (ms), `inflightRefresh: Promise<string> | null`. The access token stays on `window.token`, as the user chose.
  - `exchangeCode({ code, verifier, clientId, redirectUri })`: POST `https://accounts.spotify.com/api/token` with `Content-Type: application/x-www-form-urlencoded` and body `grant_type=authorization_code, code, redirect_uri, client_id, code_verifier`. On success call `setSession`. On non-2xx throw an `Error` that carries Spotify's `error` / `error_description`.
  - `refreshAccessToken()`: single-flight (reuse `inflightRefresh`). POST with `grant_type=refresh_token, refresh_token, client_id`. Keep the new `refresh_token` if Spotify sends one, otherwise keep the old one. Throw if there is no refresh token.
  - `setSession(res)`: sets `window.token`, `refreshToken`, and `expiresAt = Date.now() + expires_in*1000`.
  - `clearSession()`: clears all three.
  - `getValidToken()`: returns `window.token`. If `expiresAt - now < 60_000` and a refresh token exists, it first awaits `refreshAccessToken()`. Returns `''` when there is no session.
  - Use `fetch`, not the shared axios client, so the request interceptor does not recurse.
  - Logging: `info('token', 'exchange ok', { expiresIn, hasRefresh, scope })`, `info('token', 'refresh ok', { expiresAt })`, `error('token', 'exchange/refresh failed', { status, error, error_description })`, `debug('token', 'refresh skipped/joined in-flight')`.
  - (depends on 2 for the logger)

<!-- Commit checkpoint: tasks 1-3 -->

### Phase 2: Flow wiring

- [x] **Task 4: Switch the login redirect to PKCE** (`components/molecules/login-form/login-form.tsx`)
  - Remove `getLoginSearchParams` (the `response_type=token` path).
  - Make `login` async:
    1. Guard: if `clientId` or `redirectUri` is missing, `authLog.error` and show "Spotify client is not configured".
    2. Origin guard: if `window.location.origin !== new URL(redirectUri).origin`, `window.location.replace(new URL('/login', redirectUri).href)` and return, so the verifier is stored on the callback origin.
    3. Generate the verifier, challenge, and state, then `savePkceSession`.
    4. `window.location.replace(buildAuthorizeUrl(...))`.
  - Catch errors (for example `crypto.subtle` being unavailable) and show an inline error message instead of "Redirecting you".
  - Keep the component's export names (`LoginForm`, default) unchanged. `pages/login/index.tsx` imports them.
  - Logging: `info('login', 'redirecting to authorize')`, `warn('login', 'origin mismatch, bouncing', { from, to })`, `error('login', 'failed', { message })`.
  - (depends on 1, 2)

- [x] **Task 5: Code exchange in the callback page** (`pages/login-callback/index.tsx`)
  - Wait for `router.isReady`. Read `code`, `state`, and `error` from `router.query`.
  - Use a `useRef` guard so the exchange runs only once under React StrictMode. Refs persist across StrictMode's simulated remount.
  - Branches (see Requirements Reconciliation):
    - `error` → error UI.
    - `consumePkceSession()` missing, or `state !== stored.state` → error UI, no network call.
    - Otherwise `await exchangeCode(...)` → `router.replace('/search')`. Use `replace` so `?code=` does not stay in browser history.
    - Exchange throws → error UI.
  - Error UI: a short message plus a link to `/login` ("Try again"). Keep the "Logging you in..." text while the exchange is pending.
  - Logging: `debug('callback', 'params', { hasCode, hasState, error })`, `warn('callback', 'state mismatch' | 'missing verifier')`, `info('callback', 'login complete')`, `error('callback', 'exchange failed', { message })`.
  - (depends on 2, 3)

- [x] **Task 6: Stop the token context hijacking auth routes** (`contexts/token.context.tsx`)
  - Remove the `#fragment` / `query-string` parsing and the `access_token` handling.
  - In the effect, wait for `router.isReady`. If `router.pathname` is `/login` or `/login-callback`, do nothing. Otherwise, if `!window.token`, call `router.replace('/login')`.
  - Depend on `[router.isReady, router.pathname]` instead of the whole `router` object, to avoid extra redirects on every route change.
  - Logging: `debug('guard', 'check', { pathname, hasToken })`, `info('guard', 'no token, redirecting to /login', { from: pathname })`.
  - (depends on 3)

- [x] **Task 7: Refresh-aware API client and player** (`api/api.axios.tsx`, `features/player/context/PlayerProvider.tsx`)
  - Axios request interceptor: make it `async`. `const token = await getValidToken()`, and set the `Authorization` header only when a token exists.
  - Add an axios response interceptor. On `401`, if the request has no `_retried` flag, set the flag, `await refreshAccessToken()`, update the header, and `return client(config)`. If the refresh throws, or the request was already retried, call `clearSession()` and `window.location.assign('/login')`, then reject. Pass other errors through unchanged.
  - `PlayerProvider.tsx`: `getOAuthToken: (cb) => { getValidToken().then(cb).catch(() => cb('')); }`. Change `createPlayer` to accept `() => Promise<string>`.
  - Logging: `debug('api', 'attach token', { hasToken, url })`, `warn('api', '401, attempting refresh', { url })`, `error('api', 'refresh failed, logging out')`, `debug('player', 'getOAuthToken', { hasToken })`.
  - (depends on 3)

<!-- Commit checkpoint: tasks 4-7 -->

## Manual Verification (no automated tests by user choice)
1. `npm run dev`, then open `http://127.0.0.1:3000` → it redirects to `/login` and then to the Spotify consent screen, with no "response_type must be code" error.
2. Approve → `/login-callback?code=…&state=…` → lands on `/search`. The Network tab shows exactly one `POST accounts.spotify.com/api/token`.
3. A search returns results, the device list loads, and playback via the Web Playback SDK works.
4. Open `http://localhost:3000/login` → it bounces to `127.0.0.1` first (origin guard).
5. Press Cancel on the consent screen → the error UI with "Try again" appears.
6. Refresh path: set the expiry to the past (temporarily expose it, or wait about 1h), run a search → `[auth.token] refresh ok` appears in the log and the request succeeds.
7. Reload `/search` → back through `/login` (expected, since the token lives only in `window.token`).
