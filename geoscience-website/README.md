# Geoscience Connections

A small, standalone website based on **Geoscience_Connections_Across_Majors.xlsx**. Includes all 120 connections, all 35 annotated references, and all 24 scope/guide entries from the supplied workbook.

## Open it

Unzip this folder and open **index.html** in your browser. Keep the files together. No installation, build, API key, account, or server is needed. The site works offline; external source links need internet access.

## Publish with GitHub Pages

Upload the **contents** of this folder to your repository, keeping `index.html` at the publishing root. Use the repository's GitHub Pages settings to publish that branch/folder. All asset paths are relative, so the same files can work at a domain root or under a repository subpath. No framework configuration or workflow file is required for the site itself.

## Files

- `index.html`: page structure, introduction, controls, and metadata.
- `styles.css`: responsive layout, typography, evidence labels, and print styles.
- `app.js`: searching, filtering, sorting, reference navigation, and bibliography toggle.
- `data.js`: the complete content, in readable structured records.
- `favicon.svg`: small site icon.
- `ACCESSIBILITY.md`: standards mapping, verified checks, annotated official references, and release review checklist.
- `.nojekyll`: empty file for plain static hosting on GitHub Pages.

## How it works

Connections and the annotated bibliography are displayed together by default, in independently scrollable panels. All matching connections and references are rendered; there is no pagination or “load more” step. The bibliography can be hidden to expand the table. On narrow screens the two panels stack and table rows reflow into vertically readable records, with bounded scroll areas to keep both available on the page.

Search matches words across all connection fields, including reference IDs. Multiple words must all match. Field-family, pathway, and evidence filters combine with the search. The separate bibliography search does not change the connection results. “Only sources for visible connections” means all connections that match the filters, including rows below the current scroll position.

Clicking a reference ID opens the bibliography if hidden, clears its search, highlights the matching annotation, and moves keyboard focus to it. The connection filters are retained. Reset filters clears connection filters and sorting; it does not reset the separate reference search.

## Update the content

Edit `data.js` in a text editor. It assigns one object to `window.GEOSCIENCE_DATA`:

- `connections`: each record has `id`, `family`, `major`, `discipline`, `task`, `anchor`, `connection`, `pathway`, `evidence`, and a `references` array.
- `references`: each record has `id`, `citation`, `url`, `type`, `annotation`, `limitations`, and `access`.
- `guide`: each record has `topic` and `explanation`.

Keep IDs unique, preserve valid JavaScript/JSON-style quoting, and ensure every connection reference ID exists in `references`. Counts and filter choices update automatically. If you change the review date, also edit the footer in `index.html`. The content is intentionally stored in a JavaScript file instead of fetched JSON so opening the site directly from disk works.

The workbook’s scope guide is preserved verbatim, so its reference-navigation entry still mentions spreadsheet sheets. Website-specific instructions are above and in the interface. No source claims or evidence classifications have been silently rewritten.

## Accessibility and privacy

Uses native labeled controls, table headers, visible keyboard focus, a skip link, live result counts, and textual evidence labels. Source links identify that they open in a new tab. Rows reflow on small screens. An active annotation includes a Return to connection button. See ACCESSIBILITY.md for implementation details, verification, and remaining review requirements. Print styles include the current filtered results and the bibliography if it is visible. This is not a formal accessibility conformance certification.

No analytics, cookies, external fonts, third-party scripts, or network requests are required to run the site. External pages are contacted only when someone opens a source link. Filters are not stored after reloading.

## Content and reuse

The table is an AI-assisted synthesis, not an exhaustive catalog or a validated instrument. Sources retain their original authorship and terms. The bibliography distinguishes reviewed webpages from publication abstracts or summaries; do not describe all referenced works as fully reviewed.

No blanket license has been added. Choose a license for your website code and your original content before public distribution if desired; a repository license does not override the terms of third-party sources. The spreadsheet is the source of this edition, but it is not required to run the website.
