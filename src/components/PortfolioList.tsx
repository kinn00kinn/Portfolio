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

  // --- スタイル定義 (バランス調整版) ---

  // ベースカードスタイル: 枠線をborder-2に、影を少し柔らかく調整
  const cardBaseClass =
    "relative flex flex-col " +
    "bg-white dark:bg-zinc-900 " +
    "border-2 border-zinc-800 dark:border-zinc-200 " + // ★変更: border-4 -> border-2, 色を少し調整
    "rounded-xl overflow-hidden " +
    // ★変更: 影に少しぼかし(blur)を入れて柔らかくする
    "shadow-[4px_4px_10px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_10px_rgba(255,255,255,0.05)] " +
    "transition-all duration-300 hover:-translate-y-1 " +
    "hover:shadow-[6px_6px_15px_rgba(0,0,0,0.15)] dark:hover:shadow-[6px_6px_15px_rgba(255,255,255,0.1)]";

  // SNSボタン用スタイル
  const socialBtnClass = `${cardBaseClass} items-center justify-center p-4 gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 group font-bold text-zinc-900 dark:text-zinc-100`;

  // 装飾用テキスト
  const monoText =
    "font-mono text-xs text-zinc-500 dark:text-zinc-400 tracking-wider";

  return (
    // 全体の背景色を少し明るめのグレー/深い黒に設定
    <div className="min-h-screen bg-zinc-100 dark:bg-[#0a0a0a] font-sans text-zinc-900 dark:text-zinc-100 transition-colors duration-300 relative overflow-hidden">
      {/* --- 背景の工夫 (ドットパターン + スポットライトマスク) --- */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          // ドットパターン
          backgroundImage: `radial-gradient(circle, ${
            isDark ? "#ffffff30" : "#00000020"
          } 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          // ★工夫ポイント: 中央から外側に向かって薄くなるマスクを適用
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 100%)",
        }}
      />

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {/* 1. Profile Hero Card */}
        <div
          className={`${cardBaseClass} md:col-span-2 lg:col-span-2 row-span-2 p-6 md:p-8 justify-between`}
        >
          <div className={`absolute top-4 right-4 ${monoText}`}>
            // 001_MAIN
          </div>

          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="relative group">
                <img
                  src={profile.avatarUrl}
                  alt="avatar"
                  // アバターの枠線も合わせる
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-zinc-800 dark:border-zinc-200 object-cover bg-white shadow-sm"
                />
                {/* ステータスインジケーター */}
                <div className="absolute -bottom-1 -right-1 bg-[#00ff41] w-5 h-5 rounded-full border-2 border-white dark:border-zinc-900 animate-pulse z-10 shadow-sm"></div>
              </div>

              <button
                onClick={toggleTheme}
                className="p-3 rounded-full bg-white dark:bg-zinc-800 border-2 border-zinc-800 dark:border-zinc-200 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shadow-sm"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            <div className={`mb-1 ${monoText}`}>
              &lt;Role type="admin" /&gt;
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-zinc-900 dark:text-white">
              {profile.name}
            </h1>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full text-sm font-bold mb-5 font-mono shadow-sm">
              <Terminal size={14} />
              <span>{profile.role}</span>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium border-l-2 border-zinc-300 dark:border-zinc-700 pl-4">
              {profile.bio}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <div className={`flex items-center gap-2 mb-3 ${monoText}`}>
              <Hash size={12} />
              <span>INTERESTS_ARRAY</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Web_Dev", "Infra", "Astro", "React", "Cloud"].map((tag, i) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-zinc-50 dark:bg-zinc-800 text-xs font-bold rounded border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-mono"
                >
                  {i.toString().padStart(2, "0")}_{tag}
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
            <Github size={24} />
            <span>GitHub</span>
          </a>

          {profile.xUrl && (
            <a
              href={profile.xUrl}
              target="_blank"
              rel="noreferrer"
              className={socialBtnClass}
            >
              <Twitter size={24} className="text-sky-500" />
              <span>X / Twitter</span>
            </a>
          )}

          {profile.zennUrl && (
            <a
              href={profile.zennUrl}
              target="_blank"
              rel="noreferrer"
              className={socialBtnClass}
            >
              <FileText size={24} className="text-[#3EA8FF]" />
              <span>Zenn</span>
            </a>
          )}

          {profile.qiitaUrl && (
            <a
              href={profile.qiitaUrl}
              target="_blank"
              rel="noreferrer"
              className={socialBtnClass}
            >
              <div className="w-6 h-6 bg-[#55c500] text-white flex items-center justify-center rounded text-sm font-bold shadow-sm">
                Q
              </div>
              <span>Qiita</span>
            </a>
          )}

          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className={socialBtnClass}
            >
              <Linkedin size={24} className="text-[#0a66c2]" />
              <span>LinkedIn</span>
            </a>
          )}

          <a href={`mailto:${profile.email}`} className={socialBtnClass}>
            <Mail size={24} className="text-orange-500" />
            <span>Email</span>
          </a>
        </div>

        {/* 3. Projects Header */}
        <div className="col-span-1 md:col-span-3 lg:col-span-4 mt-8 flex items-end justify-between border-b-2 border-zinc-800 dark:border-zinc-200 pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded shadow-sm">
              <FolderCode size={20} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-wider text-zinc-900 dark:text-white">
              Pinned Projects
            </h2>
          </div>
          <span className={`${monoText} font-bold`}>:: SECTION_02</span>
        </div>

        {/* 4. Project Cards */}
        {repos.map((repo, i) => (
          <div
            key={repo.url}
            className={`${cardBaseClass} col-span-1 p-5 h-full group`}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <span className={`${monoText}`}>
                // PROJ_{String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded font-mono border border-zinc-200 dark:border-zinc-700">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-zinc-700 dark:text-zinc-200">
                  {repo.stargazerCount}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow">
              <h3 className="text-lg font-bold mb-2 line-clamp-1 text-zinc-900 dark:text-white group-hover:underline decoration-2 underline-offset-4 decoration-zinc-400">
                {repo.name}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4 line-clamp-3 leading-relaxed font-medium">
                {repo.description || "No description provided."}
              </p>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between mb-4 pt-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800">
              {repo.primaryLanguage ? (
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-zinc-500 dark:text-zinc-400">
                  <span
                    className="w-3 h-3 rounded-sm border border-zinc-400/30 shadow-sm"
                    style={{ backgroundColor: repo.primaryLanguage.color }}
                  ></span>
                  {repo.primaryLanguage.name.toUpperCase()}
                </div>
              ) : (
                <span></span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-auto">
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 border-2 border-zinc-800 dark:border-zinc-200 text-zinc-900 dark:text-zinc-100 text-xs font-bold rounded bg-transparent hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shadow-sm"
              >
                <Github size={14} />
                CODE
              </a>

              {repo.homepageUrl ? (
                <a
                  href={repo.homepageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-3 bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded border-2 border-zinc-900 dark:border-white hover:opacity-80 transition-opacity shadow-sm"
                >
                  <Globe size={14} />
                  DEMO
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 py-2 px-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 text-xs font-bold rounded border-2 border-zinc-200 dark:border-zinc-700 cursor-not-allowed">
                  <Globe size={14} />
                  DEMO
                </div>
              )}
            </div>
          </div>
        ))}

        {/* 5. Articles Section */}
        <div
          className={`${cardBaseClass} col-span-1 md:col-span-3 lg:col-span-4 p-6 md:p-8`}
        >
          <div className="flex items-end justify-between mb-6 border-b-2 border-zinc-800 dark:border-zinc-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded shadow-sm">
                <BookOpen size={20} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                Latest Logs
              </h2>
            </div>
            <span className={`${monoText} font-bold`}>:: SECTION_03</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article, i) => (
              <a
                key={article.link}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border-2 border-transparent hover:border-zinc-800 dark:hover:border-zinc-200 transition-all hover:shadow-md"
              >
                <div
                  className={`flex justify-between mb-2 opacity-70 ${monoText}`}
                >
                  <span>LOG_{String(i + 1).padStart(3, "0")}</span>
                  <span>{article.pubDate.replace(/-/g, ".")}</span>
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2 text-zinc-900 dark:text-white group-hover:underline decoration-2 underline-offset-4">
                  {article.title}
                </h3>
                <div className="flex items-center justify-end mt-auto text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform py-1 px-2 rounded bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 shadow-sm">
                    Read <ExternalLink size={10} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="col-span-1 md:col-span-3 lg:col-span-4 py-12 text-center relative z-10">
          <div
            className={`inline-block border-t-2 border-dashed border-zinc-300 dark:border-zinc-700 pt-6 px-8 ${monoText}`}
          >
            <p className="mb-2">
              SYSTEM_STATUS:{" "}
              <span className="text-[#00ff41] font-bold drop-shadow-sm">●</span>{" "}
              ONLINE
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
