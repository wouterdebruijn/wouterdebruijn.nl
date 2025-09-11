import { About, Experience, Projects, Contact } from "@/components/Home";
import { Header } from "@/components";
import { AuthHeader } from "@/components/Auth";
import { listProjects } from "@/utils/projects";

export default async function Home() {
  const projects = await listProjects();

  return (
    <div>
      <Header />
      <AuthHeader />
      <About />
      <Experience />
      <Projects projects={projects} />
      <Contact />
    </div>
  );
}
