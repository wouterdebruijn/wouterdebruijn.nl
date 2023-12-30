import { JSX } from "preact/jsx-runtime";

interface GenericTextProps extends JSX.HTMLAttributes<HTMLElement> {
  title: string;
}

export function GenericText(props: GenericTextProps) {
  return (
    <section
      {...props}
    >
      <h1 class="text-2xl font-bold text-white">{props.title}</h1>
      {props.children}
    </section>
  );
}
