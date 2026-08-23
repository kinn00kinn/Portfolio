// src/lib/zenn.ts
import Parser from "rss-parser";
import { format } from "date-fns";

export interface Article {
  title: string;
  link: string;
  pubDate: string;
  likedCount?: number; // RSSでは取得できないためオプショナルに変更
}

export async function getZennArticles(limit?: number): Promise<Article[]> {
  const parser = new Parser();
  // ZennのRSSフィードを取得
  const feed = await parser.parseURL("https://zenn.dev/kinnkinn/feed");

  if (!feed.items) {
    return [];
  }

  const items = typeof limit === "number" ? feed.items.slice(0, limit) : feed.items;
  return items.map((item) => {
    return {
      title: item.title || "",
      link: item.link || "",
      // 日付の整形
      pubDate: item.pubDate 
        ? format(new Date(item.pubDate), "yyyy-MM-dd") 
        : "",
      // likedCountはRSSに含まれないため設定しない
    };
  });
}
