"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { financing, installmentTable, installmentTenures, pave } from "@/content/ownership";
import { site } from "@/content/site";
import { duration, ease, spring } from "@/lib/motion";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { LabelledRule } from "@/components/ui/Editorial";

const pkr = (n: number) => `PKR ${n.toLocaleString("en-PK")}`;

export function InstallmentSelector() {
  const reduce = useReducedMotion();
  const [tenure, setTenure] = useState(0);
  const active = installmentTenures[tenure];

  return (
    <div>
      {/* ---------------------------------------------------- tenure tabs */}
      <div
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0"
        role="tablist"
        aria-label="Select a repayment tenure"
      >
        {installmentTenures.map((t, i) => {
          const isActive = i === tenure;
          return (
            <button
              key={t.months}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setTenure(i)}
              className={`relative h-10 shrink-0 rounded-full px-4 text-[0.8125rem] font-medium transition-colors duration-150 ${
                isActive ? "text-on-accent" : "text-ink-2 hover:text-ink"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="tenure-pill"
                  className="absolute inset-0 rounded-full bg-electric"
                  transition={reduce ? { duration: 0 } : spring.default}
                />
              ) : (
                <span className="absolute inset-0 rounded-full border border-line-2 bg-paper-2/60" />
              )}
              <span className="relative z-10">
                {t.months} mo
                {t.markup === "0%" ? (
                  /* Was cyan-soft, which only reached 1.3:1 against the orange
                     pill. on-accent at reduced weight keeps it legible. */
                  <span className={isActive ? "text-on-accent/70" : "text-electric-700"}> · 0%</span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------------------------------------------------------- table */}
      <div className="mt-6 overflow-hidden rounded-card border border-line-2">
        <div className="grid-fine flex flex-wrap items-center justify-between gap-3 border-b border-line-2 bg-paper-2 px-5 py-4 sm:px-7">
          <p className="text-[0.8125rem] text-ink-2">
            <span className="font-semibold text-ink">{active.months} monthly instalments</span>
            <span className="mx-2 text-ink-4">·</span>
            {active.fee} processing fee
            {active.markup === "0%" ? (
              <span className="ml-2 text-electric">0% markup</span>
            ) : (
              <span className="ml-2 text-ink-4">markup not published</span>
            )}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">
              Monthly instalment by model over {active.months} months, as published by YADEA
            </caption>
            <thead>
              <tr className="border-b border-line-2">
                <th scope="col" className="label-tech px-5 py-3.5 font-medium sm:px-7">
                  Model
                </th>
                <th scope="col" className="label-tech px-5 py-3.5 text-right font-medium sm:px-7">
                  Price
                </th>
                <th scope="col" className="label-tech px-5 py-3.5 text-right font-medium text-electric sm:px-7">
                  Per month
                </th>
              </tr>
            </thead>
            <tbody>
              {installmentTable.map((row) => (
                <tr key={row.slug} className="group border-b border-line-2 last:border-b-0">
                  <th scope="row" className="px-5 py-4 font-medium sm:px-7">
                    <TextLink href={`/models/${row.slug}`} className="text-[0.9375rem]">
                      {row.model}
                    </TextLink>
                  </th>
                  <td className="px-5 py-4 text-right text-[0.875rem] tabular-nums text-ink-3 sm:px-7">
                    {pkr(row.price)}
                  </td>
                  <td className="px-5 py-4 text-right sm:px-7">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={`${row.slug}-${active.months}`}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                        transition={{ duration: reduce ? duration.fast : duration.base, ease: ease.out }}
                        className="num-hero inline-block text-[1.0625rem] text-ink"
                      >
                        {pkr(row.monthly[tenure])}
                      </motion.span>
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-4">
        Figures are reproduced exactly as published on yadea.com.pk. Only models with a
        published Bank Alfalah payment table are listed; G5 is excluded because YADEA
        publishes no price for it.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------- eligibility */

export function FinancingDetail() {
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="display-md text-ink">{financing.headline}</p>
        <p className="body-lg mt-6 max-w-[44ch]">{financing.body}</p>
        <p className="mt-6 text-xs leading-relaxed text-ink-4">{financing.caveat}</p>
        <p className="mt-3 text-xs font-medium text-electric-700">{financing.promotionNote}</p>
      </div>

      <div className="lg:col-span-7">
        <LabelledRule label="Who qualifies" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {financing.eligibility.map((g) => (
            <div key={g.profile}>
              <p className="text-[0.875rem] font-semibold text-ink">{g.profile}</p>
              <ul className="mt-3 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[0.8125rem] leading-relaxed text-ink-2">
                    <span className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-electric/50" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-9">
          <LabelledRule label="What you need" />
          <ul className="mt-5 flex flex-wrap gap-2">
            {financing.documents.map((d) => (
              <li
                key={d}
                className="rounded-full border border-line-2 bg-paper-2/60 px-3.5 py-1.5 text-[0.8125rem] text-ink-2"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-9">
          <LabelledRule label="How to apply" />
          <ol className="mt-5 grid gap-4 sm:grid-cols-2">
            {financing.howToApply.map((h, i) => (
              <li key={h.channel} className="flex gap-3.5">
                <span className="label-tech mt-0.5 shrink-0 text-electric">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[0.875rem] font-medium text-ink">{h.channel}</span>
                  <span className="mt-1 block text-[0.8125rem] leading-relaxed text-ink-2">
                    {h.detail}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ pave blocks */

export function PaveSteps() {
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <ol className="divide-y divide-line-2 border-y border-line-2 lg:col-span-7">
        {pave.howToApply.map((s, i) => (
          <li key={s} className="flex items-baseline gap-5 py-4">
            <span className="label-tech shrink-0 text-electric">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[0.9375rem] text-ink-2">{s}</span>
          </li>
        ))}
      </ol>

      <div className="lg:col-span-5">
        <div className="rounded-card border border-electric/20 bg-ice/50 p-6 sm:p-7">
          <p className="label-tech text-electric-700">Government scheme</p>
          <p className="body-md mt-4 text-ink-2">
            {pave.fullName} ({pave.scheme}) is run by the government. YADEA scooters are
            sold through it by {pave.distributor}.
          </p>

          <div className="mt-6 flex flex-col gap-2.5">
            <ButtonLink href={site.channels.paveScheme} external variant="outline" size="sm" className="w-full">
              pave.gov.pk
            </ButtonLink>
            <ButtonLink href={site.channels.paveApply} external variant="primary" size="sm" className="w-full">
              Application form
            </ButtonLink>
          </div>

          <div className="mt-6 border-t border-electric/15 pt-5">
            <p className="label-tech">Before you apply</p>
            <p className="mt-3 text-xs leading-relaxed text-ink-2">{pave.status}</p>
            <p className="mt-3 text-xs leading-relaxed text-ink-3">{pave.note}</p>
            <p className="mt-3 text-xs leading-relaxed text-ink-3">{pave.priority}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Scheme pricing for the three PAVE-eligible models. */
export function PavePriceTable() {
  return (
    <div>
      <div className="overflow-hidden rounded-card border border-line-2">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <caption className="sr-only">
              PAVE {pave.year} pre- and post-subsidy pricing for eligible YADEA models
            </caption>
            <thead>
              <tr className="border-b border-line-2 bg-paper-2">
                <th scope="col" className="label-tech px-5 py-4 font-medium sm:px-7">Model</th>
                <th scope="col" className="label-tech px-4 py-4 text-right font-medium sm:px-5">Before</th>
                <th scope="col" className="label-tech px-4 py-4 text-right font-medium sm:px-5">After subsidy</th>
                <th scope="col" className="label-tech px-4 py-4 text-right font-medium sm:px-5">Range</th>
                <th scope="col" className="label-tech px-4 py-4 text-right font-medium sm:px-5">Charge</th>
              </tr>
            </thead>
            <tbody>
              {pave.models.map((m) => (
                <tr key={m.slug} className="border-b border-line-2 last:border-b-0">
                  <th scope="row" className="px-5 py-4 font-medium sm:px-7">
                    <TextLink href={`/models/${m.slug}`} className="text-[0.9375rem]">
                      {m.name}
                    </TextLink>
                    <span className="mt-1 block text-xs font-normal text-ink-4">{m.why}</span>
                  </th>
                  <td className="px-4 py-4 text-right text-[0.875rem] tabular-nums text-ink-4 line-through sm:px-5">
                    {pkr(m.before)}
                  </td>
                  <td className="px-4 py-4 text-right sm:px-5">
                    <span className="num-hero text-[1rem] text-electric">{pkr(m.after)}</span>
                    <span className="mt-1 block text-[0.6875rem] tabular-nums text-ink-4">
                      saves {pkr(m.before - m.after)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-[0.8125rem] tabular-nums text-ink-2 sm:px-5">{m.range}</td>
                  <td className="px-4 py-4 text-right text-[0.8125rem] tabular-nums text-ink-2 sm:px-5">{m.charging}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-4">{pave.status}</p>
    </div>
  );
}

/** What the government warranty covers, and what YADEA adds. */
export function PaveWarranty() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {[
        {
          label: "Government scheme warranty",
          value: pave.governmentWarranty,
          note: "Published by the government for the PAVE scheme.",
          accent: false,
        },
        {
          label: "YADEA extended warranty",
          value: pave.yadeaWarranty,
          note: "YADEA adds a further year and 10,000 km on scheme purchases.",
          accent: true,
        },
      ].map((w) => (
        <div
          key={w.label}
          className={`rounded-card border p-6 sm:p-7 ${
            w.accent ? "border-electric/25 bg-ice/50" : "border-line-2 bg-paper-2/60"
          }`}
        >
          <p className={`label-tech ${w.accent ? "text-electric-700" : ""}`}>{w.label}</p>
          <p className="num-hero mt-4 text-[1.75rem] leading-none text-ink sm:text-[2rem]">{w.value}</p>
          <p className="mt-3 text-xs leading-relaxed text-ink-3">{w.note}</p>
        </div>
      ))}
    </div>
  );
}
