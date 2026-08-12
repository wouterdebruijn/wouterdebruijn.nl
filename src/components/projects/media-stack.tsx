import type { ReactNode } from "react";

interface MediaStackProps {
	children: ReactNode;
}

export default function MediaStack({ children }: MediaStackProps) {
	return (
		<div className="flex flex-row flex-wrap gap-4 my-4 items-start">
			{children}
		</div>
	);
}
