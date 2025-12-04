import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', as: Tag = 'span' }) => {
  return (
    <Tag className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1"
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 -z-10 w-full h-full text-blue-500 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2"
        aria-hidden="true"
      >
        {text}
      </span>
    </Tag>
  );
};

export default GlitchText;
