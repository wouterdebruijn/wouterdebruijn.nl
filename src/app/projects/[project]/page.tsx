import { SlopedContainer } from "@/components/ui";
import {
	MediaStack,
	ProjectHeader,
	ProjectImage,
	ProjectSection,
	ProjectTitle,
	ProjectVideo,
} from "@/components/projects";
import { compileMDX } from "next-mdx-remote/rsc";
import { readFile } from "node:fs/promises";
import type { Project } from "@/utils/projects";
import type { ComponentPropsWithoutRef } from "react";
import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ project: string }>;
}): Promise<Metadata> {
	const project = (await params).project;
	const file = await readFile(
		`data/projects/${project}/${project}.md`,
		"utf-8",
	);

	const { frontmatter } = await compileMDX<Project>({
		source: file,
		options: { parseFrontmatter: true },
	});

	const url = `/projects/${project}`;
	const cover = `/projects/${project}/${frontmatter.cover}`;

	return {
		title: frontmatter.title,
		description: frontmatter.description,
		authors: [{ name: "Wouter de Bruijn" }],
		keywords: frontmatter.tags,
		robots: "index, follow",
		openGraph: {
			type: "article",
			siteName: "Wouter de Bruijn",
			title: frontmatter.title,
			description: frontmatter.description,
			url,
			images: [
				{
					url: cover,
					alt: frontmatter.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: frontmatter.title,
			description: frontmatter.description,
			images: [cover],
		},
	};
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ project: string }>;
}) {
	const project = (await params).project;
	const file = await readFile(
		`data/projects/${project}/${project}.md`,
		"utf-8",
	);

	const components = {
		h1: (props: ComponentPropsWithoutRef<"h1">) => (
			<ProjectHeader type="h1">{String(props.children)}</ProjectHeader>
		),
		h2: (props: ComponentPropsWithoutRef<"h2">) => (
			<ProjectHeader type="h2">{String(props.children)}</ProjectHeader>
		),
		h3: (props: ComponentPropsWithoutRef<"h3">) => (
			<ProjectHeader type="h3">{String(props.children)}</ProjectHeader>
		),
		h4: (props: ComponentPropsWithoutRef<"h4">) => (
			<ProjectHeader type="h4">{String(props.children)}</ProjectHeader>
		),
		ul: (props: ComponentPropsWithoutRef<"ul">) => (
			<ul className="list-disc pl-6" {...props} />
		),
		ol: (props: ComponentPropsWithoutRef<"ol">) => (
			<ol className="list-decimal pl-6" {...props} />
		),
		li: (props: ComponentPropsWithoutRef<"li">) => (
			<li className="font-roboto" {...props} />
		),
		p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => {
			const hasBlock = Array.isArray(children)
				? children.some((c) => typeof c === "object")
				: typeof children === "object";
			return hasBlock ? (
				<div className="mt-2 font-roboto">{children}</div>
			) : (
				<p className="mt-2 font-roboto" {...props}>
					{children}
				</p>
			);
		},
		a: (props: ComponentPropsWithoutRef<"a">) => (
			<a className="text-secondary hover:underline" {...props} />
		),
		img: (props: ComponentPropsWithoutRef<"img">) => (
			<ProjectImage src={`/projects/${project}/${props.src}`} />
		),
		Image: ({ src }: { src: string }) => (
			<ProjectImage src={`/projects/${project}/${src}`} />
		),
		Video: ({
			src,
			muted,
			controls,
			autoPlay,
		}: {
			src: string;
			muted?: boolean;
			controls?: boolean;
			autoPlay?: boolean;
		}) => (
			<ProjectVideo
				src={`/projects/${project}/${src}`}
				muted={muted}
				controls={controls}
				autoPlay={autoPlay}
			/>
		),
		MediaStack,
		Section: ProjectSection,
	};

	const { content, frontmatter } = await compileMDX<Project>({
		source: file,
		options: {
			parseFrontmatter: true,
			mdxOptions: {
				baseUrl: `/projects/${project}/`,
			},
		},
		components,
	});

	const data = {
		...frontmatter,
		created: new Date(frontmatter.created),
		updated: new Date(frontmatter.updated),
	};

	return (
		<div>
			<ProjectTitle data={data} />

			<SlopedContainer bottomSlope={false}>
				<div>
					<article className="text-white">{content}</article>
					<div className="mt-4 text-right text-gray-300">
						<p className="text-xs m-0">
							Created:{" "}
							{data.created.toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
						<p className="text-xs m-0">
							Last edit:{" "}
							{data.updated.toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
					</div>
				</div>
			</SlopedContainer>
		</div>
	);
}
