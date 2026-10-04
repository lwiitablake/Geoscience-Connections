# Scrolling and licensing update — October 3, 2026

The original live page at 1440 × 900 had a document scroll height of 16,701 px
despite the visible body ending at approximately 1,332 px. Absolutely positioned
screen-reader labels inside the bibliography lacked a positioned scroll-container
ancestor and extended the document's scrollable overflow.

Added position:relative to .table-scroll and .reference-scroll. Accessible labels
remain present; panel scrolling and all records are retained. No content or
JavaScript changes were needed.

Actual browser checks on the revised local site:
- At 1440 × 900: document height 1,377 px, footer bottom approximately 1,355 px.
  The remaining space is normal bottom spacing; no phantom blank scroll area.
- At 320 × 800: document height 2,286 px, footer bottom approximately 2,265 px;
  no page-level horizontal overflow.
- All 120 connection rows and 35 reference cards rendered.
- Clicking Geology's R20 reference focused ref-R20 and scrolled the bibliography;
  Return to connection restored focus to the originating reference button.
- Hiding and showing bibliography worked on the mobile viewport.
- Desktop footer visually inspected, including the embedded CC license notice.

These are targeted browser checks, not a complete accessibility audit or
screen-reader evaluation. Remaining checks in ACCESSIBILITY.md still apply.

The user confirmed CC BY-NC-SA 4.0. The footer links to the official license and
licensing.html; LICENSE-CONTENT.md documents scope for repository users. Original
educational content and protectable collection arrangement are covered only to
the extent rights apply and are held by the publisher. Third-party materials and
software code are excluded. Attribution uses the existing public project handle,
lwiitablake. data.js and the source workbook are unchanged.

To update GitHub Pages, extract the supplied ZIP and upload its contents at the
publishing root, replacing matching files. index.html must be at that root.
The ZIP contains the complete runtime website and supporting documentation.
No GitHub push or deployment was performed during this update.
