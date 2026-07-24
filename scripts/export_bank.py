"""
Turn data/labelled.json (from label_dataset.py) into src/questions-dataset.js.

Keeps: high + medium confidence, plus 'competing tags' rows as multi-answer
questions. Drops: keyword-only guesses and rows with no mapped tag.
"""
import os, re, json, html
import pandas as pd

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(ROOT, 'data', 'labelled.json')
OUT  = os.path.join(ROOT, 'src', 'questions-dataset.js')
JSON_OUT = os.path.join(ROOT, 'data', 'labelled-problems.json')

MAX_LEN = 520
MIN_LEN = 60


def trim(desc: str) -> str:
    """Cut a problem statement down to the part that states the problem."""
    d = re.sub(r'\s+', ' ', html.unescape(str(desc))).strip()
    for marker in ('Example 1', 'Example:', 'Constraints:', 'Note:', 'Follow up'):
        i = d.find(marker)
        if i > 120:
            d = d[:i]
    d = d.strip()
    if len(d) > MAX_LEN:
        d = d[:MAX_LEN]
        cut = max(d.rfind('. '), d.rfind('? '), d.rfind('! '))
        if cut > 200:
            d = d[:cut + 1]
    # never leave a dangling backtick from a mid-code-span cut
    if d.count('`') % 2:
        d = d[:d.rfind('`')].rstrip()
    return d.strip()


def js_escape(s: str) -> str:
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')


def main():
    r = pd.read_json(SRC)

    confident = r[r.conf.isin(['high', 'medium'])].copy()
    confident['accept'] = confident.pattern.apply(lambda p: [p])

    competing = r[r.why.str.startswith('competing', na=False)].copy()
    competing['accept'] = competing.tagvotes.apply(lambda d: sorted(d.keys()))
    competing['pattern'] = competing.accept.apply(lambda a: a[0])

    weak_tagged = r[(r.why == 'weak signal') &
                    (r.tagvotes.apply(bool))].copy()
    weak_tagged['accept'] = weak_tagged.tagvotes.apply(lambda d: sorted(d.keys()))

    allq = pd.concat([confident, competing, weak_tagged]).drop_duplicates(subset='id')

    bank = []
    for x in allq.itertuples():
        text = trim(x.desc)
        if len(text) < MIN_LEN or text.count('`') % 2:
            continue
        entry = {'n': int(x.id), 't': x.title, 'd': x.diff, 'p': x.pattern, 'x': text}
        if len(x.accept) > 1:
            entry['a'] = list(x.accept)
        bank.append(entry)

    parts = []
    for b in bank:
        acc = ',a:' + json.dumps(b['a']) if 'a' in b else ''
        parts.append('{{n:{n},t:"{t}",d:"{d}",p:"{p}"{a},x:`{x}`}}'.format(
            n=b['n'], t=b['t'].replace('"', '\\"'), d=b['d'], p=b['p'],
            a=acc, x=js_escape(b['x'])))

    with open(OUT, 'w', encoding='utf-8') as f:
        f.write('const BANK=[\n' + ',\n'.join(parts) + '\n];\n')
    with open(JSON_OUT, 'w', encoding='utf-8') as f:
        json.dump(bank, f, indent=1)

    multi = sum(1 for b in bank if 'a' in b)
    print(f'exported {len(bank)} problems ({multi} multi-answer)')
    print(f'  -> {OUT}')
    print(f'  -> {JSON_OUT}')
    spread = pd.Series([b['p'] for b in bank]).value_counts()
    print('\nby pattern:')
    print(spread.to_string())
    print('\nNow run: npm run build && npm test')


if __name__ == '__main__':
    main()
