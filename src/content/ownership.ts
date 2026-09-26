/**
 * Ownership economics and financing — all figures published by YADEA
 * Pakistan. Assumptions are labelled explicitly wherever the source makes
 * them; nothing here is modelled or extrapolated by us.
 */

/* ---------------------------------------------------- running cost basis */

export const costBasis = {
  /** YADEA's published petrol benchmark. */
  petrol: {
    vehicle: "125cc petrol bike",
    assumption: "40 km per day, 26 days per month, petrol at PKR 378 per litre",
    monthlyFuel: 12100,
    perKm: 10.2,
    monthlyMaintenance: "PKR 2,000–3,000",
    petrolPricePerLitre: 378,
  },
  /** YADEA's published electric benchmark (Ruibin). */
  electric: {
    vehicle: "YADEA Ruibin",
    monthlyRunning: 1110,
    perKm: 0.74,
    maintenance: "Minimal — no engine oil, spark plug, carburettor or fuel filter",
  },
  maintenance: {
    electricAnnual: "PKR 1,500–2,500",
    petrolAnnual: "PKR 5,000–8,000",
    petrolAnnualUpper: "PKR 20,000–30,000 depending on usage",
    lineItems: [
      { label: "Tyre pressure check", cadence: "Monthly", cost: "Free or nominal at any 3S store or tyre shop" },
      { label: "Brake pad inspection", cadence: "Every 3,000–5,000 km", cost: "PKR 500–1,200 to replace" },
      { label: "Battery health check", cadence: "Every 6 months or 5,000 km", cost: "Free or low-cost at 3S for in-warranty models" },
      { label: "Tyre replacement", cadence: "After 15,000–20,000 km", cost: "PKR 2,500–4,500 per tyre" },
      { label: "Annual full inspection", cadence: "Once a year", cost: "Recommended for all YADEA models" },
    ],
  },
} as const;

/* ----------------------------------------------------------- calculators */

/**
 * Live operating-cost calculator. Every input is visible and editable, and
 * each one is labelled on screen next to the number it affects — the
 * calculator never quietly models anything on the user's behalf.
 *
 * The defaults are chosen to reproduce the two figures YADEA itself
 * publishes, and the two reference values are shown alongside the
 * computed ones so any divergence is visible rather than hidden.
 */
export const calculatorDefaults = {
  kmPerDay: 40,
  daysPerMonth: 26,
  /** YADEA's published benchmark. */
  petrolPricePerLitre: 378,
  /** 3.0 L/100 km — a clean, slightly optimistic 125cc commuter figure. */
  petrolLitresPer100km: 3.0,
  /**
   * 2.9 kWh/100 km — DERIVED, not invented: the Ruibin's published 72V 32Ah
   * pack is ~2.30 kWh and it publishes 80 km of range. 2.30 / 80 * 100 = 2.9.
   */
  kwhPer100km: 2.9,
  /**
   * PKR 37/kWh — DERIVED: the tariff that reconciles the derived 2.9 kWh/100km
   * with YADEA's published PKR 1,110 per month at 1,040 km. Shown as an
   * adjustable default, not as a claim about any utility tariff.
   */
  tariffPerKwh: 37,
} as const;

/** Editable, widened form of the defaults above (literal types lifted to number). */
export type CalculatorState = {
  -readonly [K in keyof typeof calculatorDefaults]: (typeof calculatorDefaults)[K] extends number
    ? number
    : (typeof calculatorDefaults)[K];
};

export const calculatorNotes = [
  "The electric figure is derived from published data: the Ruibin's 72V 32Ah pack is about 2.30 kWh and it publishes 80 km of range, which works out to 2.9 kWh per 100 km.",
  "The PKR 37 per kWh default is the tariff that reconciles that number with YADEA's own published figure of about PKR 1,110 per month at 1,040 km. It is not a claim about your utility's tariff — change it to match your bill.",
  "The petrol figure uses YADEA's published benchmark of PKR 378 per litre and an assumed 3.0 L/100 km for a 125cc commuter. YADEA's own published petrol figure is PKR 12,100 per month; yours will differ if your bike is bigger or you ride further.",
  "YADEA publishes PKR 10.2 per km for petrol against PKR 0.74 per km electric. Both of those are shown below for reference.",
] as const;

/* ------------------------------------------------------------ financing */

export const financing = {
  partner: "Bank Alfalah",
  plan: "Step-By-Step (SBS)",
  headline: "0% markup on 3 and 6 month tenures",
  body: "Spread the cost of a YADEA electric scooter over 3 to 36 months. The 3- and 6-month tenures carry 0% markup, so you pay nothing beyond the scooter price. No traditional down payment — a one-time processing fee applies instead.",
  processingFees: [
    { tenure: "3 months", fee: "5%", markup: "0%" },
    { tenure: "6 months", fee: "8%", markup: "0%" },
    { tenure: "9 months and above", fee: "2.5%", markup: "—" },
  ],
  eligibility: [
    {
      profile: "Salaried individuals",
      items: ["Pakistani national or eligible foreign national", "Age 21 to 60", "Minimum monthly salary of PKR 50,000"],
    },
    {
      profile: "Self-employed individuals",
      items: ["Age 21 to 65", "Minimum average monthly balance of PKR 75,000"],
    },
  ],
  documents: ["CNIC", "Proof of income or bank statements", "Basic personal details"],
  howToApply: [
    { channel: "AlfaMall app", detail: "Browse eligible products and apply directly through the app" },
    { channel: "WhatsApp", detail: "Message Bank Alfalah on their official WhatsApp number to initiate the process" },
    { channel: "Branch visit", detail: "Walk into any Bank Alfalah branch with your documents" },
    { channel: "Phone banking", detail: "Call 021-111-225-111 and apply over the phone" },
  ],
  caveat:
    "The SBS plan operates on a conventional banking model. For Shariah-compliant financing, speak directly with Bank Alfalah or explore their Islamic banking channels. Confirm current documentation requirements with the bank before applying.",
  promotionNote: "This is a limited-time promotion and is subject to stock availability.",
} as const;

export type InstallmentRow = {
  model: string;
  slug: string;
  price: number;
  /** [3mo, 6mo, 9mo, 12mo, 18mo, 24mo, 36mo] with the stated processing fee. */
  monthly: number[];
};

/** Monthly payment table exactly as published on yadea.com.pk. */
export const installmentTable: InstallmentRow[] = [
  { model: "Yadea M3", slug: "m3", price: 174000, monthly: [58000, 29000, 22074, 17381, 12694, 10355, 8027] },
  { model: "Yadea Ruibin", slug: "ruibin", price: 209000, monthly: [69667, 34833, 26776, 21083, 15398, 12561, 9737] },
  { model: "Yadea T5", slug: "t5", price: 253500, monthly: [84500, 42250, 32458, 25557, 18665, 15227, 11804] },
  { model: "Yadea EPOC-H", slug: "epoc-h", price: 355000, monthly: [118333, 59167, 45715, 35996, 26289, 21446, 16625] },
];

export const installmentTenures = [
  { months: 3, fee: "5%", markup: "0%" },
  { months: 6, fee: "8%", markup: "0%" },
  { months: 9, fee: "2.5%", markup: "—" },
  { months: 12, fee: "2.5%", markup: "—" },
  { months: 18, fee: "2.5%", markup: "—" },
  { months: 24, fee: "2.5%", markup: "—" },
  { months: 36, fee: "2.5%", markup: "—" },
] as const;

/* ---------------------------------------------------------------- PAVE */

export const pave = {
  fullName: "Pakistan Accelerated Vehicle Electrification",
  scheme: "PAVE",
  year: "2025",
  distributor: "Eiffel Industries Ltd.",
  applicants: "40,000",
  subsidy: 50000,
  governmentWarranty: "3 years / 40,000 km",
  yadeaWarranty: "4 years / 50,000 km",
  status:
    "YADEA's published application deadline for the 2025 round was 30 September 2025. Confirm the current round and eligibility directly with the government before applying.",
  models: [
    {
      name: "Velax",
      slug: "velax",
      before: 490000,
      after: 440000,
      battery: "72V 30Ah LiFePO4",
      motor: "2000W BLDC",
      maxSpeed: "62 km/h",
      range: "66 km/charge",
      charging: "6 hrs",
      waterproof: "IP-67",
      warranty: "3 yrs / 50,000 km battery | 2 yrs / 40,000 km vehicle",
      why: "For bold riders who want style and muscle.",
    },
    {
      name: "T5L",
      slug: "t5l",
      before: 285000,
      after: 235000,
      battery: "72V 30Ah LiFePO4",
      motor: "1500W BLDC",
      maxSpeed: "50 km/h",
      range: "70–80 km/charge",
      charging: "6 hrs",
      waterproof: "IP-67",
      warranty: "3 yrs / 50,000 km battery | 2 yrs / 40,000 km vehicle",
      why: "Perfect balance of daily use, comfort and savings.",
    },
    {
      name: "M3H",
      slug: "m3h",
      before: 250000,
      after: 200000,
      battery: "60V 30Ah LiFePO4",
      motor: "1200W BLDC",
      maxSpeed: "45 km/h",
      range: "60–70 km/charge",
      charging: "6 hrs",
      waterproof: "IP-67",
      warranty: "3 yrs / 50,000 km battery | 2 yrs / 40,000 km vehicle",
      why: "Best for students, women and families looking for everyday mobility.",
    },
  ],
  howToApply: [
    "Visit pave.gov.pk",
    "Sign up with CNIC, mobile and email",
    "Log in and select “Electric Motorcycle”",
    "Choose Eiffel Industries Ltd. (YADEA Pakistan)",
    "Select your YADEA model",
    "Upload your CNIC and required documents",
    "Submit before the published deadline",
    "Wait for the government computerized lucky draw",
  ],
  requirements: ["CNIC", "Financing choice — self-finance or a 0% markup bank lease", "Income status", "Electricity bill details", "Two potential references and their details"],
  note: "No driving licence is required for motorcycles. Only authorised YADEA dealers can process the subsidy and offer warranty coverage.",
  priority: "Students, women, widows and low-income families are prioritised in the scheme.",
} as const;

/* ---------------------------------------------------------- after sales */

export const threeS = {
  title: "Own it. We'll take care of it.",
  body: "YADEA's nationwide 3S showrooms provide Sales, Service and Spare Parts under one roof, backed by certified and professionally trained technicians.",
  pillars: [
    {
      code: "S",
      title: "Sales",
      body: "Every 3S location sells the current YADEA line-up at official Pakistan pricing. Walk in, compare models and book a test ride at any 3S store.",
    },
    {
      code: "3",
      title: "Service",
      body: "Technicians who have completed YADEA's certified training programme. Brake inspections, battery health checks, tyre servicing and software diagnostics — handled by people who know the model.",
    },
    {
      code: "S",
      title: "Spare Parts",
      body: "Genuine YADEA spare parts stocked at 3S locations, so the most commonly replaced items are available without ordering from the manufacturer.",
    },
  ],
  support: {
    productSupport: "Register your product and YADEA responds within a maximum of 48 business hours.",
    serviceSupport: "Service support and warranty assistance from the YADEA support team.",
  },
} as const;

export const warrantyTiers = [
  {
    scope: "4 years / 50,000 km",
    title: "Battery pack replacement",
    models: ["T5L", "M3H", "Velax"],
    body: "The extended battery pack replacement warranty published on these models — and the tier YADEA extends the PAVE government warranty to.",
    emphasis: true,
  },
  {
    scope: "24 months / 20,000 km",
    title: "Battery pack replacement",
    models: ["Keeness", "Ruibin S"],
    body: "The battery pack replacement warranty published on the Keeness and Ruibin S.",
    emphasis: false,
  },
  {
    scope: "4 years / 50,000 km",
    title: "PAVE government warranty, extended",
    models: ["Velax", "T5L", "M3H"],
    body: "The government scheme provides 3 years / 40,000 km. YADEA adds an extra year and 10,000 km on scheme purchases.",
    emphasis: false,
  },
] as const;

export const warrantyNote =
  "Warranty is provided on the battery pack as stated per model. YADEA does not publish separate vehicle or motor warranty terms for every model, so no additional term is claimed here. Confirm the warranty applicable to your model and purchase at your authorised 3S store.";

/* --------------------------------------------------------- why yadea */

export const proofPoints = [
  {
    title: "Global experience",
    body: "The world's leading electric two-wheeler brand, ranked global No.1 in annual sales for eight consecutive years, with product ranges covering high-performance electric motorcycles, electric mopeds, electric bicycles and electric kick scooters.",
    figures: ["8 yrs No.1", "30+ countries", "1,549+ retailers"],
  },
  {
    title: "Electric technology",
    body: "TTFAR integrates the motor, energy-retrieving controller and battery into one system, delivering longer range, stable power output and consistent riding performance.",
    figures: ["86% efficiency", "3X lifespan", "+25% capacity"],
  },
  {
    title: "Quality",
    body: "Built with durable construction to ensure long-lasting performance and reliability on every ride, and backed by a nationwide network of certified 3S technicians.",
    figures: ["3S network", "Certified technicians", "Genuine parts"],
  },
  {
    title: "Independent R&D",
    body: "YADEA focuses on independent research and development of its products, with national patents and a national-level design centre behind the line-up.",
    figures: ["Patented", "In-house R&D", "Award-recognised design"],
  },
  {
    title: "Design",
    body: "Acclaimed within the realms of brand, design and communication — the same design language you can see on the street, on the track and in the showroom.",
    figures: ["Design awards", "Push the limits", "Editorial form"],
  },
  {
    title: "Service",
    body: "A 3S model — Sales, Service and Spare Parts under one roof — so the dealer who sold you the scooter is equipped to service it.",
    figures: ["Sales", "Service", "Spare parts"],
  },
] as const;
