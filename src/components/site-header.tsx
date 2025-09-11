"use client";

import { useEffect, useState, useCallback } from "react";

interface HeaderProps {
  className?: string;
}

const SUBTITLE_ROTATION_TITLES = [
  "Software engineer",
  "Full stack developer",
  "Network engineer",
  "Very cool guy",
  "Owner of a cool website",
  "Homelab enthusiast",
  "Thinking with portals",
  "Scripting my way through life",
  "WoIP, Wouter over IP",
  "Linux Guru",
  "The guy that knows stuff",
] as const;

const SUBTITLE_INTERVAL_MS = 2000;

export default function SiteHeader({ className }: HeaderProps) {
  const [subtitle, setSubtitle] = useState<string>("Network engineer");

  const setRandomSubtitle = useCallback((currentTitle: string) => {
    const otherTitles = SUBTITLE_ROTATION_TITLES.filter(
      (title) => title !== currentTitle
    );
    const randomIndex = Math.floor(Math.random() * otherTitles.length);
    setSubtitle(otherTitles[randomIndex]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomSubtitle(subtitle);
    }, SUBTITLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [setRandomSubtitle, subtitle]);

  return (
    <header
      className={`bg-primary flex flex-col justify-center h-72 items-center font-teko relative ${className || ""}`}
    >
      <h1 className="text-6xl text-white">Wouter de Bruijn</h1>
      <h2 className="text-4xl">{subtitle}</h2>
    </header>
  );
}
