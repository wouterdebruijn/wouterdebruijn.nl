import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render, Renderer } from "@deno/gfm";
import { GenericContainer } from "../../../components/GenericContainer.tsx";
import { SlopedContainer } from "../../../components/SlopedContainer.tsx";
import { loadProject } from "../../../utils/projects.ts";
import type { Project } from "../../../utils/projects.ts";

class ExtendedRenderer extends Renderer {
  override image(
    src: string,
    _title: string | null,
    alt: string | null,
  ): string {
    // Render the GenericImage component using preact/jsx-runtime
    return `
      <img
        src="${src}"
        loading="lazy"
        decoding="async"
        alt="${alt}"
      />
    `;
  }
}

export const handler: Handlers<Project> = {
  async GET(_req, ctx) {
    const project = await loadProject(ctx.params.slug);

    if (!project) {
      ctx.renderNotFound();
    }

    return ctx.render(project);
  },
};

export default function Project({ data, url }: PageProps<Project>) {
  if (Deno.env.get("DENO_DEPLOYMENT_ID")) {
    url.protocol = "https";
  }

  return (
    <div class="bg-background text-white">
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta
          name="keywords"
          content={`Wouter de Bruijn, Wouter, de Bruijn, Portfolio, ${
            data.tags.join(", ")
          }`}
        />
        <link rel="stylesheet" href="/projects.css" />
      </Head>

      <GenericContainer class="bg-primary pt-14 pb-0">
        <div class="flex flex-col text-right">
          <div class="text-4xl">
            <a href="/" class="text-white">Wouter de Bruijn</a>
          </div>
          <div>
            <h1 class="text-5xl">{data.title}</h1>
            <p class="hidden text-xl max-w-3xl ml-auto lg:block">
              {data.description}
            </p>
          </div>
        </div>
      </GenericContainer>

      <SlopedContainer bottomSlope={false}>
        <div class="lg:mx-32 md:mx-8">
          <article
            class="markdown-body"
            dangerouslySetInnerHTML={{
              __html: render(data.content, {
                mediaBaseUrl: `${url}/`,
                renderer: new ExtendedRenderer(),
              }),
            }}
          />
          <div class="mt-4 text-right text-gray-300">
            <p class="text-xs m-0">
              Created: {data.created.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p class="text-xs m-0">
              Last edit: {data.updated.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </SlopedContainer>
    </div>
  );
}
