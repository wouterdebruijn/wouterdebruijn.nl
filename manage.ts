import { GitHubSlugger } from "$gfm/deps.ts";

const slugger = new GitHubSlugger();

function createProject() {
  const projectName = prompt("Project Name: ");
  const description = prompt("Description: ");
  const cover = prompt("Cover: ", "cover.webp");

  if (!projectName || !description || !cover) {
    console.log("Please provide all the information");
    Deno.exit(1);
  }

  const slug = slugger.slug(projectName);

  const confirmedSlug = prompt(`Slug: `, slug);

  Deno.mkdirSync(`./data/projects/${confirmedSlug}`);
  Deno.writeTextFileSync(
    `./data/projects/${confirmedSlug}/${confirmedSlug}.md`,
    `---
title: ${projectName}
description: ${description}
tags: []
cover: ${cover}
---

# ${projectName}
New Project
`,
  );
}

if (Deno.args.length === 0) {
  console.log("Please provide a command");
  Deno.exit(1);
}

switch (Deno.args[0]) {
  case "createproject":
    await createProject();
    break;
  default:
    console.log("Unknown command");
    Deno.exit(1);
}
