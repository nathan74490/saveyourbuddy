import clsx from "clsx";

interface TypographyProps {
  balise: "h1" | "h2" | "h3" | "h4" | "a";
  mirror?: "h1" | "h2" | "h3" | "h4" | "a";
  color?: "white" | "black";
  fontFamily?: "Aston";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Typography = ({
  balise: Balise,
  mirror,
  color,
  fontFamily = "Aston",
  href,
  className,
  children,
}: TypographyProps) => {
  const defaultStyle: string = "flex items-center justify-center gap-2.5";
  const aStyle: string = "cursor-pointer hover:opacity-75";
  let baliseStyle: string = "";
  let colorStyle: string = "";
  let fontFamilyStyle: string = "";

  switch (Balise) {
    case "h1":
      baliseStyle = "text-h1 leading-h1";
      break;
    case "h2":
      baliseStyle = "text-h2 leading-h2";
      break;
    case "h3":
      baliseStyle = "text-h3 leading-h3";
      break;
    case "h4":
      baliseStyle = "text-h4 leading-h4";
      break;
    case "a":
      baliseStyle = `text-${mirror} leading-${mirror} font-medium`;
      break;
  }

  switch (color) {
    case "white":
      colorStyle = "text-white";
      break;
    case "black":
      colorStyle = "text-black";
      break;
  }

  switch (fontFamily) {
    case "Aston":
      fontFamilyStyle = "font-aston";
      break;
  }

  return (
    <Balise
      href={Balise === "a" && href ? href : undefined}
      className={clsx(
        Balise === "a" && aStyle,
        className,
        defaultStyle,
        baliseStyle,
        colorStyle,
        fontFamilyStyle
      )}
    >
      {children}
    </Balise>
  );
};
