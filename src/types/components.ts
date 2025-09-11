// Common component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Project related types
export interface ProjectMetadata {
  title: string;
  description: string;
  cover: string;
  slug: string;
  tags?: string[];
  created: Date;
  updated: Date;
}

// UI component variants
export type ButtonVariant = "primary" | "secondary" | "white";
export type HeaderLevel = "h1" | "h2" | "h3" | "h4";

// Layout types
export interface ContainerProps extends BaseComponentProps {
  bottomSlope?: boolean;
}
