import { ReactNode } from "react";

interface GenericContainerProps {
  children: ReactNode;
  className?: string;
}

export default function GenericContainer({
  children,
  className,
}: GenericContainerProps) {
  return (
    <div
      className={`py-16 flex justify-center items-center ${className || ""}`}
    >
      <div className="container px-8">{children}</div>
    </div>
  );
}

// Export the interface for TypeScript support
export type { GenericContainerProps };
