import Image from "next/image";

interface ProjectImageProps {
  src: string;
}

export default function ProjectImage({ src }: ProjectImageProps) {
  return (
    <figure className="block m-0 my-4 w-full sm:w-72 md:w-80 lg:w-96">
      <div className="relative aspect-4/3 border border-white/10 rounded-sm overflow-hidden shadow-md">
        <Image
          alt=""
          fill
          src={src}
          className="object-cover"
        />
        {/* Sloped accent — bottom-right, primary */}
        <div className="absolute bottom-0 right-0 w-8 h-8">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="100,0 100,100 0,100" fill="#1ae0bd" />
          </svg>
        </div>
      </div>
    </figure>
  );
}
