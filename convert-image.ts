import {
  ImageMagick,
  IMagickImage,
  initialize,
  MagickFormat,
} from "https://deno.land/x/imagemagick_deno@0.0.26/mod.ts";

const imgPath = Deno.args[0];

const imageName = imgPath.split("/").pop();
const folderPath = imgPath.split("/").slice(0, -1).join("/");
const bareName = imageName.split(".")[0];

if (!imgPath) {
  console.error("Please provide an image path");
  Deno.exit(1);
}

await initialize(); // make sure to initialize first!

const data: Uint8Array = await Deno.readFile(imgPath);

await ImageMagick.read(data, async (img: IMagickImage) => {
  img.strip();

  // Resize to length of 500 preserving aspect ratio
  img.resize(800, 800);

  await img.write(
    MagickFormat.Webp,
    (data: Uint8Array) =>
      Deno.writeFile(`${folderPath}/${bareName}.webp`, data),
  );

  img.resize(100, 100);

  await img.write(
    MagickFormat.Webp,
    (data: Uint8Array) =>
      Deno.writeFile(`${folderPath}/${bareName}-min.webp`, data),
  );
});
