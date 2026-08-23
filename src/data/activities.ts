export const activityTypes = [
  "Release",
  "Article",
  "Mention",
  "Adoption",
  "Research",
] as const;

export type ActivityType = (typeof activityTypes)[number];

export interface Activity {
  date: string;
  type: ActivityType;
  title: string;
  description: string;
  url?: string;
  project?: string;
}

// Activityは新しい順に、このファイルだけを手作業で更新する。
export const activities: Activity[] = [
  {
    date: "2026-08-22",
    type: "Article",
    title: "Five Card Loveの仕組みを解説",
    description:
      "5枚のカードだけで両思いかを判定するFive-Card Trickを、Webで再現した設計と実装をまとめました。",
    url: "https://zenn.dev/kinnkinn/articles/3c98e0d26663bd",
    project: "five-card-love",
  },
  {
    date: "2026-08-21",
    type: "Release",
    title: "Five Card Loveを公開",
    description:
      "Five-Card Trickを1台・2台で体験できるインタラクティブデモを公開しました。",
    url: "https://s.kinn-kinn.com/five-card-love/",
    project: "five-card-love",
  },
  {
    date: "2026-07-25",
    type: "Adoption",
    title: "LatteLogicがQuartzへ移植",
    description:
      "quartz-themesに移植され、npmパッケージとして利用できるようになりました。",
    url: "https://github.com/saberzero1/quartz-themes/tree/master/packages/lattelogic",
    project: "latte-logic",
  },
  {
    date: "2026-07-19",
    type: "Article",
    title: "BeeperをAndroidで使ってみた",
    description:
      "複数のチャットをまとめるBeeperの使用感をZennに公開しました。",
    url: "https://zenn.dev/kinnkinn/articles/d318b8f836d6f3",
  },
  {
    date: "2026-07-01",
    type: "Article",
    title: "ローカルMarkdownエディタを探してZedに行き着いた話",
    description:
      "起動速度と書き心地を軸に、Markdownエディタ選びをまとめました。",
    url: "https://zenn.dev/kinnkinn/articles/3a0e948d3cf6e5",
  },
  {
    date: "2026-04-12",
    type: "Adoption",
    title: "LUT Estimatorから外部派生プロジェクトが誕生",
    description:
      "jschw/Reverse-LUT-Estimatorとして外部ユーザーにフォークされました。",
    url: "https://github.com/jschw/Reverse-LUT-Estimator",
    project: "lut-estimator",
  },
  {
    date: "2026-02-16",
    type: "Article",
    title: "Obsidianの自作テーマを公開するまで",
    description:
      "テーマ作成からCommunity Themesへの申請までをZennにまとめました。",
    url: "https://zenn.dev/kinnkinn/articles/fcdb1ef1732619",
    project: "latte-logic",
  },
  {
    date: "2026-02-15",
    type: "Adoption",
    title: "LatteLogicがObsidian Community Themesに採用",
    description:
      "Obsidianの公式Community Themes一覧からインストールできるようになりました。",
    url: "https://github.com/obsidianmd/obsidian-releases/blob/master/community-css-themes.json",
    project: "latte-logic",
  },
  {
    date: "2025-11-11",
    type: "Article",
    title: "パンダ特化型SNS PanDoの技術スタックを公開",
    description:
      "Next.js、Python、Supabaseで構築したPanDoの構成と、UXへのこだわりをZennにまとめました。",
    url: "https://zenn.dev/kinnkinn/articles/622a65a2a76dce",
    project: "pando",
  },
  {
    date: "2026-02-15",
    type: "Release",
    title: "LatteLogic 1.0.0を公開",
    description:
      "構造化Markdownの読み書きに焦点を当てたObsidianテーマを公開しました。",
    url: "https://github.com/kinn00kinn/LatteLogic/releases/tag/1.0.0",
    project: "latte-logic",
  },
  {
    date: "2025-10-20",
    type: "Mention",
    title: "P2P Othelloの記事がはてなブックマークで紹介",
    description:
      "P2Pと無料サービスで構築した対戦オセロの記事が、サイト外でも読まれました。",
    url: "https://b.hatena.ne.jp/entry/s/zenn.dev/kinnkinn/articles/ff844e4d9e3ce4",
    project: "p2p-othello",
  },
  {
    date: "2025-10-20",
    type: "Article",
    title: "P2Pと無料サービスだけで対戦オセロを作った話",
    description:
      "WebRTC、GitHub Pages、Renderを組み合わせた構成をZennで解説しました。",
    url: "https://zenn.dev/kinnkinn/articles/ff844e4d9e3ce4",
    project: "p2p-othello",
  },
  {
    date: "2025-06-08",
    type: "Article",
    title: "画像ペアからLUTを作る方法を解説",
    description:
      "変換前後の画像から3D LUTを推定し、別の画像へ色味を適用する方法をZennにまとめました。",
    url: "https://zenn.dev/kinnkinn/articles/6d4de71d91ac6a",
    project: "lut-estimator",
  },
  {
    date: "2025-06-08",
    type: "Research",
    title: "画像ペアから3D LUTを推定",
    description:
      "色補正前後の対応画素をサンプリングし、別画像へ適用できる3D LUT推定を実装しました。",
    url: "https://github.com/kinn00kinn/LUT-Estimator",
    project: "lut-estimator",
  },
];
