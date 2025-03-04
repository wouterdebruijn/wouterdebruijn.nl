"use client";

import React, { useEffect, useState, useCallback } from 'react';

const Header = () => {
    const [subtitle, setSubtitle] = useState("Network engineer");

    const setRandomSubtitle = useCallback((currentTitle: string) => {
        const titles = [
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
        ];

        const otherTitles = titles.filter((title) => title !== currentTitle);
        const randomIndex = Math.floor(Math.random() * otherTitles.length);
        setSubtitle(otherTitles[randomIndex]);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setRandomSubtitle(subtitle);
        }, 2000);
        return () => clearInterval(interval);
    }, [setRandomSubtitle, subtitle]);


    return (
        <header
            className="bg-primary flex flex-col justify-center h-72 items-center font-teko relative"
        >
            <h1 className="text-6xl text-white">Wouter de Bruijn</h1>
            <h2 className="text-4xl">{subtitle}</h2>
        </header>
    );
};

export default Header;