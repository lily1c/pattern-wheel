<div align="center">

<img src="assets/logo.svg" alt="Pattern Wheel" width="300">

**Ten algorithmic patterns for coding interviews — the keywords that give each one away, what it costs, and why the tempting alternative fails.**

[Live site](https://pattern-wheel.pages.dev) · [Report an issue](https://github.com/lily1c/pattern-wheel/issues)

Built by [Assol Abasova](https://assolabasova.duckdns.org)

</div>

---

## What this is

Most people don't fail coding interviews because they can't code. They fail
because they spend ten minutes deciding *what kind of problem* they're looking
at. That step — recognition — is the one nobody practises deliberately.

Pattern Wheel is a study tool for exactly that step. Pick a pattern on the wheel
and you get the vocabulary that signals it, its real cost, three "what gives it
away" tells, and the three approaches you'd otherwise reach for with the specific
reason each one breaks.

It's one HTML file. No build step to view it, no dependencies, no network calls,
works offline.

## Features

- **Interactive wheel** — ten patterns, keyboard accessible, swipeable on mobile
- **Pattern-aware code drawer** — Python templates and core DSA scoped to whichever
  pattern you're on, plus a global complexity reference
- **Practice mode** — 747 questions across two formats, 30-second timer per question
  - *Name the pattern*: a real LeetCode problem, pick which pattern it wants
  - *Read the code*: an unlabelled Python implementation, identify it from structure
- **Dictionary** — 55 annotated concepts with ranked search across titles,
  synonyms, and definition bodies

## Quick start

```bash
git clone https://github.com/lily1c/pattern-wheel.git
cd pattern-wheel
open index.html          # that's it — no build needed to view
```

To work on it:

```bash
npm install              # jsdom, for the test suite
npm run build            # regenerate index.html from src/
npm test                 # 79 assertions across 4 suites
npm run serve            # http://localhost:8000
```

## Deploying to Cloudflare Pages

This is a static site with no build step, so deployment is about as simple as it
gets.

### Push to GitHub first

```bash
git init
git add .
git commit -m "Pattern Wheel"
git branch -M main
git remote add origin https://github.com/lily1c/pattern-wheel.git
git push -u origin main
```

### Connect Cloudflare Pages

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Authorise GitHub and pick the `pattern-wheel` repository
3. On the build configuration screen:

   | Field | Value |
   |---|---|
   | Framework preset | **None** |
   | Build command | *(leave empty)* |
   | Build output directory | `/` |
   | Root directory | *(leave empty)* |

4. **Save and Deploy**

The build output directory is the repository root because `index.html` sits at
the top level. Leaving the build command empty is correct — the HTML is
committed, so there is nothing to compile.

Your site goes live at a `*.pages.dev` URL in about thirty seconds — Cloudflare shows you
the exact address when the deploy finishes.
Every push to `main` redeploys automatically, and pull requests get their own
preview URL.

### Custom domain

In your Pages project → **Custom domains** → **Set up a domain**. If the domain
is already on Cloudflare, the DNS record is created for you. If not, you'll be
given a CNAME to add at your registrar. TLS is automatic either way.

### Alternative hosts

Nothing here is Cloudflare-specific — it's one static file.

- **GitHub Pages** — Settings → Pages → deploy from `main` / root. The `.nojekyll`
  file is already included so Jekyll doesn't interfere.
- **Netlify** — drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect the repo with an empty build command and `/` as the publish directory.
- **Your own server** — copy `index.html` anywhere it can be served. It has no
  external dependencies at all.
- **Existing site** — serve it as a route. On Flask, for example:

  ```python
  @app.route('/wheel')
  def wheel():
      return send_from_directory('static', 'pattern-wheel.html')
  ```

## Repository layout

```
index.html                    the built site — this is what gets served
src/
  patterns.js                 the ten patterns: signals, costs, tells, traps
  templates.js                Python templates, 2 per pattern
  questions-seed.js           60 hand-written problems + 20 code questions
  questions-dataset.js        723 problems derived from the Kaggle dataset
  dictionary.js               55 concept definitions
scripts/
  build.py                    concatenates src/ into index.html
  label_dataset.py            Kaggle CSV -> pattern labels with confidence
  export_bank.py              labelled JSON -> questions-dataset.js
tests/
  run.cjs                     runs every suite, aggregates results
  core.cjs                    wheel, navigation, code drawer
  timer.cjs                   countdown, auto-advance, interval cleanup
  layout.cjs                  two-column grid, question rendering
  dictionary.cjs              search ranking, filters, multi-answer quiz
data/
  labelled-problems.json      the 723 labels, committed
  README.md                   how the labels were derived, and their limits
assets/                       logo and mark, light and dark
```

### Why the built file is committed

`index.html` is generated but tracked in git, so the repo can be cloned and
opened with no toolchain, and static hosts need no build configuration. CI
rebuilds it on every push and fails if the committed copy has drifted from
`src/`, so the two can't silently diverge.

## Editing content

Everything lives in `src/`. Edit, rebuild, test:

**Add a pattern trap** — find the pattern in `src/patterns.js`, add to its
`traps` array as `["Name", "Why it fails"]`.

**Add a dictionary entry** — append to `src/dictionary.js`:

```js
{t:"Term", c:"concept", k:"search synonyms here",
 d:"Definition. The k field is searched but never displayed."}
```

Categories are `concept`, `structure`, `complexity`, `process`.

**Add a template** — `src/templates.js`, keyed by pattern id. Highlighting uses
`<span class="k">` for keywords, `<span class="s">` for literals, `<span class="c">`
for comments.

Then:

```bash
npm run build && npm test
```

## Known limitations

- **Dataset labels are derived, not authoritative.** They come from LeetCode's own
  topic tags plus keyword matching. Spot-checking 20 known problems gave 19
  correct. See [`data/README.md`](data/README.md) for the full methodology and
  what was deliberately excluded.
- **Pattern distribution is uneven.** DP is 196 of 723 problems, Union-Find is 15,
  so a random round over-samples DP. Weighting the draw is an open improvement.
- **No spaced repetition.** Practice rounds are random; there's no memory of what
  you got wrong last session.
- **Code-reading mode has 20 questions.** Small compared to the problem bank.

## Contributing

Pull requests welcome, particularly:

- More code-reading questions in `src/questions-seed.js`
- Corrections to any mislabelled problem — open an issue with the problem number
- Additional dictionary entries
- Weighted question sampling

Please run `npm run build && npm test` before opening a PR. CI will reject a
stale `index.html`.

## Credits

Problem data derived from the [LeetCode All Problems dataset](https://www.kaggle.com/datasets/nehagupta09/leetcode-all-problems-dataset)
on Kaggle. Problem statements belong to LeetCode; this repository stores
truncated excerpts for identification only.

## License

MIT — see [LICENSE](LICENSE). Copyright © 2026 Assol Abasova.

You can use, modify, and redistribute this freely, including commercially.
The only requirement is that the copyright notice travels with it.

This covers the code, the pattern writeups, the dictionary, and the labelling
pipeline. It does not cover the LeetCode problem statements, which remain
LeetCode's — see [Credits](#credits).
