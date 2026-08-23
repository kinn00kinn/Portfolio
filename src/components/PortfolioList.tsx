// src/components/PortfolioList.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  User,
  Github,
  FolderCode,
  ExternalLink,
  Mail,
  Twitter,
  Linkedin,
  BookOpen,
  Code2,
  Globe,
  Star,
  Rss,
} from "lucide-react";

interface Repository {
  projectUrl: string;
  name: string;
  description: string;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  zenn?: string;
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
  displayText?: string;
  featured?: boolean;
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

const ProfileLink = ({
  href,
  icon: Icon,
  label,
  value,
  displayText,
  featured,
}: ProfileLinkItem) => {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      aria-label={`${label}: ${value}`}
      className={`group flex min-h-[76px] flex-1 items-center gap-3 border-t-2 px-4 py-3 outline-none transition-colors ${
        featured
          ? "border-emerald-200 bg-emerald-50 hover:bg-emerald-100 focus-visible:bg-emerald-100 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/55 dark:focus-visible:bg-emerald-950/55"
          : "border-zinc-200 hover:bg-zinc-100 focus-visible:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:focus-visible:bg-zinc-900"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
          featured
            ? "border-emerald-300 bg-white text-emerald-700 group-hover:border-emerald-800 group-hover:text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:group-hover:border-emerald-400 dark:group-hover:text-emerald-100"
            : "border-zinc-200 text-zinc-500 group-hover:border-zinc-900 group-hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-500 dark:group-hover:border-zinc-500 dark:group-hover:text-zinc-100"
        }`}
      >
        <Icon size={18} />
      </span>
      <span
        className={`min-w-0 font-mono ${
          featured
            ? "text-emerald-900 dark:text-emerald-100"
            : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        <span className="block text-sm font-black uppercase tracking-wider md:text-base">
          {label}
        </span>
        {displayText && (
          <span className="mt-1 block break-all text-[11px] font-bold leading-tight tracking-normal text-zinc-500 dark:text-zinc-400 md:text-xs">
            {displayText}
          </span>
        )}
      </span>
    </a>
  );
};

const formatDisplayUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const formatEmailDisplay = (email: string) => email.replace(/@/g, "[at]");

const PortfolioList: React.FC<PortfolioListProps> = ({
  profile,
  repos,
  articles,
}) => {
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
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
          displayText: formatEmailDisplay(profile.email),
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
        {
          href: "/writing/",
          icon: BookOpen,
          label: "Writing index",
          value: "kinn-kinn.com/writing",
          featured: true,
        },
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
      <div
        className="relative min-h-screen overflow-hidden bg-[#f4f2ee] font-sans text-zinc-900 transition-colors duration-300 selection:bg-emerald-300/40 dark:bg-[#070707] dark:text-zinc-100"
      >
        <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-5 z-50">
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
            className="relative py-4 md:py-6"
          >
            <article className="grid overflow-hidden rounded-[18px] border-2 border-zinc-900 bg-white shadow-[8px_8px_0_#18181b] dark:border-zinc-700 dark:bg-zinc-950 dark:shadow-[8px_8px_0_#27272a] lg:grid-cols-2">
              <div className="flex min-h-[360px] flex-col justify-between gap-10 bg-[#fffdf7] p-6 dark:bg-zinc-950 md:min-h-[390px] md:p-8 lg:p-10">
                <div>
                  <div className="mb-10">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      Software / Research / Writing
                    </p>
                  </div>

                  <h1 className="max-w-[12ch] text-5xl font-black leading-[0.95] text-zinc-950 dark:text-white md:text-7xl">
                    {profile.name}
                  </h1>

                  <p className="mt-5 font-mono text-base font-bold leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-lg">
                    {careerSummary}
                  </p>
                </div>

                <div className="space-y-5">
                  <p className="max-w-[42rem] text-base font-medium leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-lg">
                    {profile.bio}
                  </p>

                  {profile.blogUrl && (
                    <a
                      href={profile.blogUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Blog: ${formatDisplayUrl(profile.blogUrl)}`}
                      className="inline-flex items-center gap-3 rounded-full border-2 border-zinc-900 bg-emerald-300 px-5 py-3 font-mono text-sm font-black uppercase tracking-wider text-zinc-950 transition-colors hover:bg-emerald-200 focus-visible:bg-emerald-200 dark:border-emerald-400 dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300 dark:focus-visible:bg-emerald-300"
                    >
                      <Rss size={18} />
                      Blog
                    </a>
                  )}
                </div>
              </div>

              <aside className="grid border-t-2 border-zinc-900 dark:border-zinc-700 sm:grid-cols-2 lg:border-l-2 lg:border-t-0">
                <div className="flex min-h-full flex-col">
                  <h2 className="p-4 font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                    Contact
                  </h2>
                  {contactLinks.map((link) => (
                    <ProfileLink key={`${link.label}-${link.href}`} {...link} />
                  ))}
                </div>

                <div className="flex min-h-full flex-col border-t-2 border-zinc-900 dark:border-zinc-700 sm:border-l-2 sm:border-t-0">
                  <h2 className="p-4 font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                    Writing
                  </h2>
                  {writingLinks.map((link) => (
                    <ProfileLink key={`${link.label}-${link.href}`} {...link} />
                  ))}
                </div>
              </aside>
            </article>
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {repos.slice(0, 4).map((repo, i) => (
                <article
                  key={repo.url}
                  className="group relative flex aspect-video flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white/85 p-4 shadow-sm transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950/80 dark:hover:border-zinc-600 md:p-5"
                >
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 md:text-[11px]">
                    <span>// PROJ_{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        {repo.stargazerCount}
                    </span>
                  </div>

                  <h3 className="mt-3 line-clamp-1 text-lg font-black leading-tight text-zinc-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300 md:text-xl">
                    <a href={repo.projectUrl}>{repo.name}<span className="ml-1 text-xs">→</span></a>
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs font-medium leading-[1.5] text-zinc-600 dark:text-zinc-300 md:text-[13px]">
                    {repo.description || "No description provided."}
                  </p>

                  <div className="mt-auto flex min-h-4 items-center font-mono text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                    {repo.primaryLanguage && (
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }} />
                        {repo.primaryLanguage.name.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2 border-t border-dashed border-zinc-200 pt-3 dark:border-zinc-700">
                      <a href={repo.url} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded border border-zinc-300 px-2 py-1.5 font-mono text-[10px] font-black uppercase hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
                        <Github size={12} /> Code
                      </a>

                      {repo.homepageUrl && (
                        <a href={repo.homepageUrl} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded border border-zinc-300 px-2 py-1.5 font-mono text-[10px] font-black uppercase hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
                          <Globe size={12} /> Demo
                        </a>
                      )}
                      {repo.zenn && (
                        <a href={repo.zenn} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded border border-sky-300 px-2 py-1.5 font-mono text-[10px] font-black uppercase text-sky-700 hover:bg-sky-50 dark:border-sky-800 dark:text-sky-300 dark:hover:bg-sky-950/40">
                          <BookOpen size={12} /> Zenn
                        </a>
                      )}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-7 flex justify-end">
              <a href="/projects/" className="rounded-md border-2 border-zinc-900 bg-white px-5 py-3 font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_#18181b] transition-transform hover:-translate-y-0.5 dark:border-zinc-700 dark:bg-zinc-950 dark:shadow-[3px_3px_0_#27272a]">
                All projects →
              </a>
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
