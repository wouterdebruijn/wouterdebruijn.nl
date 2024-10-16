import { JSX } from "preact/jsx-runtime";

interface SlopedContainerProps extends JSX.HTMLAttributes<HTMLDivElement> {
  bottomSlope?: boolean;
}

export function SlopedContainer(
  { bottomSlope, ...props }: SlopedContainerProps = {
    bottomSlope: true,
  },
) {
  return (
    <div
      {...props}
      class="bg-background relative py-24 flex justify-center items-center"
    >
      {/* Slanted border */}
      <div class="absolute top-0 left-0 right-0 h-10 bg-background">
        <svg
          class="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 100,0 100,100" fill="#1AE0BD" />
        </svg>
      </div>

      <div class="container px-8">
        {props.children}
      </div>

      {bottomSlope && (
        <div class="absolute bottom-0 left-0 right-0 h-10 bg-background">
          <svg
            class="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="0,100 100,0 100,100" fill="#1AE0BD" />
          </svg>
        </div>
      )}
    </div>
  );
}
