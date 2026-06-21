interface ProjectVideoProps {
  src: string;
  muted?: boolean;
  controls?: boolean;
  autoPlay?: boolean;
}

export default function ProjectVideo({ src, muted = true, controls = false, autoPlay = true }: ProjectVideoProps) {
  return (
    <figure className="block m-0 my-4 w-full sm:w-72 md:w-80 lg:w-96">
      <div className="relative aspect-[4/3] border border-white/10 rounded-sm overflow-hidden shadow-md">
        <video
          autoPlay={autoPlay}
          loop
          muted={muted}
          controls={controls}

          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={`${src}.webm`} type="video/webm" />
          <source src={`${src}.mp4`} type="video/mp4" />
        </video>
        {/* Sloped accent — top-left, secondary */}
        <div className="absolute top-0 left-0 w-8 h-8">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="0,0 100,0 0,100" fill="#faca3f" />
          </svg>
        </div>
      </div>
    </figure>
  );
}
