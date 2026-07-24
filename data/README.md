# Data

## `labelled-problems.json`

723 LeetCode problems, each labelled with one of the ten patterns. This file is
committed, so the site builds without needing the source dataset.

Shape:

```json
{
  "n": 200,
  "t": "Number of Islands",
  "d": "Medium",
  "p": "traversal",
  "x": "Given an m x n 2D binary grid...",
  "a": ["traversal", "unionfind"]
}
```

`p` is the primary pattern. `a` is optional and only present when a problem
legitimately accepts more than one answer — the quiz marks any listed pattern
correct. 116 of the 723 have it.

## Where the labels come from

`scripts/label_dataset.py` reads a Kaggle CSV of LeetCode problems and maps
LeetCode's own `related_topics` tags onto the ten patterns, then corroborates
with keyword matching against the problem description.

Nine of the ten patterns have a directly corresponding tag. The tenth
(sliding window) is under-tagged in the source, so it leans harder on keywords.

Scoring: a mapped tag is worth 12 points, keyword hits add 5–10 each. Confidence
comes from the winner's margin over the runner-up:

| Confidence | Rule | Count |
|---|---|---|
| high | one mapped tag, corroborated by keywords | 417 |
| medium | one dominant tag, or strong keywords with no tag | 171 |
| low → recovered | multiple competing tags | 116 |
| low → dropped | keyword guess with no supporting tag | 267 |
| none → dropped | tagged only "Array", "Math", "String" etc. | 334 |

The 116 "competing tags" rows were kept and turned into multi-answer questions
rather than discarded — Number of Islands really is DFS *and* BFS *and*
Union-Find, and forcing a single answer there would be wrong.

## What this is not

**The labels are derived, not authoritative.** LeetCode's tags reflect what the
editorial solution used, which is not always the best pattern, and occasionally
not the only one. Spot-checking 20 problems with known answers gave 19 correct;
the single miss (Top K Frequent Elements, labelled hash map instead of heap) was
flagged low-confidence and never entered the pool.

**601 rows were deliberately dropped.** Including them would grow the bank to
1,324 at the cost of marking correct answers wrong, which teaches the wrong
thing. If you want them anyway, loosen the confidence gate in
`label_dataset.py` and rebuild.

**Pattern distribution is uneven.** Dynamic programming is 196 of the 723 and
Union-Find is 15, because that reflects the real distribution of problems. A
random 10-question round over-samples DP. Weighting the draw is an open
improvement.

## Regenerating

The source CSV is not committed (it is ~2 MB and not mine to redistribute).
To rebuild the labels yourself:

1. Download the [LeetCode problems dataset](https://www.kaggle.com/datasets/nehagupta09/leetcode-all-problems-dataset) from Kaggle
2. Save it as `data/leetcode_problem.csv`
3. Run:

```bash
python3 scripts/label_dataset.py          # writes data/labelled.json
python3 scripts/export_bank.py            # writes src/questions-dataset.js
npm run build && npm test
```

`label_dataset.py` prints a confidence breakdown and a per-pattern spread so you
can see what changed before committing.
