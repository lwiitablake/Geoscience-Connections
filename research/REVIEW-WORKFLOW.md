# Living collection review workflow

## Scope
Run a periodic source and discovery review. This is an editorial research process,
not automatic evidence certification or automatic publication. Keep data.js as the
current published dataset; the map reads it directly, avoiding a second dataset.

## Each review
1. Read data.js, prior reports, and existing candidates. Record the review date.
2. Rotate through field families; prioritize gaps, known changes, and queued leads.
   Record which families and references were checked so coverage can accumulate.
3. Use primary sources where possible: research publications, agency material,
   professional bodies, museums, documented creative works, and project authors.
   Read the source, not just search snippets. Record review scope honestly.
4. Distinguish publication/update dates from access dates. For existing records,
   describe the substantive change and the affected stable IDs. Do not equate
   a timestamp or transient request failure with a substantive evidence change.
5. Add candidate files using candidate-template.json. Copy the source-record
   example into sources for each real source and remove sourceRecordExample.
   Unsourced exploratory ideas have an empty sources array, an explicit rationale,
   and an explicit statement of what remains unverified. Never invent citations.
6. Compare candidate tasks and relationships against existing records and prior
   candidates. Assign statuses: unreviewed, needs-evidence, accepted, rejected,
   or superseded. Preserve decision reasons, reviewer, and dates.
7. Write research/reports/YYYY-MM-DD.md with search coverage, substantive source
   changes, proposed additions/edits, limitations, and next priorities. If the
   environment cannot access a source, record that limitation without guessing.
8. Promote only reviewed candidates to the published collection. Documented
   connections require direct evidence for the relationship; illustrative
   applications require supporting context and an explicit inference label.
   Keep unverified exploratory ideas in the research queue. Do not automatically
   publish research results or silently strengthen existing evidence labels.

## Release checks
- Preserve connection and reference IDs; do not renumber existing records.
- Add references with citation, annotation, limitations, and review scope.
- Run node --check app.js, node --check map.js, node --check data.js, and
  node tools/check-site.cjs. The existing smoke check has baseline counts; update
  its expected counts deliberately with a reviewed content release.
- Check map links, source annotations, Mermaid export, mobile reflow, and keyboard
  use in a real browser; update ACCESSIBILITY.md with actual checks.
- Record accepted changes and provenance. Revisit copyright scope for new media.
- Upload the complete site only when publication is authorized.

## Scale-up path
For a larger edition, add controlled Earth-science topic IDs with reviewed aliases,
explicit relationship types, and many-to-many topic/source links. Preserve original
phrasing alongside normalized topics. Migrate only with validation and a versioned
schema; broad similarity or a shared citation is not evidence of a new connection.
Keep candidate review status separate from evidence status. Consider external
disciplinary reviewers and correction history before enlarging the claim scope.

## On-demand review prompt
Review Geoscience Connections for substantive source updates and new candidate
connections. Read this workflow, the current dataset, and prior reports first.
Browse primary sources and record what was actually reviewed. Include plausible
undocumented ideas as unverified exploratory candidates. Deduplicate findings,
save dated research reports and candidate records, and propose changes for review.
Do not modify the published dataset or deploy automatically. Report coverage and
limitations, and distinguish observed evidence from inference.
