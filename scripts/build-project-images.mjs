import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(root, "public", "projects");
const width = 1200;
const height = 675;

const sources = {
  p2pOthello: "https://static.zenn.studio/user-upload/ebd078f45e55-20251017.png",
  pando: "https://raw.githubusercontent.com/kinn00kinn/PanDo/main/frontend/public/Pando_banner_1000.png",
  portfolio: "https://kinn-kinn.com/og-image.png",
  seditor: "https://raw.githubusercontent.com/kinn00kinn/Seditor/main/screenshot.png",
  fiveCardLove: "https://raw.githubusercontent.com/kinn00kinn/five-card-love/main/ogp.png",
  lutBefore: "https://raw.githubusercontent.com/kinn00kinn/LUT-Estimator/main/img/base.JPG",
  lutAfter: "https://raw.githubusercontent.com/kinn00kinn/LUT-Estimator/main/img/apply_lut.JPG",
  latteLogic: "https://raw.githubusercontent.com/kinn00kinn/LatteLogic/master/cover.png",
  cudaLbm: "https://raw.githubusercontent.com/kinn00kinn/CUDA_LBM/main/simulation.gif",
  kadaiAlert: "https://opengraph.githubassets.com/1/kinn00kinn/kadai-alert",
  binarily: "https://binarily.kinn-kinn.com/logo.svg",
  darts: "https://raw.githubusercontent.com/kinn00kinn/darts-score-board2/main/README_src/image-10.png",
};

async function download(url) {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

async function saveWebp(name, pipeline, options = {}) {
  const output = path.join(outputDirectory, `${name}.webp`);
  await pipeline.webp({ quality: 76, effort: 6, smartSubsample: true, ...options }).toFile(output);
  return output;
}

async function cover(name, buffer, position = "centre") {
  return saveWebp(
    name,
    sharp(buffer).resize(width, height, { fit: "cover", position }).flatten({ background: "#f4f2ee" }),
  );
}

async function contain(name, buffer, background = "#f4f2ee", inset = 0) {
  return saveWebp(
    name,
    sharp(buffer)
      .resize(width - inset * 2, height - inset * 2, { fit: "contain", background })
      .extend({ top: inset, bottom: inset, left: inset, right: inset, background })
      .flatten({ background }),
  );
}

async function p2pCard(buffer) {
  const background = await sharp(buffer)
    .resize(width, height, { fit: "cover" })
    .blur(24)
    .modulate({ brightness: 0.72, saturation: 0.8 })
    .toBuffer();
  const foreground = await sharp(buffer)
    .resize(width - 56, height - 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return saveWebp(
    "p2p-othello",
    sharp(background).composite([{ input: foreground, gravity: "centre" }]),
  );
}

async function pandoCard(buffer) {
  const banner = await sharp(buffer)
    .resize(1100, 260, {
      fit: "contain",
      kernel: sharp.kernel.nearest,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();
  return saveWebp(
    "pando",
    sharp({ create: { width, height, channels: 3, background: "#f7f7f4" } }).composite([
      { input: banner, gravity: "centre" },
    ]),
    { lossless: true },
  );
}

async function lutCard(beforeBuffer, afterBuffer) {
  const crop = { left: 500, top: 0, width: 3456, height: 3888 };
  const before = await sharp(beforeBuffer).extract(crop).resize(600, height).toBuffer();
  const after = await sharp(afterBuffer).extract(crop).resize(600, height).toBuffer();
  const labels = Buffer.from(`
    <svg width="1200" height="675" xmlns="http://www.w3.org/2000/svg">
      <rect x="24" y="24" width="138" height="50" rx="8" fill="#18181b" fill-opacity="0.82"/>
      <text x="93" y="57" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="700" fill="white">BEFORE</text>
      <rect x="1038" y="24" width="138" height="50" rx="8" fill="#18181b" fill-opacity="0.82"/>
      <text x="1107" y="57" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="700" fill="white">AFTER</text>
      <rect x="597" y="0" width="6" height="675" fill="white" fill-opacity="0.92"/>
    </svg>
  `);
  return saveWebp(
    "lut-estimator",
    sharp({ create: { width, height, channels: 3, background: "#ffffff" } }).composite([
      { input: before, left: 0, top: 0 },
      { input: after, left: 600, top: 0 },
      { input: labels, left: 0, top: 0 },
    ]),
    { quality: 72 },
  );
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  const entries = await Promise.all(
    Object.entries(sources).map(async ([key, url]) => [key, await download(url)]),
  );
  const image = Object.fromEntries(entries);

  const cudaFrame = await sharp(image.cudaLbm, { page: 200 }).png().toBuffer();

  const outputs = await Promise.all([
    p2pCard(image.p2pOthello),
    pandoCard(image.pando),
    cover("portfolio", image.portfolio),
    cover("seditor", image.seditor, "left"),
    cover("five-card-love", image.fiveCardLove),
    lutCard(image.lutBefore, image.lutAfter),
    cover("latte-logic", image.latteLogic),
    contain("cuda-lbm", cudaFrame, "#ffffff", 22),
    cover("kadai-alert", image.kadaiAlert),
    contain("binarily", image.binarily, "#f8fafc", 52),
    cover("darts-score-board2", image.darts),
  ]);

  console.log(`Generated ${outputs.length} project images in ${outputDirectory}`);
}

await main();
