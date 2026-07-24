const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const suites = fs.readdirSync(dir).filter(f => f.endsWith('.cjs') && f !== 'run.cjs').sort();

let pass = 0, fail = 0;
const failures = [];

for (const s of suites) {
  let out = '';
  try {
    out = execFileSync('node', [path.join(dir, s)], { encoding: 'utf8', stdio: ['ignore','pipe','pipe'] });
  } catch (e) {
    out = (e.stdout || '') + (e.stderr || '');
  }
  const p = (out.match(/^PASS/gm) || []).length;
  const f = (out.match(/^FAIL/gm) || []).length;
  pass += p; fail += f;
  out.split('\n').filter(l => l.startsWith('FAIL')).forEach(l => failures.push(`${s}: ${l.slice(6)}`));
  const errLine = (out.match(/^js errors: (.*)$/m) || [])[1];
  if (errLine && errLine !== 'none') failures.push(`${s}: js error — ${errLine}`);
  console.log(`  ${s.replace('.cjs','').padEnd(12)} ${String(p).padStart(3)} pass  ${f} fail`);
}

console.log(`\n  ${pass} passed, ${fail} failed across ${suites.length} suites`);
if (failures.length) {
  console.log('\nFailures:');
  failures.forEach(f => console.log('  ' + f));
  process.exit(1);
}
