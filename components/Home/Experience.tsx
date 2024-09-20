import { GenericContainer } from "../GenericContainer.tsx";
import { GenericText } from "../GenericText.tsx";
import { JavascriptIllustration } from "../svg/JavascriptIllustration.tsx";

export default function Experience() {
  return (
    <GenericContainer class="bg-primary">
      <div class="items-center grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-40">
        <GenericText title="~$ cat experience">
          <p class="font-roboto">
            I am currently working as a Software Engineer at{" "}
            <a href="https://trelion.nl">Trelion</a>, where I work on a project
            as a Network Automation Engineer. I am responsible for developing
            and maintaining a network automation platform. Combining various
            tooling like Netbox, NAPALM, Ansible, and custom scripts to automate
            network configurations and monitoring.
          </p>
          <p class="font-roboto pt-2">
            I started studying IT at{" "}
            <a class="text-tertiary" href="https://novacollege.nl/">
              Nova College
            </a>{" "}
            in 2017, where in 2020 I graduated and got my "ICT-Beheerder"
            (MBO-4) degree. After that I started studying Network and System
            Engineering at the{" "}
            <a class="text-tertiary" href="https://www.thuas.com/">
              Hague University of Applied Sciences
            </a>{" "}
            where I graduated in 2024, and got my "Bachelor of Science" degree.
          </p>
          <p class="font-roboto">
            As part of my studies I have done a few internships, which continued
            into some part-time jobs. More information about my education and
            work experience can be found on my{" "}
            <a
              class="text-tertiary"
              href="https://www.linkedin.com/in/wouter-de-bruijn-b1a20115b/"
            >
              linkedin
            </a>{" "}
            profile.
          </p>
        </GenericText>
        <div class="flex flex-col items-center">
          <JavascriptIllustration class="max-w-xs lg:max-w-full" />
        </div>
      </div>
    </GenericContainer>
  );
}
