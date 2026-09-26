"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/content/site";
import { globalStats } from "@/content/site";
import { duration, ease } from "@/lib/motion";
import { ButtonLink, ArrowGlyph } from "@/components/ui/Button";
import { CinematicVideo } from "@/components/video/CinematicVideo";
import { clipIsPlayable, gt70ClipById } from "@/content/gt70Videos";

/** Split the headline so each word can rise independently. */
const headline = ["Move", "on", "electricity."] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const heroPlayable = clipIsPlayable(gt70ClipById.hero);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Two depth layers only, 10–20% of foreground speed.
  const vehicleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 46]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.25]);

  return (
    <section
      ref={ref}
      id="top"
      className="field-aurora relative isolate overflow-hidden pb-16 pt-14 sm:pt-16 lg:pb-24 lg:pt-20"
    >
      {/* GT70 hero film, masked down into the dark field. Until a
          QC-approved render exists this stays the official campaign banner. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        {heroPlayable ? (
          <CinematicVideo
            clip={gt70ClipById.hero}
            priority
            decorative
            position="absolute"
            placeholderClassName="bg-transparent"
            className="inset-0 h-full w-full opacity-[0.28] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
          />
        ) : (
          <Image
            src="/img/official-hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.28] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
          />
        )}
      </div>

      {/* ------------------------------------------------- ambient light */}
      <motion.div
        aria-hidden
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute left-1/2 top-[-18%] h-[46rem] w-[86rem] max-w-none -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(235,95,27,0.20), rgba(255,138,61,0.10) 48%, transparent 76%)",
          }}
        />
        <div className="grid-fine absolute inset-0 opacity-[0.4]" />
      </motion.div>

      <div className="container-x relative">
        {/* `items-start` (not `items-center`) so the eyebrow sits at a fixed
            offset directly beneath the fixed header's YADEA lockup instead of
            drifting with the height difference between copy and vehicle. */}
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ------------------------------------------------------- copy */}
          <motion.div style={{ y: copyY }} className="lg:col-span-6 xl:col-span-5">
            <motion.p
              className="label-tech"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease: ease.out, delay: 0.05 }}
            >
              YADEA · {site.distributor}
            </motion.p>

            <h1 className="display-xl mt-7 text-ink">
              {headline.map((word, i) => (
                <span key={word} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.7em" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduce ? duration.fast : duration.deliberate,
                      ease: ease.out,
                      delay: reduce ? 0 : 0.12 + i * 0.075,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="body-lg mt-7 max-w-[44ch]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease: ease.out, delay: 0.42 }}
            >
              The world&rsquo;s No.1 electric two-wheeler brand, built for how Pakistan actually
              moves. Thirteen models, a {""}
              <span className="font-semibold text-ink">nationwide 3S network</span>, and running
              costs that need no fuel at all.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease: ease.out, delay: 0.52 }}
            >
              <ButtonLink href="#lineup" size="lg" trailing={<ArrowGlyph />}>
                Explore the range
              </ButtonLink>
              <ButtonLink href="#running-cost" variant="outline" size="lg">
                Compare running cost
              </ButtonLink>
            </motion.div>
          </motion.div>

          {/* ---------------------------------------------------- vehicle */}
          <div className="relative lg:col-span-6 lg:col-start-7 xl:col-span-7">
            <motion.div
              style={{ y: vehicleY }}
              className="relative mx-auto w-full max-w-[42rem] lg:max-w-none"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.965, y: 26 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: reduce ? duration.fast : 1.05, ease: ease.out, delay: 0.2 }}
            >
              {/* Soft contact shadow keeps the cut-out from floating in space */}
              <div
                aria-hidden
                className="absolute inset-x-[12%] bottom-[6%] h-10 rounded-[50%] blur-2xl"
                style={{ background: "rgba(0,0,0,0.55)" }}
              />
              <Image
                src="/img/render-velax.png"
                alt="YADEA Velax electric scooter in profile"
                width={767}
                height={703}
                priority
                className="relative w-full drop-shadow-[0_28px_38px_rgba(0,0,0,0.55)]"
              />

              {/* Floating spec chip — reads as a live instrument */}
              <motion.div
                className="absolute left-0 top-[18%] hidden rounded-card border border-line-2 bg-paper-2/85 px-4 py-3 backdrop-blur-md sm:block lg:left-[-2rem]"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.slow, ease: ease.out, delay: 0.7 }}
              >
                <p className="label-tech">Top speed</p>
                <p className="num-hero mt-1.5 text-[1.375rem] leading-none text-ink">
                  62<span className="ml-1 text-[0.6875rem] font-normal text-ink-4">km/h</span>
                </p>
              </motion.div>

              <motion.div
                className="absolute bottom-[16%] right-0 hidden rounded-card border border-line-2 bg-paper-2/85 px-4 py-3 backdrop-blur-md sm:block lg:right-[-1rem]"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.slow, ease: ease.out, delay: 0.82 }}
              >
                <p className="label-tech">Range</p>
                <p className="num-hero mt-1.5 text-[1.375rem] leading-none text-electric">
                  66<span className="ml-1 text-[0.6875rem] font-normal text-ink-4">km</span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ----------------------------------------------------- stat rail */}
        <motion.dl
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line-2 pt-9 sm:grid-cols-3 lg:mt-24 lg:grid-cols-5"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.6 } } }}
        >
          {globalStats.map((s) => (
            <motion.div
              key={s.label}
              variants={{
                hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
              }}
            >
              <dt className="label-tech">{s.label}</dt>
              <dd className="num-hero mt-2.5 text-[1.75rem] leading-none text-ink sm:text-[2rem]">
                {new Intl.NumberFormat("en-PK").format(s.value)}
                <span className="text-electric">{s.suffix}</span>
              </dd>
              {s.note ? <p className="mt-2 text-xs leading-snug text-ink-4">{s.note}</p> : null}
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
