import clsx from "clsx";

interface CTAProps {
  variant: "primary" | "secondary" | "tertiary";
  rounded: "full" | "basic";
  className?: string;
  dividerColor?: string;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export const CTA = ({
  variant,
  rounded,
  className,
  dividerColor,
  disabled = false,
  loading = false,
  children,
  onClick,
  href,
}: CTAProps) => {
  const defaultStyle = "cursor-pointer hover:opacity-75 hover_animation";
  let variantStyle: string = "";
  let roundedStyle: string = "";

  switch (variant) {
    case "primary":
      variantStyle = "px-3 py-1 bg-gray-300";
      break;
    case "tertiary":
      variantStyle = "px-3 py-1 text-white bg-semi-black";
      break;
  }

  switch (rounded) {
    case "full":
      roundedStyle = "rounded-full";
      break;
    case "basic":
      roundedStyle = "rounded-20";
      break;
  }

  return (
    <a
      href={href ?? undefined}
      onClick={disabled || loading ? (e) => e.preventDefault() : onClick}
      className={clsx(defaultStyle, className, variantStyle, roundedStyle)}
    >
      {variant !== "secondary" ? (
        children
      ) : (
        <hr className={clsx("w-full border-b", dividerColor)} />
      )}
    </a>
  );
};
