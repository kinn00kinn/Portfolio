// src/pages/og-image.png.ts
import satori from "satori";
import sharp from "sharp";

export const GET = async () => {
  // フォントをCDNから取得（Noto Sans JP Bold）
  const fontData = await fetch(
    "https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/Japanese/NotoSansCJKjp-Bold.otf"
  ).then((res) => res.arrayBuffer());

  // SatoriでJSXからSVGを生成
  const svg = await satori(
    {
      type: "div",
      props: {
        children: [
          {
            type: "div",
            props: {
              children: [
                // アイコン
                {
                  type: "img",
                  props: {
                    src: "https://github.com/kinn00kinn.png",
                    width: 150,
                    height: 150,
                    style: { borderRadius: "50%", border: "4px solid black" },
                  },
                },
                {
                  type: "div",
                  props: {
                    children: [
                      {
                        type: "h1",
                        props: {
                          children: "Kinn00kinn",
                          style: {
                            fontSize: "64px",
                            fontWeight: "900",
                            margin: "0 0 16px 0",
                          },
                        },
                      },
                      {
                        type: "p",
                        props: {
                          children: "Portfolio / KOSEN Advanced Course Student",
                          style: {
                            fontSize: "32px",
                            color: "#333",
                            margin: 0,
                            fontWeight: "700",
                          },
                        },
                      },
                    ],
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "48px",
                    },
                  },
                },
              ],
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "60px",
                border: "8px solid black", // 角丸なし
                backgroundColor: "white",
                height: "100%",
                width: "100%",
              },
            },
          },
        ],
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#f0f0f0",
          padding: "40px",
        },
      },
    } as any, // 【修正点1】ここ型定義エラーを回避するために as any を追加
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png as any, {
    // 【修正点2】Buffer型をResponseが受け取れるように as any を追加
    headers: {
      "Content-Type": "image/png",
    },
  });
};
