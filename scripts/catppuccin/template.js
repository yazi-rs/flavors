import { labels as colors } from "@catppuccin/palette";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

let file = await readFile(join(__dirname, "./theme.toml"), "utf-8");
const theme = "THEME NAME HERE";

for (const [name, color] of Object.entries(colors)) {
	file = file.replace(new RegExp(color[theme].hex, "g"), `{{ ${name} }}`);
}

file = file.replace(new RegExp(theme, "g"), "{{ variant }}");

await writeFile("./template.toml", file);
