import {
  ImageMagick,
  IMagickImage,
  initialize,
  MagickFormat,
} from "https://deno.land/x/imagemagick_deno@0.0.31/mod.ts";

const projectName = Deno.args[0];
const imgPath = Deno.args[1];
const imageName = Deno.args[2];
const rotateArg = Deno.args[3];

const rotate = rotateArg ? !!rotateArg : false;

const bareName = imageName.split(".")[0];

if (!imgPath) {
  console.error("Please provide an image path");
  Deno.exit(1);
}

if (!projectName) {
  console.error("Please provide a project name");
  Deno.exit(1);
}

const projectPath = `./data/projects/${projectName}`;

await initialize(); // make sure to initialize first!

const data: Uint8Array = await Deno.readFile(imgPath);

await ImageMagick.read(data, async (img: IMagickImage) => {
  img.strip();

  // Resize to length of 500 preserving aspect ratio
  img.resize(800, 800);

  if (rotate) {
    img.rotate(90);
  }

  await img.write(
    MagickFormat.WebP,
    (data: Uint8Array) =>
      Deno.writeFile(`${projectPath}/${bareName}.webp`, data),
  );

  img.resize(100, 100);

  await img.write(
    MagickFormat.WebP,
    (data: Uint8Array) =>
      Deno.writeFile(`${projectPath}/${bareName}-min.webp`, data),
  );
});
