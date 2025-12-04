import React, { useState, useEffect } from "react";

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  cursor?: boolean;
  className?: string;
  startDelay?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 50,
  cursor = true,
  className = "",
  startDelay = 0,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  // 開始遅延の管理
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  // タイピングアニメーションの管理
  useEffect(() => {
    // 開始前または完了済みなら何もしない
    if (!hasStarted || displayedText.length >= text.length) return;

    const timer = setTimeout(() => {
      // 現在の表示文字数に基づいて、次の1文字を含めた文字列を設定する
      // これにより「飛ばし」が発生しなくなる
      setDisplayedText(text.slice(0, displayedText.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [hasStarted, displayedText, text, speed]);

  const isTypingComplete = displayedText.length === text.length;

  return (
    <span className={className}>
      {displayedText}
      {cursor && !isTypingComplete && (
        <span className="animate-pulse font-bold">_</span>
      )}
    </span>
  );
};

export default TypewriterEffect;
