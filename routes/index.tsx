import Header from "../islands/Header.tsx";
import { SlopedContainer } from "../components/SlopedContainer.tsx";
import { GenericContainer } from "../components/GenericContainer.tsx";
import { MonitorIllustration } from "../components/svg/MonitorIllustration.tsx";
import { GenericText } from "../components/GenericText.tsx";
import { JavascriptIllustration } from "../components/svg/JavascriptIllustration.tsx";
import { ProjectCard } from "../islands/ProjectCard.tsx";
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
      <div class="grid gap-2 container grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
      <head>
        <title>Wouter de Bruijn</title>
        <meta name="description" content="Wouter de Bruijn" />
        <meta
          name="keywords"
          content="Wouter de Bruijn, Wouter, de Bruijn, Portfolio, Developer, Netwerk Engineer, Engineer"
        />
      </head>

      <Header>
      </Header>

      <SlopedContainer>
        <div class="items-center grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-40">
          <div class="flex flex-col items-center">
            <MonitorIllustration class="max-w-xs lg:max-w-full" />
          </div>
          <GenericText title="~$ whois">
            <p class="font-roboto text-white">
              {/* About me text */}
              I am Wouter de Bruijn a 22 year old guy who is interested in all
              kinds of technology. I experiment with Linux servers, computer
              networking, software development, embedded devices and other
              various bits of technology.
            </p>
            <p class="font-roboto text-white pt-2">
              I have been interested in technology since I was a little kid. At
              first mostly in physical things like basic electronics and making
              stuff out of wood and scraps. Later on I got interested in
              computers and software development. I started out with making some
              simple websites and setting up a Linux server. Which grew into
              following two IT educations, and working part-time as a software
              developer and network/ system engineer for two companies.
            </p>
          </GenericText>
        </div>
      </SlopedContainer>

      <GenericContainer class="bg-primary">
        <div class="items-center grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-40">
          <GenericText title="~$ cat experience">
            <p class="font-roboto">
              I am currently studying Network and System Engineering at the
              Hague University of Applied Sciences. I also work as a software
              developer at{" "}
              <a class="text-tertiary" href="https://hanexservice.eu/">
                Hanex Service
              </a>{" "}
              and as a network/ system engineer at{" "}
              <a class="text-tertiary" href="https://yieldergroup.com/">
                Yielder Group
              </a>.
            </p>
            <p class="font-roboto pt-2">
              I started studying IT at{" "}
              <a class="text-tertiary" href="https://novacollege.nl/">
                Nova College
              </a>{" "}
              in 2017, where in 2020 I graduated and got my "ICT-Beheerder"
              (MBO-4) degree. After that I started studying Network and System
              Engineering at the{" "}
              <a class="text-tertiary" href="https://www.thuas.com/">
                Hague University of Applied Sciences
              </a>.
            </p>
            <p class="font-roboto">
              As part of my studies I have done a few internships, which
              continued into some part-time jobs. More information about my
              education and work expierence can be found on my{" "}
              <a
                class="text-tertiary"
                href="https://www.linkedin.com/in/wouter-de-bruijn-b1a20115b/"
              >
                linkedin
              </a>{" "}
              profile.
            </p>
          </GenericText>
          <div class="flex flex-col items-center">
            <JavascriptIllustration class="max-w-xs lg:max-w-full" />
          </div>
        </div>

        <GenericText class="pt-10" title="~$ ls Projects">
          <ProjectList />
        </GenericText>
      </GenericContainer>
    </>
  );
}
