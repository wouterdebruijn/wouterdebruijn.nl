import { JSX } from "preact/jsx-runtime";

interface GenericTextProps extends JSX.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function GenericText(props: GenericTextProps) {
  return (
    <div
      {...props}
      class="text-white"
    >
      <h1 class="text-2xl font-bold">{props.title}</h1>
      {props.children}
    </div>
  );
}
