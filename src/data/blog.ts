import type { BlogPost } from "@/types/blog";
import { img } from "./images";

export const blogCategories = [
  "Market Insights",
  "Buying Guide",
  "Investment",
  "Lifestyle",
  "Qatar",
  "Property Management",
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "qatar-property-market-outlook",
    title: "Where the Qatar property market actually stands going into 2027",
    category: "Market Insights",
    excerpt:
      "Transaction volumes have normalised after the post-tournament correction. The interesting movement is now in rental yields, not headline sale prices.",
    featuredImage: img.heroDoha,
    author: { name: "Rashid Al-Kuwari", role: "Head of Investment Advisory" },
    publishedAt: "2026-09-08",
    readingTime: 7,
    tags: ["market", "pricing", "yields"],
    featured: true,
    content: [
      {
        paragraphs: [
          "The clearest signal in the Qatar market right now is not price — it is absorption. Well-specified apartments in Lusail and Msheireb are leasing within three weeks of listing, while older stock in the secondary districts is sitting for two months or more. That gap has widened steadily through the year and it is doing more to shape owner behaviour than any movement in asking prices.",
        ],
      },
      {
        heading: "Sale pricing has flattened, not fallen",
        paragraphs: [
          "Across the freehold zones, achieved sale prices have moved within a narrow band for six consecutive quarters. The correction that followed the tournament infrastructure boom has worked through the system, and what remains is a market where buyers negotiate on terms and fit-out rather than on headline value.",
          "Where discounts do appear, they are concentrated in buildings with high service charges relative to their amenity offer. Buyers have become notably more literate about the difference between gross and net yield, and pricing now reflects that.",
        ],
      },
      {
        heading: "Rental demand is carrying the market",
        paragraphs: [
          "Corporate relocation into West Bay and Lusail has been consistent, and the supply of genuinely new, well-managed rental stock has not kept pace with it. Two-bedroom apartments in the marina districts are the tightest segment in the city.",
          "For owners, this is the practical takeaway: a property that is properly presented, correctly priced and professionally managed is achieving a shorter void period than at any point since 2019.",
        ],
      },
      {
        heading: "What to watch",
        paragraphs: [
          "The phased release of off-plan towers through 2027 will test absorption in the Marina District specifically. Investors buying at launch pricing should model a conservative handover-year rent rather than today's achieved figures, and should confirm the service charge schedule in writing before reservation.",
        ],
      },
    ],
  },
  {
    id: "b2",
    slug: "buying-property-in-qatar-guide",
    title: "Buying property in Qatar: eligibility, title and the paperwork that matters",
    category: "Buying Guide",
    excerpt:
      "Freehold, leasehold and usufruct are not interchangeable. A plain explanation of what non-Qatari buyers can own and where.",
    featuredImage: img.projectPearl,
    author: { name: "Noora Al-Mansouri", role: "Managing Director" },
    publishedAt: "2026-08-22",
    readingTime: 9,
    tags: ["ownership", "freehold", "process"],
    featured: false,
    content: [
      {
        paragraphs: [
          "The single most common misunderstanding we encounter is the assumption that all Doha property is available to overseas buyers on the same terms. It is not. Qatar operates designated freehold zones, a wider set of leasehold zones, and everything outside them.",
        ],
      },
      {
        heading: "Freehold zones",
        paragraphs: [
          "In the designated freehold areas — The Pearl, Lusail and a defined set of other districts — non-Qatari buyers may take outright ownership, registered in their own name, with the same disposal rights as a Qatari national. Purchases above the published investment threshold also carry residency entitlement for the owner and immediate family.",
        ],
      },
      {
        heading: "Leasehold and usufruct",
        paragraphs: [
          "Outside the freehold zones, the common structure is a usufruct right of up to ninety-nine years. This is a genuine, registrable and transferable interest, but it is not ownership of the land, and lenders treat it differently. Confirm which structure applies before you negotiate, not after.",
        ],
      },
      {
        heading: "The documents to insist on",
        paragraphs: [
          "Before any deposit changes hands, ask for the title deed, the service charge schedule for the current and prior year, the building's snagging history if it is recent stock, and written confirmation of any outstanding developer obligations. A reputable agent will produce all four without being pushed.",
        ],
      },
    ],
  },
  {
    id: "b3",
    slug: "lusail-investment-case",
    title: "The investment case for Lusail, five years into occupation",
    category: "Investment",
    excerpt:
      "Lusail has moved from masterplan to functioning city. Here is how that changes the yield arithmetic.",
    featuredImage: img.projectLusail,
    author: { name: "Rashid Al-Kuwari", role: "Head of Investment Advisory" },
    publishedAt: "2026-08-04",
    readingTime: 6,
    tags: ["lusail", "yield", "investment"],
    featured: false,
    content: [
      {
        paragraphs: [
          "Early Lusail buyers took on delivery risk. Those buying today are not — the metro runs, the promenade is busy in the evenings, the retail podiums are tenanted, and the schools have opened. The premium has shifted from speculation to amenity.",
        ],
      },
      {
        heading: "Where yields sit",
        paragraphs: [
          "Net yields in the Marina District currently run meaningfully ahead of comparable Pearl stock, largely because purchase prices remain lower while achieved rents have converged. The differential is narrowing, which is precisely why the window is worth paying attention to.",
        ],
      },
      {
        heading: "The risk to model",
        paragraphs: [
          "Supply. Several towers hand over within an eighteen-month band. A conservative acquisition model should assume a softer rental figure in the handover year and a longer initial void than the district is currently seeing.",
        ],
      },
    ],
  },
  {
    id: "b4",
    slug: "living-in-the-pearl",
    title: "Living on The Pearl: what residents tell us after the first year",
    category: "Lifestyle",
    excerpt:
      "Marina views, walkable dining and genuine community — alongside parking, service charges and the summer months.",
    featuredImage: img.ctaAerial,
    author: { name: "Layla Haddad", role: "Head of Residential Leasing" },
    publishedAt: "2026-07-19",
    readingTime: 5,
    tags: ["the pearl", "lifestyle", "community"],
    featured: false,
    content: [
      {
        paragraphs: [
          "The Pearl is the closest thing Doha has to a neighbourhood you can live in without a car. That single fact drives most of what residents tell us they like about it, and most of what they find frustrating.",
        ],
      },
      {
        heading: "What works",
        paragraphs: [
          "Porto Arabia's promenade functions as a genuine high street from October through April. Residents walk to dinner, to the gym, to the supermarket. For families arriving from cities where that is normal, it removes the biggest adjustment of a Gulf relocation.",
        ],
      },
      {
        heading: "What to plan for",
        paragraphs: [
          "Visitor parking is tight, and service charges on the island sit above the Doha average — budget for them properly as part of your net cost. And be realistic about July and August, when the promenade empties and life moves indoors.",
        ],
      },
    ],
  },
  {
    id: "b5",
    slug: "service-charges-explained",
    title: "Service charges in Doha: what you are paying for and how to check it",
    category: "Property Management",
    excerpt:
      "A high service charge is not automatically a bad one. What matters is what sits inside it and whether the reserve fund is real.",
    featuredImage: img.propTownhouse,
    author: { name: "Layla Haddad", role: "Head of Residential Leasing" },
    publishedAt: "2026-06-28",
    readingTime: 6,
    tags: ["service charge", "ownership costs"],
    featured: false,
    content: [
      {
        paragraphs: [
          "Service charge is the line item that most often turns an attractive gross yield into a disappointing net one. It is also the line item buyers investigate least.",
        ],
      },
      {
        heading: "Read the breakdown, not the rate",
        paragraphs: [
          "Two buildings charging the same rate per square foot can be doing completely different things with it. Ask for the itemised budget: management fee, security, cleaning, chilled water, insurance, lift maintenance, and — critically — the sinking fund contribution.",
        ],
      },
      {
        heading: "The reserve fund question",
        paragraphs: [
          "A building with no meaningful reserve fund will eventually issue a special levy for facade, lift or chiller works. That levy lands on whoever owns the unit at the time. A slightly higher charge with a properly funded reserve is usually the better purchase.",
        ],
      },
    ],
  },
  {
    id: "b6",
    slug: "msheireb-architecture",
    title: "How Msheireb rebuilt downtown Doha around shade",
    category: "Qatar",
    excerpt:
      "Wind towers, narrow streets and deep-set glazing are not decoration. They are the reason the district works in June.",
    featuredImage: img.projectMsheireb,
    author: { name: "Omar Sheikh", role: "Director of Project Marketing" },
    publishedAt: "2026-06-06",
    readingTime: 5,
    tags: ["architecture", "msheireb", "sustainability"],
    featured: false,
    content: [
      {
        paragraphs: [
          "Most Gulf urban design of the last thirty years has answered the climate with glass and more cooling. Msheireb went the other way and answered it with geometry.",
        ],
      },
      {
        heading: "Shade as infrastructure",
        paragraphs: [
          "Street widths and building heights across the district were set to keep pedestrian routes in shadow for most of the day. Wind towers draw air down into the courtyards. Glazing is recessed deep into the facade so direct sun never reaches the glass at midday.",
        ],
      },
      {
        heading: "What it means for residents",
        paragraphs: [
          "The practical outcome is measurably lower cooling loads than comparable towers elsewhere in Doha, and a district where walking between buildings in spring and autumn is genuinely pleasant. For buyers, that shows up as a lower monthly utility cost and a resale story that is easy to tell.",
        ],
      },
    ],
  },
];
