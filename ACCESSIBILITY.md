# Accessibility implementation and review

Version: October 3, 2026. Scope: the supplied static website and its controls, connection records, scope guide, and annotated bibliography. External source websites are outside this review.

**Target: WCAG 2.1 Level AA. Conformance has not been established.** This package includes accessibility features and completed source-level checks, but browser, screen-reader, and user testing remain outstanding. It is not an accessibility certification or an Accessibility Conformance Report (ACR/VPAT).

## How to use the site

- Use Tab and Shift+Tab to move between controls. A skip link leads to the explorer.
- Search and select filters to narrow connections. Result counts are live status messages.
- Connections and bibliography are displayed together. Hide bibliography expands the connection area; Show bibliography restores it.
- Use Jump to bibliography to bypass the connection reference buttons.
- Select a reference ID to reveal its annotation and move focus there. Return to connection takes you back to the initiating button, or the search field if that row has since been removed by filtering.
- Scrollable panels can receive keyboard focus. On narrow screens rows reflow vertically and the bibliography follows the connections. Nothing is paginated or available only on hover.
- Browser zoom is enabled. There are no timers, animations, drag gestures, or orientation restrictions.

## Implementation against applicable criteria

These are implementation notes, not independently verified pass ratings.

| Area | WCAG 2.1 criteria | Implementation |
| --- | --- | --- |
| Structure and alternatives | 1.1.1, 1.3.1–1.3.3 | Text content, decorative brand mark hidden from assistive technology, heading hierarchy, table caption and column headers, explicit table roles retained during mobile reflow; reading order follows DOM order. |
| Mobile and enlargement | 1.3.4, 1.4.4, 1.4.10, 1.4.12 | Responsive layout, relative text sizes, scalable viewport, flexible text containers, vertically reflowed mobile records. Needs actual zoom and text-spacing review. |
| Colors | 1.4.1, 1.4.3, 1.4.11 | Textual evidence labels; underlined links; high-contrast text, input borders and focus outlines. Selected annotations use a border as well as background color. |
| Keyboard | 2.1.1, 2.1.2, 2.1.4 | Native inputs, buttons, links and disclosure; focusable scroll areas; no custom single-key shortcuts or focus traps. |
| Navigation | 2.4.1–2.4.7 | Skip link, descriptive title and headings, search/filter routes, explicit reference link purpose, focus transfer and return, visible outlines. This is a single-page website. |
| Pointer and input | 2.5.1–2.5.4 | Single-click/tap native controls; actions run on click, not pointer-down; names include visible labels; no motion actuation. Reference buttons have a minimum 44×44 CSS-pixel target. |
| Language and predictability | 3.1.1, 3.2.1–3.2.4 | English page language, consistent control names, no automatic navigation on focus or filter changes. Focus moves only after explicit navigation actions. |
| Labels and feedback | 3.3.2, 4.1.2, 4.1.3 | Persistent input labels, native roles, expanded state on bibliography toggle, polite status counts and a recoverable empty-results state. No personal-data entry or consequential submission. |
| Markup robustness | Legacy 4.1.1 requirement | Source IDs checked for uniqueness. Reference IDs checked for valid relationships. Full HTML validation still recommended for Section 508 review. |

Media criteria (1.2.x), audio control, time limits, flashing, hover-only content, personal-data autocomplete, input error correction, and legal/financial submission safeguards have no corresponding feature in this edition. Reassess if new features are added.

## Checks completed

- JavaScript syntax checks passed for app.js and data.js.
- Data integrity: 120 connection records, 35 annotated sources, 24 guide records; unique record IDs; every cited ID resolves to a source; all source URLs use HTTPS.
- Application smoke checks passed using a simulated DOM: initial rendering, search, empty results, reset, family filtering, sorting, bibliography visibility and search, citation focus and return. These checks do not establish browser behavior or assistive-technology compatibility.
- Calculated sRGB contrast for representative palette pairs: body text 14.05:1; muted text on filter background 5.46:1; links on selected-reference background 5.55:1; placeholder text 5.32:1; focus outline on filter background 4.90:1; input border on filter background 3.71:1. Text pairs exceed 4.5:1; tested UI indicators exceed 3:1. Browser-rendered states still need inspection.
- Source review for labels, landmarks, table headers, zoom viewport settings, focus indicators, and the absence of timers, flashing, and keyboard traps.

Browser execution was unavailable in the build environment: the browser binary download did not produce a valid archive, and the browser preview service blocked localhost. No screenshot, real-device, browser-layout, axe, or screen-reader pass is claimed.

## Required release review

1. Open index.html in current Chrome, Firefox and Safari. Test all controls using only the keyboard, including both scroll panels and citation return navigation.
2. Test NVDA with Firefox or Chrome and VoiceOver with Safari, including iOS. Confirm table/header associations after mobile reflow, announced filter counts, bibliography state, and citation focus.
3. Test at 320 CSS pixels wide, 200% text enlargement, and 400% browser zoom on a 1280-pixel viewport. Check portrait and landscape. Confirm no clipped controls, lost text, or page-level horizontal scrolling.
4. Apply WCAG text spacing: line height 1.5, paragraph spacing 2× font size, letter spacing .12em and word spacing .16em. Confirm controls and records remain usable.
5. Inspect focus visibility, high-contrast/forced-colors mode, all hover/focus states and touch targets. Check that sticky headers do not obscure focused controls.
6. Run a current automated accessibility scanner and HTML validator. Resolve findings, then perform a criterion-by-criterion WCAG 2.1 A/AA review. Automated tools alone cannot establish conformance.
7. Repeat the checks after hosting, adding a theme, changing content, or introducing third-party scripts. If required by the organization, prepare an ACR based on the completed evaluation and establish an accessibility contact/accommodation process.

## Standards and legal context: annotated references

1. **W3C. Web Content Accessibility Guidelines (WCAG) 2.1.** https://www.w3.org/TR/WCAG21/
   The normative technical reference for this project's A/AA target, including reflow, keyboard access, labels, contrast, and status messages. Conformance requires all applicable criteria at the claimed level across the full page and complete processes; this implementation checklist does not replace evaluation. WCAG 2.1 includes WCAG 2.0 requirements.

2. **U.S. Access Board. Revised 508 Standards and 255 Guidelines.** https://www.access-board.gov/ict/
   The federal ICT standard, including incorporation of WCAG 2.0 A/AA for covered web content. WCAG 2.1 AA is this site's broader technical target. Applicable Section 508 obligations depend on the covered ICT and its use; a static website package does not establish an agency's overall compliance.

3. **U.S. Department of Justice. Fact Sheet: Web Content and Mobile Apps Provided by State and Local Governments.** https://www.ada.gov/resources/2024-03-08-web-rule/
   Explains WCAG 2.1 AA as the technical standard in the ADA Title II web rule. This source concerns state and local government entities; do not apply its scope automatically to every private website. ADA obligations also involve the organization's practices and services.

4. **U.S. Department of Labor, OFCCP. Section 503.** https://www.dol.gov/agencies/ofccp/section-503
   Describes disability employment nondiscrimination and affirmative-action responsibilities of covered federal contractors and subcontractors. Section 503 is not a standalone website coding specification. This educational site has no employment application workflow; employer policies, accommodations and other obligations cannot be fulfilled or certified by these files.

Sources consulted October 3, 2026. No ADA, Section 508, or Section 503 legal compliance guarantee is made.

## Targeted follow-up browser verification — October 3, 2026
The scrolling repair was checked in a real browser at desktop and 320px mobile widths, including document/footer boundaries, horizontal overflow, citation focus and return, and bibliography visibility. See FIX-NOTES.md for measurements and scope. Earlier statements that no browser checks were completed describe the original build; this targeted follow-up does not complete the full release review or establish conformance.
