import { APPLE_APP_ID } from '@/src/lib/constants';

const COMPONENT_PATHS = [
  '/r/*',
  '/referral/*',
  '/g/*',
  '/game/*',
  '/p/*',
  '/thread/*',
  '/u/*',
  '/player/*',
  '/squad/*',
  '/chat/*',
];

export function GET() {
  return Response.json(
    {
      applinks: {
        details: [
          {
            appIDs: [APPLE_APP_ID],
            components: COMPONENT_PATHS.map((path) => ({ '/': path })),
          },
        ],
      },
      webcredentials: {
        apps: [APPLE_APP_ID],
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
}
