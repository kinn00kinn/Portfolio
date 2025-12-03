// src/lib/github.ts

// 取得するデータの型定義
export interface Repository {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

export async function getGithubRepos(): Promise<Repository[]> {
  const token = import.meta.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GITHUB_TOKEN is not defined in .env");
  }

  // GraphQLクエリ: ピン留めされたリポジトリを取得
  const query = `
    {
      viewer {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();

  // エラーハンドリング
  if (json.errors) {
    console.error("GitHub API Error:", json.errors);
    return [];
  }

  return json.data.viewer.pinnedItems.nodes;
}
