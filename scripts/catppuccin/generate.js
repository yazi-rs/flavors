import { variants, labels as colors } from "@catppuccin/palette";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

for (const variant of Object.keys(variants)) {
	let theme = await readFile(join(__dirname, "./template.toml"), "utf-8");
	for (const [name, color] of Object.entries(colors)) {
		theme = theme.replace(new RegExp(`{{ ${name} }}`, "g"), color[variant].hex);
	}
	theme = theme.replace("{{ variant }}", variant);
	await writeFile(
		join(__dirname, "../../catppuccin/", variant + ".toml"),
		theme
	);
}
