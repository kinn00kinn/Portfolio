import React from "react";
interface TechButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  ariaLabel?: string;
}

const TechButton: React.FC<TechButtonProps> = ({
  href,
  children,
  icon: Icon,
  className = "",
  variant = "primary",
  ariaLabel,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-150";

  const variants = {
    primary:
      "border-zinc-300 bg-zinc-100 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800",
    secondary:
      "border-zinc-200 bg-white/60 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-black/20 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900",
    ghost:
      "bg-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel || (typeof children === "string" ? children : undefined)}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={14} />}
      <span>{children}</span>
    </a>
  );
};

export default TechButton;
