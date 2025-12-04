// src/components/PortfolioList.tsx
import React, { useState, useEffect } from "react";
import {
  User,
  Github,
  FolderCode,
  FileText,
  ExternalLink,
  Mail,
  Sun,
  Moon,
  Twitter,
  Linkedin,
  BookOpen,
  Code2,
  Globe,
  Star,
  Terminal,
  Hash,
  Cpu,
  Monitor,
} from "lucide-react";
import { Tilt } from "react-tilt";
import TypewriterEffect from "./TypewriterEffect";
import GlitchText from "./GlitchText";
import CustomCursor from "./CustomCursor";
import InteractiveBackground from "./InteractiveBackground";
import TechButton from "./TechButton";

// --- 型定義 ---
interface Repository {
  name: string;
  description: string;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

interface Article {
  title: string;
  link: string;
  pubDate: string;
  likedCount?: number;
}

interface PortfolioListProps {
  profile: {
    name: string;
    role: string;
    bio: string;
    githubUrl: string;
    email: string;
    avatarUrl: string;
    xUrl?: string;
    linkedinUrl?: string;
    zennUrl?: string;
    qiitaUrl?: string;
  };
  repos: Repository[];
  articles: Article[];
}

const PortfolioList: React.FC<PortfolioListProps> = ({
  profile,
  repos,
  articles,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }

    const handleScroll = () => {
      const sections = ["profile", "projects", "logs"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  // --- スタイル定義 ---

  // Glassmorphism Card Style
  const glassCardClass =
    "relative flex flex-col " +
    "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md " + // Frosted glass
    "border border-white/20 dark:border-zinc-700/50 " + // Subtle border
    "rounded-xl overflow-hidden " +
    "shadow-lg dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] " +
    "transition-all duration-300 ";

  // Tilt Options
  const tiltOptions = {
    max: 10, // Max tilt angle
    scale: 1.02, // Scale on hover
    speed: 400, // Transition speed
    glare: true, // Add glare effect
    "max-glare": 0.3,
  };

  // 装飾用テキスト
  const monoText =
    "font-mono text-xs text-zinc-500 dark:text-zinc-400 tracking-wider";

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-[#050505] font-sans text-zinc-900 dark:text-zinc-100 transition-colors duration-300 relative overflow-hidden selection:bg-green-500/30">
      <CustomCursor />
      <InteractiveBackground />

      {/* --- Sticky Navigation (Desktop) --- */}
      <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-50">
        {[
          { id: "profile", icon: User, label: "PROFILE" },
          { id: "projects", icon: FolderCode, label: "PROJECTS" },
          { id: "logs", icon: BookOpen, label: "LOGS" },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`group flex items-center gap-3 transition-all duration-300 ${
              activeSection === item.id
                ? "translate-x-2 text-zinc-900 dark:text-white"
                : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400"
            }`}
          >
            <div
              className={`p-2 rounded-lg transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-white dark:bg-zinc-800 shadow-md scale-110"
                  : "bg-transparent"
              }`}
            >
              <item.icon size={20} />
            </div>
            <span
              className={`font-mono text-xs font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                activeSection === item.id ? "opacity-100" : ""
              }`}
            >
              {item.label}
            </span>
          </a>
        ))}
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:pl-24">
        
        {/* 1. Profile Hero Card */}
        <div
          id="profile"
          className="col-span-1 md:col-span-3 lg:col-span-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12"
        >
          <Tilt
            options={tiltOptions}
            className={`${glassCardClass} md:col-span-2 lg:col-span-2 row-span-2 p-6 md:p-8 justify-between group`}
          >
            <div className={`absolute top-4 right-4 ${monoText}`}>
              // 001_MAIN
            </div>

            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-br from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-900">
                    <img
                      src={profile.avatarUrl}
                      alt="avatar"
                      className="w-full h-full rounded-full object-cover bg-white"
                    />
                  </div>
                  {/* Neon Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 bg-[#00ff41] w-5 h-5 rounded-full border-2 border-white dark:border-zinc-900 animate-pulse z-10 shadow-[0_0_10px_#00ff41]"></div>
                </div>

                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-full bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-sm backdrop-blur-sm"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              <div className={`mb-1 ${monoText}`}>
                &lt;Role type="admin" /&gt;
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-zinc-900 dark:text-white">
                <GlitchText text={profile.name} />
              </h1>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full text-sm font-bold mb-5 font-mono shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <Terminal size={14} />
                <TypewriterEffect text={profile.role} speed={50} />
              </div>
              <p className="text-base md:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium border-l-2 border-zinc-300 dark:border-zinc-700 pl-4">
                <TypewriterEffect text={profile.bio} speed={30} startDelay={1000} cursor={false} />
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-dashed border-zinc-300 dark:border-zinc-700">
              <div className={`flex items-center gap-2 mb-3 ${monoText}`}>
                <Hash size={12} />
                <span>INTERESTS_ARRAY</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Web_Dev", "Infra", "Astro", "React", "Cloud"].map(
                  (tag, i) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-zinc-100/50 dark:bg-zinc-800/50 text-xs font-bold rounded border border-zinc-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-mono hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-default"
                    >
                      {i.toString().padStart(2, "0")}_{tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </Tilt>

          {/* Social Links Grid */}
          <div className="md:col-span-1 lg:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-4 content-start">
            <Tilt options={tiltOptions} className="h-full">
              <TechButton href={profile.githubUrl} icon={Github} className="h-full w-full" variant="secondary">
                GitHub
              </TechButton>
            </Tilt>

            {profile.xUrl && (
              <Tilt options={tiltOptions} className="h-full">
                <TechButton href={profile.xUrl} icon={Twitter} className="h-full w-full" variant="secondary">
                  X / Twitter
                </TechButton>
              </Tilt>
            )}

            {profile.zennUrl && (
              <Tilt options={tiltOptions} className="h-full">
                <TechButton href={profile.zennUrl} icon={FileText} className="h-full w-full" variant="secondary">
                  Zenn
                </TechButton>
              </Tilt>
            )}

            {profile.qiitaUrl && (
              <Tilt options={tiltOptions} className="h-full">
                <TechButton href={profile.qiitaUrl} className="h-full w-full" variant="secondary">
                  Qiita
                </TechButton>
              </Tilt>
            )}

            {profile.linkedinUrl && (
              <Tilt options={tiltOptions} className="h-full">
                <TechButton href={profile.linkedinUrl} icon={Linkedin} className="h-full w-full" variant="secondary">
                  LinkedIn
                </TechButton>
              </Tilt>
            )}

            <Tilt options={tiltOptions} className="h-full">
              <TechButton href={`mailto:${profile.email}`} icon={Mail} className="h-full w-full" variant="secondary">
                Email
              </TechButton>
            </Tilt>
          </div>
        </div>

        {/* 2. Projects Section */}
        <div id="projects" className="col-span-1 md:col-span-3 lg:col-span-4 mb-12">
          <div className="flex items-end justify-between border-b border-zinc-300 dark:border-zinc-700 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                <FolderCode size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                Pinned Projects
              </h2>
            </div>
            <span className={`${monoText} font-bold`}>:: SECTION_02</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, i) => (
              <Tilt key={repo.url} options={tiltOptions} className="h-full">
                <div className={`${glassCardClass} h-full p-6 group hover:border-zinc-400 dark:hover:border-zinc-500`}>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`${monoText}`}>
                      // PROJ_{String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded font-mono border border-zinc-200 dark:border-zinc-700">
                      <Star
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="text-zinc-700 dark:text-zinc-200">
                        {repo.stargazerCount}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1 text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <GlitchText text={repo.name} />
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6 line-clamp-3 leading-relaxed font-medium">
                      {repo.description || "No description provided."}
                    </p>
                  </div>

                  {/* Footer Info */}
                  <div className="flex items-center justify-between mb-4 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-700">
                    {repo.primaryLanguage ? (
                      <div className="flex items-center gap-2 text-xs font-bold font-mono text-zinc-500 dark:text-zinc-400">
                        <span
                          className="w-3 h-3 rounded-full shadow-[0_0_5px_currentColor]"
                          style={{
                            backgroundColor: repo.primaryLanguage.color,
                            color: repo.primaryLanguage.color,
                          }}
                        ></span>
                        {repo.primaryLanguage.name.toUpperCase()}
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <TechButton href={repo.url} icon={Github} variant="secondary">
                      CODE
                    </TechButton>

                    {repo.homepageUrl ? (
                      <TechButton href={repo.homepageUrl} icon={Globe} variant="primary">
                        DEMO
                      </TechButton>
                    ) : (
                      <div className="flex items-center justify-center gap-2 py-2 px-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 text-xs font-bold rounded border border-zinc-200 dark:border-zinc-700 cursor-not-allowed">
                        <Globe size={14} />
                        DEMO
                      </div>
                    )}
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>

        {/* 3. Articles Section (Timeline Layout) */}
        <div id="logs" className="col-span-1 md:col-span-3 lg:col-span-4">
          <div className="flex items-end justify-between border-b border-zinc-300 dark:border-zinc-700 pb-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                <BookOpen size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                Latest Logs
              </h2>
            </div>
            <span className={`${monoText} font-bold`}>:: SECTION_03</span>
          </div>

          <div className="relative pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-8">
            {articles.map((article, i) => (
              <div key={article.link} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-4 w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-900 border-4 border-zinc-300 dark:border-zinc-700 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors z-10"></div>
                
                <Tilt options={{...tiltOptions, scale: 1.01}} className="w-full">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${glassCardClass} block p-6 hover:border-blue-500/50 dark:hover:border-blue-400/50 group/card`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className={`flex items-center gap-3 mb-2 opacity-70 ${monoText}`}>
                          <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-[10px]">LOG_{String(i + 1).padStart(3, "0")}</span>
                          <span>{article.pubDate.replace(/-/g, ".")}</span>
                        </div>
                        <h3 className="font-bold text-lg md:text-xl text-zinc-900 dark:text-white group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors">
                          {article.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                        <span className="group-hover/card:translate-x-1 transition-transform">Read Article</span>
                        <ExternalLink size={14} />
                      </div>
                    </div>
                  </a>
                </Tilt>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="col-span-1 md:col-span-3 lg:col-span-4 py-12 text-center relative z-10 mt-12">
          <div
            className={`inline-block border-t border-dashed border-zinc-300 dark:border-zinc-700 pt-6 px-8 ${monoText}`}
          >
            <p className="mb-2 flex items-center justify-center gap-2">
              SYSTEM_STATUS:{" "}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-green-600 dark:text-green-400 font-bold">ONLINE</span>
            </p>
            <p className="opacity-80 text-zinc-600 dark:text-zinc-400">
              © {new Date().getFullYear()} {profile.name}. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioList;
