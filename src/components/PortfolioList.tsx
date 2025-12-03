// src/components/PortfolioList.tsx
import React, { useState, useEffect } from "react";
import {
  User,
  History,
  Github,
  FolderCode,
  FileText,
  ExternalLink,
  ArrowRight,
  Mail,
  Sun,
  Moon,
  Globe,
  Heart,
} from "lucide-react";

// 型定義
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
  likedCount?: number; // オプショナルに変更
}

interface PortfolioListProps {
  profile: {
    name: string;
    role: string;
    bio: string;
    githubUrl: string;
    email: string;
    avatarUrl: string;
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

  // ダークモードの初期化と切り替え
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

  // リンク集の定義
  const links = [
    {
      href: `mailto:${profile.email}`,
      text: "Email",
      description: profile.email,
      icon: <Mail size={24} />,
      isExternal: true,
    },
    {
      href: profile.githubUrl,
      text: "GitHub",
      description: `@${profile.githubUrl.split("/").pop()}`,
      icon: <Github size={24} />,
      isExternal: true,
    },
  ];

  return (
    <div className="flex justify-center min-h-screen font-sans transition-colors duration-300">
      <div className="w-full max-w-xl my-10 mx-4 sm:mx-0">
        {/* ヘッダー */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm p-4 border-b-2 border-black dark:border-slate-700 flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <img
              src={profile.avatarUrl}
              alt="avatar"
              className="w-10 h-10 border border-slate-300 dark:border-slate-600 object-cover"
            />
            <div>
              <h1 className="text-2xl font-black tracking-tight dark:text-white">
                {profile.name}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Portfolio
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 border border-black dark:border-slate-500 transition-colors dark:text-white"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <main className="space-y-12">
          {/* Main Links */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Main
            </h2>
            <div className="border-2 border-black dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-slate-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="text-black dark:text-slate-200">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black dark:text-white">
                      About Me
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {profile.role}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {profile.bio}
                </p>
              </div>
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors flex items-center space-x-4">
                <div className="text-black dark:text-slate-200">
                  <History size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white">
                    History
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    経歴・職歴
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Projects
            </h2>
            <div className="border-2 border-black dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              {repos.map((repo) => (
                <div
                  key={repo.url}
                  className="p-4 border-b border-gray-200 dark:border-slate-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 mb-2">
                      <FolderCode
                        size={20}
                        className="text-black dark:text-slate-200"
                      />
                      <h3 className="text-lg font-bold text-black dark:text-white">
                        {repo.name}
                      </h3>
                    </div>
                    {repo.primaryLanguage && (
                      <span className="text-xs px-2 py-1 border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        <span
                          className="w-2 h-2"
                          style={{
                            backgroundColor: repo.primaryLanguage.color,
                          }}
                        ></span>
                        {repo.primaryLanguage.name}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {repo.description || "No description"}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-2">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center space-x-2 px-3 py-1.5 bg-gray-900 dark:bg-slate-700 text-white text-sm hover:opacity-80 transition-opacity"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                    {repo.homepageUrl && (
                      <a
                        href={repo.homepageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Globe size={16} />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {repos.length === 0 && (
                <div className="p-4 text-gray-500 text-sm">
                  No projects found.
                </div>
              )}
            </div>
          </section>

          {/* Articles (RSS - Latest) */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Articles (Latest)
            </h2>
            <div className="border-2 border-black dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              {articles.map((article) => (
                <a
                  key={article.link}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border-b border-gray-200 dark:border-slate-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText
                        size={20}
                        className="text-blue-500 mt-1 flex-shrink-0"
                      />
                      <div>
                        <h3 className="text-base font-bold text-black dark:text-white group-hover:underline decoration-black dark:decoration-white decoration-2 underline-offset-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>{article.pubDate}</span>
                          {/* likedCountがある場合のみ表示 */}
                          {article.likedCount !== undefined && (
                            <span className="flex items-center text-pink-500 font-bold">
                              <Heart size={12} className="mr-1 fill-pink-500" />
                              {article.likedCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-gray-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </a>
              ))}
              {articles.length === 0 && (
                <div className="p-4 text-gray-500 text-sm">
                  No articles found.
                </div>
              )}
            </div>
          </section>

          {/* Links */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Links
            </h2>
            <div className="border-2 border-black dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              {links.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  target={link.isExternal ? "_blank" : "_self"}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border-b border-gray-200 dark:border-slate-700 last:border-b-0"
                >
                  <div className="text-black dark:text-slate-200">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-black dark:text-white">
                      {link.text}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-gray-400" />
                </a>
              ))}
            </div>
          </section>
        </main>

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 pb-8">
          &copy; {new Date().getFullYear()} {profile.name}
        </footer>
      </div>
    </div>
  );
};

export default PortfolioList;
