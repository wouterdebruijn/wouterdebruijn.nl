import { extract } from "$front_matter/any.ts";

export interface Project {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  cover: string;
  content: string;
  created: Date;
  updated: Date;
}

export async function loadProject(slug: string): Promise<Project> {
  try {
    const content = await Deno.readTextFile(
      `./data/projects/${slug}/${slug}.md`,
    );

    const { body, attrs } = extract(content);

    const title = attrs.title as string;
    const description = attrs.description as string;
    const tags = attrs.tags as string[];
    const cover = attrs.cover as string;
    const created = new Date(attrs.created as string);
    const updated = new Date(attrs.updated as string);

    return {
      title,
      slug,
      description,
      tags,
      cover,
      content: body,
      created,
      updated,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Could not load project "${slug}"`);
  }
}

export async function listProjects(): Promise<
  Omit<Project, "content">[]
> {
  try {
    const folders = await Deno.readDir("./data/projects");
    const projects: Omit<Project, "content">[] = [];

    for await (const folder of folders) {
      const content = await Deno.readTextFile(
        `./data/projects/${folder.name}/${folder.name}.md`,
      );

      const { attrs } = extract(content);

      const title = attrs.title as string;
      const description = attrs.description as string;
      const tags = attrs.tags as string[];
      const cover = attrs.cover as string;
      const created = new Date(attrs.created as string);
      const updated = new Date(attrs.updated as string);

      projects.push({
        title,
        slug: folder.name,
        description,
        tags,
        cover,
        created,
        updated,
      });
    }

    return projects;
  } catch (error) {
    console.error(error);
    throw new Error("Could not load projects");
  }
}

export async function loadProjectImage(
  slug: string,
  image: string,
): Promise<Uint8Array> {
  try {
    const imageData = await Deno.readFile(
      `./data/projects/${slug}/${image}`,
    );

    return imageData;
  } catch (error) {
    console.error(error);
    throw new Error(`Could not load image "${slug}"`);
  }
}
