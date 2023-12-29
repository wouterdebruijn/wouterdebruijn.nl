import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

export default function Header(props: JSX.HTMLAttributes<HTMLHeadElement>) {
  const titles = [
    "Software Engineer",
    "Full Stack Developer",
    "Network Engineer",
    "Very cool guy",
    "Owner of a cool website",
    "Homelab enthusiast",
    "Linux user",
  ];

  const [subtitle, setSubtitle] = useState("Software Engineer");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * titles.length);
      setSubtitle(titles[randomIndex]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header
        {...props}
        class="bg-primary flex flex-col justify-center h-64 items-center font-teko relative"
      >
        <h1 class="text-6xl font-bold text-white">Wouter de Bruijn</h1>
        <h2 class="text-4xl">{subtitle}</h2>
      </header>
    </>
  );
}
