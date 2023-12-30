import Header from "../islands/Header.tsx";
import { SlopedContainer } from "../components/SlopedContainer.tsx";
import { GenericContainer } from "../components/GenericContainer.tsx";
import { MonitorIllustration } from "../components/svg/MonitorIllustration.tsx";
import { GenericText } from "../components/GenericText.tsx";
import { JavascriptIllustration } from "../components/svg/JavascriptIllustration.tsx";
import { ProjectCard } from "../components/ProjectCard.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { listProjects, Project } from "../utils/projects.ts";

export const handler: Handlers<Omit<Project, "content">[]> = {
  async GET(req, ctx) {
    const projects = await listProjects();
    return ctx.render(projects);
  },
};

export default function Home({ data }: PageProps<Omit<Project, "content">[]>) {
  function ProjectList() {
    return (
      <div class="mt-16 grid gap-2 container grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {data.map((project) => (
          <ProjectCard
            title={project.title}
            description={project.description}
            cover={project.cover}
            slug={project.slug}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <Header>
      </Header>

      <SlopedContainer>
        <div class="items-center grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-40">
          <div class="flex flex-col items-center">
            <MonitorIllustration class="max-w-xs lg:max-w-full" />
          </div>
          <GenericText title="~$ whois">
            <p class="font-roboto">
              {/* About me text */}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique sit cupiditate rem perferendis quo sint dignissimos quam
              unde alias deserunt minima dolorem ipsa obcaecati earum vel sunt
              tempore, consectetur quasi, nam minus, itaque deleniti distinctio!
              Unde, iste incidunt voluptates vitae itaque quaerat quidem cum
              aspernatur nemo repellat, consectetur quis rerum aut dolorem ipsum
              sequi dolores totam illum quisquam neque nihil iusto ullam. Odio a
              blanditiis officia unde ea iusto quisquam voluptatem obcaecati
              veritatis, nesciunt possimus facere ducimus doloremque quaerat!
              Quia eveniet sint eum fugiat repudiandae, nisi fugit
              reprehenderit, quas similique dicta maiores ea quibusdam esse,
              saepe tempora excepturi praesentium minus!
            </p>
          </GenericText>
        </div>
      </SlopedContainer>

      <GenericContainer class="bg-primary">
        <div class="items-center grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-40">
          <GenericText title="~$ cd ~/Projects">
            <p class="font-roboto text-black">
              {/* About me text */}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique sit cupiditate rem perferendis quo sint dignissimos quam
              unde alias deserunt minima dolorem ipsa obcaecati earum vel sunt
              tempore, consectetur quasi, nam minus, itaque deleniti distinctio!
              Unde, iste incidunt voluptates vitae itaque quaerat quidem cum
              aspernatur nemo repellat, consectetur quis rerum aut dolorem ipsum
              sequi dolores totam illum quisquam neque nihil iusto ullam. Odio a
              blanditiis officia unde ea iusto quisquam voluptatem obcaecati
              veritatis, nesciunt possimus facere ducimus doloremque quaerat!
              Quia eveniet sint eum fugiat repudiandae, nisi fugit
              reprehenderit, quas similique dicta maiores ea quibusdam esse,
              saepe tempora excepturi praesentium minus!
            </p>
          </GenericText>
          <div class="flex flex-col items-center">
            <JavascriptIllustration class="max-w-xs lg:max-w-full" />
          </div>
        </div>

        <ProjectList />
      </GenericContainer>
    </>
  );
}
