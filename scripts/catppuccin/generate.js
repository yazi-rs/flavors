import { variants, labels as colors } from "@catppuccin/palette"
import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

const template = await readFile(join(__dirname, "./template.toml"), "utf8")
const readme = await readFile(join(__dirname, "./README.md"), "utf8")

for (const variant of Object.keys(variants)) {
	// theme.toml
	let theme = template
	for (const [name, color] of Object.entries(colors)) {
		theme = theme.replaceAll(`{{ ${name} }}`, color[variant].hex)
	}
	theme = theme.replaceAll("{{ variant }}", variant)
	await writeFile(join(__dirname, `../../catppuccin-${variant}.yazi/theme.toml`), theme)

	// README.md
	await writeFile(
		join(__dirname, `../../catppuccin-${variant}.yazi/README.md`),
		readme
			.replaceAll("{{ variant }}", variant)
			.replaceAll("{{ variant_cap }}", variant.charAt(0).toUpperCase() + variant.slice(1)),
	)
}
