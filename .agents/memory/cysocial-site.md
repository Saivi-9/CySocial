---
name: CySocial site architecture
description: Key decisions and patterns for the CySocial Turkish social-media agency landing page.
---

## Summary
Full single-page site in `artifacts/cysocial`. React 18 + Vite, compiled to plain HTML/CSS/JS (invisible to user). No Tailwind — all CSS is hand-written in `src/index.css` using CSS variables (`--primary`, `--bg`, `--surface`, etc.).

## Key patterns

**Multilingual (4-language) support:**
- Top-level `t` dict: `Record<string, Record<string, string>>` covers tr/en/ru/ar for all section labels.
- Local data objects (services, faqs, etc.) typed as `LM = Record<string, string>` — use `tl(obj)` helper, never `obj[lang]` directly (causes TS7053).
- `tw(key)` for top-level `t` dict, `tl(obj)` for inline data objects.

**Modal accessibility:**
- Use the `ModalWrapper` component defined in App.tsx — it handles escape-key close, `role="dialog"`, `aria-modal`, and `autoFocus` on the close button.

**Effect deps:**
- Scroll reveal, counter, progress-bar, and 3D-tilt effects all use `[]` dep array (one-time DOM setup).
- Typewriter uses `twTimerRef` to track and cancel the full recursive timer chain on unmount.

**Font Awesome:**
- Loaded via CDN in `index.html` (`cdnjs cloudflare font-awesome 6.7.2 all.min.css`).
- Poppins + Inter also loaded from Google Fonts in `index.html`.

**Why:**
User requested "strictly HTML/CSS/JS" — the React layer is invisible. All interactivity via `useEffect` + vanilla DOM APIs. Design uses CSS custom properties for dark/light mode toggled via `html.dark` class.
