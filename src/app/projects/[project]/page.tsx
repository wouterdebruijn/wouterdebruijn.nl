import GenericContainer from '@/components/GenericContainer'
import SlopedContainer from '@/components/SlopedContainer'
import { compileMDX } from 'next-mdx-remote/rsc'
import { readFile } from "node:fs/promises"
import { Project } from '@/utils/projects'

import { ComponentPropsWithoutRef } from 'react'
import ProjectHeader from '@/components/Projects/ProjectHeader'
import ProjectImage from '@/components/Projects/ProjectImage'
import { Metadata } from 'next'
import { initPocketBase } from '@/lib/pocketbase'
import ProjectComment from '@/components/Projects/ProjectComment'
import ProjectTitle from '@/components/Projects/ProjectTitle'

import { PbComment } from '@/types'

export async function generateMetadata({ params }: {
    params: Promise<{ project: string }>
}): Promise<Metadata> {
    const project = (await params).project
    const file = await readFile(`data/projects/${project}/${project}.md`, "utf-8")

    const { frontmatter } = await compileMDX<Project>({
        source: file,
        options: { parseFrontmatter: true },
    })

    return {
        title: frontmatter.title,
        description: frontmatter.description,
        authors: [{ name: "Wouter de Bruijn" }],
        keywords: frontmatter.tags,
        robots: "index, follow",
    }
}

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
        options: {
            parseFrontmatter: true, mdxOptions: {
                baseUrl: `/projects/${project}/`,
            }
        },
        components,
    })

    const data = {
        ...frontmatter,
        created: new Date(frontmatter.created),
        updated: new Date(frontmatter.updated),
    }

    const pb = await initPocketBase();
    const projectsList = await pb.collection('projects').getList(1, 1, { filter: `slug = "${project}"`, expand: 'comments_via_project',  });

    const projectObject = projectsList.items[0];
    const comments = projectObject.expand?.comments_via_project as PbComment[]

    const commentsWithReplies = comments.map((c) => {
        c.replies = comments.filter((r) => r.reply_to === c.id);
        return c;
    });

    const commentsFiltered = commentsWithReplies.filter((c) => !c.reply_to);

    return (
        <div>
            <ProjectTitle data={data} />

            <SlopedContainer bottomSlope={false}>
                <div>
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

            <GenericContainer className="bg-primary py-8">
                {
                    commentsFiltered.map((c) => <ProjectComment key={c.id} comment={c} replies={c.replies} />)
                }
            </GenericContainer>
        </div>
    )
}