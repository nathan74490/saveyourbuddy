import { Top_Navigation_Bar } from "@/components/navigations/Top_Navigation_Bar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Top_Navigation_Bar />
      <Component {...pageProps} />
    </>
  );
}
