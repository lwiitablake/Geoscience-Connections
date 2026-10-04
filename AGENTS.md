# Project instructions

Read CODEX_HANDOFF.md, README.md and ACCESSIBILITY.md before making changes.

## User requirements

- A simple interactive website explaining connections between majors, disciplines, concrete tasks and geosciences, with all references and an annotated bibliography.
- All matching information is available without pagination. Connections and bibliography can be read together; the bibliography can also be hidden.
- Mobile-friendly. Accessibility is a core requirement: the user requested ADA, WCAG 2.1 AA, Section 508 and Section 503 at minimum. See ACCESSIBILITY.md for scope, legal distinctions and incomplete verification. Do not claim conformance without evidence.
- The user handles GitHub. Deliver portable files; do not publish, deploy, create a remote repository or push without a subsequent user instruction.

## Implementation constraints

- Preserve plain HTML/CSS/JavaScript and direct opening of index.html unless the user requests a different architecture. No runtime dependencies, build step or external CDN assets are needed.
- Keep content, source IDs, evidence classifications, annotations and limitations intact when changing presentation. Do not turn illustrative applications into documented claims.
- data.js is the editable website content. The source workbook is the original snapshot. Regeneration overwrites content; use a separate output directory and compare before replacing data.js.
- Keep keyboard navigation, visible focus, result announcements, table semantics, bibliography focus/return and mobile reflow intact.
- Do not equate simulated DOM checks with browser or assistive-technology testing. Record actual checks and remaining limitations accurately.

## Local checks

Run `node --check app.js`, `node --check data.js`, and `node tools/check-site.cjs` from the project root. The smoke test uses Node built-ins and a simulated DOM; it does not validate layout. Follow the browser and assistive-technology review in ACCESSIBILITY.md.
