import { NextResponse } from "next/server";
import { loadProjectImage } from "../../../../utils/projects";

export const dynamic = "force-static";

const contentTypes: Record<string, string> = {
	webp: "image/webp",
	jpeg: "image/jpeg",
	png: "image/png",
	mp4: "video/mp4",
	webm: "video/webm",
};

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ project: string; asset: string }> },
) {
	const { project, asset } = await params;

	if (!project || !asset) {
		return new NextResponse(null, { status: 404 });
	}

	const imageData = await loadProjectImage(project, asset);
	const extension = asset.split(".").pop() ?? "";

	return new NextResponse(imageData, {
		headers: {
			"Content-Type": contentTypes[extension] ?? "application/octet-stream",
		},
	});
}
