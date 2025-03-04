import { loadProjectImage } from '../../../../utils/projects';
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest, {params}: {params: Promise<{project: string, asset: string}>}) {
    const { project, asset } = await params

    if (!project || !asset) {
        return new NextResponse(null, { status: 404 })
    }

    const imageData = await loadProjectImage(project, asset)

    return new NextResponse(imageData, {
        headers: {
            'Content-Type': 'image/webp',
        },
    })
}