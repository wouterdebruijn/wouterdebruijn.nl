import fm from "front-matter";
import { readdir } from "node:fs/promises";

export interface ProjectAttributes {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  cover: string;
  content: string;
  created: string;
  updated: string;
  published: boolean;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  cover: string;
  content: string;
  created: Date;
  updated: Date;
  published: boolean;
}

export type ProjectThumbnail = Omit<Project, "content">;

export async function loadProject(slug: string): Promise<Project> {
  try {
    const file = await Bun.file(
      `src/data/projects/${slug}/${slug}.md`,
    );

    
    const { body, attributes } = fm<ProjectAttributes>(await file.text());

    const title = attributes.title as string;
    const description = attributes.description as string;
    const tags = attributes.tags as string[];
    const cover = attributes.cover as string;
    const created = new Date(attributes.created as string);
    const updated = new Date(attributes.updated as string);
    const published = attributes.published as boolean;

    return {
      title,
      slug,
      description,
      tags,
      cover,
      content: body,
      created,
      updated,
      published,
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
    const folders = await readdir("src/data/projects");
    const projects: Omit<Project, "content">[] = [];

    for await (const folder of folders) {
      const file = await Bun.file(
        `src/data/projects/${folder}/${folder}.md`,
      );

      const content = await file.text();

      const { attributes } = fm<ProjectAttributes>(content);

      const title = attributes.title;
      const description = attributes.description;
      const tags = attributes.tags;
      const cover = attributes.cover;
      const created = new Date(attributes.created);
      const updated = new Date(attributes.updated);
      const published = attributes.published;

      if (!published) {
        continue;
      }

      projects.push({
        title,
        slug: folder,
        description,
        tags,
        cover,
        created,
        updated,
        published,
      });
    }

    return projects.sort((a, b) => b.created.getTime() - a.created.getTime());
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
    const imageData = await Bun.file(
      `src/data/projects/${slug}/${image}`,
    );

    const data = await imageData.bytes();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Could not load image "${slug}"`);
  }
}
