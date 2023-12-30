import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { loadProject, Project } from "../../../utils/projects.ts";
import { render } from "$gfm/mod.ts";
import { SlopedContainer } from "../../../components/SlopedContainer.tsx";
import { GenericContainer } from "../../../components/GenericContainer.tsx";

export const handler: Handlers<Project> = {
  async GET(req, ctx) {
    const project = await loadProject(ctx.params.slug);

    if (!project) {
      ctx.renderNotFound();
    }

    return ctx.render(project);
  },
};

export default function Project({ data, url }: PageProps<Project>) {
  return (
    <div class="bg-background text-white">
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="tags" content={data.tags.join(", ")} />
        <meta name="author" content="Wouter de Bruijn" />
        <link rel="stylesheet" href="/projects.css" />
      </Head>

      <GenericContainer class="bg-primary pt-14 pb-0">
        <div class="flex flex-col text-right">
          <div class="text-4xl">
            <a href="/" class="text-white">Wouter de Bruijn</a>
          </div>
          <div>
            <h1 class="text-5xl">{data.title}</h1>
            <p class="text=xl">{data.description}</p>
          </div>
        </div>
      </GenericContainer>

      <SlopedContainer>
        <article
          data-color-mode="dark"
          data-dark-theme="dark"
          class="markdown-body rounded-md"
          dangerouslySetInnerHTML={{
            __html: render(data.content, {
              mediaBaseUrl: `${url}/`,
            }),
          }}
        />
      </SlopedContainer>
    </div>
  );
}
