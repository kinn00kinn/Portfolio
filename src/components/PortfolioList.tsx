// src/components/PortfolioList.tsx
import React, { useState, useEffect } from "react";
import {
  User,
  History,
  Github,
  FolderCode,
  FileText,
  ExternalLink,
  Mail,
  Sun,
  Moon,
  Globe,
  Heart,
  Twitter,
  Linkedin,
  BookOpen,
  MapPin,
} from "lucide-react";

// --- 型定義 (変更なし) ---
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

  // 共通のカードスタイル（ハードシャドウ + ボーダー）
  const cardClass =
    "bg-white dark:bg-slate-900 border-2 border-black dark:border-slate-700 " +
    "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] " +
    "rounded-xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]";

  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 p-4 md:p-8">
      {/* --- Bento Grid Layout Container --- */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {/* 1. Profile Hero Card (Large, spans 2 columns) */}
        <div
          className={`${cardClass} md:col-span-2 lg:col-span-2 row-span-2 p-6 md:p-8 flex flex-col justify-between relative group`}
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <img
                src={profile.avatarUrl}
                alt="avatar"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-black dark:border-white object-cover"
              />
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border-2 border-black dark:border-slate-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
              {profile.name}
            </h1>
            <p className="text-sm md:text-base font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-4">
              <User size={18} />
              {profile.role}
            </p>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {profile.bio}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-300 dark:border-slate-700">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-xs font-bold rounded-full">
                🚀 Exploring
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-xs font-bold rounded-full">
                💻 Web Dev
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-xs font-bold rounded-full">
                Infrastructure
              </span>
            </div>
          </div>
        </div>

        {/* 2. Social Links Grid (Small cards) */}
        <div className="md:col-span-1 lg:col-span-2 grid grid-cols-2 gap-4">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className={`${cardClass} p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#f0f0f0] dark:hover:bg-slate-800`}
          >
            <Github size={32} />
            <span className="font-bold">GitHub</span>
          </a>
          {profile.xUrl && (
            <a
              href={profile.xUrl}
              target="_blank"
              rel="noreferrer"
              className={`${cardClass} p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#f0f0f0] dark:hover:bg-slate-800`}
            >
              <Twitter size={32} />
              <span className="font-bold">X / Twitter</span>
            </a>
          )}
          {profile.zennUrl && (
            <a
              href={profile.zennUrl}
              target="_blank"
              rel="noreferrer"
              className={`${cardClass} p-4 flex flex-col items-center justify-center gap-2 text-[#3EA8FF] hover:bg-[#f0f0f0] dark:hover:bg-slate-800`}
            >
              <FileText size={32} />
              <span className="font-bold">Zenn</span>
            </a>
          )}
          <a
            href={`mailto:${profile.email}`}
            className={`${cardClass} p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#f0f0f0] dark:hover:bg-slate-800`}
          >
            <Mail size={32} />
            <span className="font-bold">Email</span>
          </a>
        </div>

        {/* 3. Projects Header */}
        <div className="col-span-1 md:col-span-3 lg:col-span-4 mt-8 mb-2 flex items-center gap-2">
          <FolderCode className="text-black dark:text-white" />
          <h2 className="text-2xl font-black uppercase tracking-wider">
            Pinned Projects
          </h2>
        </div>

        {/* 4. Project Cards */}
        {repos.map((repo) => (
          <a
            key={repo.url}
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className={`${cardClass} col-span-1 p-5 flex flex-col h-full hover:bg-yellow-50 dark:hover:bg-slate-800/50`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-lg">
                <Github size={20} />
              </div>
              <ExternalLink size={18} className="text-gray-400" />
            </div>

            <h3 className="text-lg font-bold mb-2 line-clamp-1">{repo.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
              {repo.description || "No description provided."}
            </p>

            <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mt-auto">
              {repo.primaryLanguage ? (
                <div className="flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: repo.primaryLanguage.color }}
                  ></span>
                  {repo.primaryLanguage.name}
                </div>
              ) : (
                <span></span>
              )}
              <div className="flex items-center gap-1">
                <span>★</span> {repo.stargazerCount}
              </div>
            </div>
          </a>
        ))}

        {/* 5. Articles Section (List Style but inside Grid) */}
        <div
          className={`${cardClass} col-span-1 md:col-span-3 lg:col-span-4 p-6`}
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="text-black dark:text-white" />
            <h2 className="text-2xl font-black uppercase tracking-wider">
              Latest Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article) => (
              <a
                key={article.link}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-4 rounded-lg border-2 border-transparent hover:border-black dark:hover:border-slate-500 bg-gray-50 dark:bg-slate-800/50 transition-colors"
              >
                <h3 className="font-bold text-base md:text-lg mb-2">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between mt-auto text-xs font-bold text-gray-500">
                  <div className="flex items-center gap-2">
                    <FileText size={14} />
                    <span>{article.pubDate}</span>
                  </div>
                  {article.likedCount !== undefined && (
                    <span className="flex items-center text-pink-500">
                      <Heart size={12} className="mr-1 fill-pink-500" />
                      {article.likedCount}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="col-span-1 md:col-span-3 lg:col-span-4 py-8 text-center text-sm font-bold text-gray-400">
          © {new Date().getFullYear()} {profile.name}. Built with Astro &
          Tailwind.
        </footer>
      </div>
    </div>
  );
};

export default PortfolioList;
