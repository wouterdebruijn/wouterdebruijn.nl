import React from "react";

interface ProjectHeaderProps {
    children: string;
    type: "h1" | "h2" | "h3" | "h4";
}

// Header with anchor and underline
export default function ProjectHeader({ children, type }: ProjectHeaderProps) {
    const Tag = type;
    const slug = children.toLowerCase().replace(/\s+/g, '-');

    const sizemap = {
        "h1": "text-3xl",
        "h2": "text-2xl",
        "h3": "text-xl",
        "h4": "text-lg",
    }

    const color = type === "h1" ? "text-gray-200" : "text-gray-400";

    return (
        <Tag className={`relative group mb-2 border-gray-700 border-b-1 mt-4 font-semibold ${sizemap[type]} ${color}`} id={slug}>
            <div className="group no-underline absolute -left-4 h-full w-full flex row items-center">
                <a className="text-lg invisible group-hover:visible" href={`#${slug}`} >
                    #
                </a>
            </div>
            {children}
        </Tag>
    );
}