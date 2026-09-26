/**
 * YADEA Pakistan — model database.
 *
 * Every figure below is published on yadea.com.pk (product page, homepage
 * product table, or the PAVE / Bank Alfalah articles). Fields with no
 * published value are `null` and render as "Not published" — never guessed.
 *
 * `specSource` records which page the numbers come from, because YADEA
 * publishes different figures in different contexts (e.g. the PAVE
 * government-scheme page quotes pre-subsidy prices and older range figures).
 */

export type SpecGroup = "performance" | "battery" | "charging" | "comfort" | "technology" | "safety";

export type Spec = { label: string; value: string };

export type Model = {
  slug: string;
  name: string;
  /** Short classification shown on cards. */
  category: string;
  /** Editorial line, verbatim from the product page where one exists. */
  tagline: string;
  /** Intro paragraph from the product page. */
  intro: string;
  /** PKR, or null when yadea.com.pk publishes no price. */
  price: number | null;
  priceNote?: string;
  /** Top speed, km/h. */
  topSpeed: number | null;
  /** Published range. */
  range: { value: number; unit: string; note?: string } | null;
  battery: {
    /** null when yadea.com.pk publishes no battery chemistry for this model. */
    chemistry: string | null;
    capacity: string | null;
    chargingTime: string | null;
    warranty: string | null;
    notes: string[];
  };
  motor: {
    headline: string;
    peakPower: string | null;
    ratedPower: string | null;
    torque: string | null;
    acceleration: string | null;
    climbingAngle: string | null;
    /** Recorded when the source states conflicting figures for the same field. */
    notes?: string[];
  };
  /** The three numbers a buyer scans first. */
  headline: { range: string; battery: string; speed: string };
  features: { title: string; body: string }[];
  specs: Record<SpecGroup, Spec[]>;
  colors: string[] | null;
  dimensions: Spec[];
  /** Primary cut-out / render on a transparent or light field. */
  image: string;
  imageAlt: string;
  /** Bounded lifestyle photography. */
  lifestyle: { src: string; alt: string; caption?: string }[];
  sourceUrl: string;
  /** Extra detail photography for the model page. */
  detailImages: { src: string; alt: string; title: string; body: string }[];
  featured: boolean;
  /** PAVE government-scheme participation, where published. */
  pave?: { before: number; after: number; subsidy: number };
};

const ttfarNote = "TTFAR: integrated motor, energy-retrieving controller and battery system.";

export const models: Model[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "keeness",
    name: "Keeness",
    category: "Electric Motorcycle",
    tagline: "Youngster's first choice for a street e-motorcycle",
    intro:
      "The most powerful machine in the Pakistan line-up. An 11kW mid-mounted motor, 300Nm of torque, 100 km/h and 129 km of range, built on dual ternary LFP packs you can remove and charge separately.",
    price: 1400000,
    topSpeed: 100,
    range: { value: 129, unit: "km" },
    battery: {
      chemistry: "Ternary Lithium Iron Phosphate",
      capacity: "72V 32Ah ×2",
      chargingTime: "5–6 hr",
      warranty: "24 months / 20,000 km",
      notes: [
        "Dual pack, ultra-high energy density, removable for charging",
        "Intelligent BMS with 40+ protections",
        "IPX7 waterproof",
        "Charging window −15°C to 55°C",
      ],
    },
    motor: {
      headline: "11kW mid-drive high performance motor",
      peakPower: "11 kW",
      ratedPower: null,
      torque: "300 Nm",
      acceleration: "0–50 km/h in 3s",
      climbingAngle: "20°",
    },
    headline: { range: "129 km", battery: "72V 32Ah ×2", speed: "100 km/h" },
    features: [
      {
        title: "Comfortable ergonomics",
        body: "A golden-triangular position between rider and vehicle gives just-right support for arm and back extension — a refreshing, relaxing drive.",
      },
      {
        title: "17-inch street motorcycle tyres",
        body: "Stronger cushioning, endurance and puncture resistance with confident handling at high speed and through corners on tricky road conditions.",
      },
      {
        title: "Inverted fork and monoshock",
        body: "An inverted fork for stiffness and precision, paired with monoshock absorption — a suspension combination usually adopted on high-performance motorcycles.",
      },
      {
        title: "CBS braking",
        body: "Front and rear CBS braking shortens stopping distance and reduces the risk of head tilt and tail flick.",
      },
    ],
    specs: {
      performance: [
        { label: "Motor", value: "11kW mid-mounted" },
        { label: "Max torque", value: "300 Nm" },
        { label: "Max speed", value: "100 km/h" },
        { label: "0–50 km/h", value: "3s" },
        { label: "Climbing angle", value: "20°" },
        { label: "Range", value: "129 km" },
      ],
      battery: [
        { label: "Chemistry", value: "Ternary LFP" },
        { label: "Capacity", value: "72V 32Ah ×2" },
        { label: "Per charge", value: "129 km" },
        { label: "Battery warranty", value: "24 months / 20,000 km" },
        { label: "Waterproof rating", value: "IPX7" },
        { label: "BMS protection", value: "40+ safeguards" },
        { label: "Charging temperature", value: "−15°C to 55°C" },
      ],
      charging: [
        { label: "Charging time", value: "5–6 hr" },
        { label: "Charge point", value: "Standard home socket" },
        { label: "Pack", value: "Dual, removable" },
      ],
      comfort: [
        { label: "Ergonomics", value: "Golden-triangular rider position" },
        { label: "Tyres", value: "17\" tubeless" },
        { label: "Suspension", value: "Inverted fork + monoshock" },
      ],
      technology: [
        { label: "Platform", value: "TTFAR" },
        { label: "Unlocking", value: "Bluetooth keyless (EasyGO)" },
        { label: "Dashboard", value: "Digital instrument" },
        { label: "Connectivity", value: "Smart app" },
        { label: "Cruise control", value: "Yes" },
        { label: "USB", value: "Yes" },
      ],
      safety: [
        { label: "Braking", value: "CBS front and rear" },
        { label: "Battery sealing", value: "IPX7" },
        { label: "Battery management", value: "Intelligent BMS, 40+ protections" },
      ],
    },
    colors: null,
    dimensions: [
      { label: "Tyre size", value: "17\" tubeless" },
      { label: "Climbing capacity", value: "20°" },
    ],
    image: "/img/keeness-cut.png",
    imageAlt: "YADEA Keeness electric motorcycle, three-quarter studio render",
    lifestyle: [
      { src: "/img/life/keeness-1.jpg", alt: "YADEA Keeness electric motorcycle in an urban setting", caption: "Street presence" },
      { src: "/img/life/keeness-2.jpg", alt: "YADEA Keeness side profile", caption: "Mid-drive architecture" },
    ],
    sourceUrl: "https://yadea.com.pk/yadea-keeness/",
    detailImages: [
      { src: "/img/detail/keeness-ergo.jpg", alt: "Rider ergonomics on the Keeness", title: "Comfortable ergonomics", body: "Support tuned around a natural arm-and-back extension triangle." },
      { src: "/img/detail/keeness-tire.jpg", alt: "17-inch street motorcycle tyre", title: "17-inch street tyres", body: "Cushioning, endurance and puncture resistance at speed." },
      { src: "/img/detail/keeness-shock.jpg", alt: "Inverted front fork and monoshock", title: "Inverted fork + monoshock", body: "High-performance suspension balance of comfort and handling." },
      { src: "/img/detail/keeness-cbs.jpg", alt: "CBS braking system", title: "CBS braking", body: "Combined braking shortens the stop and steadies the bike." },
    ],
    featured: true,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "velax",
    name: "Velax",
    category: "Performance Electric Scooter",
    tagline: "Smart ride, relaxed trip",
    intro:
      "The Velax pairs 3,200W of peak power with an intelligent energy management controller that optimises power in real time across two riding modes — extending battery life by up to 20%.",
    price: 444000,
    topSpeed: 65,
    range: { value: 85, unit: "km", note: "ECO mode" },
    battery: {
      chemistry: "Lithium Iron Phosphate",
      capacity: "72V 30Ah",
      chargingTime: "6–7 hr",
      warranty: "4 years / 50,000 km",
      notes: ["Intelligent energy management controller", "Extends battery life by up to 20%", "Home charging — no queue for fuel"],
    },
    motor: {
      headline: "TTFAR 3,200W peak power motor",
      peakPower: "3,200 W",
      ratedPower: "2,000 W",
      torque: "172 Nm",
      acceleration: null,
      climbingAngle: "15°",
    },
    headline: { range: "85 km", battery: "72V 30Ah", speed: "65 km/h" },
    features: [
      {
        title: "Home charging",
        body: "No need to wait in line to refuel with gasoline. Charge it where it stands.",
      },
      {
        title: "Intelligent energy management",
        body: "Optimises power usage in real time with two riding modes, extending battery life by up to 20% for longer rides.",
      },
      {
        title: "ECO Drive",
        body: "Eco-friendly, energy-efficient riding tuned for range rather than outright pace.",
      },
    ],
    specs: {
      performance: [
        { label: "Peak power", value: "3,200 W" },
        { label: "Rated power", value: "2,000 W" },
        { label: "Max torque", value: "172 Nm" },
        { label: "Max speed", value: "65 km/h" },
        { label: "Climbing angle", value: "15°" },
        { label: "Range", value: "85 km (ECO mode)" },
      ],
      battery: [
        { label: "Chemistry", value: "LFP" },
        { label: "Capacity", value: "72V 30Ah" },
        { label: "Charging time", value: "6–7 hr" },
        { label: "Battery pack warranty", value: "4 years / 50,000 km" },
      ],
      charging: [
        { label: "Charge time", value: "6–7 hr" },
        { label: "Charge point", value: "Home charging" },
        { label: "Controller", value: "Intelligent energy management" },
      ],
      comfort: [{ label: "Tyres", value: "14\" tubeless" }],
      technology: [
        { label: "Platform", value: "TTFAR" },
        { label: "Riding modes", value: "2" },
        { label: "Unlocking", value: "Bluetooth keyless (EasyGO)" },
        { label: "Connectivity", value: "Smart app" },
      ],
      safety: [{ label: "Tyres", value: "14\" tubeless" }],
    },
    colors: ["Grey", "Blue", "Black"],
    dimensions: [{ label: "Tyre size", value: "14\" tubeless" }],
    image: "/img/render-velax.png",
    imageAlt: "YADEA Velax electric scooter, studio render",
    lifestyle: [
      { src: "/img/life/velax-1.jpg", alt: "YADEA Velax electric scooter on the road", caption: "Real power, seamless acceleration" },
      { src: "/img/life/velax-2.jpg", alt: "YADEA Velax in motion", caption: "Performance that adapts to every road" },
    ],
    sourceUrl: "https://yadea.com.pk/yadea-velax/",
    detailImages: [
      { src: "/img/detail/velax-charging.jpg", alt: "Velax charging at home", title: "Home charging", body: "No queue, no fuel stop — the socket is the station." },
      { src: "/img/detail/velax-controller.jpg", alt: "Velax energy management controller", title: "Energy management controller", body: "Real-time optimisation across two riding modes." },
    ],
    featured: true,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "t5l",
    name: "T5L",
    category: "Family Electric Scooter",
    tagline: "Family rides, miles of smiles",
    intro:
      "A 700mm extended seat, 340mm of footrest space and room for three, on a 2,700W peak motor that climbs hills and village roads. 26 litres of underseat storage for the things a family actually carries.",
    price: 305000,
    topSpeed: 51,
    range: { value: 100, unit: "km", note: "80–100 km" },
    battery: {
      chemistry: "Lithium Iron Phosphate",
      capacity: "72V 30Ah",
      chargingTime: "5.5 hr",
      warranty: "4 years / 50,000 km",
      notes: [
        "Long lifespan, extended warranty",
        "Energy-retrieving TTFAR controller recharges while you ride",
        "Monitoring dashboard for ride data",
      ],
    },
    motor: {
      headline: "TTFAR 2,700W peak power motor",
      peakPower: "2,700 W",
      ratedPower: "1,500 W",
      torque: "100 Nm",
      acceleration: null,
      climbingAngle: "16°",
    },
    headline: { range: "80–100 km", battery: "72V 30Ah", speed: "51 km/h" },
    features: [
      {
        title: "Commuting and trips",
        body: "700mm extended seat and 340mm footrest space — sofa-like room for three.",
      },
      {
        title: "Daily storage",
        body: "26L underseat storage, easy room for a helmet, an umbrella or the charger itself.",
      },
      {
        title: "TTFAR energy retrieving",
        body: "A real energy-saving controller that charges while you ride, giving you more range, with a monitoring dashboard so you know everything about your ride.",
      },
      {
        title: "Safe stop, high efficiency",
        body: "Paired with good-grip tubeless tyres — no slip on wet days, no slide on slopes, no drift on sudden stops.",
      },
    ],
    specs: {
      performance: [
        { label: "Peak power", value: "2,700 W" },
        { label: "Rated power", value: "1,500 W" },
        { label: "Max torque", value: "100 Nm" },
        { label: "Max speed", value: "51 km/h" },
        { label: "Climbing angle", value: "16°" },
        { label: "Range", value: "80–100 km" },
      ],
      battery: [
        { label: "Chemistry", value: "LFP" },
        { label: "Capacity", value: "72V 30Ah" },
        { label: "Charging time", value: "5.5 hr" },
        { label: "Battery pack warranty", value: "4 years / 50,000 km" },
      ],
      charging: [
        { label: "Charge time", value: "5.5 hr" },
        { label: "Energy retrieval", value: "TTFAR controller, charges while riding" },
        { label: "Dashboard", value: "Ride monitoring" },
      ],
      comfort: [
        { label: "Seat length", value: "700 mm extended" },
        { label: "Footrest space", value: "340 mm" },
        { label: "Seating", value: "Room for three" },
        { label: "Underseat storage", value: "26 L" },
        { label: "Tyres", value: "10\" tubeless" },
      ],
      technology: [
        { label: "Platform", value: "TTFAR" },
        { label: "Power delivery", value: "Adaptive power" },
        { label: "Unlocking", value: "Bluetooth keyless" },
        { label: "Connectivity", value: "Smart app" },
        { label: "Lighting", value: "Headlight" },
        { label: "USB", value: "Yes" },
      ],
      safety: [
        { label: "Braking", value: "Full disc" },
        { label: "Tyres", value: "10\" tubeless, wet grip" },
      ],
    },
    colors: null,
    dimensions: [
      { label: "Seat length", value: "700 mm" },
      { label: "Footrest space", value: "340 mm" },
      { label: "Underseat storage", value: "26 L" },
    ],
    image: "/img/t5l-cut.png",
    imageAlt: "YADEA T5L family electric scooter, studio cut-out",
    lifestyle: [
      { src: "/img/life/t5l-1.jpg", alt: "YADEA T5L family electric scooter", caption: "Room for three, every day" },
    ],
    sourceUrl: "https://yadea.com.pk/yadea-t5l/",
    detailImages: [
      { src: "/img/detail/t5l-commute.jpg", alt: "T5L extended seat and footroom", title: "Commuting and trips", body: "700mm seat, 340mm footrest, room for three." },
      { src: "/img/detail/t5l-storage.jpg", alt: "T5L underseat storage", title: "26L daily storage", body: "Helmet, umbrella, charger — all of it fits." },
      { src: "/img/detail/t5l-ttfar.jpg", alt: "TTFAR energy retrieving system", title: "Energy retrieving", body: "The controller charges the pack while you ride." },
      { src: "/img/detail/t5l-brake.jpg", alt: "T5L full disc brake", title: "Full disc brake", body: "Predictable stopping on wet days and slopes." },
    ],
    featured: true,
    pave: { before: 285000, after: 235000, subsidy: 50000 },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "m3h",
    name: "M3H",
    category: "Electric Scooter",
    tagline: "Smooth riding, limitless joy",
    intro:
      "The lightest, most elegant platform in the range. Hydraulic suspension front and rear, 10-inch high-grip tyres, and a removable LFP pack — built for riders who want a light, comfortable, easy city bike.",
    price: 255000,
    topSpeed: 45,
    range: { value: 110, unit: "km", note: "Eco mode — 70 km in Sports mode" },
    battery: {
      chemistry: "Lithium Iron Phosphate (removable)",
      capacity: "60V 30Ah",
      chargingTime: "5 hr",
      warranty: "4 years / 50,000 km",
      notes: [
        "Removable pack with high energy density",
        "Stable discharge and recharge over the pack's life",
      ],
    },
    motor: {
      headline: "TTFAR 2,200W peak power motor",
      peakPower: "2,200 W",
      ratedPower: "1,200 W",
      torque: "117 Nm",
      acceleration: null,
      climbingAngle: "13°",
    },
    headline: { range: "110 km", battery: "60V 30Ah", speed: "45 km/h" },
    features: [
      {
        title: "Elegance in motion",
        body: "Elegant, stylish design with smooth flowing lines — a light and comfortable ride.",
      },
      {
        title: "Sleek engineering",
        body: "Every detail considered to ensure a pleasant, effortless travel experience.",
      },
      {
        title: "10-inch high-grip tyres",
        body: "Effective slip resistance and puncture prevention.",
      },
      {
        title: "Hydraulic suspension",
        body: "Front and rear hydraulic suspension accurately filters out the impacts of road irregularities.",
      },
    ],
    specs: {
      performance: [
        { label: "Peak power", value: "2,200 W" },
        { label: "Rated power", value: "1,200 W" },
        { label: "Max torque", value: "117 Nm" },
        { label: "Max speed", value: "45 km/h" },
        { label: "Climbing angle", value: "13°" },
        { label: "Range", value: "110 km Eco / 70 km Sports" },
      ],
      battery: [
        { label: "Chemistry", value: "LFP, removable" },
        { label: "Capacity", value: "60V 30Ah" },
        { label: "Charging time", value: "5 hr" },
        { label: "Battery pack warranty", value: "4 years / 50,000 km" },
      ],
      charging: [{ label: "Charge time", value: "5 hr" }],
      comfort: [
        { label: "Suspension", value: "Hydraulic front and rear" },
        { label: "Tyres", value: "10\" high grip" },
        { label: "Weight character", value: "Light, easy to ride" },
      ],
      technology: [
        { label: "Platform", value: "TTFAR" },
        { label: "Unlocking", value: "Bluetooth keyless" },
        { label: "Connectivity", value: "Smart app" },
        { label: "Controller", value: "Energy retrieving" },
      ],
      safety: [
        { label: "Suspension", value: "Hydraulic front and rear" },
        { label: "Tyres", value: "10\" high grip, puncture resistant" },
      ],
    },
    colors: null,
    dimensions: [],
    image: "/img/render-m3h.png",
    imageAlt: "YADEA M3H electric scooter, studio render",
    lifestyle: [
      { src: "/img/life/m3h-1.jpg", alt: "YADEA M3H electric scooter in use", caption: "Climbs easily, even carrying two" },
      { src: "/img/life/m3h-2.jpg", alt: "YADEA M3H side profile", caption: "Elegance in motion" },
    ],
    sourceUrl: "https://yadea.com.pk/yadea-m3h/",
    detailImages: [
      { src: "/img/detail/m3h-design.jpg", alt: "M3H flowing body lines", title: "Elegance in motion", body: "Smooth, flowing lines shaped for a light ride." },
      { src: "/img/detail/m3h-tire.jpg", alt: "M3H 10-inch high grip tyre", title: "10-inch high grip", body: "Slip resistance and puncture prevention." },
      { src: "/img/detail/m3h-suspension.jpg", alt: "M3H hydraulic suspension", title: "Hydraulic suspension", body: "Front and rear, filtering road irregularity." },
    ],
    featured: true,
    pave: { before: 250000, after: 200000, subsidy: 50000 },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ruibin-s",
    name: "Ruibin S",
    category: "Electric Scooter",
    tagline: "Electrify your life",
    intro:
      "The most safety-equipped commuter in the range: reverse gear, traction control, hill descent control and full app connectivity — on a graphene pack rated 80 km.",
    price: 193000,
    topSpeed: 50,
    range: { value: 80, unit: "km" },
    battery: {
      chemistry: "Graphene",
      capacity: "72V 25Ah",
      chargingTime: "6–7 hr",
      warranty: "24 months / 20,000 km",
      notes: [
        "Advanced graphene chemistry for dependable performance and lasting reliability",
      ],
    },
    motor: {
      headline: "TTFAR 2,000W peak power motor",
      peakPower: "2,000 W",
      ratedPower: "1,000 W",
      torque: "80 Nm",
      acceleration: null,
      climbingAngle: "9°",
    },
    headline: { range: "80 km", battery: "72V 25Ah", speed: "50 km/h" },
    features: [
      {
        title: "Reverse gear",
        body: "Reverse out of tight parking spaces with a simple one-button reverse function.",
      },
      {
        title: "Traction control (TCS)",
        body: "TCS prevents slipping in the rain; powerful front and rear disc brakes keep steering and braking stable.",
      },
      {
        title: "Hill descent control (HDC)",
        body: "Driver assistance maintains steady speed on slopes for safer downhill riding.",
      },
      {
        title: "Smart app connectivity",
        body: "A large instrument panel connects over Bluetooth for proximity unlocking and arrival time, with family account sharing, electronic seat lock and sound control.",
      },
    ],
    specs: {
      performance: [
        { label: "Peak power", value: "2,000 W" },
        { label: "Rated power", value: "1,000 W" },
        { label: "Max torque", value: "80 Nm" },
        { label: "Max speed", value: "50 km/h" },
        { label: "Climbing angle", value: "9°" },
        { label: "Range", value: "80 km" },
      ],
      battery: [
        { label: "Chemistry", value: "Graphene" },
        { label: "Capacity", value: "72V 25Ah" },
        { label: "Charging time", value: "6–7 hr" },
        { label: "Battery pack warranty", value: "24 months / 20,000 km" },
      ],
      charging: [{ label: "Charge time", value: "6–7 hr" }],
      comfort: [
        { label: "Tyres", value: "10\" tubeless" },
        { label: "Accessories", value: "Back rest / guard bar available" },
      ],
      technology: [
        { label: "Platform", value: "TTFAR" },
        { label: "Unlocking", value: "Bluetooth proximity" },
        { label: "Connectivity", value: "Smart app, family accounts" },
        { label: "Extras", value: "Electronic seat lock, sound control" },
      ],
      safety: [
        { label: "Braking", value: "Front and rear disc" },
        { label: "Traction control", value: "TCS" },
        { label: "Hill descent control", value: "HDC" },
        { label: "Reverse gear", value: "One-button" },
      ],
    },
    colors: null,
    dimensions: [],
    image: "/img/render-ruibin-s.png",
    imageAlt: "YADEA Ruibin S electric scooter, studio render",
    lifestyle: [
      { src: "/img/life/ruibins-1.jpg", alt: "YADEA Ruibin S on the road", caption: "Engineered for safety, designed for convenience" },
      { src: "/img/life/ruibins-2.jpg", alt: "YADEA Ruibin S side profile", caption: "72V 25Ah graphene" },
      { src: "/img/life/ruibins-3.jpg", alt: "YADEA Ruibin S controls", caption: "One-button reverse" },
      { src: "/img/life/ruibins-4.jpg", alt: "YADEA Ruibin S in traffic", caption: "Traction control in the rain" },
    ],
    sourceUrl: "https://yadea.com.pk/yadea-ruibin-s/",
    detailImages: [
      { src: "/img/detail/rs-reverse.jpg", alt: "Ruibin S reverse gear", title: "Reverse gear", body: "Back out of tight spaces at the press of a button." },
      { src: "/img/detail/rs-tcs.jpg", alt: "Ruibin S traction control", title: "Traction control", body: "Stability in the rain, with front and rear discs." },
      { src: "/img/detail/rs-hdc.jpg", alt: "Ruibin S hill descent control", title: "Hill descent control", body: "Steady speed on the way down." },
      { src: "/img/detail/rs-app.jpg", alt: "Ruibin S smart app", title: "Smart app", body: "Proximity unlock, arrival time, family accounts." },
    ],
    featured: true,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "epoc-h",
    name: "EPOC-H",
    category: "Flagship Electric Scooter",
    tagline: "Redefine the trendy look",
    intro:
      "A luxury e-scooter designed for city commuting, upgraded in power, handling and quality through YADEA's product iteration. 125 km of range at 70 km/h, with a high-resolution LED screen that dims itself to match your surroundings.",
    price: 355000,
    topSpeed: 70,
    range: { value: 125, unit: "km" },
    battery: {
      chemistry: "Graphene",
      capacity: "72V 38Ah",
      chargingTime: "7–8 hr",
      warranty: null,
      notes: [
        "Enhanced battery system for longer travel distances",
        "Intelligent dashboard auto-adjusts brightness",
      ],
    },
    motor: {
      headline: "Yadea motor, 2,000W rated / 3,200W peak",
      peakPower: "3,200 W",
      ratedPower: "2,000 W",
      torque: "150 N·m",
      acceleration: null,
      climbingAngle: "16°",
    },
    headline: { range: "125 km", battery: "72V 38Ah", speed: "70 km/h" },
    features: [
      {
        title: "High-resolution LED screen",
        body: "Real-time visibility into remaining battery power, with a dashboard that automatically adjusts brightness to your surroundings.",
      },
      {
        title: "Cruise control",
        body: "Effortless speed management for a smooth ride.",
      },
      {
        title: "App control",
        body: "Lock, unlock, start and stop over Bluetooth.",
      },
      {
        title: "Side stand sensor",
        body: "Enhanced safety with automatic alerts.",
      },
    ],
    specs: {
      performance: [
        { label: "Rated power", value: "2,000 W" },
        { label: "Peak power", value: "3,200 W" },
        { label: "Max speed", value: "70 km/h" },
        { label: "Torque", value: "150 N·m" },
        { label: "Climbing capacity", value: "16°" },
        { label: "Range", value: "125 km per charge" },
        { label: "Max load", value: "150 kg" },
      ],
      battery: [
        { label: "Chemistry", value: "Graphene" },
        { label: "Capacity", value: "72V 38Ah" },
        { label: "Charge time", value: "7–8 hr" },
        { label: "Battery warranty", value: "Not published" },
      ],
      charging: [{ label: "Charge time", value: "7–8 hours" }],
      comfort: [
        { label: "Seat height", value: "Up to 630 mm" },
        { label: "Pedal space", value: "380 mm" },
        { label: "Cushioned seats", value: "Yes" },
      ],
      technology: [
        { label: "Platform", value: "TTFAR" },
        { label: "Display", value: "High-resolution LED, auto-brightness" },
        { label: "Connectivity", value: "Bluetooth app control" },
        { label: "Cruise control", value: "Yes" },
      ],
      safety: [
        { label: "Side stand sensor", value: "Automatic alerts" },
        { label: "Lighting", value: "High-resolution LED" },
      ],
    },
    colors: ["Sky Gray", "Black", "Solow Gray"],
    dimensions: [
      { label: "L × W × H", value: "1860 × 775 × 1180–1300 mm" },
      { label: "Ground clearance", value: "120 mm" },
      { label: "Span length", value: "340 mm" },
      { label: "Max load", value: "150 kg" },
    ],
    image: "/img/epoc-h.png",
    imageAlt: "YADEA EPOC-H electric scooter, studio cut-out",
    lifestyle: [
      { src: "/img/life/epoc-1.jpg", alt: "YADEA EPOC-H city riding", caption: "Explore the cityscape without worrying about recharging" },
      { src: "/img/life/epoc-2.jpg", alt: "YADEA EPOC-H on the road", caption: "The perfect blend of range and speed" },
      { src: "/img/life/epoc-3.jpg", alt: "YADEA EPOC-H detail", caption: "Built with precision and elegance" },
    ],
    sourceUrl: "https://yadea.com.pk/yadea-epoc-h/",
    detailImages: [
      { src: "/img/detail/epoc-standing.png", alt: "EPOC-H standing profile", title: "Redefine the trendy look", body: "Sleek aesthetics with cutting-edge technology." },
      { src: "/img/detail/epoc-p56.png", alt: "EPOC-H cockpit and seat", title: "Comfortable, reliable, convenient", body: "630mm seat, 380mm pedal space, side stand sensor." },
    ],
    featured: true,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "gt30",
    name: "GT30",
    category: "Electric Scooter",
    tagline: "Fusion of performance, style and sustainability",
    intro:
      "A 60V 23Ah graphene pack delivering three times the longevity, driven by the 1,000W GTR 5.0 high-efficiency motor. The intelligent dashboard keeps you informed about battery life at every point of the journey.",
    price: 194000,
    topSpeed: 45,
    range: { value: 75, unit: "km", note: "70–75 km" },
    battery: {
      chemistry: "Graphene",
      capacity: "60V 23Ah",
      chargingTime: "6–8 hr",
      warranty: null,
      notes: ["Published as delivering three times the longevity of a conventional pack"],
    },
    motor: {
      headline: "GTR 5.0 high efficiency motor",
      peakPower: null,
      ratedPower: "1,000 W",
      torque: "40 N·m",
      acceleration: null,
      climbingAngle: "14°",
    },
    headline: { range: "70–75 km", battery: "60V 23Ah", speed: "45 km/h" },
    features: [
      {
        title: "High-resolution LED",
        body: "The expansive LED screen shows remaining battery power in real time, with a dashboard that adjusts brightness to your surroundings.",
      },
      {
        title: "Confident braking",
        body: "An efficient braking system with tubeless tyres and alloy rims for a secure ride every time.",
      },
    ],
    specs: {
      performance: [
        { label: "Rated power", value: "1,000 W" },
        { label: "Max speed", value: "45 km/h" },
        { label: "Torque", value: "40 N·m" },
        { label: "Climbing capacity", value: "14°" },
        { label: "Range", value: "75 km per charge" },
        { label: "Max load", value: "150 kg" },
      ],
      battery: [
        { label: "Chemistry", value: "Graphene" },
        { label: "Capacity", value: "60V 23Ah" },
        { label: "Charge time", value: "6–8 hours" },
        { label: "Battery warranty", value: "Not published" },
      ],
      charging: [{ label: "Charge time", value: "6–8 hours" }],
      comfort: [
        { label: "Seating", value: "Cushioned seats" },
        { label: "Rims", value: "Alloy" },
      ],
      technology: [
        { label: "Platform", value: "TTFAR" },
        { label: "Display", value: "High-resolution LED, auto-brightness" },
      ],
      safety: [{ label: "Braking", value: "Efficient braking system" }],
    },
    colors: ["Black", "Emerald Green"],
    dimensions: [
      { label: "L × W × H", value: "1175 × 675 × 1130–1250 mm" },
      { label: "Ground clearance", value: "101.6 mm" },
      { label: "Span length", value: "330 mm" },
      { label: "Max load", value: "150 kg" },
    ],
    image: "/img/gt30.png",
    imageAlt: "YADEA GT30 electric scooter, studio cut-out",
    lifestyle: [],
    sourceUrl: "https://yadea.com.pk/yadea-gt30/",
    detailImages: [
      { src: "/img/detail/gt30-dash.png", alt: "GT30 intelligent dashboard", title: "Informed at every point", body: "Battery life and journey data on a wide LED panel." },
      { src: "/img/detail/gt30-cut.png", alt: "YADEA GT30 full profile", title: "GT30", body: "Performance, style and sustainability." },
    ],
    featured: false,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "t5",
    name: "T5",
    category: "Electric Scooter",
    tagline: "One of the most popular daily commuters",
    intro:
      "A 75–85 km commuter with ECO and Sports riding modes and regenerative braking — referenced in YADEA's PAVE scheme coverage and carried on the Bank Alfalah installment plan.",
    price: 253500,
    topSpeed: null,
    range: { value: 85, unit: "km", note: "75–85 km" },
    battery: { chemistry: null, capacity: null, chargingTime: null, warranty: null, notes: [] },
    motor: {
      headline: "Not published",
      peakPower: null,
      ratedPower: null,
      torque: null,
      acceleration: null,
      climbingAngle: null,
    },
    headline: { range: "75–85 km", battery: "Not published", speed: "Not published" },
    features: [
      { title: "ECO and Sports modes", body: "Two riding modes so you choose between economy and performance." },
      { title: "Regenerative braking", body: "Recovering energy under braking extends your range between charges." },
    ],
    specs: {
      performance: [
        { label: "Range", value: "75–85 km" },
        { label: "Max speed", value: "Not published" },
        { label: "Motor", value: "Not published" },
      ],
      battery: [
        { label: "Chemistry", value: "Not published" },
        { label: "Charge time", value: "Not published" },
      ],
      charging: [{ label: "Charge time", value: "Not published" }],
      comfort: [],
      technology: [
        { label: "Riding modes", value: "ECO, Sports" },
        { label: "Braking", value: "Regenerative" },
      ],
      safety: [],
    },
    colors: null,
    dimensions: [],
    image: "/img/t5.png",
    imageAlt: "YADEA T5 electric scooter, studio cut-out",
    lifestyle: [],
    sourceUrl: "https://yadea.com.pk/yadea-t5-electric-scooter-e-bike/",
    detailImages: [],
    featured: false,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ruibin",
    name: "Ruibin",
    category: "Electric Scooter",
    tagline: "A settled ride for daily commuters",
    intro:
      "Front disc brakes and 10-inch tyres keep handling stable in city conditions, on a 90 km range with an 800W motor.",
    price: 209000,
    topSpeed: null,
    range: { value: 90, unit: "km" },
    battery: { chemistry: null, capacity: null, chargingTime: null, warranty: null, notes: [] },
    motor: {
      headline: "800W motor",
      peakPower: null,
      ratedPower: "800 W",
      torque: null,
      acceleration: null,
      climbingAngle: null,
    },
    headline: { range: "90 km", battery: "Not published", speed: "Not published" },
    features: [
      { title: "Stable city handling", body: "Front disc brakes and 10-inch tyres keep handling stable in city conditions." },
    ],
    specs: {
      performance: [
        { label: "Range", value: "90 km" },
        { label: "Rated power", value: "800 W" },
        { label: "Max speed", value: "Not published" },
      ],
      battery: [
        { label: "Chemistry", value: "Not published" },
        { label: "Charge time", value: "Not published" },
      ],
      charging: [],
      comfort: [{ label: "Tyres", value: "10-inch" }],
      technology: [],
      safety: [{ label: "Braking", value: "Front disc" }],
    },
    colors: null,
    dimensions: [],
    image: "/img/ruibin.png",
    imageAlt: "YADEA Ruibin electric scooter, studio cut-out",
    lifestyle: [],
    sourceUrl: "https://yadea.com.pk/yadea-ruibin/",
    detailImages: [],
    featured: false,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "m3",
    name: "M3",
    category: "Electric Scooter",
    tagline: "The accessible entry point",
    intro:
      "YADEA's most accessible model and a natural starting point for first-time electric riders. Up to 80 km on a single charge, IP67 water resistance, and an overnight charge from a standard home socket.",
    price: 174000,
    topSpeed: null,
    range: { value: 80, unit: "km" },
    battery: { chemistry: "Graphene", capacity: null, chargingTime: null, warranty: null, notes: ["IP67 water-resistant rating"] },
    motor: {
      headline: "600W motor",
      peakPower: null,
      ratedPower: "600 W",
      torque: null,
      acceleration: null,
      climbingAngle: null,
    },
    headline: { range: "80 km", battery: "Not published", speed: "Not published" },
    features: [
      { title: "Built for the monsoon", body: "An IP67 water-resistant rating means rain or mud cannot affect the electrical system." },
      { title: "Overnight charging", body: "Charges from a standard home socket overnight." },
    ],
    specs: {
      performance: [
        { label: "Range", value: "Up to 80 km" },
        { label: "Rated power", value: "600 W" },
        { label: "Max speed", value: "Not published" },
      ],
      battery: [
        { label: "Chemistry", value: "Graphene" },
        { label: "Water resistance", value: "IP67" },
      ],
      charging: [{ label: "Charge point", value: "Standard home socket" }],
      comfort: [],
      technology: [],
      safety: [{ label: "Water resistance", value: "IP67" }],
    },
    colors: null,
    dimensions: [],
    image: "/img/m3.png",
    imageAlt: "YADEA M3 electric scooter, studio cut-out",
    lifestyle: [],
    sourceUrl: "https://yadea.com.pk/yadea-m3/",
    detailImages: [],
    featured: false,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "gt70-cyber",
    name: "GT70 Cyber",
    category: "Electric Scooter",
    tagline: "Cyber",
    intro:
      "A 2026 addition to the Pakistan line-up. YADEA has published a complete review with specifications and price; a dedicated product page is not yet published, so figures beyond price are shown as not published here.",
    price: 479000,
    topSpeed: null,
    range: null,
    battery: { chemistry: null, capacity: null, chargingTime: null, warranty: null, notes: [] },
    motor: { headline: "Not published", peakPower: null, ratedPower: null, torque: null, acceleration: null, climbingAngle: null },
    headline: { range: "Not published", battery: "Not published", speed: "Not published" },
    features: [
      {
        title: "Full review published",
        body: "YADEA has published a complete review of the GT70 Cyber covering specifications and price.",
        },
    ],
    specs: {
      performance: [{ label: "Full specifications", value: "See the published review" }],
      battery: [],
      charging: [],
      comfort: [],
      technology: [],
      safety: [],
    },
    colors: null,
    dimensions: [],
    image: "/img/gt70.png",
    imageAlt: "YADEA GT70 Cyber electric scooter",
    lifestyle: [],
    sourceUrl: "https://yadea.com.pk/yadea-gt70-cyber/",
    detailImages: [],
    featured: false,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ruibin-l",
    name: "Ruibin L",
    category: "Electric Scooter",
    tagline: "Ruibin L",
    intro:
      "YADEA publishes a Ruibin L product page, but that page contradicts itself. The marketing copy describes a 72V 30Ah LFP pack with up to 110 km of range and a 1000W motor; the specification table directly beneath it lists a 72V 26Ah graphene pack, 80–90 km and 800W — figures that match the standard Ruibin. No price is published anywhere for this model. Because the two halves of the source disagree, no single figure is asserted here and the conflict is recorded instead.",
    price: null,
    topSpeed: null,
    range: null,
    battery: {
      chemistry: null,
      capacity: null,
      chargingTime: null,
      warranty: null,
      notes: [
        "Marketing copy: 72V 30Ah LFP, up to 110 km per charge, 5-hour charge time.",
        "Specification table on the same page: 72V 26Ah graphene, GTR 5.0, 80–90 km, 5–6 hour charge time.",
        "The two sections do not agree, so no single battery figure is published here.",
      ],
    },
    motor: {
      headline: "Conflicting figures on the source page",
      peakPower: null,
      ratedPower: null,
      torque: null,
      acceleration: null,
      climbingAngle: null,
      notes: [
        "Marketing copy: 1000W high-performance motor, top speed 45–50 km/h.",
        "Specification table: 800W rated, max speed 45 km/h, 80N.m, 9° climbing capacity.",
        "The table's figures match the standard Ruibin rather than the Ruibin L.",
      ],
    },
    headline: { range: "Conflicting", battery: "Conflicting", speed: "Conflicting" },
    features: [
      { title: "TCS & HDC driver assistance", body: "Traction control and hill-descent control, as listed on the product page." },
      { title: "Smart dashboard and app", body: "High-resolution LED display with auto-brightness, plus app connectivity reporting battery health." },
      { title: "Tubeless tyres, alloy rims", body: "An efficient braking system with tubeless tyres on alloy rims." },
    ],
    specs: { performance: [], battery: [], charging: [], comfort: [], technology: [], safety: [] },
    colors: null,
    dimensions: [],
    image: "/img/ruibin-l.png",
    imageAlt: "YADEA Ruibin L electric scooter",
    lifestyle: [],
    sourceUrl: "https://yadea.com.pk/yadea-ruibin-l/",
    detailImages: [],
    featured: false,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "g5",
    name: "G5",
    category: "Electric Scooter",
    tagline: "G5",
    intro:
      "Shown in the YADEA Pakistan line-up and available to test ride. No price or specification sheet is published on yadea.com.pk, so nothing is stated here beyond its availability.",
    price: null,
    topSpeed: null,
    range: null,
    battery: { chemistry: null, capacity: null, chargingTime: null, warranty: null, notes: [] },
    motor: { headline: "Not published", peakPower: null, ratedPower: null, torque: null, acceleration: null, climbingAngle: null },
    headline: { range: "Not published", battery: "Not published", speed: "Not published" },
    features: [
      { title: "Available to test ride", body: "The G5 can be booked for a test ride through YADEA Pakistan." },
    ],
    specs: { performance: [], battery: [], charging: [], comfort: [], technology: [], safety: [] },
    colors: null,
    dimensions: [],
    image: "/img/g5.png",
    imageAlt: "YADEA G5 electric scooter, studio cut-out",
    lifestyle: [],
    sourceUrl: "https://yadea.com.pk/yadea-g5/",
    detailImages: [],
    featured: false,
  },
];

/* ------------------------------------------------------------- helpers */

export const featuredModels = models.filter((m) => m.featured);

export function getModel(slug: string): Model | undefined {
  return models.find((m) => m.slug === slug);
}

/** Price sorted ascending, models without a published price last. */
export const modelsByPrice = [...models].sort((a, b) => {
  if (a.price === null) return 1;
  if (b.price === null) return -1;
  return a.price - b.price;
});

export const priceBounds = {
  min: Math.min(...models.map((m) => m.price ?? Infinity)),
  max: Math.max(...models.map((m) => m.price ?? 0)),
};

export function formatPKR(value: number): string {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(value);
}

export const allCategories = Array.from(new Set(models.map((m) => m.category))).sort();

/** Every published charging time, for the charging comparison. */
export const chargeTimes = models
  .filter((m) => m.battery.chargingTime)
  .map((m) => ({ name: m.name, slug: m.slug, time: m.battery.chargingTime as string, battery: m.battery.capacity ?? "—" }));

export const notPublished = "Not published";
export { ttfarNote };
