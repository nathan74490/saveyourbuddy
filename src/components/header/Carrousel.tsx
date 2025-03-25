import { CTA } from "@/ui/CTA";
import { Carrousel_Data } from "@/utils/carrousel_data/Carrousel_data";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@/ui/Typography";

type CarrouselData = {
  title: string;
  description: string;
  img: string;
};

export const Carrousel = () => {
  const [carrouselData] = useState<CarrouselData[]>(Carrousel_Data);
  const [currentData, setCurrentData] = useState<CarrouselData>(
    carrouselData[0]
  );

  return (
    <div className="relative flex justify-center items-center h-full bg-black">
      {/* Image avec animation et ajustement de taille */}
      <motion.div
        key={currentData.img}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-full h-[90vh] relative z-20"
      >
        <Image
          src={currentData.img}
          alt={currentData.description}
          fill
          priority
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="pointer-events-none absolute opacity-50"
        />
        <div className="flex flex-col items-start justify-center gap-2.5 absolute bottom-30 left-30">
          <Typography balise="h1" color="white">
            {currentData.title}
          </Typography>
          <Typography balise="h2" color="white">
            {currentData.description}
          </Typography>
        </div>
      </motion.div>

      <div className="absolute top-2/4 z-50 right-4 flex flex-col gap-3.5 items-end justify-center w-max h-max">
        {carrouselData.map((data, index) => (
          <div
            key={index}
            className={clsx(
              "flex items-center justify-end cursor-pointer",
              currentData === carrouselData[index]
                ? "w-14 h-2.5"
                : "w-8 h-2.5 hover:w-10 hover_animation"
            )}
            onClick={() => setCurrentData(data)}
          >
            <CTA
              variant="secondary"
              rounded="basic"
              className="w-14"
              dividerColor={
                currentData === carrouselData[index]
                  ? "border-white rounded-full"
                  : "border-water-blue rounded-full"
              }
            >
              {data.title}
            </CTA>
          </div>
        ))}
      </div>
    </div>
  );
};
