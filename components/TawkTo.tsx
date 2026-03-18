'use client';

import Script from 'next/script';

interface TawkToProps {
  propertyId: string;
  widgetId?: string;
}

export function TawkTo({ propertyId, widgetId = 'default' }: TawkToProps) {
  if (!propertyId) return null;

  return (
    <Script
      id="tawk-to"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API = Tawk_API || {};
          var Tawk_LoadStart = new Date();

          // Buzzr branding config applied before widget loads
          Tawk_API.onLoad = function() {
            Tawk_API.setAttributes({
              'name': 'Buzzr Fan',
            }, function(error) {});

            // Widget color is set in the Tawk.to dashboard:
            // Settings → Widget → Theme color → #10b981 (Buzzr emerald)
            // Settings → Widget → Widget name → "Buzzr Support"
            // Settings → Agent → Display name → "Buzzr Team"
          };

          (function() {
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/${propertyId}/${widgetId}';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
          })();
        `,
      }}
    />
  );
}
