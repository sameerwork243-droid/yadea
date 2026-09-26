"use client";

import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useMemo, useState } from "react";
import { calculatorDefaults, calculatorNotes, costBasis, type CalculatorState } from "@/content/ownership";
import { duration, ease } from "@/lib/motion";
import { LabelledRule } from "@/components/ui/Editorial";

const inr = (n: number) => `PKR ${Math.round(n).toLocaleString("en-PK")}`;
const twoDp = (n: number) => n.toFixed(2);

/* ------------------------------------------------------------------ slider */

function Slider({
  label,
  unit,
  value,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  hint?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-[0.8125rem] font-medium text-ink-2">{label}</span>
        <span className="num-hero text-[0.9375rem] text-ink">
          {step < 1 ? value.toFixed(step < 0.1 ? 2 : 1) : value}
          <span className="ml-1 text-[0.6875rem] font-normal tracking-wide text-ink-4">{unit}</span>
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="yt-range mt-3 w-full"
        style={{ ["--pct" as string]: `${pct}%` }}
        aria-label={`${label} (${unit})`}
      />
      {hint ? <span className="mt-2 block text-xs leading-snug text-ink-4">{hint}</span> : null}
    </label>
  );
}

/* -------------------------------------------------------------- calculator */

export function CostCalculator() {
  const reduce = useReducedMotion();
  const [d, setD] = useState<CalculatorState>(calculatorDefaults);

  const set = <K extends keyof CalculatorState>(k: K, v: CalculatorState[K]) =>
    setD((p) => ({ ...p, [k]: v }));

  const r = useMemo(() => {
    const monthlyKm = d.kmPerDay * d.daysPerMonth;
    const petrolPerKm = (d.petrolLitresPer100km / 100) * d.petrolPricePerLitre;
    const electricPerKm = (d.kwhPer100km / 100) * d.tariffPerKwh;
    const petrol = monthlyKm * petrolPerKm;
    const electric = monthlyKm * electricPerKm;
    return {
      monthlyKm,
      petrol,
      electric,
      petrolPerKm,
      electricPerKm,
      saved: petrol - electric,
      savedYear: (petrol - electric) * 12,
      petrolLitres: (monthlyKm * d.petrolLitresPer100km) / 100,
      electricKwh: (monthlyKm * d.kwhPer100km) / 100,
    };
  }, [d]);

  const ratio = r.petrol / Math.max(r.electric, 0.01);

  // Spring the three headline figures so a slider drag is felt, not just seen.
  const softSpring = { stiffness: 210, damping: 30, mass: 0.7 } as const;
  const pet = useSpring(r.petrol, softSpring);
  const ele = useSpring(r.electric, softSpring);
  const sav = useSpring(r.saved, softSpring);

  const shownPetrol = useTransform(pet, (v) => Math.round(v).toLocaleString("en-PK"));
  const shownElectric = useTransform(ele, (v) => Math.round(v).toLocaleString("en-PK"));
  const shownSaved = useTransform(sav, (v) => Math.round(v).toLocaleString("en-PK"));

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* ----------------------------------------------------- inputs */}
      <div className="lg:col-span-5">
        <div className="rounded-card border border-line-2 bg-paper-2/70 p-6 sm:p-8">
          <p className="label-tech">Your inputs</p>

          <div className="mt-7 space-y-7">
            <Slider
              label="Distance per day"
              unit="km"
              value={d.kmPerDay}
              min={5}
              max={120}
              step={1}
              onChange={(v) => set("kmPerDay", v)}
            />
            <Slider
              label="Riding days per month"
              unit="days"
              value={d.daysPerMonth}
              min={10}
              max={30}
              step={1}
              onChange={(v) => set("daysPerMonth", v)}
            />
            <Slider
              label="Petrol price"
              unit="PKR/litre"
              value={d.petrolPricePerLitre}
              min={100}
              max={600}
              step={1}
              onChange={(v) => set("petrolPricePerLitre", v)}
              hint={`YADEA's published benchmark is PKR ${costBasis.petrol.petrolPricePerLitre}.`}
            />
            <Slider
              label="Electricity tariff"
              unit="PKR/kWh"
              value={d.tariffPerKwh}
              min={10}
              max={120}
              step={1}
              onChange={(v) => set("tariffPerKwh", v)}
              hint="Set this to match your own bill — it is the single biggest variable here."
            />
            <Slider
              label="Your bike's consumption"
              unit="L/100 km"
              value={d.petrolLitresPer100km}
              min={1.5}
              max={6}
              step={0.1}
              onChange={(v) => set("petrolLitresPer100km", v)}
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-t border-line-2 pt-6">
            <button
              type="button"
              onClick={() => setD(calculatorDefaults)}
              className="rounded-full border border-line-3 px-3.5 py-1.5 text-xs font-medium text-ink-2 transition-colors hover:border-ink/25 hover:text-ink"
            >
              Reset to YADEA&rsquo;s benchmark
            </button>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-ink-4">
            {r.monthlyKm.toLocaleString("en-PK")} km per month ·{" "}
            {r.petrolLitres.toFixed(0)} litres of petrol or{" "}
            {r.electricKwh.toFixed(1)} kWh
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------- readout */}
      <div className="lg:col-span-7">
        <div className="relative h-full overflow-hidden rounded-card border border-line-2 bg-paper-2">
          <div className="grid-fine pointer-events-none absolute inset-0 opacity-60" aria-hidden />

          <div className="relative grid gap-px bg-line-2 sm:grid-cols-2">
            {/* petrol */}
            <div className="bg-paper p-6 sm:p-8">
              <div className="flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-ink-4" aria-hidden />
                <p className="label-tech">125cc petrol · monthly</p>
              </div>
              <p className="num-hero mt-5 text-[2.25rem] leading-none text-ink-3 sm:text-[2.75rem]">
                <motion.span>{shownPetrol}</motion.span>
              </p>
              <p className="mt-2 text-xs text-ink-4">
                PKR {twoDp(r.petrolPerKm)} per km · {r.petrolLitres.toFixed(0)} litres
              </p>
            </div>

            {/* electric */}
            <div className="bg-paper p-6 sm:p-8">
              <div className="flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-electric" aria-hidden />
                <p className="label-tech text-electric-700">YADEA electric · monthly</p>
              </div>
              <p className="num-hero mt-5 text-[2.25rem] leading-none text-electric sm:text-[2.75rem]">
                <motion.span>{shownElectric}</motion.span>
              </p>
              <p className="mt-2 text-xs text-ink-4">
                PKR {twoDp(r.electricPerKm)} per km · {r.electricKwh.toFixed(1)} kWh
              </p>
            </div>
          </div>

          {/* savings */}
          <div className="relative border-t border-line-2 bg-ice/60 p-6 sm:p-8">
            <p className="label-tech">Difference per month</p>
            <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2">
              <p className="num-hero text-[2.75rem] leading-none text-ink sm:text-[3.5rem]">
                <motion.span>{shownSaved}</motion.span>
              </p>
              <p className="mb-1.5 text-sm text-ink-2">
                which is about{" "}
                <span className="font-semibold text-ink">
                  {inr(r.savedYear)}
                </span>{" "}
                a year
              </p>
            </div>
            <p className="mt-4 max-w-[54ch] text-[0.8125rem] leading-relaxed text-ink-2">
              At these inputs the electric scooter costs roughly{" "}
              <span className="font-semibold text-ink">
                {ratio >= 100 ? `${Math.round(ratio / 10)}×` : `${twoDp(ratio)}×`}
              </span>{" "}
              less to run per month than the petrol benchmark.
            </p>
          </div>

          {/* published reference */}
          <div className="relative border-t border-line-2 p-6 sm:p-8">
            <p className="label-tech">YADEA&rsquo;s own published comparison</p>
            <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {[
                { k: "Petrol, per month", v: inr(costBasis.petrol.monthlyFuel) },
                { k: "Petrol, per km", v: `PKR ${costBasis.petrol.perKm}` },
                { k: "Electric (Ruibin), per month", v: inr(costBasis.electric.monthlyRunning) },
                { k: "Electric, per km", v: `PKR ${costBasis.electric.perKm}` },
              ].map((row) => (
                <div key={row.k} className="flex items-baseline justify-between gap-4 border-b border-line-2 pb-2.5">
                  <dt className="text-xs text-ink-3">{row.k}</dt>
                  <dd className="num-hero text-[0.9375rem] text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ honesty */}
      <div className="lg:col-span-12">
        <LabelledRule label="Where these numbers come from" />
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {calculatorNotes.map((n, i) => (
            <motion.li
              key={i}
              className="flex gap-4"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: reduce ? duration.fast : duration.slow, ease: ease.out }}
            >
              <span className="label-tech mt-1 shrink-0 text-electric">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[0.8125rem] leading-relaxed text-ink-2">{n}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- maintenance table */

export function MaintenanceTable() {
  return (
    <div>
      <LabelledRule label="What an electric scooter does not need" />
      <div className="mt-6 flex flex-wrap gap-2.5">
        {["Engine oil", "Spark plug", "Carburettor", "Fuel filter", "Clutch", "Exhaust"].map((x) => (
          <span
            key={x}
            className="rounded-full border border-dashed border-ink/20 px-3.5 py-1.5 text-[0.8125rem] text-ink-3 line-through decoration-ink-4/50"
          >
            {x}
          </span>
        ))}
      </div>
      <p className="body-md mt-5 max-w-[62ch]">
        That is where most of the saving comes from. YADEA puts annual maintenance
        on an electric scooter at{" "}
        <span className="font-semibold text-ink">{costBasis.maintenance.electricAnnual}</span>{" "}
        against {costBasis.maintenance.petrolAnnual} on a petrol bike, rising to{" "}
        {costBasis.maintenance.petrolAnnualUpper} depending on use.
      </p>
    </div>
  );
}
