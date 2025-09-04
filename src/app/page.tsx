import About from "@/components/Home/About";
import Header from "../components/Header";
import Experience from "@/components/Home/Experience";
import Projects from "@/components/Home/Projects";
import Contact from "@/components/Home/Contact";
import { listProjects } from "@/utils/projects";
import AuthHeader from "@/components/Auth/AuthHeader";

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
