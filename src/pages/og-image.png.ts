// src/pages/og-image.png.ts
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import ogCard from "../assets/og-card.svg?raw";

const width = 1200;
const height = 630;

export const GET = async () => {
  const card = await sharp(Buffer.from(ogCard), { density: 144 })
    .resize(width, height)
    .png()
    .toBuffer();

  const pandaSource = await readFile(path.join(process.cwd(), "public", "kinnkinn.png"));
  const panda = await sharp(pandaSource)
    .extract({ left: 105, top: 40, width: 285, height: 420 })
    .resize(218, 321, { fit: "contain" })
    .png()
    .toBuffer();

  const png = await sharp(card)
    .composite([{ input: panda, left: 146, top: 112 }])
    .png()
    .toBuffer();

  return new Response(png as BodyInit, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
