import { JSX } from "preact/jsx-runtime";

export function SlopedContainer(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      class="bg-background relative py-24 flex justify-center items-center"
    >
      {/* Above triangle */}
      <div
        class="absolute top-0 left-0 w-full h-16 bg-primary min-w-[100rem]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 20%)",
        }}
      />

      <div class="container px-8">
        {props.children}
      </div>

      {/* Below triangle inverse */}
      <div
        class="absolute bottom-0 left-0 w-full h-16 bg-primary min-w-[100rem]"
        style={{
          clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 80%)",
        }}
      />
    </div>
  );
}
