import { CTA } from "@/ui/CTA";
import { Carrousel_Data } from "@/utils/carrousel_data/Carrousel_data";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion"; // Importer framer-motion

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
        className="relative z-20"
      >
        <Image
          src={currentData.img}
          alt={currentData.description}
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
        />
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
                  ? "border-red-500"
                  : "border-white"
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
