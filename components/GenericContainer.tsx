import { JSX } from "preact/jsx-runtime";

export function GenericContainer(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      class={`relative py-24 flex justify-center items-center ${props.class}`}
    >
      <div class="container px-8">
        {props.children}
      </div>
    </div>
  );
}
