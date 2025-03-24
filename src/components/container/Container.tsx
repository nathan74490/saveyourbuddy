import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <section
      className={clsx(className, "px-[var(--margin-x)] py-[var(--margin-y)]")}
    >
      {children}
    </section>
  );
};
