import { JSX } from "preact/jsx-runtime";

interface GenericImageProps extends JSX.HTMLAttributes<HTMLElement> {
  src: string;
  alt: string;
}

export default function GenericImage({ src, alt }: GenericImageProps) {
  // Element that displays a image, showing the small version while loading the full version
  const smallUrl = src.replace(".webp", "-min.webp");

  return (
    <div class="relative w-full h-full">
      <img
        class="absolute w-full h-full object-cover"
        src={smallUrl}
        loading="lazy"
        decoding="async"
        width="100%"
        height="100%"
        alt={alt}
      />
      <img
        class="w-full h-full object-cover"
        src={src}
        loading="lazy"
        decoding="async"
        width="100%"
        height="100%"
        alt={alt}
      />
    </div>
  );
}
