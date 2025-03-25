import { CTA } from "@/ui/CTA";
import { Typography } from "@/ui/Typography";
import { Container } from "../container/Container";
import { useState } from "react";
import { Menu_Link } from "@/utils/menu_data/Menu_Link";

export const Top_Navigation_Bar = () => {
  const [menu_data] = useState(Menu_Link);
  return (
    <Container className="flex border-b w-full h-max items-center justify-between">
      {/* LOGO PART */}
      <div className="flex w-full items-center justify-start h-full">
        <div className="bg-gray-500 max-w-36 w-full h-8"></div>
      </div>
      {/* MENU LINK PART */}
      <div className="flex gap-3 w-full items-center justify-center">
        {menu_data.map((link, index) => (
          <Typography key={index} balise="a" mirror="h4" href={link.link}>
            {link.nom}
          </Typography>
        ))}
      </div>
      {/* CTA PART */}
      <div className="flex w-full gap-3 items-center justify-end">
        <CTA variant="primary" rounded="full">
          Réserver
        </CTA>
        <CTA variant="primary" rounded="full">
          Contact
        </CTA>
        <div className="bg-gray-500 max-w-8 w-full h-8"></div>
      </div>
    </Container>
  );
};
