import { useState } from "react";
import { Container } from "../container/Container";
import { Participant_Data } from "@/utils/participant/Participant";
import { Typography } from "@/ui/Typography";
import Image from "next/image";

type ParticipantProps = {
  nom: string;
  icon: string;
  iconSize: number;
};

export const Participant = () => {
  const [participants] = useState<ParticipantProps[]>(Participant_Data);
  return (
    <Container className="relative w-full h-max flex items-center justify-between">
      <Image
        src="/img/png/participant_screen.png"
        alt="bg screen"
        fill
        className="object-cover z-0"
      />
      <div className="flex items-center w-full h-max justify-center gap-5 rotate-[-90deg]">
        <hr className="w-full border-r border-white" />
        <div className="w-max">
          <Typography balise="h3" color="white" className="w-max">
            Qui peut plonger ?
          </Typography>
        </div>
      </div>
      <div className="flex z-20 w-full flex-col gap-20 items-start justify-center">
        {participants.map((participant, index) => (
          <div key={index} className="flex items-center justify-center gap-8">
            <Image
              src={participant.icon}
              alt={participant.nom}
              width={participant.iconSize || 50}
              height={participant.iconSize || 50}
            />
            <Typography balise="h4" color="white">
              {participant.nom}
            </Typography>
          </div>
        ))}
      </div>
    </Container>
  );
};
