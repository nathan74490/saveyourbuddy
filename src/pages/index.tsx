import { Boat } from "@/components/boat/Boat";
import { Container } from "@/components/container/Container";
import { Carrousel } from "@/components/header/Carrousel";

export default function Home() {
  return (
    <>
      <Carrousel />
      <Boat />
    </>
  );
}
