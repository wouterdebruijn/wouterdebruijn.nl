import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "white";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: ButtonVariant;
}

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  white: "bg-white/40 rounded-full text-black hover:bg-white/60",
} as const;

export default function Button({
  title,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const variantStyles = BUTTON_STYLES[variant];

  return (
    <button
      className={`${variantStyles} min-w-23 px-6 py-1 text-md rounded cursor-pointer shadow transform transition-transform duration-200 hover:scale-105 ${className || ""}`}
      {...props}
    >
      {title}
    </button>
  );
}
