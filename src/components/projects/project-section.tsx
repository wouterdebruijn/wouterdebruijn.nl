import { ReactNode } from "react";

interface ProjectSectionProps {
  children: ReactNode;
}

export default function ProjectSection({ children }: ProjectSectionProps) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      {items.map((child, i) => (
        <div key={i}>
          {child}
        </div>
      ))}
    </div>
  );
}
