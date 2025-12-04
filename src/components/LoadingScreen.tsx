import React, { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFading, setIsFading] = useState(false);
  
  // Use ref to keep track of the latest callback without triggering effects
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const bootLogs = [
      "INITIALIZING SYSTEM...",
      "LOADING KERNEL MODULES...",
      "MOUNTING FILESYSTEM...",
      "CONNECTING TO NEURAL NET...",
      "ESTABLISHING SECURE CONNECTION...",
      "LOADING USER PROFILE...",
      "RENDERING INTERFACE...",
      "SYSTEM READY."
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIndex]]);
        logIndex++;
      }
    }, 300);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          
          // Trigger completion sequence
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onCompleteRef.current) onCompleteRef.current();
            }, 500);
          }, 500);
          
          return 100;
        }
        return Math.min(prev + Math.random() * 15, 100); // Speed up a bit
      });
    }, 100);

    // Failsafe: Force complete after 6 seconds
    const failsafeTimeout = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        if (onCompleteRef.current) onCompleteRef.current();
      }, 500);
    }, 6000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
      clearTimeout(failsafeTimeout);
    };
  }, []); // Empty dependency array to run only once

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 500);
  };

  if (isFading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black transition-opacity duration-500 opacity-0 pointer-events-none" />
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black text-green-500 font-mono p-8 flex flex-col justify-between overflow-hidden cursor-pointer"
      onClick={handleSkip}
    >
      {/* Background Matrix-like effect (simplified) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 2 + 1}s infinite`
            }}
          >
            {Math.random().toString(36).substring(2, 15)}
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl font-black tracking-tighter mb-4 glitch-text">
          SYSTEM BOOT
        </h1>
        <div className="h-1 w-full bg-green-900/30 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-green-500 shadow-[0_0_10px_#22c55e] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs uppercase tracking-widest opacity-70">
          <span>Loading Core Assets</span>
          <span>{Math.min(100, Math.floor(progress))}%</span>
        </div>
      </div>

      <div className="relative z-10 font-mono text-sm space-y-1 opacity-80">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-green-700">&gt;</span>
            <span>{log}</span>
          </div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
      
      <div className="absolute bottom-4 right-4 text-xs opacity-50 animate-pulse">
        [CLICK TO SKIP]
      </div>
    </div>
  );
};

export default LoadingScreen;
