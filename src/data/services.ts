import type { Service } from "@/types/service";
import { img } from "./images";

export const services: Service[] = [
  {
    id: "s1",
    slug: "brokerage",
    number: "01",
    title: "Property Brokerage",
    summary:
      "Helping clients discover and secure properties that align with their lifestyle and investment objectives.",
    description:
      "Our brokerage desk covers sale and lease instructions across residential and commercial Qatar. Each consultant works a defined set of communities, so the advice you receive on pricing, service charges and negotiation position comes from live transaction data rather than portal averages.",
    image: img.propApartment,
    points: [
      "Buyer and tenant representation",
      "Seller and landlord instructions",
      "Comparative pricing analysis",
      "Negotiation and offer management",
    ],
  },
  {
    id: "s2",
    slug: "marketing",
    number: "02",
    title: "Property Marketing",
    summary:
      "Positioning homes and developments with photography, copy and media planning worthy of the asset.",
    description:
      "We produce the architectural photography, floor plans, virtual walkthroughs and launch collateral that a premium instruction requires, then place it across the portals, private databases and regional media where qualified Qatar buyers actually look.",
    image: img.projectPearl,
    points: [
      "Architectural photography and film",
      "Launch campaigns for new developments",
      "Portal, social and private database placement",
      "Buyer qualification and reporting",
    ],
  },
  {
    id: "s3",
    slug: "management",
    number: "03",
    title: "Property Management",
    summary:
      "Protecting the value of owned assets through disciplined tenancy, maintenance and compliance handling.",
    description:
      "For landlords resident in Qatar or abroad, we handle tenant selection, Ejari-equivalent documentation, rent collection, scheduled maintenance, snagging and annual condition reporting — with transparent statements every quarter.",
    image: img.propTownhouse,
    points: [
      "Tenant sourcing and vetting",
      "Rent collection and arrears handling",
      "Planned and reactive maintenance",
      "Quarterly owner reporting",
    ],
  },
  {
    id: "s4",
    slug: "investment-advisory",
    number: "04",
    title: "Investment & Advisory",
    summary:
      "Yield-led guidance for private investors, family offices and institutional buyers entering Qatar.",
    description:
      "We model net yield after service charge, assess exit liquidity by building and community, and advise on freehold eligibility and residency thresholds so capital is committed with a clear view of both return and regulation.",
    image: img.propOffice,
    points: [
      "Net yield and cash-flow modelling",
      "Freehold and leasehold eligibility guidance",
      "Portfolio acquisition and disposal strategy",
      "Off-market and pre-launch access",
    ],
  },
];
