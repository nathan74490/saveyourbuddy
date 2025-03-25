import { Typography } from "@/ui/Typography";
import { Container } from "../container/Container";
import { CTA } from "@/ui/CTA";
import { Faq } from "./faq";

export const Faq_Container = () => {
  return (
    <Container
      py={120}
      className="flex flex-col items-center justify-center gap-16"
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <Typography balise="h2" color="white">
          Save your buddy
        </Typography>
        <Typography balise="h3" color="white" className="w-full">
          Save your Buddy" est un escape game immersif au cœur des fonds marins,
          entre bancs de poissons, épaves mystérieuses et récifs colorés... mais
          l'air se fait rare et le temps s'écoule plus vite que prévu !
        </Typography>
      </div>
      <CTA variant="tertiary" rounded="basic">
        Prendre ma place
      </CTA>
      <Faq question="Qu'est ce qu'un escape game ?" answer="Reponse" />
    </Container>
  );
};
