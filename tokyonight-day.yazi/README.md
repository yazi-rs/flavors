<div align="center">
  <img src="https://github.com/sxyazi/yazi/blob/main/assets/logo.png?raw=true" alt="Yazi logo" width="20%">
</div>

<h3 align="center">
	Tokyonight Day Flavor for <a href="https://github.com/sxyazi/yazi">Yazi</a>
</h3>

## 👀 Preview

<img src="preview.png" width="600" />

## 🎨 Installation

```sh
ya pack -a yazi-rs/flavors:tokyonight-day
```

## ⚙️ Usage

Set the content of your `theme.toml` to enable it as your _light_ flavor:

```toml
[flavor]
use = "tokyonight-day"
# For Yazi 0.4 and later:
light = "tokyonight-day"
```

Make sure your `theme.toml` doesn't contain anything other than `[flavor]`, unless you want to override certain styles of this flavor.

See the [Yazi flavor documentation](https://yazi-rs.github.io/docs/flavors/overview) for more details.

## 📜 License

The flavor is MIT-licensed, and the included tmTheme is Apache-licensed.

Check the [LICENSE](LICENSE) and [LICENSE-tmtheme](LICENSE-tmtheme) file for more details.
