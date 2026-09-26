import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="field-aurora grid min-h-[70dvh] place-items-center pt-28">
      <div className="container-x py-20 text-center">
        <p className="label-tech">Error 404</p>
        <h1 className="display-xl mt-6 text-ink">This page isn&rsquo;t here.</h1>
        <p className="body-lg mx-auto mt-6 max-w-[42ch]">
          The link may be old, or the page may have moved. The full range and every
          dealer are a click away.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Back to the homepage
          </ButtonLink>
          <ButtonLink href="/models" variant="outline" size="lg">
            Browse all models
          </ButtonLink>
        </div>
        <p className="mt-12 text-sm text-ink-3">
          Looking for support?{" "}
          <Link href="/#contact" className="font-medium text-electric underline underline-offset-4">
            Find a dealer or book a test ride
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
