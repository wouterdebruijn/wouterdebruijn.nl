// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $index from "./routes/index.tsx";
import * as $projects_slug_image_ from "./routes/projects/[slug]/[image].tsx";
import * as $projects_slug_index from "./routes/projects/[slug]/index.tsx";
import * as $Header from "./islands/Header.tsx";
import * as $PlausibleLoader from "./islands/PlausibleLoader.tsx";
import * as $ProjectCard from "./islands/ProjectCard.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/index.tsx": $index,
    "./routes/projects/[slug]/[image].tsx": $projects_slug_image_,
    "./routes/projects/[slug]/index.tsx": $projects_slug_index,
  },
  islands: {
    "./islands/Header.tsx": $Header,
    "./islands/PlausibleLoader.tsx": $PlausibleLoader,
    "./islands/ProjectCard.tsx": $ProjectCard,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
