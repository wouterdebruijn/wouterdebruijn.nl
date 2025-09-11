type HeaderLevel = "h1" | "h2" | "h3" | "h4";

interface ProjectHeaderProps {
  children: string;
  type: HeaderLevel;
  className?: string;
}

const SIZE_MAP: Record<HeaderLevel, string> = {
  h1: "text-3xl mt-8",
  h2: "text-2xl",
  h3: "text-xl",
  h4: "text-lg",
} as const;

function generateSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-");
}

// Header with anchor and underline
export default function ProjectHeader({
  children,
  type,
  className,
}: ProjectHeaderProps) {
  const Tag = type;
  const slug = generateSlug(children);
  const sizeClass = SIZE_MAP[type];
  const color = type === "h1" ? "text-gray-200" : "text-gray-400";

  return (
    <Tag
      className={`relative group mb-2 border-gray-700 border-b-1 mt-4 font-semibold ${sizeClass} ${color} ${className || ""}`}
      id={slug}
    >
      <div className="group no-underline absolute -left-4 h-full w-full flex row items-center">
        <a
          className="text-lg invisible group-hover:visible"
          href={`#${slug}`}
          aria-label={`Link to ${children} section`}
        >
          #
        </a>
      </div>
      {children}
    </Tag>
  );
}
