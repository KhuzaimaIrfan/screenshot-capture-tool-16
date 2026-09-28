import type { ReactNode } from "react";

export function PropertyCardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="shimmer aspect-[4/3]" />
      <div className="space-y-3 border-x border-b border-border bg-card p-5">
        <div className="shimmer h-5 w-3/4" />
        <div className="shimmer h-3.5 w-1/2" />
        <div className="shimmer h-3.5 w-2/3" />
        <div className="shimmer h-7 w-2/5" />
      </div>
    </div>
  );
}

export function PropertyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="shimmer h-3.5" style={{ width: `${95 - i * 12}%` }} />
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="border border-border bg-card px-6 py-20 text-center">
      <h3 className="display-card">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
    </div>
  );
}
