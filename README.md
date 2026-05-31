# TELIP

Half-day workshop at [ECTEL 2026](https://ea-tel.eu/ectel2026) · Valencia · 15 September 2026

**The Next Decade of Interdisciplinary Project-based Learning in Higher Education and at the Workplace: Outlining a TEL-Research Agenda**

Researchers and practitioners map the next decade of TEL research on interdisciplinary project-based learning (iPBL) — through case presentations, structured group work, and collaboration toward an agenda article and project consortia.

**Contact:** [sebastian.dennerlein@it-u.at](mailto:sebastian.dennerlein@it-u.at) · [till.winkler@it-u.at](mailto:till.winkler@it-u.at)

## Editing content

All page text lives in **`content.json`**. Edit that file to update headings, paragraphs, dates, organisers, and other copy — no need to touch `index.html`.

For paragraphs that include links or emphasis, use simple HTML tags in the JSON string (e.g. `<strong>`, `<em>`, `<a href="...">`).

## Local preview

The page loads content via JavaScript, so open it through a local web server (opening `index.html` directly from disk may block loading `content.json`):

```bash
python -m http.server 5500
```

Then visit http://localhost:5500

If a port is blocked on Windows, try another number (e.g. `8080`).
