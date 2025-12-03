// src/lib/zenn.ts
import Parser from "rss-parser";
import { format } from "date-fns";

export interface Article {
  title: string;
  link: string;
  pubDate: string;
  likedCount?: number; // RSSでは取得できないためオプショナルに変更
}

export async function getZennArticles(): Promise<Article[]> {
  const parser = new Parser();
  // ZennのRSSフィードを取得
  const feed = await parser.parseURL("https://zenn.dev/kinnkinn/feed");

  if (!feed.items) {
    return [];
  }

  // 最新5件を取得して整形
  return feed.items.slice(0, 3).map((item) => {
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