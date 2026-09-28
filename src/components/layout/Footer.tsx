import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Linkedin, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Properties", to: "/properties" },
      { label: "Projects", to: "/projects" },
      { label: "Services", to: "/services" },
      { label: "About", to: "/about" },
      { label: "Insights", to: "/blog" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Property types",
    links: [
      { label: "Apartments", to: "/properties" },
      { label: "Villas", to: "/properties" },
      { label: "Townhouses", to: "/properties" },
      { label: "Penthouses", to: "/properties" },
      { label: "Offices", to: "/properties" },
      { label: "Warehouses", to: "/properties" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Brokerage", to: "/services" },
      { label: "Marketing", to: "/services" },
      { label: "Management", to: "/services" },
      { label: "Investment advisory", to: "/services" },
    ],
  },
];

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-ink text-primary-foreground">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr_1.2fr]">
          <div>
            <span className="font-display text-3xl">{site.name}</span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/60">
              A Doha property consultancy advising buyers, tenants, landlords and investors across
              residential and commercial Qatar since 2014.
            </p>
            <div className="mt-6 flex gap-3">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-11 items-center justify-center border border-primary-foreground/20 transition-colors hover:border-accent hover:text-accent"
                  aria-label="Social profile"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-x-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title} className="border-b border-primary-foreground/12 sm:border-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 text-left sm:pointer-events-none sm:py-0"
                  onClick={() => setOpenSection(openSection === col.title ? null : col.title)}
                  aria-expanded={openSection === col.title}
                >
                  <span className="meta-label text-primary-foreground/50">{col.title}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform sm:hidden",
                      openSection === col.title && "rotate-180",
                    )}
                  />
                </button>
                <ul
                  className={cn(
                    "space-y-2.5 overflow-hidden pb-4 sm:mt-5 sm:block sm:pb-0",
                    openSection === col.title ? "block" : "hidden",
                  )}
                >
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <span className="meta-label text-primary-foreground/50">Contact</span>
            <address className="mt-5 space-y-3 text-sm not-italic text-primary-foreground/70">
              <p className="leading-relaxed">{site.address}</p>
              <p>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-accent">
                  {site.email}
                </a>
              </p>
              <p className="text-primary-foreground/45">{site.hours}</p>
            </address>

            <form
              className="mt-7"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) {
                  toast.error("Please enter a valid email address.");
                  return;
                }
                toast.success("You're subscribed to the Qatar market briefing.");
                setEmail("");
              }}
            >
              <label htmlFor="footer-email" className="meta-label text-primary-foreground/50">
                Market briefing
              </label>
              <div className="mt-3 flex border-b border-primary-foreground/25 focus-within:border-accent">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-primary-foreground/35"
                />
                <button
                  type="submit"
                  className="flex size-11 items-center justify-center text-accent"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-primary-foreground/12 pt-7 text-xs text-primary-foreground/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.fullName}. {site.licence}
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent">
              Privacy
            </a>
            <a href="#" className="hover:text-accent">
              Terms
            </a>
            <a href="#" className="hover:text-accent">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
