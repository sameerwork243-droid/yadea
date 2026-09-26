/**
 * Brand, company and verified network facts.
 *
 * EVERY value in this file is taken from published yadea.com.pk content.
 * Nothing is invented. Where the source publishes no figure the value is
 * `null` and the UI renders an explicit "not published" state rather than
 * filling the gap.
 */

export const site = {
  name: "YADEA",
  legalName: "Yadea Pakistan",
  distributor: "Eiffel Industries Ltd.",
  origin: "China",
  tagline: "The Future of Urban Mobility",
  /**
   * yadea.com.pk does not publish a phone number, email address, street
   * address or WhatsApp number in its page markup. These are intentionally
   * empty and the Contact section routes visitors to the verified channels
   * below instead of inventing contact details.
   */
  contact: {
    phone: null as string | null,
    whatsapp: null as string | null,
    email: null as string | null,
    address: null as string | null,
    hours: null as string | null,
  },
  channels: {
    instagram: "https://www.instagram.com/yadeapakistan/",
    instagramHandle: "@yadeapakistan",
    dealerLocator: "https://yadea.com.pk/find-a-dealer/",
    testRide: "https://yadea.com.pk/test-drive/",
    productSupport: "https://yadea.com.pk/product-support/",
    serviceSupport: "https://yadea.com.pk/service-support/",
    contactPage: "https://yadea.com.pk/contact-us",
    becomeDealer: "https://yadea.com.pk/become-a-dealer/",
    dealershipForm:
      "https://yadea.com.pk/wp-content/uploads/2024/11/Dealership-Form-x1.pdf",
    paveScheme: "http://pave.gov.pk",
    /** Government-hosted PAVE application form, linked from YADEA's own PAVE page. */
    paveApply: "https://forms.gle/jYGHRB2gt4GrBNqGA",
    sourceSite: "https://yadea.com.pk/",
  },
} as const;

/** Figures published on the YADEA "About Us" page. */
export const globalStats = [
  { value: 8, suffix: "", label: "Consecutive years", note: "Global No.1 in annual electric two-wheeler sales" },
  { value: 30, suffix: "+", label: "Countries & regions", note: "Active markets worldwide" },
  { value: 36, suffix: "M+", label: "Users", note: "Riders across the global fleet" },
  { value: 36, suffix: "+", label: "Distributors", note: "National distribution partners" },
  { value: 1549, suffix: "+", label: "Retailers", note: "Dealer and retail touchpoints" },
] as const;

/** Verbatim brand statements from the YADEA "About Us" page. */
export const brandPillars = [
  {
    kicker: "Our wish",
    title: "A green commuting generation",
    body: "Increase Yadea's leadership role in the industry, by creating a new generation that's identified by a green commuting lifestyle.",
  },
  {
    kicker: "Our mission",
    title: "Master the core technology",
    body: "Master the innovation and core technology of electric vehicles, abide by the international safety and quality standards, and provide the world with superior solutions for electric mobility.",
  },
  {
    kicker: "Our promise",
    title: "The ultimate riding experience",
    body: "Provide a convenient, safe, free and comfortable ultimate riding experience for our customers.",
  },
] as const;

/** TTFAR platform claims, verbatim from the YADEA Pakistan homepage. */
export const ttfarMetrics = [
  { value: "3X", label: "Lifespan", detail: "Battery cycle life multiplier" },
  { value: "25%", label: "Capacity upgrade", detail: "Gain over the previous pack" },
  { value: "−20→55°C", label: "Operating range", detail: "Verified working window" },
  { value: "86%", label: "Efficiency", detail: "System-level conversion efficiency" },
] as const;

export const ttfarStages = [
  {
    id: "battery",
    index: "01",
    name: "Battery",
    role: "Energy store",
    detail:
      "LFP and graphene packs sized per model. Ternary LFP on Keeness for cold-start margin; high-capacity LFP on T5L, M3H and Velax; graphene on EPOC-H, GT30 and Ruibin S.",
    figures: ["72V 38Ah", "72V 30Ah", "60V 30Ah", "72V 25Ah"],
  },
  {
    id: "controller",
    index: "02",
    name: "Controller",
    role: "Energy retrieval",
    detail:
      "The energy-retrieving controller reclaims charge while you ride and, on Velax, optimises power use in real time across two riding modes — extending battery life by up to 20%.",
    figures: ["Up to +20% battery life", "2 riding modes", "Adaptive power"],
  },
  {
    id: "motor",
    index: "03",
    name: "Motor",
    role: "Traction",
    detail:
      "TTFAR motors from a 1,000W city commuter to the 11kW mid-mounted unit on Keeness. Keeness delivers 300Nm and 0–50km/h in 3 seconds.",
    figures: ["1,000W – 11kW", "300Nm peak", "3s 0–50km/h"],
  },
  {
    id: "wheel",
    index: "04",
    name: "Wheel",
    role: "Contact patch",
    detail:
      "Tubeless tyres from 10-inch city commuters to 17-inch street motorcycle rubber, with a 16-degree climb capability on the family and flagship platforms.",
    figures: ["10\" – 17\" tubeless", "Up to 20° climb", "CBS on Keeness"],
  },
] as const;

/** Environmental benefits published on the YADEA Pakistan homepage. */
export const impactItems = [
  {
    title: "Zero CO₂ emissions",
    body: "No tail-gas emissions at the point of use. No exhaust, no idle pollution in the street you ride on.",
  },
  {
    title: "Reduced fuel dependency",
    body: "Energy comes from the grid, not the pump — removing a direct line to volatile imported fuel prices.",
  },
  {
    title: "Sustainable mobility",
    body: "Designed to support a greener mobility ecosystem by improving energy efficiency and lowering dependence on fossil fuels.",
  },
] as const;

/** Q&A sourced from YADEA Pakistan's published articles and product pages. */
export const faqs = [
  {
    group: "Range & charging",
    items: [
      {
        q: "How far can a YADEA go on one charge?",
        a: "It depends on the model and the riding mode. Published figures: EPOC-H 125 km, Keeness 129 km, M3H 110 km in Eco mode, Velax 85 km in ECO mode, T5L 80–100 km, Ruibin S 80 km, Ruibin 90 km, M3 80 km, T5 75–85 km, GT30 70–75 km.",
      },
      {
        q: "How long does charging take?",
        a: "Published charge times are 5 hours (M3H), 5.5 hours (T5L), 5–6 hours (Keeness), 6–7 hours (Velax and Ruibin S), 6–8 hours (GT30) and 7–8 hours (EPOC-H). You charge from a standard home socket.",
      },
      {
        q: "What battery chemistry do YADEA scooters use?",
        a: "Lithium Iron Phosphate (LFP) on T5L, M3H and Velax; ternary LFP on Keeness; and graphene batteries on EPOC-H, GT30 and Ruibin S. Keeness additionally carries an IPX7 waterproof rating and an intelligent BMS with 40+ protections.",
      },
      {
        q: "Does it need a UPS to charge at home?",
        a: "YADEA publishes guidance on charging at home without a UPS for load-shedding areas. Because the pack charges from a standard home socket over 5–8 hours, an overnight charge fits most supply schedules.",
      },
    ],
  },
  {
    group: "Buying & financing",
    items: [
      {
        q: "Can I buy a YADEA on installments?",
        a: "Yes. YADEA partners with Bank Alfalah on the Step-By-Step (SBS) plan, spreading cost over 3 to 36 months with 0% markup on the 3- and 6-month tenures. A one-time processing fee applies: 5% at 3 months, 8% at 6 months, and 2.5% for tenures of 9 months or more.",
      },
      {
        q: "Who is eligible for the Bank Alfalah plan?",
        a: "Salaried individuals: Pakistani national or eligible foreign national, aged 21–60, minimum monthly salary PKR 50,000. Self-employed individuals: aged 21–65, minimum average monthly balance PKR 75,000.",
      },
      {
        q: "Which models are on the installment plan?",
        a: "M3, Ruibin, T5 and EPOC-H are listed on the SBS plan, subject to stock at your nearest authorised dealer.",
      },
      {
        q: "What is the PAVE programme?",
        a: "The Pakistan Accelerated Vehicle Electrification (PAVE) scheme supports 40,000 applicants with financial assistance on approved electric two-wheelers. YADEA participates through Eiffel Industries Ltd. with a PKR 50,000 subsidy, and extends the government warranty of 3 years / 40,000 km to 4 years / 50,000 km.",
      },
    ],
  },
  {
    group: "Ownership & support",
    items: [
      {
        q: "Where can I buy a YADEA?",
        a: "Through 40+ YADEA dealerships across Pakistan, all operating the 3S model — Sales, Service and Spare Parts under one roof. Use the dealer locator on this page to find your city, address and phone number.",
      },
      {
        q: "Where can I service it?",
        a: "At any authorised 3S store. Every 3S location employs technicians who have completed YADEA's certified training programme, and stocks genuine YADEA spare parts — brake inspections, battery health checks, tyre servicing and software diagnostics.",
      },
      {
        q: "What warranty is provided?",
        a: "Battery pack replacement warranty is 4 years / 50,000 km on T5L, M3H and Velax, and 24 months / 20,000 km on Keeness and Ruibin S. Under the PAVE scheme, YADEA extends the government warranty of 3 years / 40,000 km to 4 years / 50,000 km. Model-level terms are listed on each vehicle below.",
      },
      {
        q: "How much does servicing cost?",
        a: "YADEA publishes annual servicing for an electric scooter at around PKR 1,500–2,500, against roughly PKR 5,000–8,000 for a petrol bike, because there is no engine oil, spark plug, carburettor or fuel filter. Brake pads are checked every 3,000–5,000 km and cost approximately PKR 500–1,200 to replace.",
      },
      {
        q: "What does a YADEA cost to run?",
        a: "YADEA publishes a running cost of about PKR 0.74 per km for the Ruibin — around PKR 1,110 per month — against roughly PKR 10.2 per km and PKR 12,100 per month in fuel alone for a 125cc petrol bike covering 40 km a day. Use the calculator above to see the full comparison.",
      },
    ],
  },
] as const;
