// src/lib/github.ts

export interface Repository {
  name: string;
  description: string;
  url: string;
  homepageUrl: string | null; // 追加
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

// 戻り値を変更: リポジトリリストとアバターURLを含むオブジェクト
export interface GithubData {
  repos: Repository[];
  avatarUrl: string;
}

export async function getGithubData(): Promise<GithubData> {
  const token = import.meta.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GITHUB_TOKEN is not defined in .env");
  }

  const query = `
    {
      viewer {
        avatarUrl
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              homepageUrl
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

  if (json.errors) {
    console.error("GitHub API Error:", json.errors);
    return { repos: [], avatarUrl: "" };
  }

  return {
    repos: json.data.viewer.pinnedItems.nodes,
    avatarUrl: json.data.viewer.avatarUrl,
  };
}
