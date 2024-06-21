import { Handlers, PageProps } from "$fresh/server.ts";
import { About } from "../components/Home/About.tsx";
import Experience from "../components/Home/Experience.tsx";
import Projects from "../components/Home/Projects.tsx";
import Header from "../islands/Header.tsx";
import { listProjects, ProjectThumbnail } from "../utils/projects.ts";

export const handler: Handlers<ProjectThumbnail[]> = {
  async GET(req, ctx) {
    const projects = await listProjects();
    return ctx.render(projects);
  },
};

export default function Home({ data }: PageProps<ProjectThumbnail[]>) {
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

      <Header />

      <About />

      <Experience />

      <Projects projects={data} />
    </>
  );
}
