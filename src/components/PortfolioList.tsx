// src/components/PortfolioList.tsx
import React from "react";
import {
  User,
  History,
  Github,
  FolderCode,
  FileText,
  ExternalLink,
  ArrowRight
} from "lucide-react";

// 型定義
interface Repository {
  name: string;
  description: string;
  url: string;
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
}

interface PortfolioListProps {
  profile: {
    name: string;
    role: string;
    bio: string;
    githubUrl: string;
  };
  repos: Repository[];
  articles: Article[];
}

const PortfolioList: React.FC<PortfolioListProps> = ({ profile, repos, articles }) => {
  
  // 固定リンクの定義（About MeやHistoryなど）
  // ※ 必要に応じて href を "/about" などの内部リンクにするか、モーダルにするか調整してください
  const mainLinks = [
    {
      href: "#about", 
      text: "About Me",
      description: profile.role, // "KOSEN Advanced Course Student" など
      icon: <User size={24} />,
    },
    {
      href: "#history",
      text: "History",
      description: "経歴・職歴はこちら",
      icon: <History size={24} />,
    },
    {
      href: profile.githubUrl,
      text: "GitHub Profile",
      description: `@${profile.githubUrl.split('/').pop()}`,
      icon: <Github size={24} />,
    },
  ];

  // 共通のリストアイテムコンポーネント
  const ListItem = ({ href, text, description, icon, isExternal = false }: any) => (
    <a
      href={href}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`flex items-center space-x-4 p-4 hover:bg-gray-100 transition-colors duration-200 border-b-2 border-black last:border-b-0`}
    >
      {/* アイコン */}
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-black">
        {icon}
      </div>

      {/* テキスト情報 */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold truncate text-black">
          {text}
        </h3>
        <p className="text-sm text-gray-600 truncate">
          {description}
        </p>
      </div>

      {/* 右矢印 */}
      <div className="flex-shrink-0 text-gray-400">
        {isExternal ? <ExternalLink size={16} /> : <ArrowRight size={16} />}
      </div>
    </a>
  );

  return (
    <div className="flex justify-center bg-white min-h-screen text-black font-sans">
      <div className="w-full max-w-xl my-10">
        
        {/* ヘッダー */}
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm p-4 border-b-2 border-black flex items-center justify-between mb-8 mx-4 sm:mx-0">
          <div>
            <h1 className="text-2xl font-black tracking-tight">{profile.name}</h1>
            <p className="text-xs text-gray-500">Portfolio</p>
          </div>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="p-2 hover:bg-gray-100 rounded-full border border-black transition-colors">
             <Github size={20} />
          </a>
        </header>

        <main className="mx-4 sm:mx-0 space-y-12">
          
          {/* Main Links (About, History, GitHub) */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Main</h2>
            <div className="border-2 border-black bg-white">
              {mainLinks.map((link) => (
                <ListItem key={link.text} {...link} />
              ))}
            </div>
          </section>

          {/* Projects (GitHub Repos) */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Projects</h2>
            <div className="border-2 border-black bg-white">
              {repos.map((repo) => (
                <ListItem
                  key={repo.url}
                  href={repo.url}
                  text={repo.name}
                  description={repo.description || "No description"}
                  icon={<FolderCode size={24} />}
                  isExternal={true}
                />
              ))}
              {repos.length === 0 && (
                <div className="p-4 text-gray-500 text-sm">No projects found.</div>
              )}
            </div>
          </section>

          {/* Articles (Zenn) */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Articles</h2>
            <div className="border-2 border-black bg-white">
              {articles.map((article) => (
                <ListItem
                  key={article.link}
                  href={article.link}
                  text={article.title}
                  description={article.pubDate} // 日付を表示
                  icon={<FileText size={24} />}
                  isExternal={true}
                />
              ))}
               {articles.length === 0 && (
                <div className="p-4 text-gray-500 text-sm">No articles found.</div>
              )}
            </div>
          </section>

        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-500 pb-8">
          &copy; {new Date().getFullYear()} {profile.name}
        </footer>

      </div>
    </div>
  );
};

export default PortfolioList;