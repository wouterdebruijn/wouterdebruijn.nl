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

  function setRandomSubtitle(currentTitle: string) {
    const otherTitles = titles.filter((title) => title !== currentTitle);
    const randomIndex = Math.floor(Math.random() * otherTitles.length);
    setSubtitle(otherTitles[randomIndex]);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomSubtitle(subtitle);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header
        {...props}
        class="bg-primary flex flex-col justify-center h-72 items-center font-teko relative"
      >
        <h1 class="text-6xl font-bold text-white">Wouter de Bruijn</h1>
        <h2 class="text-4xl">{subtitle}</h2>
      </header>
    </>
  );
}
