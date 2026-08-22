import fs, { access, mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

const VARIANTS = {
	"Dracula": {
		text: "#f8f8f2",
		background: "#282a36",

		primary: "#bd93f9",
		secondary: "#8be9fd",
		tertiary: "#ffb86c",
		accent: "#ff79c6",

		surface: "#44475a",
		surface1: "#63667d",
		surface2: "#83869c",

		onSurface: "#6272a4",
		onSurface1: "#7282b5",
		onSurface2: "#8998c9",

		red: "#ff5555",
		green: "#50fa7b",
		blue: "#bd93f9",
		yellow: "#f1fa8c",

		_tmtheme: "https://raw.githubusercontent.com/dracula/sublime/refs/heads/master/Dracula.tmTheme",
		_tmthemeLicense: "https://raw.githubusercontent.com/dracula/sublime/refs/heads/master/LICENSE",
	},
	"Catppuccin Macchiato": {
		text: "#cad3f5",
		background: "#24273a",

		primary: "#8aadf4",
		secondary: "#8bd5ca",
		tertiary: "#f0c6c6",
		accent: "#f5bde6",

		surface: "#363a4f",
		surface1: "#494d64",
		surface2: "#5b6078",

		onSurface: "#6e738d",
		onSurface1: "#8087a2",
		onSurface2: "#939ab7",

		red: "#ed8796",
		green: "#a6da95",
		blue: "#8aadf4",
		yellow: "#eed49f",

		_tmtheme: "https://raw.githubusercontent.com/catppuccin/bat/refs/heads/main/themes/Catppuccin%20Macchiato.tmTheme",
		_tmthemeLicense: "https://raw.githubusercontent.com/catppuccin/bat/refs/heads/main/LICENSE",
	},
	"Catppuccin Mocha": {
		text: "#cdd6f4",
		background: "#1e1e2e",

		primary: "#89b4fa",
		secondary: "#94e2d5",
		tertiary: "#f2cdcd",
		accent: "#f5c2e7",

		surface: "#313244",
		surface1: "#45475a",
		surface2: "#585b70",

		onSurface: "#6c7086",
		onSurface1: "#7f849c",
		onSurface2: "#9399b2",

		red: "#f38ba8",
		green: "#a6e3a1",
		blue: "#89b4fa",
		yellow: "#f9e2af",

		_tmtheme: "https://raw.githubusercontent.com/catppuccin/bat/refs/heads/main/themes/Catppuccin%20Mocha.tmTheme",
		_tmthemeLicense: "https://raw.githubusercontent.com/catppuccin/bat/refs/heads/main/LICENSE",
	},
	"Catppuccin Latte": {
		text: "#4c4f69",
		background: "#eff1f5",

		primary: "#1e66f5",
		secondary: "#179299",
		tertiary: "#dd7878",
		accent: "#ea76cb",

		surface: "#ccd0da",
		surface1: "#bcc0cc",
		surface2: "#acb0be",

		onSurface: "#9ca0b0",
		onSurface1: "#8c8fa1",
		onSurface2: "#7c7f93",

		red: "#d20f39",
		green: "#40a02b",
		blue: "#1e66f5",
		yellow: "#df8e1d",

		_light: true,
		_tmtheme: "https://raw.githubusercontent.com/catppuccin/bat/refs/heads/main/themes/Catppuccin%20Latte.tmTheme",
		_tmthemeLicense: "https://raw.githubusercontent.com/catppuccin/bat/refs/heads/main/LICENSE",
	},
	"Catppuccin Frappe": {
		text: "#c6d0f5",
		background: "#303446",

		primary: "#8caaee",
		secondary: "#81c8be",
		tertiary: "#eebebe",
		accent: "#f4b8e4",

		surface: "#414559",
		surface1: "#51576d",
		surface2: "#626880",

		onSurface: "#737994",
		onSurface1: "#838ba7",
		onSurface2: "#949cbb",

		red: "#e78284",
		green: "#a6d189",
		blue: "#8caaee",
		yellow: "#e5c890",

		_tmtheme: "https://raw.githubusercontent.com/catppuccin/bat/refs/heads/main/themes/Catppuccin%20Frappe.tmTheme",
		_tmthemeLicense: "https://raw.githubusercontent.com/catppuccin/bat/refs/heads/main/LICENSE",
	},
}

const template = await readFile(join(__dirname, "./template.toml"), "utf8")
const readme = await readFile(join(__dirname, "./README.md"), "utf8")

for (const [name, colors] of Object.entries(VARIANTS)) {
	const lowerName = name.toLowerCase().replace(" ", "-")
	const wd = join(__dirname, `../${lowerName}.yazi`)
	try {
		await access(wd)
	} catch {
		await mkdir(wd)
	}

	// flavor.toml
	let s = template
	for (const [name, color] of Object.entries(colors)) {
		s = s.replaceAll(`\${${name}}`, color)
	}
	await writeFile(join(wd, "flavor.toml"), s.replaceAll("${variant}", lowerName))

	// README.md
	await writeFile(
		join(wd, "README.md"),
		readme
			.replaceAll("${mode}", colors._light ? "light" : "dark")
			.replaceAll("${variant}", lowerName)
			.replaceAll("${variant_cap}", name),
	)

	// tmtheme.xml
	await writeFile(join(wd, "tmtheme.xml"), await fetch(colors._tmtheme).then(r => r.text()))

	// LICENSE-tmtheme
	await writeFile(join(wd, "LICENSE-tmtheme"), await fetch(colors._tmthemeLicense).then(r => r.text()))
}
