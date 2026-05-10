/** @jest-environment jsdom */
import { readFileSync } from 'node:fs';
import path from 'node:path';

test('placeholder smoke test', () => {
  // The actual page components are rendered by Next.js; this test simply
  // confirms the test runner is wired correctly.
  expect(true).toBe(true);
});

test('root layout includes the Product Hunt launch embed for all pages', () => {
  const rootLayout = readFileSync(path.join(process.cwd(), 'app/layout.tsx'), 'utf8');

  expect(rootLayout).toContain('<ProductHuntLaunchEmbed />');
});
