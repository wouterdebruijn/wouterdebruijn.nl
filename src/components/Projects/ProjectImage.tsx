import React from "react";
import Image from "next/image";

interface ProjectImageProps {
    src: string;
}

// Header with anchor and underline
export default function ProjectImage({ src }: ProjectImageProps) {
    return (
        <Image alt='unknown' width={500} height={500} src={src} className="shadow-md my-4" />
    );
}