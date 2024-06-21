import { ProjectCard } from "../../islands/ProjectCard.tsx";
import { ProjectThumbnail } from "../../utils/projects.ts";
import { GenericContainer } from "../GenericContainer.tsx";
import { GenericText } from "../GenericText.tsx";

interface ProjectsProps {
  projects: ProjectThumbnail[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <GenericContainer class="bg-primary pt-0">
      <GenericText title="~$ ls Projects">
        <div class="grid gap-2 container grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard
              title={project.title}
              description={project.description}
              cover={project.cover}
              slug={project.slug}
            />
          ))}
        </div>
      </GenericText>
    </GenericContainer>
  );
}
