import { JSX } from "preact/jsx-runtime";

interface ProjectCardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  image: string;
  link: string;
}

export function ProjectCard(props: ProjectCardProps) {
  const { title, description, image, link } = props;

  return (
    <a href={link}>
      <div
        class={`bg-[url('/gallary/project-example.webp')] bg-cover w-full aspect-video text-white text-ellipsis overflow-hidden shadow-lg`}
      >
        <div class="bg-black bg-opacity-80 hover:bg-opacity-60 hover:scale-101 transition-all duration-300 ease-in-out p-3 w-full h-full">
          <h2 class="text-2xl">{title}</h2>
          <p class="font-roboto">{description}</p>
        </div>
      </div>
    </a>
  );
}
