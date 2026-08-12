import { About, Experience, Projects, Contact } from "@/components/home";
import { SiteHeader } from "@/components";
import { listProjects } from "@/utils/projects";

export default async function Home() {
	const projects = await listProjects();

	return (
		<div>
			<SiteHeader />
			<About />
			<Experience />
			<Projects projects={projects} />
			<Contact />
		</div>
	);
}
