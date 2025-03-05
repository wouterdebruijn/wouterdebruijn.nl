import About from "@/components/Home/About";
import Header from "../components/Header";
import Experience from "@/components/Home/Experience";
import Projects from "@/components/Home/Projects";
import Contact from "@/components/Home/Contact";
import { cookies } from 'next/headers'
import { listProjects } from "@/utils/projects";

import { initPocketBase } from "@/lib/pocketbase";

import { signOut } from "@/app/actions";
import Form from "next/form";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('pb_auth')?.value;

  const pb = await initPocketBase(token ?? '');

  try {
    if (!pb.authStore.isValid) {
      throw new Error('Invalid auth token');
    }
    
    await pb.collection('users').authRefresh()

    console.log('Successfully refreshed auth token');
  }
  catch (e) {
    console.error(e);
  }

  const projects = await listProjects();
  const account = await pb.collection('users').getOne(pb.authStore.record?.id ?? '');
  
  return (
    <div>
      <Header />

      <Form
        className="absolute top-0 right-0 p-4 font-roboto text-lg"
        action={signOut}
      >
        <p className="text-right">
          Signed in as {account?.email}
        </p>
        <input type="submit" value="Sign out" />
      </Form>

      <About />

      <Experience />

      <Projects projects={projects} />

      <Contact />
    </div>
  );
}
