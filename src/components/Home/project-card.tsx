"use client";

import { HTMLAttributes } from "react";
import { getImageProps } from "next/image";

interface ProjectCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  cover: string;
  slug: string;
}

function getBackgroundImage(srcSet = ""): string {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

export default function ProjectCard({
  title,
  description,
  cover,
  slug,
  className,
  ...props
}: ProjectCardProps) {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: `Cover image for ${title}`,
    width: 512,
    height: 512,
    src: `/projects/${slug}/${cover}`,
  });

  const backgroundImage = getBackgroundImage(srcSet);

  return (
    <a href={`/projects/${slug}`} className="block">
      <div
        id={slug}
        className={`bg-cover bg-center w-full aspect-video text-white text-ellipsis overflow-hidden shadow-lg hover:scale-102 transition-all duration-300 ease-in-out ${className || ""}`}
        style={{
          backgroundImage,
        }}
        {...props}
      >
        <section className="p-3 w-full h-full bg-black/70 hover:opacity-0 hover:scale-105 transition-all duration-300 ease-in-out">
          <h2 className="text-2xl text-secondary">{title}</h2>
          <p className="font-roboto">{description}</p>
        </section>
      </div>
    </a>
  );
}
