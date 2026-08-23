# kinn-kinn.com

kinn00kinnの成果物、記事、外部での採用・言及を集約するAstro製ポートフォリオです。

## コンテンツの更新

成果物は外部APIから自動生成せず、`src/data/projects.ts` の配列を手作業で更新します。画像にはGitHub Rawなどの外部URLを指定できます。

```ts
{
  id: "example",
  title: "Project name",
  description: "一覧に表示する短い説明",
  publishedAt: new Date("2026-08-23T00:00:00+09:00"),
  featured: false,
  order: 10,
  image: "https://raw.githubusercontent.com/.../example.png",
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

Activityは `src/data/activities.ts` の配列だけを、新しい順に手作業で更新します。種類は `Release / Article / Mention / Adoption / Research` の5つです。

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | 依存関係をインストール |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | `dist/`へ本番ビルド |
| `npm run preview` | 本番ビルドをローカルで確認 |
