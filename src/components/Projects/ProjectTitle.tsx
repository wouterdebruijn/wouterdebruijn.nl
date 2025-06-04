"use client";

import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import GenericContainer from "../GenericContainer";
import Link from "next/link";
import SlopedContainer from "../SlopedContainer";

interface ProjectTitleProps {
    data: {
        title: string;
        description: string;
    }
}

export default function ProjectTitle({ data }: ProjectTitleProps) {
    return (
        <GenericContainer className="bg-primary pt-14 pb-4">
            <div className="flex flex-col text-right">
                <span className="text-4xl font-teko">
                    <Link href="/">Wouter de Bruijn</Link>
                </span>
                <div>
                    <span className="text-5xl text-white font-teko">{data.title}</span>
                    <p className="hidden max-w-3xl ml-auto lg:block">
                        {data.description}
                    </p>
                </div>
            </div>
        </GenericContainer>
    )
}