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
  demoLabel?: string;
  overview: string[];
  highlights: string[];
  impact?: string[];
  schemaType: "SoftwareApplication" | "SoftwareSourceCode";
}

export const getProjectPath = (project: Pick<Project, "id">) =>
  `/projects/${project.id}/`;

// Projectsは表示順に、このファイルだけを手作業で更新する。
export const projects: Project[] = [
  {
    id: "p2p-othello",
    title: "P2P Othello",
    description: "WebRTCでブラウザ同士を直接つなぐ、リアルタイム対戦オセロ。",
    publishedAt: new Date("2025-10-15T00:00:00+09:00"),
    featured: true,
    order: 1,
    image: "/projects/p2p-othello.webp",
    imageAlt: "P2P Othelloのリアルタイム対戦画面",
    tags: ["WebRTC", "PeerJS", "JavaScript", "GitHub Pages"],
    github: "https://github.com/kinn00kinn/osero_p2p_front.github.io",
    demo: "https://s.kinn-kinn.com/osero_p2p_front.github.io/",
    zenn: "https://zenn.dev/kinnkinn/articles/ff844e4d9e3ce4",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 9,
    demoLabel: "Play",
    overview: [
      "ブラウザだけで友人とリアルタイム対戦できるオセロです。招待URLを共有すると、ゲーム中の通信はWebRTCでプレイヤー同士を直接つなぎます。",
      "フロントエンドをGitHub Pages、最初の接続を仲介するPeerServerをRenderに配置し、常時ゲームサーバーを持たずに運用できる構成を試しました。",
    ],
    highlights: [
      "PeerJSを利用したブラウザ間のP2Pデータ通信",
      "URLを送るだけで始められる招待フロー",
      "GitHub PagesとRenderを組み合わせた低コスト構成",
    ],
    impact: [
      "構成と実装を解説したZenn記事が、はてなブックマークでも紹介されました。",
    ],
    schemaType: "SoftwareApplication",
  },
  {
    id: "pando",
    title: "PanDo",
    description: "パンダに関する最新ニュースが流れる、パンダ特化型SNS。",
    publishedAt: new Date("2025-11-01T00:00:00+09:00"),
    featured: true,
    order: 2,
    image: "/projects/pando.webp",
    imageAlt: "PanDo - パンダ特化型SNS",
    tags: ["Next.js", "TypeScript", "Supabase", "NextAuth"],
    github: "https://github.com/kinn00kinn/PanDo",
    demo: "https://pando.kinn-kinn.com",
    zenn: "https://zenn.dev/kinnkinn/articles/622a65a2a76dce",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    demoLabel: "Open app",
    overview: [
      "動物園の公式情報、ニュース、SNSなどに散らばるパンダ情報を、一つのタイムラインで追えるようにしたパンダ特化型サービスです。",
      "Next.jsのフロントエンドとSupabaseを中心に、Pythonの収集処理をGitHub Actionsで定期実行する構成です。白黒を基調に、オリジナルのドット絵を組み合わせています。",
    ],
    highlights: [
      "News API、検索、RSSを使ったパンダ情報の定期収集",
      "SupabaseとNextAuthによる認証・保存機能",
      "楽観的UI、無限スクロール、多言語対応、初回チュートリアル",
    ],
    impact: [
      "個人開発のアーキテクチャとUX設計をZennで公開しました。",
    ],
    schemaType: "SoftwareApplication",
  },
  {
    id: "portfolio",
    title: "kinn-kinn.com",
    description: "成果物・記事を一つに集約する個人のポートフォリオ",
    publishedAt: new Date("2025-12-03T00:00:00+09:00"),
    featured: true,
    order: 3,
    image: "/projects/portfolio.webp",
    imageAlt: "kinn00kinnのホームページ kinn-kinn.com",
    tags: ["Astro", "React", "TypeScript", "Cloudflare Pages"],
    github: "https://github.com/kinn00kinn/Portfolio",
    demo: "https://kinn-kinn.com",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    demoLabel: "Visit site",
    overview: [
      "成果物、執筆、外部での採用・言及、研究活動を自分のドメインへ集約するためのWebサイトです。",
    ],
    highlights: [
      "Astroによる静的生成とCloudflare Pagesでの配信",
      "検索可能なProject registryと統合Activity timeline",
      "手作業で管理できるTypeScriptデータと軽量なローカル画像",
    ],
    schemaType: "SoftwareApplication",
  },
  {
    id: "seditor",
    title: "Seditor",
    description: "メモ帳の軽さとリッチなプレビューを両立するローカルMarkdownエディタ。",
    publishedAt: new Date("2025-12-07T00:00:00+09:00"),
    featured: true,
    order: 4,
    image: "/projects/seditor.webp",
    imageAlt: "SeditorのMarkdown編集プレビュー画面",
    tags: ["Tauri", "React", "Rust", "CodeMirror"],
    github: "https://github.com/kinn00kinn/Seditor",
    demo: "https://s.kinn-kinn.com/Seditor/",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    demoLabel: "Preview",
    overview: [
      "ローカルで素早く起動できるMarkdownエディタです。文章へ集中できる軽さと、見出しや表を確認しやすいリッチなプレビューの両立を目指しています。",
    ],
    highlights: [
      "Tauriによるデスクトップアプリ構成",
      "CodeMirrorとReactを使った編集UI",
      "アウトライン、印刷、プレビューを備えた文書作成体験",
    ],
    schemaType: "SoftwareApplication",
  },
  {
    id: "five-card-love",
    title: "Five Card Love",
    description: "互いの選択を明かさずに相思相愛か判定する、Five-Card Trickの体験デモ。",
    publishedAt: new Date("2026-08-21T00:00:00+09:00"),
    featured: false,
    order: 5,
    image: "/projects/five-card-love.webp",
    imageAlt: "Five Card Love - 5枚のカードを使った秘密計算デモ",
    tags: ["Cryptography", "WebRTC", "PeerJS", "JavaScript"],
    github: "https://github.com/kinn00kinn/five-card-love",
    demo: "https://s.kinn-kinn.com/five-card-love/",
    zenn: "https://zenn.dev/kinnkinn/articles/3c98e0d26663bd",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 0,
    demoLabel: "Try demo",
    overview: [
      "5枚のカードの並びだけを使い、互いの答えを直接明かさずに結果だけを確認するFive-Card Trickのインタラクティブデモです。",
      "1台で仕組みを試すモードと、WebRTCで2台を接続するモードを用意し、カードを操作しながらプロトコルの性質を体験できます。",
    ],
    highlights: [
      "カードの順序へ情報を符号化するFive-Card Trick",
      "1台・2台の両方で試せるインタラクティブUI",
      "PeerJSによる端末間通信と秘密を見せない操作フロー",
    ],
    impact: [
      "実装の着想とWebでの再現方法をZennで公開しました。",
    ],
    schemaType: "SoftwareApplication",
  },
  {
    id: "lut-estimator",
    title: "LUT Estimator",
    description: "補正前後の画像から3D LUTを推定し、別の画像へ色味を適用するPythonパッケージ。",
    publishedAt: new Date("2025-06-08T00:00:00+09:00"),
    featured: false,
    order: 6,
    image: "/projects/lut-estimator.webp",
    imageAlt: "LUT Estimatorによる色補正前後の比較",
    tags: ["Python", "Computer Vision", "3D LUT", "PyPI"],
    github: "https://github.com/kinn00kinn/LUT-Estimator",
    demo: "https://pypi.org/project/lut-estimator/",
    zenn: "https://zenn.dev/kinnkinn/articles/6d4de71d91ac6a",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    demoLabel: "PyPI",
    overview: [
      "変換前と変換後の画像ペアから色の対応関係を学習し、3D LUTとして書き出して別の画像へ適用できるPythonパッケージです。",
      "対応画素のサンプリング、ノイズを抑える前処理、未知色への補間を組み合わせ、推定結果を画像処理や映像制作で使える.cube形式へつなげます。",
    ],
    highlights: [
      "補正前後の対応画素から3D LUTを推定",
      "平滑化と2段階補間による安定した推定",
      "トライリニア補間、Python API、.cube export",
    ],
    impact: [
      "Reverse-LUT-Estimatorとして第三者による派生実装が公開されました。",
      "外部プロジェクトから既存のLUT推定ツールとして参照されています。",
    ],
    schemaType: "SoftwareSourceCode",
  },
  {
    id: "latte-logic",
    title: "LatteLogic",
    description: "長文と構造化ノートを読みやすくする、Obsidian用テーマ。",
    publishedAt: new Date("2026-02-15T00:00:00+09:00"),
    featured: false,
    order: 7,
    image: "/projects/latte-logic.webp",
    imageAlt: "LatteLogicのライトテーマとダークテーマ",
    tags: ["Obsidian", "CSS", "Theme", "Quartz"],
    github: "https://github.com/kinn00kinn/LatteLogic",
    demo: "https://github.com/kinn00kinn/LatteLogic/releases/latest",
    zenn: "https://zenn.dev/kinnkinn/articles/fcdb1ef1732619",
    language: "CSS",
    languageColor: "#563d7c",
    stars: 0,
    demoLabel: "Download",
    overview: [
      "長文と構造化Markdownを読み書きしやすくするObsidianテーマです。見出し階層、表、アクセント色を明確にしながら、長時間使える落ち着いた配色を目指しています。",
      "テーマ単体の公開に加え、Obsidian Community Themesへの掲載後も、別のMarkdown環境へ移植できる設計として育てています。",
    ],
    highlights: [
      "見出しの段階を視覚化するstep-down hierarchy",
      "表や長文の読みやすさを重視したライト・ダークテーマ",
      "Obsidianのアクセントカラーに対応",
    ],
    impact: [
      "Obsidian Community Themesに採用され、アプリ内から導入可能になりました。",
      "quartz-themesへ移植され、Quartzでも利用できるnpmパッケージになりました。",
    ],
    schemaType: "SoftwareSourceCode",
  },
  {
    id: "cuda-lbm",
    title: "CUDA LBM",
    description: "D2Q9格子ボルツマン法で円柱周りの流れをCPU・CUDA GPU上で計算し、渦度を可視化するシミュレーター。",
    publishedAt: new Date("2025-01-28T00:00:00+09:00"),
    featured: false,
    order: 8,
    image: "/projects/cuda-lbm.webp",
    imageAlt: "CUDA LBMで計算した円柱後流の渦度分布",
    tags: ["CUDA", "C++", "LBM", "Numerical Simulation"],
    github: "https://github.com/kinn00kinn/CUDA_LBM",
    language: "C++",
    languageColor: "#f34b7d",
    stars: 0,
    overview: [
      "D2Q9格子ボルツマン法とBGK衝突モデルで、2次元円柱周りの流れをCPUまたはCUDA GPU上で計算するシミュレーターです。",
    ],
    highlights: [
      "CPU・CUDA GPUの両バックエンド",
      "円柱後流の渦度分布をGIFとして可視化",
      "同じ設定によるCPU/GPU結果の比較",
    ],
    schemaType: "SoftwareSourceCode",
  },
  {
    id: "kadai-alert",
    title: "Kadai Alert",
    description: "Moodleのダッシュボードを定期監視し、表示内容の変化を音・デスクトップ通知・差分ファイルで知らせるツール。",
    publishedAt: new Date("2026-06-24T00:00:00+09:00"),
    featured: false,
    order: 9,
    image: "/projects/kadai-alert.webp",
    imageAlt: "Kadai AlertのGitHubプレビュー",
    tags: ["JavaScript", "Playwright", "Chromium", "Moodle"],
    github: "https://github.com/kinn00kinn/kadai-alert",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 0,
    overview: [
      "MoodleのダッシュボードをChromiumで定期的に確認し、課題・テスト欄の表示変化を検知するローカル監視ツールです。",
    ],
    highlights: [
      "PlaywrightによるChromiumの定期リロード",
      "CSS selectorと除外パターンによる監視範囲の調整",
      "ベル音、Web Audio、OS通知、差分ファイルでの通知",
    ],
    schemaType: "SoftwareSourceCode",
  },
  {
    id: "binarily",
    title: "Binarily",
    description: "0から11までの白黒カードを推理して当て合う、登録不要のブラウザ対戦型ロジックゲーム。",
    publishedAt: new Date("2025-12-15T00:00:00+09:00"),
    featured: false,
    order: 10,
    image: "/projects/binarily.webp",
    imageAlt: "Binarily - オンライン推理カードゲーム",
    tags: ["Next.js", "TypeScript", "Cloudflare Workers", "Multiplayer"],
    github: "https://github.com/kinn00kinn/number_guess",
    demo: "https://binarily.kinn-kinn.com/",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    demoLabel: "Play",
    overview: [
      "0から11までの白黒カードを使い、相手の伏せられた数字を論理的に推理するブラウザ対戦ゲームです。登録せずにルームへ参加できます。",
    ],
    highlights: [
      "Next.jsで構築した対戦UIと操作チュートリアル",
      "Cloudflare Workers上のマッチメイクとゲーム進行",
      "カードの色と並び順を手掛かりにした推理ルール",
    ],
    schemaType: "SoftwareApplication",
  },
  {
    id: "darts-score-board2",
    title: "Darts Score Board 2",
    description: "スコア入力、ランキング、ガチャ・祝福・効果音演出を備えた、イベント会場向け投影用ダーツスコアボード。",
    publishedAt: new Date("2025-10-16T00:00:00+09:00"),
    featured: false,
    order: 11,
    image: "/projects/darts-score-board2.webp",
    imageAlt: "Darts Score Board 2のスコアボード画面",
    tags: ["React", "Vite", "JavaScript", "Event Tool"],
    github: "https://github.com/kinn00kinn/darts-score-board2",
    demo: "https://darts-score-board2.vercel.app",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 0,
    demoLabel: "Open app",
    overview: [
      "文化祭などのイベント会場で投影し、参加者のダーツ得点を入力・ランキング表示するためのWebアプリです。",
    ],
    highlights: [
      "スコア入力、順位表示、Undo・Reset操作",
      "得点に応じたガチャ動画とトップ3の祝福演出",
      "効果音とプレミアム切り替えによる会場向け演出",
    ],
    schemaType: "SoftwareApplication",
  },
];
