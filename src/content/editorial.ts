/**
 * YADEA Pakistan — editorial feed. Titles, dates and excerpts are taken
 * from the published News & Events listing on yadea.com.pk.
 */

export type Story = {
  slug: string;
  title: string;
  date: string;
  iso: string;
  category: "Review" | "Guide" | "Buying" | "Policy" | "Ownership" | "News";
  excerpt: string;
  image: string;
  /** Canonical article on the brand's own site — verified to resolve. */
  url: string;
  featured?: boolean;
};

export const stories: Story[] = [
  {
    slug: "gt70-cyber-review",
    title: "YADEA GT70 Cyber — complete review, specifications & price",
    iso: "2026-09-15",
    date: "15 Sep 2026",
    category: "Review",
    excerpt:
      "With fuel prices constantly on the rise in Pakistan, more and more riders are turning toward electric bikes. We take the GT70 Cyber through its specifications, performance and price.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/09/GT70-%E5%B7%A6180-%E7%B9%81%E6%98%9F%E9%BB%92-1-1-700x700.png",
    url: "https://yadea.com.pk/yadea-gt70-cyber-complete-review-specifications-price/",
    featured: true,
  },
  {
    slug: "two-people-comfortably",
    title: "Can two people ride a YADEA comfortably?",
    iso: "2026-08-03",
    date: "3 Aug 2026",
    category: "Guide",
    excerpt:
      "Load capacity and safety guide. One thing is true: a bike that can hold only one person is not the right one. Here is how the range handles a passenger.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/08/Can-Two-People-Ride-a-Yadea-Comfortably-700x700.jpg",
    url: "https://yadea.com.pk/can-two-people-ride-a-yadea-comfortably-load-capacity-safety-guide/",
  },
  {
    slug: "charging-time-explained",
    title: "How fast does a YADEA charge? Normal vs fast charging",
    iso: "2026-08-03",
    date: "3 Aug 2026",
    category: "Guide",
    excerpt:
      "Many Pakistanis wonder about the difference in charging time between a normal charger and a fast charger. We break down the published charge times across the range.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/08/How-Fast-Does-a-Yadea-Charge_-Normal-vs-Fast-Charging-Time-Explained-700x700.jpg",
    url: "https://yadea.com.pk/how-fast-does-a-yadea-charge-normal-vs-fast-charging-time-explained/",
  },
  {
    slug: "service-centres-pakistan",
    title: "YADEA service centres in Pakistan: full list, spare parts & maintenance",
    iso: "2026-08-03",
    date: "3 Aug 2026",
    category: "Ownership",
    excerpt:
      "YADEA's authorised service network operates on a 3S model — sales, service and spare parts under one roof. Every confirmed 3S store, organised by region.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/08/Yadea-Service-Centers-in-Pakistan-700x700.jpg",
    url: "https://yadea.com.pk/yadea-service-centers-pakistan/",
  },
  {
    slug: "charging-without-ups",
    title: "Charging at home without a UPS — a practical guide for load-shedding areas",
    iso: "2026-08-03",
    date: "3 Aug 2026",
    category: "Ownership",
    excerpt:
      "YADEA scooters charge from a standard home socket in 5–8 hours. How to plan an overnight charge around a typical Pakistani supply schedule.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/08/Electric-Scooter-Charging-at-Home-Without-a-UPS-700x700.jpg",
    url: "https://yadea.com.pk/electric-scooter-charging-without-ups-pakistan/",
  },
  {
    slug: "switched-from-125cc",
    title: "I switched from a 125cc to a YADEA. Here's what nobody told me",
    iso: "2026-07-08",
    date: "8 Jul 2026",
    category: "Ownership",
    excerpt:
      "The honest version of the switch — what actually changes day to day once the fuel bill disappears from your life.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/07/4-700x700.jpg",
    url: "https://yadea.com.pk/i-switched-from-a-125cc-to-a-yadea-heres-what-nobody-told-me/",
  },
  {
    slug: "dealers-in-lahore",
    title: "YADEA electric scooter dealers in Lahore: locations, prices & test rides",
    iso: "2026-07-08",
    date: "8 Jul 2026",
    category: "Buying",
    excerpt:
      "Every authorised YADEA store in Lahore, with addresses, phone numbers and what to ask when you walk in.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/07/3-700x700.jpg",
    url: "https://yadea.com.pk/yadea-electric-scooter-dealers-in-lahore-locations-prices-test-rides/",
  },
  {
    slug: "total-cost-after-one-year",
    title: "Electric scooter vs petrol bike: total cost after 1 year in Pakistan",
    iso: "2026-07-08",
    date: "8 Jul 2026",
    category: "Buying",
    excerpt:
      "The one-year cost comparison, including fuel, servicing and the parts a petrol bike needs that an electric one simply does not have.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/07/2-700x700.jpg",
    url: "https://yadea.com.pk/electric-scooter-vs-petrol-bike-total-cost-after-1-year-in-pakistan/",
  },
  {
    slug: "true-10-year-cost",
    title: "The true 10-year cost of owning a 125cc bike",
    iso: "2026-07-08",
    date: "8 Jul 2026",
    category: "Buying",
    excerpt:
      "Enough, in fact, to buy a used Corolla. A long-horizon look at what a decade of petrol ownership actually costs.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/07/1-700x700.jpg",
    url: "https://yadea.com.pk/the-true-10-year-cost-of-owning-a-125cc-bike-enough-to-buy-a-used-corolla/",
  },
  {
    slug: "choosing-the-right-yadea",
    title: "A beginner's guide to choosing the right YADEA electric scooter",
    iso: "2026-06-29",
    date: "29 Jun 2026",
    category: "Buying",
    excerpt:
      "How to pick between the M3H, the T5L and the Velax — range, battery chemistry, warranty length and the commute you actually make.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/06/A-Beginners-Guide-to-Choosing-the-Right-Yadea-Electric-Scooter-in-Pakistan-700x700.jpg",
    url: "https://yadea.com.pk/a-beginners-guide-to-choosing-the-right-yadea-electric-scooter-in-pakistan/",
  },
  {
    slug: "petrol-prices-rising",
    title: "Petrol prices are rising in Pakistan — here's why EV is the smarter choice",
    iso: "2026-06-29",
    date: "29 Jun 2026",
    category: "Policy",
    excerpt:
      "The economics of a fuel bill you cannot forecast, against a charging cost you can.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/06/Petrol-Prices-Are-Rising-in-Pakistan-Here-Is-Why-EV-Is-the-Smarter-Choice-700x700.jpg",
    url: "https://yadea.com.pk/petrol-prices-are-rising-in-pakistan-here-is-why-ev-is-the-smarter-choice/",
  },
  {
    slug: "lithium-battery-life",
    title: "Lithium battery life explained: low cost, long range & 4-year coverage",
    iso: "2026-06-29",
    date: "29 Jun 2026",
    category: "Ownership",
    excerpt:
      "What a lithium pack actually delivers over its life, and what the four-year, 50,000 km warranty covers.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/06/Yadea-Lithium-Battery-Life-Explained-Low-Cost-Long-Range-4-Year-Coverage-700x700.jpg",
    url: "https://yadea.com.pk/yadea-lithium-battery-life-explained-low-cost-long-range-4-year-coverage/",
  },
  {
    slug: "price-list-2026",
    title: "Electric scooter price in Pakistan 2026: complete model guide",
    iso: "2026-05-07",
    date: "7 May 2026",
    category: "Buying",
    excerpt:
      "Every YADEA model available in Pakistan with its published price, range and battery — the complete picture on one page.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/05/Electric-Scooter-Price-in-Pakistan-2026-Yadea-Complete-Model-Guide-700x700.jpeg",
    url: "https://yadea.com.pk/electric-scooter-price-in-pakistan-2026-yadea-complete-model-guide/",
  },
  {
    slug: "bank-alfalah-sbs",
    title: "Buy a YADEA on 0% markup installment: Bank Alfalah SBS plan",
    iso: "2026-05-07",
    date: "7 May 2026",
    category: "Buying",
    excerpt:
      "Spread the cost over 3 to 36 months with 0% markup on the shorter tenures. Full monthly payment table, eligibility and how to apply.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/05/Buy-Yadea-Electric-Scooter-on-0-Markup-Installment-700x700.jpeg",
    url: "https://yadea.com.pk/buy-yadea-electric-scooter-on-0-markup-installment-bank-alfalah-sbs-plan-2026/",
  },
  {
    slug: "less-maintenance",
    title: "Why electric scooters require less maintenance than petrol bikes",
    iso: "2026-04-27",
    date: "27 Apr 2026",
    category: "Ownership",
    excerpt:
      "No engine oil, no spark plug, no carburettor, no fuel filter. What is left to maintain, and what it costs.",
    image: "https://yadea.com.pk/wp-content/uploads/2026/04/2-700x700.jpg",
    url: "https://yadea.com.pk/why-electric-scooter-bikes-require-less-maintenance-than-petrol-bikes/",
  },
  {
    slug: "pave-scheme",
    title: "How to apply for the PAVE electric bikes scheme in Pakistan",
    iso: "2025-09-29",
    date: "29 Sep 2025",
    category: "Policy",
    excerpt:
      "The Pakistan Accelerated Vehicle Electrification scheme, the PKR 50,000 subsidy, and YADEA's extended warranty on scheme purchases.",
    image: "https://yadea.com.pk/wp-content/uploads/2025/09/mobile-banner-1080x1080-1-700x700.jpg",
    url: "https://yadea.com.pk/how-to-apply-for-the-pave-electric-bikes-scheme-2025-in-pakistan/",
  },
  {
    slug: "ttfar-explained",
    title: "TTFAR explained: smarter motors for longer rides",
    iso: "2025-11-12",
    date: "12 Nov 2025",
    category: "Guide",
    excerpt:
      "What the energy-retrieving controller actually does while you ride, and why it changes the range figure.",
    image: "https://yadea.com.pk/wp-content/uploads/2025/11/imgi_37_pc_3adcb6d519-700x700.jpg",
    url: "https://yadea.com.pk/ttfar-explained-smarter-motors-for-longer-rides/",
  },
  {
    slug: "no-compromise-on-brakes",
    title: "From petrol to electric: no compromise on brakes and suspension",
    iso: "2025-11-12",
    date: "12 Nov 2025",
    category: "Guide",
    excerpt:
      "Stopping distance, tyre grip and shock absorption — the parts of a bike people assume electric versions will cheapen.",
    image: "https://yadea.com.pk/wp-content/uploads/2025/05/bike-700x700.png",
    url: "https://yadea.com.pk/from-petrol-to-electric-no-compromise-on-brakes-and-suspension/",
  },
  {
    slug: "epoc-flagship-launch",
    title: "YADEA unveils global flagship model EPOC in Pakistan",
    iso: "2024-10-08",
    date: "8 Oct 2024",
    category: "News",
    excerpt:
      "The model that reshaped the range's top end: 125 km of range, 70 km/h, and a 72V 38Ah graphene pack.",
    image: "https://yadea.com.pk/wp-content/uploads/2024/10/YadeaBlack-700x700.png",
    url: "https://yadea.com.pk/yadea-unveils-global-flagship-model-epoc-in-pakistan/",
  },
  {
    slug: "ces-2024",
    title: "YADEA showcases the latest in e-mobility at CES 2024",
    iso: "2024-01-17",
    date: "17 Jan 2024",
    category: "News",
    excerpt:
      "YADEA's presence at the world's biggest technology exhibition, showing sustainable urban travel at scale.",
    image: "https://yadea.com.pk/wp-content/uploads/2024/01/ces_pr_1_4_1_d20f2c60db-700x700.jpg",
    url: "https://yadea.com.pk/yadea-showcases-latest-in-e-mobility-for-sustainable-urban-travel-at-ces-2024/",
  },
];

export const featuredStory = stories.find((s) => s.featured) ?? stories[0];
export const secondaryStories = stories.filter((s) => !s.featured).slice(0, 8);

export const storyCategories = Array.from(new Set(stories.map((s) => s.category)));

export const storyBySlug = new Map(stories.map((s) => [s.slug, s]));

/** Newest first — the order both the index and the detail "next up" use. */
export const storiesByDate = [...stories].sort((a, b) => b.iso.localeCompare(a.iso));
