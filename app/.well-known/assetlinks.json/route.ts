import {
  ANDROID_PACKAGE_NAME,
  ANDROID_SHA256_CERT_FINGERPRINTS,
} from '@/src/lib/constants';

export function GET() {
  const body = ANDROID_SHA256_CERT_FINGERPRINTS.length > 0
    ? [
        {
          relation: ['delegate_permission/common.handle_all_urls'],
          target: {
            namespace: 'android_app',
            package_name: ANDROID_PACKAGE_NAME,
            sha256_cert_fingerprints: ANDROID_SHA256_CERT_FINGERPRINTS,
          },
        },
      ]
    : [];

  return Response.json(body, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
