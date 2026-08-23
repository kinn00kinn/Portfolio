import { format } from "date-fns";
import Parser from "rss-parser";
import type { Article } from "./zenn";

export async function getBlogArticles(): Promise<Article[]> {
  const parser = new Parser();
  const feed = await parser.parseURL("https://blog.kinn-kinn.com/rss.xml");

  return (feed.items ?? []).map((item) => ({
    title: item.title ?? "",
    link: item.link ?? "",
    pubDate: item.pubDate ? format(new Date(item.pubDate), "yyyy-MM-dd") : "",
    source: "Blog",
  }));
}
