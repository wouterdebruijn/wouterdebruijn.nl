import GenericContainer from '@/components/GenericContainer'
import SlopedContainer from '@/components/SlopedContainer'
import { compileMDX } from 'next-mdx-remote/rsc'
import { readFile } from "node:fs/promises"
import { Project } from '@/utils/projects'
import remarkGfm from 'remark-gfm'

import { ComponentPropsWithoutRef } from 'react'
import ProjectHeader from '@/components/Projects/ProjectHeader'
import ProjectImage from '@/components/Projects/ProjectImage'
import Link from 'next/link'

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ project: string }>
}) {
    const project = (await params).project
    const file = await readFile(`data/projects/${project}/${project}.md`, "utf-8")

    const components = {
        "h1": (props: ComponentPropsWithoutRef<"h1">) => <ProjectHeader type="h1">{String(props.children)}</ProjectHeader>,
        "h2": (props: ComponentPropsWithoutRef<"h2">) => <ProjectHeader type="h2">{String(props.children)}</ProjectHeader>,
        "h3": (props: ComponentPropsWithoutRef<"h3">) => <ProjectHeader type="h3">{String(props.children)}</ProjectHeader>,
        "h4": (props: ComponentPropsWithoutRef<"h4">) => <ProjectHeader type="h4">{String(props.children)}</ProjectHeader>,
        "ul": (props: ComponentPropsWithoutRef<"ul">) => <ul className="list-disc pl-6" {...props} />,
        "ol": (props: ComponentPropsWithoutRef<"ol">) => <ol className="list-decimal pl-6" {...props} />,
        "li": (props: ComponentPropsWithoutRef<"li">) => <li className="font-roboto" {...props} />,
        "p": (props: ComponentPropsWithoutRef<"p">) => <p className="mt-2 font-roboto" {...props} />,
        "a": (props: ComponentPropsWithoutRef<"a">) => <a className="text-secondary hover:underline" {...props} />,
        "img": (props: ComponentPropsWithoutRef<"img">) => <ProjectImage src={`/projects/${project}/${props.src}`} />,
    }

    const { content, frontmatter } = await compileMDX<Project>({
        source: file,
        options: { parseFrontmatter: true, mdxOptions: {
            baseUrl: `/projects/${project}/`,
            remarkPlugins: [remarkGfm]
        } },
        components,
    })

    const data = {
        ...frontmatter,
        created: new Date(frontmatter.created),
        updated: new Date(frontmatter.updated),
    }

    return (
        <div>
            <GenericContainer className="bg-primary pt-14 pb-4">
                <div className="flex flex-col text-right">
                    <div className="text-4xl">
                        <Link href="/">Wouter de Bruijn</Link>
                    </div>
                    <div>
                        <h1 className="text-5xl text-white">{data.title}</h1>
                        <p className="hidden text-xl max-w-3xl ml-auto lg:block">
                            {data.description}
                        </p>
                    </div>
                </div>
            </GenericContainer>

            <SlopedContainer bottomSlope={false}>
                <div className="lg:mx-32 md:mx-8">
                    <article
                        className="text-white"
                    >
                        {content}
                    </article>
                    <div className="mt-4 text-right text-gray-300">
                        <p className="text-xs m-0">
                            Created: {data.created.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                        <p className="text-xs m-0">
                            Last edit: {data.updated.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>
            </SlopedContainer>
        </div>
    )
}