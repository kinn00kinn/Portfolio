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
} from "lucide-react";

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

  // --- スタイル定義 ---
  // Dark Mode: slate(青み) -> zinc(無彩色・濃いグレー) に変更
  const cardBaseClass =
    "relative flex flex-col bg-white dark:bg-zinc-900 " +
    "border-2 border-black dark:border-zinc-700 " +
    "rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] " +
    "dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] " +
    "transition-all duration-300 hover:-translate-y-1 " +
    "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)]";

  const socialBtnClass = `${cardBaseClass} items-center justify-center p-4 gap-3 hover:bg-gray-50 dark:hover:bg-zinc-800 group`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* 背景パターン (CSSで定義したクラスを使用) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-dot-pattern opacity-60" />

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {/* 1. Profile Hero Card */}
        <div
          className={`${cardBaseClass} md:col-span-2 lg:col-span-2 row-span-2 p-6 md:p-8 justify-between`}
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="relative">
                <img
                  src={profile.avatarUrl}
                  alt="avatar"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-black dark:border-zinc-200 object-cover bg-white"
                />
                {/* 緑の点滅（ステータスアイコン） */}
                <div className="absolute -bottom-2 -right-2 bg-green-400 w-6 h-6 rounded-full border-2 border-black dark:border-zinc-900 animate-pulse"></div>
              </div>
              <button
                onClick={toggleTheme}
                className="p-3 rounded-full border-2 border-black dark:border-zinc-400 hover:bg-black hover:text-white dark:hover:bg-zinc-200 dark:hover:text-black transition-colors"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 dark:text-white">
              {profile.name}
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-bold mb-4">
              <User size={16} />
              {profile.role}
            </div>
            <p className="text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
              {profile.bio}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-dashed border-zinc-200 dark:border-zinc-700">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Interests
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Web Development",
                "Infrastructure",
                "Astro",
                "React",
                "Cloud",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-xs font-bold rounded-md border border-zinc-200 dark:border-zinc-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Social Links Grid */}
        <div className="md:col-span-1 lg:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className={socialBtnClass}
          >
            <Github
              size={28}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-bold">GitHub</span>
          </a>

          {profile.xUrl && (
            <a
              href={profile.xUrl}
              target="_blank"
              rel="noreferrer"
              className={socialBtnClass}
            >
              <Twitter
                size={28}
                className="group-hover:scale-110 transition-transform text-sky-500"
              />
              <span className="font-bold">X</span>
            </a>
          )}

          {profile.zennUrl && (
            <a
              href={profile.zennUrl}
              target="_blank"
              rel="noreferrer"
              className={socialBtnClass}
            >
              <FileText
                size={28}
                className="group-hover:scale-110 transition-transform text-[#3EA8FF]"
              />
              <span className="font-bold">Zenn</span>
            </a>
          )}

          {/* Qiita (反映されていなかった箇所) */}
          {profile.qiitaUrl && (
            <a
              href={profile.qiitaUrl}
              target="_blank"
              rel="noreferrer"
              className={socialBtnClass}
            >
              <div className="w-7 h-7 bg-[#55c500] text-white flex items-center justify-center rounded font-bold text-lg group-hover:scale-110 transition-transform">
                Q
              </div>
              <span className="font-bold">Qiita</span>
            </a>
          )}

          {/* LinkedIn (反映されていなかった箇所) */}
          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className={socialBtnClass}
            >
              <Linkedin
                size={28}
                className="group-hover:scale-110 transition-transform text-[#0a66c2]"
              />
              <span className="font-bold">LinkedIn</span>
            </a>
          )}

          <a href={`mailto:${profile.email}`} className={socialBtnClass}>
            <Mail
              size={28}
              className="group-hover:scale-110 transition-transform text-orange-500"
            />
            <span className="font-bold">Email</span>
          </a>
        </div>

        {/* 3. Projects Section */}
        <div className="col-span-1 md:col-span-3 lg:col-span-4 mt-8 flex items-center gap-3">
          <div className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-lg">
            <FolderCode size={24} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-wider dark:text-white">
            Pinned Projects
          </h2>
        </div>

        {/* 4. Project Cards (GitHub / Demo ボタン分離) */}
        {repos.map((repo) => (
          <div
            key={repo.url}
            className={`${cardBaseClass} col-span-1 p-5 h-full`}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <Code2 size={24} className="text-zinc-400" />
              <div className="flex items-center gap-1 text-xs font-bold bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                {repo.stargazerCount}
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow">
              <h3 className="text-lg font-bold mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {repo.name}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                {repo.description || "No description provided."}
              </p>
            </div>

            {/* Footer Info */}
            {repo.primaryLanguage && (
              <div className="flex items-center gap-2 mb-4 text-xs font-bold text-zinc-500 dark:text-zinc-400">
                <span
                  className="w-3 h-3 rounded-full border border-black/10"
                  style={{ backgroundColor: repo.primaryLanguage.color }}
                ></span>
                {repo.primaryLanguage.name}
              </div>
            )}

            {/* Action Buttons (2つに分離) */}
            <div className="grid grid-cols-2 gap-2 mt-auto">
              {/* Code Button */}
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded hover:opacity-80 transition-opacity"
              >
                <Github size={16} />
                Code
              </a>

              {/* Demo Button */}
              {repo.homepageUrl ? (
                <a
                  href={repo.homepageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-3 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white text-sm font-bold rounded hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Globe size={16} />
                  Demo
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 dark:bg-zinc-800/50 text-gray-400 dark:text-zinc-600 text-sm font-bold rounded cursor-not-allowed">
                  <Globe size={16} />
                  Demo
                </div>
              )}
            </div>
          </div>
        ))}

        {/* 5. Articles Section */}
        <div
          className={`${cardBaseClass} col-span-1 md:col-span-3 lg:col-span-4 p-6 md:p-8`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-lg">
              <BookOpen size={24} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-wider dark:text-white">
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
                className="group flex flex-col p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent hover:border-black dark:hover:border-zinc-500 transition-all"
              >
                <h3 className="font-bold text-base md:text-lg mb-2 group-hover:underline decoration-2 underline-offset-2">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between mt-auto text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <FileText size={14} />
                    <span>{article.pubDate}</span>
                  </div>
                  <span className="flex items-center gap-1 text-black dark:text-white bg-white dark:bg-zinc-700 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-600">
                    Read Article <ExternalLink size={10} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="col-span-1 md:col-span-3 lg:col-span-4 py-12 text-center">
          <p className="text-sm font-bold text-zinc-400 dark:text-zinc-600">
            © {new Date().getFullYear()} {profile.name}.
            <br className="md:hidden" />
            Built with <span className="text-orange-500">Astro</span> &{" "}
            <span className="text-sky-500">Tailwind</span>.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioList;
