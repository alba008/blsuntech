// tools/stripViteRefresh.mjs
import fs from "fs";
import path from "path";

const exts = new Set([".js", ".jsx", ".ts", ".tsx", ".html"]);
const root = process.cwd();

const LINE_PATTERNS = [
  /react-refresh\/runtime/i,
  /@vite\/client/i,
  /@react-refresh/i,
  /injectIntoGlobalHook/i,
  /\$RefreshReg\$/,
  /\$RefreshSig\$/,
  /performReactRefresh/i,
];

// remove entire <script> blocks containing vite/react-refresh (for public/index.html)
const BLOCK_PATTERN = /<script[^>]*>[\s\S]*?(react-refresh|@vite)[\s\S]*?<\/script>/gi;

function shouldTouch(file) {
  return exts.has(path.extname(file));
}

function strip(content) {
  let out = content.replace(BLOCK_PATTERN, "");
  const lines = out.split(/\r?\n/).filter(
    (l) => !LINE_PATTERNS.some((re) => re.test(l))
  );
  return lines.join("\n");
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (shouldTouch(full)) {
      const before = fs.readFileSync(full, "utf8");
      const after = strip(before);
      if (after !== before) {
        fs.writeFileSync(full, after, "utf8");
        console.log("fixed:", path.relative(root, full));
      }
    }
  }
}

walk(path.join(root, "src"));
const pub = path.join(root, "public", "index.html");
if (fs.existsSync(pub)) {
  const before = fs.readFileSync(pub, "utf8");
  const after = strip(before);
  if (after !== before) {
    fs.writeFileSync(pub, after, "utf8");
    console.log("fixed:", path.relative(root, pub));
  }
}
console.log("Done.");
