# Lightweight Tip Component

A lightweight tooltip component built with Web Components technology, featuring zero dependencies, small bundle size, and easy to use.

## ✨ Features

- 🚀 **Zero Dependencies** - No third-party libraries required
- 📦 **Lightweight** - Small bundle size with excellent performance
- 🔧 **Easy to Use** - Simple API, ready to use out of the box
- 🎯 **Smart Positioning** - Automatically detects text overflow and displays tooltips
- 🎨 **Customizable** - Supports custom styles and behaviors
- 🌐 **Modern Browser Support** - Based on Web Components standards
- ⚡ **Performance Optimized** - Uses AbortController for event management
- 🔄 **Delayed Hide** - Smart mouse interaction experience

## 📦 Installation

```bash
npm install lightweight-tip-component
# or
pnpm install lightweight-tip-component
# or
yarn add lightweight-tip-component
```

## 🚀 Quick Start

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <title>Tip Component Demo</title>
</head>
<body>
  <!-- Use directly in HTML -->
  <jk-tip>This is a long text that will automatically show a tooltip when the container width is insufficient</jk-tip>
  <script type="importmap">
    {
      "imports": {
        "lightweight-tip-component": "./node_modules/lightweight-tip-component/dist/lightweight-tip-component.es.js"
      }
    }
  </script>
  <script type="module">
      import TipWebComponent from 'lightweight-tip-component';
      TipWebComponent.define('my-tips');
  </script>
</body>
</html>
```

### Using in Modules

```javascript
// Import as ES module
import 'lightweight-tip-component';

// Or import the specific class
import TipWebComponent from 'lightweight-tip-component';

// Component will automatically register as <jk-tip> tag
// Or manually register with custom tag name
TipWebComponent.define('my-tip');
```

## 🌟 Usage Examples

### Basic Example

```html
<jk-tip>Simple text tooltip</jk-tip>
```

### Container with Limited Width

```html
<div style="width: 200px;">
  <jk-tip>This is a very long text that will automatically show a tooltip with complete content when the container width is insufficient</jk-tip>
</div>
```


## 🔧 Development

### Local Development

```bash
# Clone the project
git clone https://github.com/JinMokai/lightweight-tip-component.git
cd lightweight-tip-component

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Build

```bash
# Build for production
pnpm run build

# After building, the following files will be generated in the dist directory:
# - lightweight-tip-component.es.js (ES module version)
# - lightweight-tip-component.umd.js (UMD version, supports direct browser reference)
# - Corresponding .map files for debugging
```

### Preview

```bash
pnpm run preview
```


## 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork this project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

- GitHub: [@JinMokai](https://github.com/JinMokai)
- Issues: [GitHub Issues](https://github.com/JinMokai/lightweight-tip-component/issues)

## 🙏 Acknowledgments

The popup component part of this project is inspired by the design ideas of [xy-ui](https://github.com/XboxYan/xy-ui/tree/master/components/pop). Thanks for the inspiration.

---

⭐ If this project helps you, please give it a Star!