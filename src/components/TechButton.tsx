import React from 'react';
import { ExternalLink } from 'lucide-react';

interface TechButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const TechButton: React.FC<TechButtonProps> = ({
  href,
  children,
  icon: Icon,
  className = '',
  variant = 'primary',
}) => {
  const baseStyles = "relative group flex items-center justify-center gap-2 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden";
  
  const variants = {
    primary: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black border border-zinc-900 dark:border-zinc-100 hover:text-zinc-900 dark:hover:text-white",
    secondary: "bg-transparent text-zinc-900 dark:text-zinc-100 border border-zinc-900 dark:border-zinc-100 hover:text-white dark:hover:text-black",
    ghost: "bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Swipe Effect Background */}
      <span className={`absolute inset-0 w-full h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out ${
        variant === 'primary' ? 'bg-white dark:bg-zinc-900' : 
        variant === 'secondary' ? 'bg-zinc-900 dark:bg-zinc-100' : ''
      }`} />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon size={14} />}
        <span>{children}</span>
        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          &gt;&gt;
        </span>
      </span>

      {/* Corner Accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </a>
  );
};

export default TechButton;
