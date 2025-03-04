import GenericText from "../GenericText";
import MonitorIllustration from "../illustrations/MonitorIllustration";
import SlopedContainer from "../SlopedContainer";

const About = () => {
    const birthDate = new Date("2001-08-13");

    const age = Math.floor(
        (new Date().getTime() - birthDate.getTime()) / 3.15576e10,
    );

    return (
        <SlopedContainer>
            <div className="items-center grid gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-40">
                <div className="flex flex-col items-center">
                    <MonitorIllustration className="max-w-xs lg:max-w-full" />
                </div>
                <GenericText title="~$ whois">
                    <p className="font-roboto text-white">
                        I am Wouter de Bruijn a {age}{" "}
                        year old guy who is interested in all kinds of technology. I
                        experiment with Linux servers, computer networking, software
                        development, embedded devices and other various bits of technology.
                    </p>
                    <p className="font-roboto text-white pt-2">
                        I have been interested in technology since I was a little kid. At
                        first mostly in physical things like basic electronics and making
                        stuff out of wood and scraps. Later on I got interested in computers
                        and software development. I started out with making some simple
                        websites and setting up a Linux server. Which grew into following
                        two IT educations, and working part-time as a software developer and
                        network/ system engineer for two companies.
                    </p>
                </GenericText>
            </div>
        </SlopedContainer>
    );
}

export default About;