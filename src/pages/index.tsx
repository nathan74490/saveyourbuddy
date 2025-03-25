import { Boat } from "@/components/boat/Boat";
import { Faq_Container } from "@/components/faq_container/Faq_Container";
import { Carrousel } from "@/components/header/Carrousel";
import { Instruction } from "@/components/instruction/Insctruction";
import FlowingMenu from "@/components/navigations/flowing_menu/Flowing_Menu";
import { Participant } from "@/components/participant/Participant";
import { demoItems } from "@/utils/flowing_menu_data/Flowing_Menu_Data";

export default function Home() {
  return (
    <>
      <Carrousel />
      <Boat />
      <div className="h-20">
        <FlowingMenu items={demoItems} />
      </div>
      <Instruction />
      <Participant />
      <Faq_Container />
    </>
  );
}
