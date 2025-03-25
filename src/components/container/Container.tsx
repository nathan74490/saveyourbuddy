import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  py?: 120;
  className?: string;
}

export const Container = ({ children, py, className }: ContainerProps) => {
  return (
    <section
      className={clsx(
        className,
        py ? "py-[120px]" : "py-[var(--margin-y)]",
        "px-[var(--margin-x)]"
      )}
    >
      {children}
    </section>
  );
};
