import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { site } from "@/data/site";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useFavorites } from "@/hooks/useFavorites";
import { drawerTransition } from "@/utils/motion";
import { cn } from "@/lib/utils";

type NavChild = { label: string; to: string; search?: Record<string, string> };
type NavItem = { label: string; to: string; children?: NavChild[] };

const nav: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "Properties",
    to: "/properties",
    children: [
      { label: "Buy", to: "/properties", search: { purpose: "buy" } },
      { label: "Rent", to: "/properties", search: { purpose: "rent" } },
      { label: "Residential", to: "/properties", search: { category: "apartments" } },
      { label: "Commercial", to: "/properties", search: { category: "offices" } },
      { label: "Villas", to: "/properties", search: { type: "villa" } },
    ],
  },
  {
    label: "Projects",
    to: "/projects",
    children: [
      { label: "Featured projects", to: "/projects" },
      { label: "New developments", to: "/projects" },
    ],
  },
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "Brokerage", to: "/services" },
      { label: "Marketing", to: "/services" },
      { label: "Property management", to: "/services" },
      { label: "Investment advisory", to: "/services" },
    ],
  },
  { label: "About", to: "/about" },
  { label: "Insights", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const { direction, atTop } = useScrollDirection();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { favorites } = useFavorites();

  const overlay = pathname === "/" && atTop;
  const hidden = direction === "down" && !open;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500",
        overlay
          ? "bg-transparent text-primary-foreground"
          : "bg-background/95 text-foreground shadow-header backdrop-blur-md",
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            overlay ? "h-24" : "h-16 md:h-[4.5rem]",
          )}
        >
          <Link to="/" className="flex items-baseline gap-2.5" aria-label={site.fullName}>
            <span className="font-display text-2xl leading-none tracking-tight">{site.name}</span>
            <span className="hidden text-[0.5625rem] uppercase tracking-[0.3em] opacity-70 sm:inline">
              Property Consultants
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  to={item.to}
                  className="flex items-center gap-1 py-6 text-[0.8125rem] tracking-wide transition-opacity hover:opacity-70"
                  activeProps={{ className: "opacity-100" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                  {item.children && <ChevronDown className="size-3 opacity-50" />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-10 w-56 -translate-x-1/2 translate-y-2 border border-border bg-popover p-1.5 opacity-0 shadow-lift transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        {...(child.search ? { search: child.search } : {})}
                        className="block px-3 py-2.5 text-[0.8125rem] text-popover-foreground transition-colors hover:bg-secondary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/properties"
              search={{ favorites: true }}
              className="relative hidden size-11 items-center justify-center transition-opacity hover:opacity-70 sm:flex"
              aria-label={`Saved properties (${favorites.length})`}
            >
              <Heart className="size-[1.125rem]" />
              {favorites.length > 0 && (
                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-accent text-[0.5625rem] text-accent-foreground">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              to="/contact"
              className={cn(
                "hidden h-11 items-center border px-6 text-[0.75rem] uppercase tracking-[0.16em] transition-colors lg:inline-flex",
                overlay
                  ? "border-primary-foreground/50 hover:bg-primary-foreground hover:text-primary"
                  : "border-foreground hover:bg-foreground hover:text-background",
              )}
            >
              Enquire
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex size-11 items-center justify-center lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-ink/60"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={drawerTransition}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(24rem,88vw)] flex-col bg-background text-foreground"
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-6">
                <span className="font-display text-xl">{site.name}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex size-11 items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-4" aria-label="Mobile">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.045, duration: 0.35 }}
                    className="border-b border-border/70"
                  >
                    <div className="flex items-center justify-between">
                      <Link to={item.to} className="flex-1 py-4 font-display text-xl">
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          className="flex size-11 items-center justify-center"
                          aria-label={`Toggle ${item.label} links`}
                          aria-expanded={expanded === item.label}
                          onClick={() =>
                            setExpanded(expanded === item.label ? null : item.label)
                          }
                        >
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform duration-300",
                              expanded === item.label && "rotate-180",
                            )}
                          />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {item.children && expanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.to}
                                {...(child.search ? { search: child.search } : {})}
                                className="block py-2.5 text-sm text-muted-foreground"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-border p-6">
                <Link
                  to="/contact"
                  className="flex h-12 w-full items-center justify-center bg-foreground text-[0.75rem] uppercase tracking-[0.16em] text-background"
                >
                  Enquire
                </Link>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="mt-3 block text-center text-sm text-muted-foreground"
                >
                  {site.phone}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
