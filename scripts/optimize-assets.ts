#!/usr/bin/env -S npx tsx

/**
 * Converts all images and videos in a project folder to optimized web versions.
 *
 * Usage: tsx scripts/optimize-assets.ts [--gif] [--contain] [--audio] <folder>
 *
 * For each image two files are created:
 *   img.webp     — web-quality version (max 1280px wide, quality 85), cropped to 4:3
 *   img-min.webp — thumbnail version (max 400px wide, quality 70), cropped to 4:3
 *
 * For each video:
 *   Without --gif: img-web.webm (VP9) and img-web.mp4 (H.264 fallback), max 1280px wide, 4:3 crop
 *   With --gif:    img.gif, scaled to max 640px wide, 4:3 crop
 *
 * Image flags:
 *   --contain  fit the full image within 4:3 (no cropping), filling empty space with the
 *              image's detected background colour (sampled from corners). Useful for scans.
 *
 * Video flags:
 *   --audio    keep the audio track (Opus for webm, AAC for mp4). By default audio is
 *              stripped, which leaves the player's mute button disabled.
 *
 * Original files are left untouched. All EXIF/metadata is stripped.
 */

import { spawn } from "node:child_process";
import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import { glob } from "glob";
import sharp, { type ResizeOptions } from "sharp";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".tiff", ".avif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".avi", ".mkv", ".webm"]);

const WEB_MAX_WIDTH = 1280;
const WEB_QUALITY = 85;

const THUMB_MAX_WIDTH = 400;
const THUMB_QUALITY = 70;

const VIDEO_MAX_WIDTH = 1280;
const GIF_MAX_WIDTH = 640;

function ffmpeg(args: string[]): Promise<void> {
	return new Promise((resolve, reject) => {
		const proc = spawn("ffmpeg", ["-y", ...args], {
			stdio: ["ignore", "ignore", "pipe"],
		});
		let stderr = "";
		proc.stderr.on("data", (d: Buffer) => (stderr += d.toString()));
		proc.on("close", (code) => {
			if (code === 0) resolve();
			else reject(new Error(`ffmpeg exited with code ${code}\n${stderr}`));
		});
	});
}

async function findFiles(dir: string): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true });
	const files: string[] = [];

	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await findFiles(fullPath)));
		} else {
			const ext = parse(entry.name).ext.toLowerCase();
			if (IMAGE_EXTENSIONS.has(ext) || VIDEO_EXTENSIONS.has(ext)) {
				files.push(fullPath);
			}
		}
	}

	return files;
}

async function resolveInputs(patterns: string[]): Promise<string[]> {
	const files: string[] = [];

	for (const pattern of patterns) {
		const s = await stat(pattern).catch(() => null);
		if (s?.isDirectory()) {
			files.push(...(await findFiles(pattern)));
		} else {
			const matched = await glob(pattern, { nodir: true });
			for (const f of matched) {
				const ext = parse(f).ext.toLowerCase();
				if (IMAGE_EXTENSIONS.has(ext) || VIDEO_EXTENSIONS.has(ext)) {
					files.push(f);
				}
			}
		}
	}

	return files;
}

async function sampleBackgroundColor(
	inputPath: string,
): Promise<{ r: number; g: number; b: number }> {
	const meta = await sharp(inputPath).metadata();
	const w = meta.width ?? 0;
	const h = meta.height ?? 0;
	const size = Math.max(1, Math.min(20, Math.floor(Math.min(w, h) * 0.03)));

	const corners = [
		{ left: 0, top: 0 },
		{ left: Math.max(0, w - size), top: 0 },
		{ left: 0, top: Math.max(0, h - size) },
		{ left: Math.max(0, w - size), top: Math.max(0, h - size) },
	];

	// Quantise to buckets of 8 to reduce scan noise, then pick the most frequent bucket
	const quantise = (v: number) => Math.round(v / 8) * 8;
	const freq = new Map<
		string,
		{ count: number; r: number; g: number; b: number }
	>();

	for (const corner of corners) {
		const { data, info } = await sharp(inputPath)
			.extract({
				left: corner.left,
				top: corner.top,
				width: size,
				height: size,
			})
			.flatten({ background: { r: 255, g: 255, b: 255 } })
			.toColourspace("srgb")
			.raw()
			.toBuffer({ resolveWithObject: true });

		const ch = info.channels;
		for (let i = 0; i < data.length; i += ch) {
			const r = quantise(data[i]);
			const g = quantise(data[i + 1]);
			const b = quantise(data[i + 2]);
			const key = `${r},${g},${b}`;
			const entry = freq.get(key) ?? { count: 0, r, g, b };
			entry.count++;
			freq.set(key, entry);
		}
	}

	const best = [...freq.values()].reduce((a, b) => (b.count > a.count ? b : a));
	return { r: best.r, g: best.g, b: best.b };
}

async function convertImage(
	inputPath: string,
	containMode: boolean,
): Promise<void> {
	const { dir, name } = parse(inputPath);

	const webPath = join(dir, `${name}.webp`);
	const thumbPath = join(dir, `${name}-min.webp`);

	let resizeOptions: ResizeOptions;
	let background: { r: number; g: number; b: number } | undefined;

	if (containMode) {
		background = await sampleBackgroundColor(inputPath);
		resizeOptions = {
			width: WEB_MAX_WIDTH,
			height: Math.round((WEB_MAX_WIDTH * 3) / 4),
			fit: "contain",
			background,
			withoutEnlargement: true,
		};
	} else {
		resizeOptions = {
			width: WEB_MAX_WIDTH,
			height: Math.round((WEB_MAX_WIDTH * 3) / 4),
			fit: "cover",
			withoutEnlargement: true,
		};
	}

	// .rotate() (no args) bakes EXIF orientation into the pixels; sharp then
	// strips all metadata by default (no .withMetadata()), so nothing — GPS
	// included — carries through to the output.
	await sharp(inputPath)
		.rotate()
		.resize(resizeOptions)
		.webp({ quality: WEB_QUALITY })
		.toFile(webPath);

	await sharp(inputPath)
		.rotate()
		.resize({
			...resizeOptions,
			width: THUMB_MAX_WIDTH,
			height: Math.round((THUMB_MAX_WIDTH * 3) / 4),
		})
		.webp({ quality: THUMB_QUALITY })
		.toFile(thumbPath);

	console.log(
		`  ${inputPath}${containMode ? ` [contain bg=${JSON.stringify(background)}]` : ""}`,
	);
	console.log(`    -> ${webPath}`);
	console.log(`    -> ${thumbPath}`);
}

async function convertVideoToWeb(
	inputPath: string,
	keepAudio: boolean,
): Promise<void> {
	const { dir, name } = parse(inputPath);
	const w = VIDEO_MAX_WIDTH;
	const h = Math.round((w * 3) / 4);
	// crop to 4:3 then scale, keeping within max width
	const vf = `crop='min(iw,ih*4/3)':'min(ih,iw*3/4)',scale=${w}:${h}:force_original_aspect_ratio=decrease`;

	const webmPath = join(dir, `${name}-web.webm`);
	const mp4Path = join(dir, `${name}-web.mp4`);

	// VP9: constrained quality mode, good preset, multithreaded row encoding
	await ffmpeg([
		"-i",
		inputPath,
		"-vf",
		vf,
		"-c:v",
		"libvpx-vp9",
		"-crf",
		"33",
		"-b:v",
		"0",
		"-deadline",
		"good",
		"-cpu-used",
		"2",
		"-row-mt",
		"1",
		...(keepAudio ? ["-c:a", "libopus", "-b:a", "96k"] : ["-an"]),
		// ffmpeg copies global metadata (incl. phone GPS tags) by default
		"-map_metadata",
		"-1",
		webmPath,
	]);

	// H.264 fallback for older browsers
	await ffmpeg([
		"-i",
		inputPath,
		"-vf",
		vf,
		"-c:v",
		"libx264",
		"-crf",
		"23",
		"-preset",
		"slow",
		...(keepAudio ? ["-c:a", "aac", "-b:a", "128k"] : ["-an"]),
		"-map_metadata",
		"-1",
		"-movflags",
		"+faststart",
		mp4Path,
	]);

	console.log(`  ${inputPath}`);
	console.log(`    -> ${webmPath}`);
	console.log(`    -> ${mp4Path}`);
}

async function convertVideoToGif(inputPath: string): Promise<void> {
	const { dir, name } = parse(inputPath);
	const w = GIF_MAX_WIDTH;
	const h = Math.round((w * 3) / 4);
	const vf = `crop='min(iw,ih*4/3)':'min(ih,iw*3/4)',scale=${w}:${h}:force_original_aspect_ratio=decrease,fps=15,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`;

	const gifPath = join(dir, `${name}.gif`);

	await ffmpeg(["-i", inputPath, "-vf", vf, gifPath]);

	console.log(`  ${inputPath}`);
	console.log(`    -> ${gifPath}`);
}

async function main() {
	const args = process.argv.slice(2);
	const gifMode = args.includes("--gif");
	const containMode = args.includes("--contain");
	const keepAudio = args.includes("--audio");
	const patterns = args.filter((a) => !a.startsWith("--"));

	if (patterns.length === 0) {
		console.error(
			"Usage: tsx scripts/optimize-assets.ts [--gif] [--contain] [--audio] <folder|pattern> [pattern...]",
		);
		process.exit(1);
	}

	const files = await resolveInputs(patterns);

	if (files.length === 0) {
		console.log("No files found.");
		return;
	}

	console.log(
		`Found ${files.length} file(s) (video mode: ${gifMode ? "gif" : "webm + mp4"}, image mode: ${containMode ? "contain" : "cover"})\n`,
	);

	let converted = 0;
	let skipped = 0;

	for (const file of files) {
		const { name, ext } = parse(file);
		const extLower = ext.toLowerCase();

		// Skip already-generated outputs
		if (
			name.endsWith("-min") ||
			name.endsWith("-web") ||
			extLower === ".webp"
		) {
			skipped++;
			continue;
		}

		if (IMAGE_EXTENSIONS.has(extLower)) {
			await convertImage(file, containMode);
			converted++;
		} else if (VIDEO_EXTENSIONS.has(extLower)) {
			if (gifMode) {
				await convertVideoToGif(file);
			} else {
				await convertVideoToWeb(file, keepAudio);
			}
			converted++;
		}
	}

	console.log(`\nDone. Converted: ${converted}, Skipped: ${skipped}`);
}

main().catch((err) => {
	console.error("Error:", err.message);
	process.exit(1);
});
