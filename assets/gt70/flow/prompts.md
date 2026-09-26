# YADEA GT70 — Google Flow generation manifest

Campaign: cinematic GT70 launch film for yadea.com.pk
Reference vehicle: YADEA GT70, "Starry Black" (繁星黑) — dark body, orange accent graphics.
Authoritative inputs: `assets/gt70/references/gt70-front-45.png`, `gt70-side-180.png`.

## Hard constraints (apply to every clip)

The GT70 must read as the **same physical vehicle** as the reference photo. Never redesign it.

- Vehicle: YADEA GT70 rugged premium utility electric scooter.
- Colour: dark / black body with orange accent graphics.
- Front: angular fairing, large headlight assembly, tall transparent windshield, two rear-view
  mirrors, front protective tubular bars.
- Body: large black seat, central body panel, GT70 branding, orange graphics.
- Rear: extended protective frame, large rear cargo rack, rear light assembly.
- Wheels: exact wheel proportions and tyre geometry from the reference.
- Never morph, never add/remove components, never duplicate mirrors, never distort the
  handlebar, windshield, logos or body panels, never add wheels, never float parts.
- Never generate text, captions, watermarks or artificial logos inside the frame.
- Look: premium automotive commercial. Not cyberpunk, not neon, not sci-fi, not a
  videogame cinematic, not a concept vehicle, not a sports bike, not a Vespa-style scooter.

## Technical notes for the Flow stage

- Flow is driven through the Google Flow MCP connector; the prompt box is a ProseMirror
  editor that is typed **character by character**. Anything beyond roughly 900 characters
  blows the 30 s `locator.type` timeout. Each clip therefore has a **compact prompt** that is
  what actually gets submitted; the full prompt below is the record of intent.
- Reference images are submitted as 1920×1080 JPEGs (cover-cropped from the 7680 px
  originals) in `assets/gt70/references/flow-upload/`.
- Model: `Veo 3.1 - Quality`, ratio `16:9`, duration `8s`, quantity `1`.
- Raw Flow downloads land in `assets/gt70/flow/raw/`. Nothing enters `public/` until it has
  passed QC and been normalised to constant 30 fps.

---

## 01 — hero

Role: homepage hero. Reference: front-45. Compact prompt is what is submitted.

**Full prompt**

> Using the supplied YADEA GT70 reference image, create a cinematic premium automotive hero
> shot. Begin with a wide, elegant environmental composition where the GT70 is partially
> revealed. The camera slowly pushes forward toward the vehicle while simultaneously moving
> slightly from left to right, gradually revealing the front three-quarter perspective.
> Maintain the exact GT70 design from the reference image. Subtle environmental movement and
> realistic lighting create depth while the vehicle remains the visual focus. As the camera
> approaches, the headlights and orange design accents catch the light naturally. End on a
> powerful front three-quarter hero composition matching the supplied reference. Premium
> electric vehicle commercial aesthetic. Photorealistic. Realistic automotive cinematography.
> No vehicle redesign. No morphing. No text generated inside the video. No artificial logos. No
> excessive visual effects.

**Compact (submitted)**

> Cinematic premium automotive hero shot of the exact YADEA GT70 from the reference image. Dark
> black body, orange accent graphics, angular front fairing, tall transparent windshield, two
> mirrors, front protective bars, large rear cargo rack. Preserve every panel and proportion
> exactly. Slow dolly-in with slight left-to-right drift, revealing the front three-quarter
> view. Headlights and orange accents catch the light. Photorealistic automotive cinematography,
> controlled lighting, shallow depth of field. No morphing, no redesign, no text, no logos, no
> extra wheels.

---

## 02 — orbit

Role: scroll-scrubbed product reveal. Reference: side-180.

**Compact (submitted)**

> Premium cinematic 180-degree product orbit around the exact YADEA GT70 from the reference. The
> vehicle stays stationary while the camera travels around it: front three-quarter, along the
> side profile, then to a rear three-quarter view. Reveal the full length, seat, body panels, GT70
> graphics, protective frame and rear cargo rack. Extremely smooth, physically believable camera
> move like a motorised cinema camera. No morphing, no changing wheels, mirrors, bars or rack, no
> added or missing parts, no logo distortion, no text. Photorealistic automotive commercial.

---

## 03 — detail

Role: design chapter, ambient loop. Reference: front-45.

**Compact (submitted)**

> Series of cinematic macro automotive shots of the exact YADEA GT70 from the reference. Start on
> an extreme close-up of the front lighting assembly, track slowly across the angular bodywork,
> reveal the orange GT70 graphics, move to the front wheel and brake assembly, then tilt up to the
> handlebar and windshield. Shallow depth of field, physically accurate reflections, controlled
> highlights. Every component identical to the reference. No redesign, no morphing, no text.

---

## 04 — urban

Role: urban mobility chapter. Reference: side-180.

**Compact (submitted)**

> The exact YADEA GT70 from the reference ridden through a clean modern Asian urban environment.
> Natural realistic riding with cinematic tracking shots: front three-quarter, side, then rear
> three-quarter. Preserve the exact GT70 geometry, proportions, colours, body panels, protective
> frame and rear rack. The rider interacts naturally with the vehicle. Realistic suspension
> movement, wheel rotation and road contact. Natural daylight, premium electric mobility
> advertising look. No cyberpunk, no neon, no transformation, no redesign.

---

## 05 — technology

Role: engineering chapter. Reference: front-45.
Must not become a sci-fi hologram, and must not invent components or numbers.

**Compact (submitted)**

> Sophisticated cinematic technology sequence around the exact YADEA GT70. Begin on the complete
> vehicle, then move the camera slowly toward the body. Refined translucent technical lines and
> minimal data visualisation reveal the relationship between battery, electrical system,
> controller, motor and wheels, in the language of premium automotive engineering graphics. Keep
> the physical appearance of the actual GT70. Do not cut the vehicle apart, do not invent
> mechanical parts, do not show numerical specifications. Clean, precise, photorealistic.

---

## 06 — battery

Role: electric power chapter. Reference: front-45.

**Compact (submitted)**

> Premium cinematic visualisation of the electric nature of the exact YADEA GT70. Start on a
> realistic close-up, then transition through subtle visualisation of electrical energy travelling
> through the vehicle toward the motor and wheels. Restrained electric-blue and cyan energy
> accents used sparingly, like a premium product film rather than a superhero effect. Maintain
> exact vehicle geometry and realistic materials. No neon overload, no transformation, no invented
> specifications.

---

## 07 — night

Role: premium evening hero. Reference: front-45.
Blue hour, architectural lighting. Must stay elegant — not horror, not sinister.

**Compact (submitted)**

> Premium evening automotive commercial featuring the exact YADEA GT70 in a sophisticated modern
> urban setting at blue hour. Controlled architectural lighting and subtle reflections, the GT70
> central in frame, headlights and orange accents as subtle highlights. Realistic proportions and
> exact vehicle identity, cinematic camera movement, photorealistic materials, elegant blue-hour
> atmosphere, premium Chinese electric mobility brand look. No horror, no cyberpunk, no neon
> overload.

---

## 08 — final

Role: closing CTA. Reference: front-45. Must settle into a stable final frame for the CTA.

**Compact (submitted)**

> Final premium product reveal of the exact YADEA GT70 from the reference. Begin in a minimal
> cinematic environment and slowly reveal the complete vehicle with a smooth camera move into a
> powerful three-quarter composition. Light travels across the bodywork revealing the windshield,
> front lighting, orange accents, GT70 branding, protective structure and rear rack. End with the
> vehicle centred in a stable hero frame, held long enough to transition into a website call to
> action. Photorealistic, minimal, no text, no generated logos, no morphing, no redesign.

---

## QC gate — before anything reaches `public/`

Reject and regenerate on any of:

1. Wheels, mirrors, handlebar, windshield, protective bars or rear rack change, vanish, multiply
   or warp.
2. Any body-panel morphing, panel drift, or the vehicle "becoming" another vehicle type.
3. YADEA or GT70 branding distorted, replaced, or invented lettering.
4. Orange accent graphics lost, recoloured, or migrating across panels.
5. Generated text, captions, watermarks or artificial logos anywhere in frame.
6. Physics implausible: floating, sinking, clipping through the ground, wheels not contacting.
7. Style drift — cyberpunk, neon, sci-fi, horror, or a different colour temperature from the
   rest of the campaign.
8. Black borders, wrong orientation, or unexpected cropping introduced by processing.

Technical QC is automated (`scripts/gt70-video-qc.mjs`). The visual items above require a human
watch-through; the automated pass cannot judge vehicle identity.
