import { variants, labels as colors } from "@catppuccin/palette"
import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

const template = await readFile(join(__dirname, "./template.toml"), "utf8")
const readme = await readFile(join(__dirname, "./README.md"), "utf8")

for (const variant of Object.keys(variants)) {
	// flavor.toml
	let flavor = template
	for (const [name, color] of Object.entries(colors)) {
		flavor = flavor.replaceAll(`{{ ${name} }}`, color[variant].hex)
	}
	flavor = flavor.replaceAll("{{ variant }}", variant)
	await writeFile(join(__dirname, `../../catppuccin-${variant}.yazi/flavor.toml`), flavor)

	// README.md
	await writeFile(
		join(__dirname, `../../catppuccin-${variant}.yazi/README.md`),
		readme
			.replaceAll("{{ variant }}", variant)
			.replaceAll("{{ variant_cap }}", variant.charAt(0).toUpperCase() + variant.slice(1)),
	)
}
