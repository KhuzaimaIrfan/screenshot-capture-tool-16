export const site = {
  name: "Al Noor",
  fullName: "Al Noor Property Consultants",
  tagline: "Qatar Real Estate",
  phone: "+974 4412 8800",
  whatsapp: "+974 5512 8800",
  email: "enquiries@alnoor.qa",
  address: "Tower 2, Level 24, Al Fardan Office Tower, West Bay, Doha, Qatar",
  hours: "Sunday – Thursday, 8:30 – 18:00",
  licence: "Qatar Real Estate Regulatory Authority Licence No. 4482",
};

export const stats = [
  { id: "listings", value: 540, suffix: "+", label: "Properties under management" },
  { id: "projects", value: 36, suffix: "+", label: "Developments represented" },
  { id: "years", value: 12, suffix: "+", label: "Years in the Qatar market" },
  { id: "clients", value: 2500, suffix: "+", label: "Clients advised since 2014" },
];

export const locations = [
  "Doha",
  "West Bay",
  "Lusail",
  "The Pearl Qatar",
  "Msheireb",
  "Al Waab",
  "Al Sadd",
  "Al Wakrah",
  "Education City",
  "Legtaifiya",
  "Marina District",
];

export const priceBands = [
  { label: "Any price", min: undefined, max: undefined },
  { label: "Up to QAR 1M", min: 0, max: 1_000_000 },
  { label: "QAR 1M – 3M", min: 1_000_000, max: 3_000_000 },
  { label: "QAR 3M – 6M", min: 3_000_000, max: 6_000_000 },
  { label: "QAR 6M+", min: 6_000_000, max: undefined },
];

export const rentBands = [
  { label: "Any rent", min: undefined, max: undefined },
  { label: "Up to QAR 8,000", min: 0, max: 8_000 },
  { label: "QAR 8,000 – 15,000", min: 8_000, max: 15_000 },
  { label: "QAR 15,000 – 30,000", min: 15_000, max: 30_000 },
  { label: "QAR 30,000+", min: 30_000, max: undefined },
];

export const popularSearches = [
  { label: "Luxury apartments in Doha", to: "/properties", search: { purpose: "buy", type: "apartment", location: "Doha" } },
  { label: "Villas in The Pearl", to: "/properties", search: { type: "villa", location: "The Pearl Qatar" } },
  { label: "Properties in Lusail", to: "/properties", search: { location: "Lusail" } },
  { label: "Commercial in West Bay", to: "/properties", search: { category: "commercial", location: "West Bay" } },
  { label: "Waterfront apartments", to: "/properties", search: { type: "apartment", location: "Legtaifiya" } },
  { label: "Off-plan investment", to: "/properties", search: { purpose: "buy", location: "Lusail", type: "penthouse" } },
  { label: "Townhouses for rent", to: "/properties", search: { purpose: "rent", type: "townhouse" } },
  { label: "Warehouses in Al Wakrah", to: "/properties", search: { type: "warehouse" } },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Browse curated residential, commercial and off-plan opportunities across every established Doha community.",
  },
  {
    number: "02",
    title: "Shortlist",
    description:
      "Save the homes and units that match your brief. Your shortlist stays with you across every visit.",
  },
  {
    number: "03",
    title: "Consult",
    description:
      "Speak with a specialist who works that community daily — on pricing, yields, service charges and ownership.",
  },
  {
    number: "04",
    title: "Move forward",
    description:
      "Arrange a viewing, place an offer, or begin reservation on an off-plan unit with full documentation support.",
  },
];

export const values = [
  {
    title: "Local depth",
    description:
      "Every consultant is assigned to a defined set of Doha communities and knows its buildings, landlords and price history.",
  },
  {
    title: "Honest guidance",
    description:
      "We tell clients when a property is wrong for them. Long relationships matter more than a single transaction.",
  },
  {
    title: "Documented process",
    description:
      "Title, ownership eligibility, service charges and handover terms are confirmed in writing before you commit.",
  },
  {
    title: "Discretion",
    description:
      "Off-market instructions and private client requirements are handled without public listing exposure.",
  },
];

export const team = [
  {
    name: "Noora Al-Mansouri",
    role: "Managing Director",
    bio: "Fifteen years across Doha brokerage and development sales. Leads the private client desk.",
  },
  {
    name: "Rashid Al-Kuwari",
    role: "Head of Investment Advisory",
    bio: "Advises family offices and institutional buyers on yield-led acquisitions in Lusail and West Bay.",
  },
  {
    name: "Layla Haddad",
    role: "Head of Residential Leasing",
    bio: "Manages the corporate leasing portfolio for relocating executives and diplomatic missions.",
  },
  {
    name: "Omar Sheikh",
    role: "Director of Project Marketing",
    bio: "Takes new developments from launch strategy through to final unit release.",
  },
];
