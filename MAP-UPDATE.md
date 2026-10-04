# Connection map and research workflow — October 4, 2026

## Included
- map.html, map.css, map.js: dependency-free visual connection maps generated
  directly from data.js. All 120 records and their 122 source associations are
  retained. The 35 sources may appear in multiple maps with their full annotations.
- Each table record links to its own map; the main navigation links to all maps.
- Twelve family links, text search, evidence filter, stable per-record links,
  keyboard-operable source disclosures, and responsive visual flow layouts.
- Mermaid text export for the current view; connections-all.mmd is the full
  initial snapshot. Regenerate from the page after content edits.
- updates.html and research/: a reusable candidate template and editorial workflow.
- Existing scrolling repair and CC BY-NC-SA content notices retained.

## Evidence model
Maps reproduce the dataset's existing claims; this release does not independently
reverify the 35 external sources. Documented and illustrative labels are preserved.
Arrows show reading order, not causation. Shared references are cited context, not
proof of direct connections between every discipline citing them. Broad anchors
are not silently split or merged into a new scientific taxonomy.

The visible maps use HTML/CSS rather than a third-party renderer, keeping native
links, disclosures, offline operation, and readable mobile reflow. Mermaid exports
use documented flowchart syntax and source hyperlinks; renderer security settings
may disable those links. No Mermaid rendering engine is bundled.

## Verification
- JavaScript syntax checks and original simulated-DOM smoke checks passed.
- Real browser: 120 maps, 12 family links, 122 source disclosures, and 120 exported
  connection groups counted. Arts and media filter yielded 10 maps; its illustrative
  filter yielded 6. No-results, reset, and music search worked.
- Keyboard Enter opened the music source annotation. Desktop screenshot inspected.
- At 320 CSS pixels wide, no horizontal document overflow was detected in the
  filtered music map view. Other combinations and full assistive-technology review
  remain outside this targeted check.
- Table renders 120 map links; music search and its map link navigate to G074.
- The full Mermaid source was generated and saved, and dotted illustrative edges
  verified. A Mermaid parser/rendering pass has not been performed.
- Versioned CSS/script URLs avoid previously cached assets after this release.

## Weekly research
An active recurring review was created in the current Codex chat for Mondays at
9:00 a.m. local time (America/Los_Angeles). It rotates field-family coverage,
checks primary sources, saves reports/candidates, and alerts only for meaningful
findings or blockers. It does not automatically change data.js or publish.
This automation belongs to the app; uploading these static files does not create
server-side scheduled research. No new research findings are claimed in this release.

## Install
Extract Geoscience-Connections-map-update.zip and upload its contents at the
GitHub Pages publishing root, replacing matching files and preserving subfolders.
index.html belongs at that root. The package includes the complete portable project.
No remote repository changes or deployment were performed.
