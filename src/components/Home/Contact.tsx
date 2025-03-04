import GenericText from "../GenericText";
import SlopedContainer from "../SlopedContainer";

const Contact = () => {
    return (
        <SlopedContainer bottomSlope={false}>
            <GenericText title="">
                <ul className="font-roboto text-white">
                    <li>Wouter de Bruijn</li>
                    <li>
                        You can contact me by sending an email to{" "}
                        <a className="text-tertiary" href="mailto:contact@wouterdebruijn.nl">
                            contact@wouterdebruijn.nl
                        </a>.
                    </li>
                </ul>
            </GenericText>
        </SlopedContainer>
    );
};

export default Contact;