import pandas as pd, re, json, html
from collections import Counter

df = pd.read_csv('/mnt/user-data/uploads/leetcode_problem.csv')
df = df[df.is_premium == 0].copy()          # premium descriptions are truncated
df = df[df.description.notna() & df.related_topics.notna()]

# Tag -> pattern. Only tags that genuinely identify one of our ten.
TAG = {
    'Hash Table':'hashmap', 'Two Pointers':'twoptr', 'Sliding Window':'window',
    'Stack':'stack', 'Heap':'heap', 'Dynamic Programming':'dp',
    'Backtracking':'backtrack', 'Binary Search':'binsearch', 'Union Find':'unionfind',
    'Depth-first Search':'traversal', 'Breadth-first Search':'traversal',
}
# Tags too generic to identify anything
NOISE = {'Array','String','Math','Sort','Design','Greedy','Recursion','Bit Manipulation',
         'Divide and Conquer','Ordered Map','Random','Brainteaser','Geometry','Line Sweep'}

# Description keywords that corroborate (weight, regex)
KW = {
 'hashmap':[(9,r'\bcontains? duplicate|\bany duplicate'),(8,r'\bfrequency|\boccurr'),
            (9,r'\banagram'),(6,r'\bcount the number of distinct'),(5,r'\badd up to\b')],
 'twoptr':[(9,r'\bpalindrome'),(8,r'\bsorted array\b|\bsorted in non-decreasing'),
           (8,r'\bin-place\b|\bO\(1\) (extra )?(memory|space)'),(7,r'\btriplet')],
 'window':[(10,r'\bsubarray\b|\bsubstring\b'),(9,r'\bcontiguous\b|\bconsecutive\b'),
           (7,r'\bat most k\b|\bat most .{0,12}distinct')],
 'stack':[(10,r'\bparenthes|\bbrackets?\b'),(10,r'\bnext greater\b|\bwarmer\b'),
          (8,r'\bnest(ed|ing)\b'),(7,r'\bhistogram\b')],
 'traversal':[(9,r'\bisland|\bconnected component'),(10,r'\bshortest path\b|\bfewest\b.{0,20}\bsteps\b'),
              (8,r'\blevel order\b'),(7,r'\bbinary tree\b|\broot of'),(6,r'\bgrid\b|\bmatrix\b')],
 'heap':[(10,r'\btop k\b|\bk largest\b|\bk smallest\b|\bk closest\b|\bkth\b'),
         (9,r'\bmedian\b'),(8,r'\bmerge k\b|\bk sorted\b'),(7,r'\bstream\b')],
 'dp':[(10,r'\bnumber of ways\b|\bhow many ways\b'),(8,r'\bsubsequence\b'),
       (7,r'\bminimum (cost|number of)\b|\bmaximum (profit|value|sum)\b'),(6,r'\bcoins?\b')],
 'backtrack':[(10,r'\ball (the )?(possible )?(combinations|permutations|subsets)'),
              (9,r'\breturn all\b|\bgenerate all\b|\bfind all\b'),(9,r'\bn-queens\b|\bsudoku\b')],
 'binsearch':[(10,r'O\(log ?n\)'),(9,r'\brotated\b'),
              (9,r'\bminimum .{0,25}such that\b|\bminimize the maximum\b'),(6,r'\bsorted\b')],
 'unionfind':[(10,r'\bmerge\b.{0,20}accounts?\b'),(9,r'\bprovince|\bnumber of groups\b'),
              (8,r'\bcycle\b'),(7,r'\bconnected\b'),(8,r'\bredundant\b')],
}
PATTERNS = list(KW.keys())

def clean(t):
    t = html.unescape(str(t))
    t = re.sub(r'\s+', ' ', t)
    return t.strip()

def label(row):
    topics = [x.strip() for x in row.related_topics.split(',')]
    mapped  = [TAG[t] for t in topics if t in TAG]
    generic = [t for t in topics if t in NOISE]
    tagvotes = Counter(mapped)

    desc = clean(row.description)
    kwscore = Counter()
    hits = {}
    for p, rules in KW.items():
        h = []
        for w, rx in rules:
            if re.search(rx, desc, re.I):
                kwscore[p] += w
                h.append(rx)
        if h: hits[p] = h

    # combined: tag presence is worth 12, keywords add on top
    total = Counter()
    for p in PATTERNS:
        total[p] = tagvotes[p]*12 + kwscore[p]

    if not total or max(total.values()) == 0:
        return None, 0, 'no signal', tagvotes, kwscore

    ranked = total.most_common()
    top, tv = ranked[0]
    second = ranked[1][1] if len(ranked) > 1 else 0
    margin = tv - second

    # confidence rules
    if len(tagvotes) == 1 and margin >= 12:
        conf, why = 'high', 'single mapped tag, corroborated'
    elif len(tagvotes) == 1 and tagvotes[top] == 1:
        conf, why = 'medium', 'single mapped tag, weak keywords'
    elif len(tagvotes) > 1 and margin >= 14:
        conf, why = 'medium', 'multiple tags but one dominates'
    elif len(tagvotes) > 1:
        conf, why = 'low', f'competing tags: {sorted(tagvotes)}'
    elif margin >= 18:
        conf, why = 'medium', 'no mapped tag, strong keywords'
    else:
        conf, why = 'low', 'weak signal'
    return top, margin, conf, tagvotes, kwscore, why

rows = []
for _, r in df.iterrows():
    out = label(r)
    if out[0] is None:
        rows.append(dict(id=r.id, title=r.title, pattern=None, conf='none', why='no signal',
                         margin=0, diff=r.difficulty, topics=r.related_topics))
        continue
    top, margin, conf, tv, kw, why = out
    rows.append(dict(id=r.id, title=r.title, pattern=top, conf=conf, why=why, margin=margin,
                     diff=r.difficulty, topics=r.related_topics,
                     desc=clean(r.description)[:600], url=r.url,
                     tagvotes=dict(tv), kw=dict(kw)))

res = pd.DataFrame(rows)
print('labelled rows:', len(res))
print('\nconfidence:')
print(res.conf.value_counts().to_string())
print('\npattern spread (high+medium only):')
hm = res[res.conf.isin(['high','medium'])]
print(hm.pattern.value_counts().to_string())
print('\ntotal usable:', len(hm))

res.to_json('/home/claude/labelled.json', orient='records')
print('\nwrote /home/claude/labelled.json')
