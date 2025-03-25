import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  py?: number;
  className?: string;
}

export const Container = ({ children, py, className }: ContainerProps) => {
  const pyStyle = `py-${py}`;

  return (
    <section
      className={clsx(
        className,
        pyStyle ?? "py-[var(--margin-y)]",
        "px-[var(--margin-x)]"
      )}
    >
      {children}
    </section>
  );
};
