import { JSX } from "preact/jsx-runtime";

interface ProjectCardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  cover: string;
  slug: string;
}

export function ProjectCard(props: ProjectCardProps) {
  const { title, description, cover, slug } = props;

  return (
    <a href={`/projects/${slug}`}>
      <div
        id={slug}
        class={`bg-cover bg-center w-full aspect-video text-white text-ellipsis overflow-hidden shadow-lg`}
        style={{
          backgroundImage: `url(/projects/${slug}/${cover})`,
        }}
      >
        <section class="bg-black bg-opacity-50 hover:bg-opacity-70 hover:scale-101 transition-all duration-300 ease-in-out p-3 w-full h-full">
          <h2 class="text-2xl">{title}</h2>
          <p class="font-roboto">{description}</p>
        </section>
      </div>
    </a>
  );
}
