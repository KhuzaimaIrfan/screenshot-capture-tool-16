import { createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SlidersHorizontal } from "lucide-react";
import { useMemo } from "react";

import { PageHero } from "@/components/common/PageHero";
import { PropertyCard } from "@/components/common/PropertyCard";
import { FilterPanel } from "@/components/properties/FilterPanel";
import { EmptyState, PropertyGridSkeleton } from "@/components/common/States";
import { CTASection } from "@/components/common/CTASection";
import { ActionButton, ActionLink } from "@/components/common/Action";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useFavorites } from "@/hooks/useFavorites";
import { getProperties } from "@/data/repository";
import { countActiveFilters, propertySearchSchema, searchToFilters, sortOptions } from "@/lib/propertySearch";
import { staggerContainer, revealProps } from "@/utils/motion";
import { img } from "@/data/images";

const PAGE_SIZE = 9;

export const Route = createFileRoute("/properties/")({
  validateSearch: propertySearchSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => ({ results: await getProperties(searchToFilters(deps)) }),
  head: () => ({
    meta: [
      { title: "Properties for Sale & Rent in Qatar | Al Noor" },
      {
        name: "description",
        content:
          "Search apartments, villas, townhouses, offices and warehouses for sale and rent across Doha, Lusail, The Pearl and Msheireb.",
      },
      { property: "og:title", content: "Properties for Sale & Rent in Qatar | Al Noor" },
      {
        property: "og:description",
        content: "Filter Qatar property by location, type, price, bedrooms and amenities.",
      },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const { results } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const { favorites } = useFavorites();

  const filtered = useMemo(
    () => (search.favorites ? results.filter((p) => favorites.includes(p.id)) : results),
    [results, search.favorites, favorites],
  );

  const page = search.page ?? 1;
  const visible = filtered.slice(0, page * PAGE_SIZE);
  const activeCount = countActiveFilters(search);

  return (
    <>
      <PageHero
        eyebrow={search.favorites ? "Saved" : "Properties"}
        title={search.favorites ? "Your saved properties" : "Property across Qatar"}
        intro={
          search.favorites
            ? "Everything you have shortlisted, kept on this device."
            : "Every current instruction, filterable by community, type, budget and specification."
        }
        image={img.textureFacade}
        imageAlt="Detail of a pale stone facade in Doha"
        crumbs={[{ label: "Home", to: "/" }, { label: "Properties" }]}
      />

      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[17rem_1fr] lg:gap-14">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="font-display text-xl">Refine</p>
                <div className="mt-6">
                  <FilterPanel search={search} />
                </div>
              </div>
            </aside>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground">{filtered.length}</span>{" "}
                  {filtered.length === 1 ? "property" : "properties"}
                  {activeCount > 0 && ` · ${activeCount} filter${activeCount > 1 ? "s" : ""} applied`}
                </p>

                <div className="flex items-center gap-3">
                  <Sheet>
                    <SheetTrigger asChild>
                      <button
                        type="button"
                        className="flex h-11 items-center gap-2 border border-border px-4 text-[0.75rem] uppercase tracking-[0.14em] lg:hidden"
                      >
                        <SlidersHorizontal className="size-3.5" />
                        Filters{activeCount > 0 ? ` (${activeCount})` : ""}
                      </button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="max-h-[88vh] overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle className="font-display text-2xl font-normal">Refine</SheetTitle>
                      </SheetHeader>
                      <div className="px-4 pb-8">
                        <FilterPanel search={search} />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <label className="flex items-center gap-2 text-sm">
                    <span className="meta-label hidden sm:inline">Sort</span>
                    <select
                      className="h-11 border border-border bg-background px-3 text-sm outline-none focus:border-foreground"
                      value={search.sort ?? "featured"}
                      onChange={(e) =>
                        navigate({
                          to: "/properties",
                          search: { ...search, sort: e.target.value as typeof search.sort },
                          resetScroll: false,
                        })
                      }
                      aria-label="Sort results"
                    >
                      {sortOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="mt-10">
                {isLoading ? (
                  <PropertyGridSkeleton />
                ) : visible.length === 0 ? (
                  <EmptyState
                    title="No properties match your current search."
                    description="Try widening the budget, removing a filter, or browsing everything we currently hold."
                    actions={
                      <>
                        <ActionButton
                          variant="solid"
                          size="sm"
                          onClick={() => navigate({ to: "/properties", search: {} })}
                        >
                          Clear filters
                        </ActionButton>
                        <ActionLink to="/properties" variant="outline" size="sm">
                          Browse all properties
                        </ActionLink>
                      </>
                    }
                  />
                ) : (
                  <>
                    <motion.div
                      key={JSON.stringify(search)}
                      variants={staggerContainer}
                      {...revealProps}
                      className="grid gap-x-7 gap-y-12 sm:grid-cols-2 xl:grid-cols-3"
                    >
                      {visible.map((p) => (
                        <PropertyCard key={p.id} property={p} />
                      ))}
                    </motion.div>

                    {visible.length < filtered.length && (
                      <div className="mt-16 flex justify-center">
                        <ActionButton
                          variant="outline"
                          onClick={() =>
                            navigate({
                              to: "/properties",
                              search: { ...search, page: page + 1 },
                              resetScroll: false,
                            })
                          }
                        >
                          Load more properties
                        </ActionButton>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
