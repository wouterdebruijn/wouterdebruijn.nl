'use client';
import { FC } from 'react';
import { getImageProps } from 'next/image'

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    cover: string;
    slug: string;
}

function getBackgroundImage(srcSet = '') {
    const imageSet = srcSet
      .split(', ')
      .map((str) => {
        const [url, dpi] = str.split(' ')
        return `url("${url}") ${dpi}`
      })
      .join(', ')
    return `image-set(${imageSet})`
  }

const ProjectCard: FC<ProjectCardProps> = ({ title, description, cover, slug, ...props }) => {
    const { props: { srcSet } } = getImageProps({ alt: '', width: 512, height: 512, src: `/projects/${slug}/${cover}` })
    const backgroundImage = getBackgroundImage(srcSet)

    return (
        <a href={`/projects/${slug}`}>
            <div
                id={slug}
                className="bg-cover bg-center w-full aspect-video text-white text-ellipsis overflow-hidden shadow-lg"
                style={{
                    backgroundImage
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