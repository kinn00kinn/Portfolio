// src/components/PortfolioList.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  User,
  Github,
  FolderCode,
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
  Rss,
} from "lucide-react";
import CustomCursor from "./CustomCursor";
import InteractiveBackground from "./InteractiveBackground";
import TechButton from "./TechButton";
import LoadingScreen from "./LoadingScreen";

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

interface ProfileLinkItem {
  href: string;
  icon: React.ElementType;
  label: string;
  value: string;
}

interface PortfolioListProps {
  profile: {
    name: string;
    role: string;
    career?: string[];
    bio: string;
    githubUrl: string;
    email: string;
    avatarUrl: string;
    blogUrl?: string;
    xUrl?: string;
    linkedinUrl?: string;
    zennUrl?: string;
    qiitaUrl?: string;
  };
  repos: Repository[];
  articles: Article[];
}

const ProfileLink = ({ href, icon: Icon, label, value }: ProfileLinkItem) => {
  const isExternal = !href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      aria-label={`${label}: ${value}`}
      className="block border-t-2 border-zinc-200 p-4 outline-none transition-colors hover:bg-zinc-100 focus-visible:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:focus-visible:bg-zinc-900"
    >
      <span className="mb-1.5 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
        <Icon size={14} />
        <span>{label}</span>
        {isExternal && <ExternalLink size={13} className="opacity-50" />}
      </span>
      <span className="block break-all font-mono text-lg font-black leading-tight text-zinc-900 dark:text-zinc-100 md:text-xl">
        {value}
      </span>
    </a>
  );
};

const formatDisplayUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const PortfolioList: React.FC<PortfolioListProps> = ({
  profile,
  repos,
  articles,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = React.useCallback(() => {
    setIsLoading(false);
  }, []);

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

  const visibleXUrl =
    profile.xUrl && profile.xUrl !== "https://twitter.com/"
      ? profile.xUrl
      : undefined;

  const contactLinks = useMemo(
    () =>
      [
        {
          href: `mailto:${profile.email}`,
          icon: Mail,
          label: "Email",
          value: profile.email,
        },
        {
          href: profile.githubUrl,
          icon: Github,
          label: "GitHub",
          value: formatDisplayUrl(profile.githubUrl),
        },
        profile.linkedinUrl
          ? {
              href: profile.linkedinUrl,
              icon: Linkedin,
              label: "LinkedIn",
              value: formatDisplayUrl(profile.linkedinUrl),
            }
          : undefined,
        visibleXUrl
          ? {
              href: visibleXUrl,
              icon: Twitter,
              label: "X",
              value: formatDisplayUrl(visibleXUrl),
            }
          : undefined,
      ].filter(Boolean) as ProfileLinkItem[],
    [profile.email, profile.githubUrl, profile.linkedinUrl, visibleXUrl]
  );

  const writingLinks = useMemo(
    () =>
      [
        profile.blogUrl
          ? {
              href: profile.blogUrl,
              icon: Rss,
              label: "Blog",
              value: formatDisplayUrl(profile.blogUrl),
            }
          : undefined,
        profile.zennUrl
          ? {
              href: profile.zennUrl,
              icon: BookOpen,
              label: "Zenn",
              value: formatDisplayUrl(profile.zennUrl),
            }
          : undefined,
        profile.qiitaUrl
          ? {
              href: profile.qiitaUrl,
              icon: Code2,
              label: "Qiita",
              value: formatDisplayUrl(profile.qiitaUrl),
            }
          : undefined,
      ].filter(Boolean) as ProfileLinkItem[],
    [profile.blogUrl, profile.zennUrl, profile.qiitaUrl]
  );

  const careerSummary = profile.career?.length
    ? profile.career.join(" / ")
    : profile.role
        .split("/")
        .map((item) => item.trim())
        .filter(Boolean)
        .join(" / ");

  const glassCardClass =
    "relative flex flex-col " +
    "bg-white/85 dark:bg-zinc-950/80 backdrop-blur-md " +
    "border border-zinc-200 dark:border-zinc-800 " +
    "rounded-lg overflow-hidden shadow-sm " +
    "transition-colors duration-200";

  const monoText =
    "font-mono text-xs text-zinc-500 dark:text-zinc-400 tracking-wider";

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}

      <div
        className={`min-h-screen bg-zinc-100 dark:bg-[#050505] font-sans text-zinc-900 dark:text-zinc-100 transition-colors duration-300 relative overflow-hidden selection:bg-green-500/30 ${
          isLoading ? "h-screen overflow-hidden" : ""
        }`}
      >
        <CustomCursor />
        <InteractiveBackground />

        <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-50">
          {[
            { id: "profile", icon: User, label: "PROFILE" },
            { id: "projects", icon: FolderCode, label: "PROJECTS" },
            { id: "logs", icon: BookOpen, label: "BLOG" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-label={`Scroll to ${item.label}`}
              className={`group flex items-center gap-3 transition-colors duration-200 ${
                activeSection === item.id
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400"
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  activeSection === item.id
                    ? "bg-white dark:bg-zinc-800 shadow-sm"
                    : "bg-transparent"
                }`}
              >
                <item.icon size={20} />
              </div>
              <span
                className={`font-mono text-xs font-bold tracking-widest ${
                  activeSection === item.id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                } transition-opacity duration-200`}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 md:p-8 lg:pl-24">
          <section
            id="profile"
            className="relative py-6 md:py-8"
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              <div className="rounded-[18px] border-2 border-zinc-900 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950 md:p-8 lg:col-span-7">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                    Portfolio
                  </p>
                  <button
                    onClick={toggleTheme}
                    aria-label="Toggle Dark Mode"
                    className="shrink-0 rounded-full border-2 border-zinc-900 p-2 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>

                <h1 className="mb-4 max-w-[12ch] text-5xl font-black leading-[0.95] text-zinc-900 dark:text-white md:text-7xl">
                  {profile.name}
                </h1>

                <p className="mb-4 font-mono text-base font-bold leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-lg">
                  {careerSummary}
                </p>

                <p className="max-w-[54ch] text-base font-medium leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-lg">
                  {profile.bio}
                </p>
              </div>

              <aside className="overflow-hidden rounded-[18px] border-2 border-zinc-900 bg-white dark:border-zinc-700 dark:bg-zinc-950 lg:col-span-5">
                <div className="flex items-center justify-between gap-4 p-5">
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
                    Links
                  </h2>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                    Contact / Writing
                  </span>
                </div>

                <div>
                  {contactLinks.map((link) => (
                    <ProfileLink key={`${link.label}-${link.href}`} {...link} />
                  ))}
                  {writingLinks.map((link) => (
                    <ProfileLink key={`${link.label}-${link.href}`} {...link} />
                  ))}
                </div>
              </aside>
            </div>
          </section>

          <section id="projects" className="mb-8">
            <div className="mb-6 flex items-end justify-between border-b border-zinc-300 pb-4 dark:border-zinc-700">
              <div className="flex items-center gap-3">
                <div className="rounded bg-zinc-900 p-2 text-white shadow-sm dark:bg-white dark:text-black">
                  <FolderCode size={20} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                  Pinned Projects
                </h2>
              </div>
              <span className={`${monoText} font-bold`}>:: SECTION_02</span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {repos.slice(0, 3).map((repo, i) => (
                <article
                  key={repo.url}
                  className={`${glassCardClass} h-full p-6 hover:border-zinc-400 dark:hover:border-zinc-600`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <span className={monoText}>
                      // PROJ_{String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1 rounded border border-zinc-200 bg-zinc-100 px-2 py-1 font-mono text-xs font-bold dark:border-zinc-700 dark:bg-zinc-900">
                      <Star
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="text-zinc-700 dark:text-zinc-200">
                        {repo.stargazerCount}
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="mb-2 line-clamp-1 text-xl font-bold text-zinc-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                      {repo.name}
                    </h3>
                    <p className="mb-6 line-clamp-3 text-sm font-medium leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {repo.description || "No description provided."}
                    </p>
                  </div>

                  <div className="mb-4 flex items-center justify-between border-t border-dashed border-zinc-200 pt-4 dark:border-zinc-700">
                    {repo.primaryLanguage ? (
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 dark:text-zinc-400">
                        <span
                          className="h-3 w-3 rounded-full shadow-[0_0_5px_currentColor]"
                          style={{
                            backgroundColor: repo.primaryLanguage.color,
                            color: repo.primaryLanguage.color,
                          }}
                        />
                        {repo.primaryLanguage.name.toUpperCase()}
                      </div>
                    ) : (
                      <span />
                    )}
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <TechButton
                      href={repo.url}
                      icon={Github}
                      variant="secondary"
                    >
                      CODE
                    </TechButton>

                    {repo.homepageUrl ? (
                      <TechButton
                        href={repo.homepageUrl}
                        icon={Globe}
                        variant="primary"
                      >
                        DEMO
                      </TechButton>
                    ) : (
                      <div className="flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white/50 px-3 py-2 font-mono text-xs font-bold text-zinc-400 dark:border-zinc-800 dark:bg-black/20 dark:text-zinc-600">
                        <Globe size={14} />
                        DEMO
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="logs">
            <div className="mb-8 flex items-end justify-between border-b border-zinc-300 pb-4 dark:border-zinc-700">
              <div className="flex items-center gap-3">
                <div className="rounded bg-zinc-900 p-2 text-white shadow-sm dark:bg-white dark:text-black">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                  Latest Blog
                </h2>
              </div>
              <span className={`${monoText} font-bold`}>:: SECTION_03</span>
            </div>

            <div className="relative space-y-5 border-l-2 border-zinc-200 pl-8 dark:border-zinc-800">
              {articles.map((article, i) => (
                <a
                  key={article.link}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${glassCardClass} block p-5 hover:border-blue-500/50 dark:hover:border-blue-400/50`}
                >
                  <div className="absolute -left-[10px] mt-1 h-4 w-4 rounded-full border-4 border-zinc-300 bg-zinc-100 transition-colors dark:border-zinc-700 dark:bg-zinc-950" />
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <div
                        className={`mb-2 flex items-center gap-3 opacity-70 ${monoText}`}
                      >
                        <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] dark:bg-zinc-900">
                          LOG_{String(i + 1).padStart(3, "0")}
                        </span>
                        <span>{article.pubDate.replace(/-/g, ".")}</span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400 md:text-xl">
                        {article.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 whitespace-nowrap text-xs font-bold text-zinc-500 dark:text-zinc-400">
                      <span>Read Article</span>
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <footer className="relative z-10 mt-12 py-12 text-center">
            <div
              className={`inline-block border-t border-dashed border-zinc-300 px-8 pt-6 dark:border-zinc-700 ${monoText}`}
            >
              <p className="mb-2 flex items-center justify-center gap-2">
                SYSTEM_STATUS:
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  ONLINE
                </span>
              </p>
              <p className="text-zinc-600 opacity-80 dark:text-zinc-400">
                © {new Date().getFullYear()} {profile.name}. ALL RIGHTS
                RESERVED.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default PortfolioList;
