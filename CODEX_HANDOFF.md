# Geoscience Connections — Codex handoff

Prepared October 3, 2026. This folder is self-contained; it does not require the previous conversation, its temporary workspace paths, accounts or API credentials.

## Goal and user intent

The original question was whether any major or discipline has absolutely no connection to geology or the geosciences. The user wanted a large table connecting majors, disciplines and specific subdisciplines/tasks to geosciences, with all references and an annotated bibliography.

The resulting collection is an illustrative, broad starting map. It is not proof that every conceivable discipline has a necessary connection, nor an exhaustive catalog. Keep this distinction visible.

The user then requested a simple interactive website, with connections and bibliography available together and an option to hide the bibliography. They will handle GitHub and requested files only. They later specified mobile friendliness and ADA, WCAG 2.1 AA, Section 508 and Section 503 as minimum accessibility expectations.

Latest request: gather everything needed to continue the project in Codex. No new visual redesign, publication or content expansion has been requested.

## What is included

| File | Purpose |
| --- | --- |
| AGENTS.md | Project requirements and maintenance instructions for coding agents. |
| CODEX_HANDOFF.md | This context and continuation guide. |
| START_HERE.txt | Suggested first message for the new Codex session. |
| README.md | Opening, hosting and editing instructions. |
| ACCESSIBILITY.md | Implementation mapping, measured checks, outstanding tests and annotated official standards references. |
| index.html | Semantic structure, controls and introductory text. |
| styles.css | Navy/teal visual design, desktop split layout, mobile row reflow, focus and print styles. |
| app.js | Search/filter/sort, bibliography rendering/toggle, citation navigation and focus return. |
| data.js | Complete dataset assigned to window.GEOSCIENCE_DATA. |
| favicon.svg | Decorative site icon. |
| .nojekyll | Static hosting helper. |
| source/Geoscience_Connections_Across_Majors.xlsx | Original workbook snapshot for provenance and comparison. Not needed at runtime. |
| tools/check-site.cjs | Portable version of the simulated-DOM smoke checks already performed. Node built-ins only. |
| tools/extract_site_data.py | Workbook-layout-specific extractor. Python standard library only. |

The application assets are identical to the previously delivered website ZIP. This transfer adds context, provenance and portable development tools. No Git remote, repository history, deployment configuration, credentials, analytics, backend or package installation is required.

## Running and checking

Open index.html directly. Alternatively, from this folder run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then visit http://127.0.0.1:8000 in a browser on the same computer. This starts a local preview only.

```sh
node --check app.js
node --check data.js
node tools/check-site.cjs
```

To reproduce workbook extraction without overwriting the site:

```sh
python3 tools/extract_site_data.py --output-dir /tmp/geoscience-extracted
```

On systems without /tmp, choose a new temporary folder. Compare its data.js with the project copy before replacing anything. The extractor assumes the supplied workbook's three-sheet layout and baseline counts; it is not a general spreadsheet importer. Site edits made after this snapshot will not be reflected in the workbook automatically.

## Content and behavior

- 120 connection records, 35 annotated references, 24 scope-guide entries.
- Connection fields: id, family, major, discipline, task, anchor, connection, pathway, evidence, references (array of source IDs).
- Reference fields: id, citation, url, type, annotation, limitations, access.
- Guide fields: topic and explanation.
- “Documented connection” and “Illustrative application” distinguish source-supported relationships from proposed applications. Access notes distinguish webpages and abstracts/summaries from full-publication review. Preserve these qualifications.
- Search matches all words across a connection's fields. Family, pathway and evidence filters combine. Sorting is original field-family order or major A–Z.
- Both panels are visible by default. All matching records are rendered; scrolling does not imply pagination.
- The bibliography has independent search and an optional filter to sources cited by all matching connections, including those below the viewport.
- Selecting a source ID shows the bibliography, clears its search, highlights/focuses the annotation and preserves connection filters. Return to connection returns focus to the originating button, with a search-field fallback if the originating row no longer exists.
- At 800 CSS pixels or narrower the panes stack and table rows become vertical records with labels. Explicit table roles are retained; actual screen-reader compatibility still needs verification.
- Filters do not persist after refresh. Source links open a new tab with an accessible notice. All application content works offline; source destinations need internet.

## Verification status

Passed: JavaScript syntax; dataset counts; unique record IDs; reference relationships; HTTPS source URL syntax; simulated-DOM checks for initial rendering, search/no-results/reset, family filtering, sorting, bibliography visibility/search, citation focus and return. Representative calculated text contrast pairs exceed 4.5:1 and tested control/focus indicators exceed 3:1; see ACCESSIBILITY.md for numbers.

The transfer copy's smoke script was rerun after replacing its hard-coded workspace path with a path relative to the script. The portable extractor reproduced the original data.js byte-for-byte.

Not completed: actual browser rendering, screenshot inspection, real keyboard operation, mobile/zoom/text-spacing layout checks, automated browser accessibility scans, HTML validation, screen-reader and real-device testing. The original environment lacked a working browser binary (download archive failed) and its separate browser preview blocked localhost. These were environment blockers, not proof of website failure or success. A new environment should try its own browser tools rather than assume the blocker persists.

No full WCAG conformance, ADA compliance, Section 508 conformance or legal certification has been established. The legal distinctions and official sources are in ACCESSIBILITY.md. Section 503 concerns covered employers' disability nondiscrimination and affirmative-action responsibilities; website files alone cannot fulfill those obligations.

## Recommended continuation

1. Read the three main documentation files and run the existing checks.
2. Preview the unchanged site in a real browser. Check desktop side-by-side use and mobile reading before altering the design.
3. Follow ACCESSIBILITY.md's release-review sequence, prioritizing keyboard navigation, semantic table exposure on mobile, 320px reflow, 200% text size, 400% zoom, WCAG text spacing and focus visibility within scroll panels.
4. Use browser automation and an accessibility scanner when available, plus manual assistive-technology checks. Fix demonstrated issues and record exactly what was tested. Retain unresolved manual checks if the tools are unavailable.
5. Keep the current architecture and dataset. Update documentation to reflect actual changes; return updated portable files. The user handles GitHub.

## Known editorial and ownership decisions

The scope guide preserves workbook wording, including a reference-navigation entry mentioning spreadsheet sheets. Website-specific navigation is explained elsewhere. This is a known editorial cleanup candidate, not missing source content.

No license has been selected. The original content is an AI-assisted synthesis and references retain their authorship and terms. A future repository license cannot override source rights. There is no user-provided accessibility contact, domain or organization identity; do not invent them.

The source bibliography is fully included, but copies of external articles are not. This transfer does not reverify external links or source claims; review original annotations before strengthening claims or expanding coverage.

## October 3 follow-up update
The user confirmed CC BY-NC-SA 4.0 for appropriate content. The earlier no-license status is superseded by LICENSE-CONTENT.md and licensing.html, linked from the footer. Third-party materials and software code are excluded. Fixed phantom document scrolling by positioning the two scroll containers relative, containing their absolutely positioned accessibility labels. See FIX-NOTES.md for browser verification.

## October 4 map and research update
See MAP-UPDATE.md. Maps are generated from data.js with per-record links in the table; no source claims were expanded. New exploratory ideas remain in a separate research candidate queue. A weekly app review was created; publishing is still handled by the user.
