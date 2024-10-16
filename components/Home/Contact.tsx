import { GenericText } from "../GenericText.tsx";
import { SlopedContainer } from "../SlopedContainer.tsx";

export function Contact() {
  return (
    <SlopedContainer bottomSlope={false}>
      <div class="items-center grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-40">
        <GenericText title="">
          <p class="font-roboto text-white">
            You can contact me by sending an email to{" "}
            <a class="text-tertiary" href="mailto:contact@wouterdebruijn.nl">
              contact@wouterdebruijn.nl
            </a>.
          </p>
        </GenericText>
      </div>
    </SlopedContainer>
  );
}
