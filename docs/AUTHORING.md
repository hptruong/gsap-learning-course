# Documentation Authoring

## File and route convention

- Lesson sources live at `docs/<language>/<id>.md`.
- `<id>` is the lowercase kebab-case route from `docs/site.config.mjs`, for example `05-scroll-trigger.md`.
- The same filename is used in every language. Never translate a filename or route.
- `docs/site.config.mjs` is the only registry for page order, sections, and language fallbacks.

## Add a lesson

1. Add its route and section to `DOCS_CONFIG.pages`.
2. Add one Markdown file with that exact ID in each required language.
3. Add `navTitle`, `description`, and `keywords` in every `docs/locale/<language>.json` file.
4. Run `pnpm docs:check && pnpm docs:build`.

## Add a language

1. Add a language entry to `DOCS_CONFIG.languages` with a BCP 47-style short code, a fallback chain, and a toggle label.
2. Add `docs/locale/<code>.json` with every UI, section, and page key.
3. Add translated Markdown files to `docs/<code>/`. During incremental translation, set `required: false`; the builder serves the first available fallback. Set it to `true` once every lesson is translated.
4. Run `pnpm docs:check && pnpm docs:build`.

## Content standard

- Link API claims to the official GSAP docs. Prefer a source over a broad claim.
- Mark optional integrations and third-party libraries as optional.
- Each lesson needs a small checkpoint that can be built from a blank file.
- Include reduced-motion, cleanup, and responsive behavior where the technique can affect them.
- Use examples that are valid for the documented plugin API and current GSAP version.
