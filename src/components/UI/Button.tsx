interface ButtonProps {
  title: string;
  onClick?: () => void;
  style: "primary" | "secondary" | "white";
}

export default function Button({ title, onClick, style }: ButtonProps) {
  const styles = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    white: "bg-white/40 rounded-full text-black hover:bg-white/60",
  };

  return (
    <button
      className={`${styles[style]} min-w-23 px-6 py-1 text-md rounded cursor-pointer shadow transform transition-transform duration-200 hover:scale-105`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
