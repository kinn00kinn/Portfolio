import React from "react";
import { ExternalLink } from "lucide-react";

interface TechButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

const TechButton: React.FC<TechButtonProps> = ({
  href,
  children,
  icon: Icon,
  className = "",
  variant = "primary",
}) => {
  const baseStyles =
    "relative group flex items-center justify-center gap-2 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden";

  // テキスト色の遷移を背景に合わせて調整
  const variants = {
    primary:
      "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black border border-zinc-900 dark:border-zinc-100",
    secondary:
      "bg-transparent text-zinc-900 dark:text-zinc-100 border border-zinc-900 dark:border-zinc-100",
    ghost:
      "bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white",
  };

  // ホバー時のテキスト色（バリアントごとに定義）
  // primary: 背景が白/黒になるので、テキストは黒/白へ
  // secondary: 背景が黒/白になるので、テキストは白/黒へ
  const textHoverStyles = {
    primary: "group-hover:text-zinc-900 dark:group-hover:text-black", // 背景が白になるので黒文字
    secondary: "group-hover:text-white dark:group-hover:text-black", // 背景が黒(darkは白)になるので白(darkは黒)文字
    ghost: "",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Swipe Effect Background */}
      <span
        className={`absolute inset-0 w-full h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 ${
          variant === "primary"
            ? "bg-white dark:bg-zinc-200"
            : variant === "secondary"
            ? "bg-zinc-900 dark:bg-zinc-100"
            : ""
        }`}
      />

      {/* Content - z-indexを上げて確実に上に表示させ、色を反転させる */}
      <span
        className={`relative z-20 flex items-center gap-2 transition-colors duration-300 ${textHoverStyles[variant]}`}
      >
        {Icon && <Icon size={14} />}
        <span>{children}</span>
        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
          &gt;&gt;
        </span>
      </span>

      {/* Corner Accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
    </a>
  );
};

export default TechButton;
