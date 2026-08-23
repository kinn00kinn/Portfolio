export interface Project {
  id: string;
  title: string;
  description: string;
  publishedAt: Date;
  featured: boolean;
  order: number;
  image: string;
  imageAlt: string;
  tags: string[];
  github: string;
  demo?: string;
  zenn?: string;
  language?: string;
  languageColor?: string;
  stars: number;
}

// Projectsは表示順に、このファイルだけを手作業で更新する。
export const projects: Project[] = [
  {
    id: "p2p-othello",
    title: "P2P Othello",
    description: "WebRTCでブラウザ同士を直接つなぐ、リアルタイム対戦オセロ。",
    publishedAt: new Date("2025-10-15T00:00:00+09:00"),
    featured: true,
    order: 1,
    image: "https://opengraph.githubassets.com/1/kinn00kinn/osero_p2p_front.github.io",
    imageAlt: "P2P OthelloのGitHubプレビュー",
    tags: ["WebRTC", "PeerJS", "JavaScript", "GitHub Pages"],
    github: "https://github.com/kinn00kinn/osero_p2p_front.github.io",
    demo: "https://s.kinn-kinn.com/osero_p2p_front.github.io/",
    zenn: "https://zenn.dev/kinnkinn/articles/ff844e4d9e3ce4",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 9,
  },
  {
    id: "pando",
    title: "PanDo",
    description: "パンダに関する最新ニュースが流れる、パンダ特化型SNS。",
    publishedAt: new Date("2025-11-01T00:00:00+09:00"),
    featured: true,
    order: 2,
    image: "https://raw.githubusercontent.com/kinn00kinn/PanDo/main/frontend/public/Pando_banner_1000.png",
    imageAlt: "PanDoのバナー",
    tags: ["Next.js", "TypeScript", "Supabase", "NextAuth"],
    github: "https://github.com/kinn00kinn/PanDo",
    demo: "https://pando.kinn-kinn.com",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
  },
  {
    id: "portfolio",
    title: "kinn-kinn.com",
    description: "成果物・記事を一つに集約する個人のポートフォリオ",
    publishedAt: new Date("2025-12-03T00:00:00+09:00"),
    featured: true,
    order: 3,
    image: "https://opengraph.githubassets.com/1/kinn00kinn/Portfolio",
    imageAlt: "kinn-kinn.comのGitHubプレビュー",
    tags: ["Astro", "React", "TypeScript", "Cloudflare Pages"],
    github: "https://github.com/kinn00kinn/Portfolio",
    demo: "https://kinn-kinn.com",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
  },
  {
    id: "seditor",
    title: "Seditor",
    description: "メモ帳の軽さとリッチなプレビューを両立するローカルMarkdownエディタ。",
    publishedAt: new Date("2025-12-07T00:00:00+09:00"),
    featured: true,
    order: 4,
    image: "https://raw.githubusercontent.com/kinn00kinn/Seditor/main/screenshot.png",
    imageAlt: "Seditorの編集画面",
    tags: ["Tauri", "React", "Rust", "CodeMirror"],
    github: "https://github.com/kinn00kinn/Seditor",
    demo: "https://s.kinn-kinn.com/Seditor/",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
  },
  {
    id: "five-card-love",
    title: "Five Card Love",
    description: "互いの選択を明かさずに相思相愛か判定する、Five-Card Trickの体験デモ。",
    publishedAt: new Date("2026-08-21T00:00:00+09:00"),
    featured: false,
    order: 5,
    image: "https://raw.githubusercontent.com/kinn00kinn/five-card-love/main/ogp.png",
    imageAlt: "Five Card LoveのOGP画像",
    tags: ["Cryptography", "WebRTC", "PeerJS", "JavaScript"],
    github: "https://github.com/kinn00kinn/five-card-love",
    demo: "https://s.kinn-kinn.com/five-card-love/",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 0,
  },
  {
    id: "lut-estimator",
    title: "LUT Estimator",
    description: "補正前後の画像から3D LUTを推定し、別の画像へ色味を適用するPythonパッケージ。",
    publishedAt: new Date("2025-06-08T00:00:00+09:00"),
    featured: false,
    order: 6,
    image: "https://raw.githubusercontent.com/kinn00kinn/LUT-Estimator/main/apply_estimated_lut.jpg",
    imageAlt: "LUT Estimatorによる色変換の作例",
    tags: ["Python", "Computer Vision", "3D LUT", "PyPI"],
    github: "https://github.com/kinn00kinn/LUT-Estimator",
    demo: "https://pypi.org/project/lut-estimator/",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
  },
  {
    id: "latte-logic",
    title: "LatteLogic",
    description: "長文と構造化ノートを読みやすくする、Obsidian用テーマ。",
    publishedAt: new Date("2026-02-15T00:00:00+09:00"),
    featured: false,
    order: 7,
    image: "https://raw.githubusercontent.com/kinn00kinn/LatteLogic/master/cover.png",
    imageAlt: "LatteLogicのライト・ダークテーマ",
    tags: ["Obsidian", "CSS", "Theme", "Quartz"],
    github: "https://github.com/kinn00kinn/LatteLogic",
    demo: "https://github.com/kinn00kinn/LatteLogic/releases/latest",
    zenn: "https://zenn.dev/kinnkinn/articles/fcdb1ef1732619",
    language: "CSS",
    languageColor: "#563d7c",
    stars: 0,
  },
];
