# kinn-kinn.com

kinn00kinnの成果物、記事、外部での採用・言及を集約するAstro製ポートフォリオです。

## ドキュメント

- [ユーザーマニュアル](doc/ユーザーマニュアル.md): ページ構成、検索、リンク、テーマ切り替えの使い方
- [更新ガイドライン](doc/更新ガイドライン.md): プロジェクト・Activityの追加ルール、更新手順、レビュー項目
- [設計書](doc/設計書.md): サイトの構成と実装方針

## コンテンツの更新（概要）

成果物は外部APIから自動生成せず、`src/data/projects.ts` の配列を手作業で更新します。カード画像は`public/projects/`の軽量WebPを使用します。

```ts
{
  id: "example",
  title: "Project name",
  description: "一覧に表示する短い説明",
  publishedAt: new Date("2026-08-23T00:00:00+09:00"),
  featured: false,
  order: 10,
  image: "/projects/example.webp",
  imageAlt: "画像の説明",
  tags: ["Astro", "TypeScript"],
  github: "https://github.com/kinn00kinn/example",
  demo: "https://example.com",
  zenn: "https://zenn.dev/kinnkinn/articles/example",
  language: "TypeScript",
  languageColor: "#3178c6",
  stars: 0,
}
```

- `featured: true` の成果物はトップページのPinned Projects候補になります。
- `demo` と `zenn` は該当リンクがある場合だけ記述します。
- 詳細なフィールド定義、画像URL、確認手順は[更新ガイドライン](doc/更新ガイドライン.md)を参照してください。

Activityは `src/data/activities.ts` の配列だけを、新しい順に手作業で更新します。種類は `Release / Article / Mention / Adoption / Research` の5つです。

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | 依存関係をインストール |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | `dist/`へ本番ビルド |
| `npm run images:projects` | 公開中の元画像からカード用WebPを再生成 |
| `npm run preview` | 本番ビルドをローカルで確認 |
