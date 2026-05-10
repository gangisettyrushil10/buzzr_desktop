import { execSync } from 'node:child_process';
import path from 'node:path';

/**
 * Style guard: no em-dashes (U+2014) anywhere in source. The user explicitly
 * banned them. If this test fails, run a sweep (e.g. replace ` , ` for the
 * sentence-break case) and re-commit.
 */
describe('style guard', () => {
  it('contains zero em-dashes across app/, components/, src/, content/', () => {
    const root = path.resolve(__dirname, '..');
    const dirs = ['app', 'components', 'src', 'content'];

    let hits = '';
    try {
      hits = execSync(
        `grep -rln $'\\u2014' --include='*.tsx' --include='*.ts' --include='*.mdx' --include='*.md' --include='*.css' ${dirs.join(' ')} 2>/dev/null || true`,
        { cwd: root, encoding: 'utf8' }
      ).trim();
    } catch {
      hits = '';
    }

    if (hits.length > 0) {
      const files = hits.split('\n').filter(Boolean);
      throw new Error(
        `Found em-dashes in ${files.length} file(s). Replace them with commas, hyphens, or restructure:\n${files.map((f) => `  - ${f}`).join('\n')}`
      );
    }

    expect(hits).toBe('');
  });
});
