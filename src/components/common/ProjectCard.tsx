import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";
import { formatPrice, statusLabels } from "@/lib/format";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="media-frame aspect-[5/6]">
        <img
          src={project.heroImage}
          alt={project.title}
          loading="lazy"
          width={1600}
          height={1920}
          className="size-full object-cover group-hover:scale-[1.06]"
        />
        <div className="overlay-card absolute inset-0" />
        <span className="absolute left-5 top-5 bg-background/92 px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.16em] backdrop-blur-sm">
          {statusLabels[project.status]}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
          <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-primary-foreground/70">
            {project.location}
          </p>
          <h3 className="mt-2 font-display text-[1.75rem] leading-tight">
            <Link to="/projects/$projectId" params={{ projectId: project.slug }}>
              <span className="absolute inset-0" aria-hidden />
              {project.title}
            </Link>
          </h3>
          <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
            <p className="text-sm leading-relaxed text-primary-foreground/75">
              {project.shortDescription}
            </p>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-primary-foreground/25 pt-4">
            <span className="text-sm">
              From {formatPrice(project.startingPrice)}
            </span>
            <ArrowRight className="size-4 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </article>
  );
}
