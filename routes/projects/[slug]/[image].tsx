import { Handlers } from "$fresh/server.ts";
import { loadProjectImage } from "../../../utils/projects.ts";

export const handler: Handlers<string> = {
  async GET(_req, ctx) {
    const imageData = await loadProjectImage(ctx.params.slug, ctx.params.image);

    if (!imageData) {
      ctx.renderNotFound();
    }

    const headers = new Headers();
    headers.set("content-type", "image/png");

    return new Response(imageData, { headers });
  },
};
