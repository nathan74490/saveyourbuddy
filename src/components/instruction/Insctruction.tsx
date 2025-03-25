import { Typography } from "@/ui/Typography";
import { Container } from "../container/Container";
import { Instruction_Data } from "@/utils/instruction_data/Instruction_data";
import { useState } from "react";
import Image from "next/image";

type InstructionProps = {
  nom: string;
  icon: string;
  size: number;
};

export const Instruction = () => {
  const [instruction] = useState<InstructionProps[]>(Instruction_Data);

  return (
    <Container
      py={120}
      className="flex w-full flex-col items-center justify-center gap-20"
    >
      <Typography balise="h2" color="white">
        Comment ça fonctionne ?
      </Typography>
      <div className="flex w-full gap-[var(--margin-x)] items-center justify-between">
        {instruction.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-8"
          >
            <Image
              src={item.icon}
              alt={item.nom}
              width={item.size || 50}
              height={item.size || 50}
            />
            <Typography balise="h4" color="white">
              {item.nom}
            </Typography>
          </div>
        ))}
      </div>
    </Container>
  );
};
