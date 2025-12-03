// src/lib/zenn.ts
import Parser from "rss-parser";

export interface Article {
  title: string;
  link: string;
  pubDate: string;
  isoDate: string;
}

export async function getZennArticles(): Promise<Article[]> {
  const parser = new Parser();
  // ZennのRSSフィードを取得
  const feed = await parser.parseURL("https://zenn.dev/kinnkinn/feed");

  // 型を整えて返す
  return feed.items.map((item) => ({
    title: item.title || "",
    link: item.link || "",
    pubDate: item.pubDate || "", // 表示用（例: "Sat, 05 Nov 2025..."）
    isoDate: item.isoDate || "", // ソート用
  }));
}
