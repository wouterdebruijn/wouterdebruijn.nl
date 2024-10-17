import { GenericText } from "../GenericText.tsx";
import { SlopedContainer } from "../SlopedContainer.tsx";

export function Contact() {
  return (
    <SlopedContainer bottomSlope={false}>
      <GenericText title="">
        <ul class="font-roboto text-white">
          <li>Wouter de Bruijn</li>
          <li>
            You can contact me by sending an email to{" "}
            <a class="text-tertiary" href="mailto:contact@wouterdebruijn.nl">
              contact@wouterdebruijn.nl
            </a>.
          </li>
        </ul>
      </GenericText>
    </SlopedContainer>
  );
}
