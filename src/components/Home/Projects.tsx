import ProjectCard from "../ProjectCard";
import { ProjectThumbnail } from "../../utils/projects";
import GenericContainer from "../GenericContainer";
import GenericText from "../GenericText";

interface ProjectsProps {
    projects: ProjectThumbnail[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    return (
        <GenericContainer className="bg-primary pt-0">
            <GenericText title="~$ ls Projects">
                <div className="grid gap-2 container grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.slug}
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
};

export default Projects;