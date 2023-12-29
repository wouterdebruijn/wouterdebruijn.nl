import Header from "../islands/Header.tsx";
import { SlopedContainer } from "../components/SlopedContainer.tsx";
import { GenericContainer } from "../components/GenericContainer.tsx";
import { MonitorIllustration } from "../components/svg/MonitorIllustration.tsx";
import { GenericText } from "../components/GenericText.tsx";
import { JavascriptIllustration } from "../components/svg/JavascriptIllustration.tsx";
import { ProjectCard } from "../components/ProjectCard.tsx";

export default function Home() {
  return (
    <>
      <Header>
      </Header>

      <SlopedContainer>
        <div class="items-center grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-40">
          <div class="flex flex-col items-center">
            <MonitorIllustration class="max-w-xs lg:max-w-full" />
          </div>
          <GenericText title="~$ whois">
            <p class="font-roboto">
              {/* About me text */}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique sit cupiditate rem perferendis quo sint dignissimos quam
              unde alias deserunt minima dolorem ipsa obcaecati earum vel sunt
              tempore, consectetur quasi, nam minus, itaque deleniti distinctio!
              Unde, iste incidunt voluptates vitae itaque quaerat quidem cum
              aspernatur nemo repellat, consectetur quis rerum aut dolorem ipsum
              sequi dolores totam illum quisquam neque nihil iusto ullam. Odio a
              blanditiis officia unde ea iusto quisquam voluptatem obcaecati
              veritatis, nesciunt possimus facere ducimus doloremque quaerat!
              Quia eveniet sint eum fugiat repudiandae, nisi fugit
              reprehenderit, quas similique dicta maiores ea quibusdam esse,
              saepe tempora excepturi praesentium minus!
            </p>
          </GenericText>
        </div>
      </SlopedContainer>

      <GenericContainer class="bg-primary">
        <div class="items-center grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-40">
          <GenericText title="~$ cd ~/Projects">
            <p class="font-roboto text-black">
              {/* About me text */}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Similique sit cupiditate rem perferendis quo sint dignissimos quam
              unde alias deserunt minima dolorem ipsa obcaecati earum vel sunt
              tempore, consectetur quasi, nam minus, itaque deleniti distinctio!
              Unde, iste incidunt voluptates vitae itaque quaerat quidem cum
              aspernatur nemo repellat, consectetur quis rerum aut dolorem ipsum
              sequi dolores totam illum quisquam neque nihil iusto ullam. Odio a
              blanditiis officia unde ea iusto quisquam voluptatem obcaecati
              veritatis, nesciunt possimus facere ducimus doloremque quaerat!
              Quia eveniet sint eum fugiat repudiandae, nisi fugit
              reprehenderit, quas similique dicta maiores ea quibusdam esse,
              saepe tempora excepturi praesentium minus!
            </p>
          </GenericText>
          <div class="flex flex-col items-center">
            <JavascriptIllustration class="max-w-xs lg:max-w-full" />
          </div>
        </div>

        <div class="mt-16 grid gap-2 container grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <ProjectCard
            title="Project Vulputate"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet venenatis urna cursus eget nunc scelerisque."
            image="https://via.placeholder.com/150"
            link="#"
          />
          <ProjectCard
            title="Project Mauris"
            description="Vulputate odio ut enim blandit volutpat maecenas volutpat blandit. At imperdiet dui accumsan sit. Enim lobortis scelerisque fermentum dui faucibus in ornare."
            image="https://via.placeholder.com/150"
            link="#"
          />
          <ProjectCard
            title="Project Ullamcorper"
            description="Est placerat in egestas erat imperdiet sed euismod. Mattis vulputate enim nulla aliquet. Risus in hendrerit gravida rutrum quisque non. Posuere ac ut consequat semper viverra. Turpis in eu mi bibendum neque. Scelerisque felis imperdiet proin fermentum. Vitae proin sagittis nisl rhoncus."
            image="https://via.placeholder.com/150"
            link="#"
          />
          <ProjectCard
            title="Project Blandit"
            description="Ullamcorper velit sed ullamcorper morbi tincidunt. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Mauris augue neque gravida in fermentum et sollicitudin. Purus non enim praesent elementum facilisis leo vel fringilla. Aliquam nulla facilisi cras fermentum odio. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque."
            image="https://via.placeholder.com/150"
            link="#"
          />
          <ProjectCard
            title="Project Odio"
            description="Arcu cursus vitae congue mauris rhoncus aenean vel elit. Odio tempor orci dapibus ultrices in iaculis nunc sed. Blandit aliquam etiam erat velit scelerisque in dictum. Sodales neque sodales ut etiam sit amet nisl purus in. Odio euismod lacinia at quis risus. Adipiscing tristique risus nec feugiat. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. "
            image="https://via.placeholder.com/150"
            link="#"
          />
          <ProjectCard
            title="Project Adipiscing"
            description="Lorem ipsum dolor sit amet consectetur. Eget lorem dolor sed viverra ipsum nunc aliquet. At elementum eu facilisis sed odio morbi. Adipiscing elit pellentesque habitant morbi. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Vulputate mi sit amet mauris commodo quis. Neque viverra justo nec ultrices dui sapien eget. Lacus sed viverra tellus in. Fermentum et sollicitudin ac orci phasellus. At lectus urna duis convallis."
            image="https://via.placeholder.com/150"
            link="#"
          />
        </div>
      </GenericContainer>
    </>
  );
}
