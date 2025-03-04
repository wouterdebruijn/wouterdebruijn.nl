'use client';
import { FC } from 'react';

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    cover: string;
    slug: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ title, description, cover, slug, ...props }) => {
    return (
        <a href={`/projects/${slug}`}>
            <div
                id={slug}
                className="bg-cover bg-center w-full aspect-video text-white text-ellipsis overflow-hidden shadow-lg"
                style={{
                    backgroundImage: `url(/projects/${slug}/${cover})`,
                }}
                {...props}
            >
                <section className="bg-black/50 hover:bg-black/70 hover:scale-101 transition-all duration-300 ease-in-out p-3 w-full h-full">
                    <h2 className="text-2xl">{title}</h2>
                    <p className="font-roboto">{description}</p>
                </section>
            </div>
        </a>
    );
};

export default ProjectCard;