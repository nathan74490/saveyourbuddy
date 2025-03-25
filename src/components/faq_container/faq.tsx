import { Typography } from "@/ui/Typography";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface FaqProps {
  question: string;
  answer: string;
}

export const Faq = ({ question, answer }: FaqProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex flex-col gap-5 w-full h-max cursor-pointer hover:opacity-75 hover_animation items-center justify-center"
    >
      <div className="flex gap-5 w-full h-max items-center justify-start">
        <Image src="/icon/faq_icon.svg" alt="faq" width={50} height={50} />
        <Typography balise="h3" color="white">
          {question}
        </Typography>
      </div>

      {/* Animation de la réponse FAQ avec framer-motion */}
      <motion.div
        className="flex w-full items-center justify-start"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{
          opacity: { duration: 0.3 },
          height: { duration: 0.3 },
        }}
        style={{ overflow: "hidden" }}
      >
        <Typography balise="h4" color="white">
          {answer}
        </Typography>
      </motion.div>
    </div>
  );
};
