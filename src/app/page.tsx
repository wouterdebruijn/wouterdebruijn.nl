import About from "@/components/Home/About";
import Header from "../components/Header";
import Experience from "@/components/Home/Experience";
import Projects from "@/components/Home/Projects";
import Contact from "@/components/Home/Contact";
import { listProjects } from "@/utils/projects";

import { cookies } from "next/headers";
import { initPocketBase } from "@/lib/pocketbase";

export default async function Home() {
  const cookieStore = await cookies();
  const authCookieValue = cookieStore.get("pb_auth")?.value;
  const authStoreJson = authCookieValue ? JSON.parse(authCookieValue) : null;

  const pb = await initPocketBase(authStoreJson);

  const projectsDb = await pb.collection("projects").getList();
  const projects = await listProjects();

  try {
    if (!pb.authStore.isValid) {
      throw new Error("Auth store is not valid");
    } else {
      await pb.collection("users").authRefresh();
    }
  } catch (e) {
    console.error("Error refreshing auth:", e);
    pb.authStore.clear();
  }

  return (
    <div>
      <Header />

      <About />

      <Experience />

      <Projects
        projects={projects.filter((p) =>
          projectsDb.items.some((i) => (i.slug === p.slug))
        )}
      />

      { JSON.stringify(pb.authStore.record) }

      <Contact />
    </div>
  );
}
