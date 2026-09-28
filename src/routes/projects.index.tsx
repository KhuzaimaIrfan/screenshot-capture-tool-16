import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import { PageHero } from "@/components/common/PageHero";
import { ProjectCard } from "@/components/common/ProjectCard";
import { CTASection } from "@/components/common/CTASection";
import { getProjects } from "@/data/repository";
import { revealProps, staggerContainer } from "@/utils/motion";
import { img } from "@/data/images";

export const Route = createFileRoute("/projects/")({
  loader: async () => ({ projects: await getProjects() }),
  head: () => ({
    meta: [
      { title: "New Developments in Qatar | Al Noor" },
      {
        name: "description",
        content:
          "Off-plan and completed developments across Lusail, The Pearl Qatar, West Bay and Msheireb, with handover dates and starting prices.",
      },
      { property: "og:title", content: "New Developments in Qatar | Al Noor" },
      {
        property: "og:description",
        content: "Developments we represent across Doha, from launch to handover.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects } = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow="Developments"
        title="New addresses across Doha"
        intro="The developments we represent, from island residences to the Lusail marina towers — each with confirmed handover and starting price."
        image={img.projectLusail}
        imageAlt="Towers under construction in Lusail at dusk"
        crumbs={[{ label: "Home", to: "/" }, { label: "Developments" }]}
      />

      <section className="section-y">
        <div className="container-page">
          <motion.div
            variants={staggerContainer}
            {...revealProps}
            className="grid gap-x-8 gap-y-14 md:grid-cols-2"
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
