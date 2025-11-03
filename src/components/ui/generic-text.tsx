import { ReactNode } from "react";

interface GenericTextProps {
  children: ReactNode;
  title: string;
  className?: string;
}

export default function GenericText({
  children,
  title,
  className,
}: GenericTextProps) {
  return (
    <article className={className}>
      <h1 className="text-2xl text-white my-2">{title}</h1>
      {children}
    </article>
  );
}
