import type { Metadata } from 'next';
import Link from 'next/link';
import {
  COMPANY_NAME,
  SITE_NAME,
  SUPPORT_EMAIL,
  SUPPORT_URL
} from '@/src/lib/constants';

export const metadata: Metadata = {
  title: `Terms of Use — ${SITE_NAME}`,
  description:
    `Terms of Use for ${SITE_NAME}, operated by ${COMPANY_NAME}. Understand your rights and responsibilities when using the service.`
};

export default function TermsPage() {
  return (
    <article
      aria-labelledby="terms-title"
      className="mx-auto max-w-3xl px-6 pb-16 pt-10 text-sm leading-relaxed text-mutedForeground"
    >
      <header className="mb-6 border-b border-border/70 pb-4">
        <p className="text-[11px] uppercase tracking-[0.3em] text-buzzr-accent/80">
          Legal
        </p>
        <h1
          id="terms-title"
          className="mt-2 font-heading text-3xl text-foreground md:text-4xl"
        >
          Terms of Use
        </h1>
        <p className="mt-2 text-[12px] text-mutedForeground">
          Last updated: February 27, 2026
        </p>
      </header>

      <div className="space-y-6 rounded-2xl border border-border/70 bg-buzzr-surface/60 p-5 shadow-soft backdrop-blur">
        <p>
          These Terms of Use (&quot;Terms&quot;) govern your access to and use of
          Buzzr Sports (the &quot;Service&quot;), provided by {COMPANY_NAME}{' '}
          (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing or
          using the Service, you agree to be bound by these Terms.
        </p>

        <section aria-labelledby="section-eligibility" className="space-y-2">
          <h2 id="section-eligibility" className="text-base font-semibold text-foreground">
            1. Eligibility
          </h2>
          <p>
            You may use Buzzr Sports only if you are legally capable of forming a
            binding contract in your jurisdiction and are not prohibited from
            using the Service under applicable law.
          </p>
        </section>

        <section aria-labelledby="section-license" className="space-y-2">
          <h2 id="section-license" className="text-base font-semibold text-foreground">
            2. License and acceptable use
          </h2>
          <p>
            We grant you a limited, non-exclusive, non-transferable license to
            use the Service for your personal, non-commercial use, subject to
            these Terms.
          </p>
          <p>You agree not to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Use the Service in any way that violates applicable law or the
              rights of others.
            </li>
            <li>
              Attempt to interfere with or compromise the security or integrity of
              the Service.
            </li>
            <li>
              Reverse engineer, decompile, or attempt to derive the source code of
              the Service except as permitted by law.
            </li>
          </ul>
        </section>

        <section aria-labelledby="section-content" className="space-y-2">
          <h2 id="section-content" className="text-base font-semibold text-foreground">
            3. User content
          </h2>
          <p>
            Buzzr Sports may allow you to submit ratings, comments, and other
            content about sports games (&quot;User Content&quot;). You retain
            ownership of your User Content, but grant us a non-exclusive,
            worldwide, royalty-free license to use, display, and distribute it as
            necessary to operate and improve the Service.
          </p>
          <p>You are responsible for ensuring that your User Content:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Does not infringe any third-party rights.</li>
            <li>Is not unlawful, hateful, or abusive.</li>
            <li>Does not contain spam or unsolicited promotions.</li>
          </ul>
        </section>

        <section aria-labelledby="section-disclaimers" className="space-y-2">
          <h2 id="section-disclaimers" className="text-base font-semibold text-foreground">
            4. Disclaimers
          </h2>
          <p>
            The Service is provided on an &quot;AS IS&quot; and &quot;AS
            AVAILABLE&quot; basis. To the maximum extent permitted by law, we
            disclaim all warranties, express or implied, including any warranties
            of merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>
        </section>

        <section aria-labelledby="section-liability" className="space-y-2">
          <h2 id="section-liability" className="text-base font-semibold text-foreground">
            5. Limitation of liability
          </h2>
          <p>
            To the maximum extent permitted by law, {COMPANY_NAME} and its
            affiliates will not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising out of or related to your
            use of the Service.
          </p>
        </section>

        <section aria-labelledby="section-termination" className="space-y-2">
          <h2 id="section-termination" className="text-base font-semibold text-foreground">
            6. Termination
          </h2>
          <p>
            We may suspend or terminate your access to the Service at any time, at
            our discretion, if we believe you have violated these Terms or used
            the Service in a way that could harm us or other users.
          </p>
        </section>

        <section aria-labelledby="section-changes-terms" className="space-y-2">
          <h2 id="section-changes-terms" className="text-base font-semibold text-foreground">
            7. Changes to these Terms
          </h2>
          <p>
            We may update these Terms from time to time. When we do, we will
            update the &quot;Last updated&quot; date at the top of this page.
            Your continued use of the Service after changes become effective
            constitutes your acceptance of the revised Terms.
          </p>
        </section>

        <section aria-labelledby="section-contact-terms" className="space-y-2">
          <h2 id="section-contact-terms" className="text-base font-semibold text-foreground">
            8. Contact us
          </h2>
          <p>
            If you have questions about these Terms or need support, you can reach
            us at:
          </p>
          <address className="not-italic">
            {COMPANY_NAME}
            <br />
            Email:{' '}
            <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
          </address>
          <p>
            You can also contact us via our{' '}
            <Link className="underline" href={SUPPORT_URL}>
              support page
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
