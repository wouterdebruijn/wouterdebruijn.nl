import "./globals.css";
import { Teko, Roboto } from "next/font/google";
import type { Metadata } from "next";
import PlausibleProvider from "next-plausible/dist/lib/PlausibleProvider";

const teko = Teko({
	variable: "--font-teko",
	subsets: ["latin-ext"],
});
const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin-ext"],
});

const siteUrl =
	process.env.NEXT_PUBLIC_NEXTAUTH_URL ?? "https://wouterdebruijn.nl";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: "Wouter de Bruijn",
	description: "Personal website of Wouter de Bruijn",
	authors: [{ name: "Wouter de Bruijn" }],
	keywords: ["Wouter de Bruijn", "Personal website", "Wouter", "de Bruijn"],
	robots: "index, follow",
	openGraph: {
		type: "website",
		siteName: "Wouter de Bruijn",
		title: "Wouter de Bruijn",
		description: "Personal website of Wouter de Bruijn",
		url: "/",
	},
	twitter: {
		card: "summary",
		title: "Wouter de Bruijn",
		description: "Personal website of Wouter de Bruijn",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<PlausibleProvider>
				<body className={`${teko.variable} ${roboto.variable} antialiased`}>
					{children}
				</body>
			</PlausibleProvider>
		</html>
	);
}
