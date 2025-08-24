# Lightweight Tip Component

A lightweight tooltip component that can be used in any web project.

## ✨ Features

- 🚀 **Lightweight**: Small bundle size, no external dependencies
- 📱 **Responsive**: Automatically adapts to different screen sizes
- 🎨 **Customizable**: Supports custom styles and themes
- 🔧 **Easy to use**: Simple API, quick integration
- 🌐 **Cross-browser**: Compatible with modern browsers
- ⚡ **High performance**: Optimized rendering and event handling
- 🎯 **Flexible positioning**: Multiple positioning options
- 🔄 **Dynamic content**: Supports dynamic content updates

## 📦 Installation

```bash
npm install lightweight-tip-component
# or
yarn add lightweight-tip-component
# or
pnpm add lightweight-tip-component
```

## 🚀 Quick Start

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <title>Tooltip Demo</title>
</head>
<body>
    <!-- use in html -->
    <jk-tip>This is a long text, and a hint will be automatically displayed when the container width is insufficient.</jk-tip>
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

### Module Usage

```javascript
import TipWebComponent from 'lightweight-tip-component';

// Or import a specific class
import TipWebComponent from 'lightweight-tip-component';

// The component is automatically registered as a <jk-tip> tag
// Or manually register as a custom tag name
TipWebComponent.define('my-tip');
```

## 📖 Usage Examples

### Basic Tooltip

```html
<jk-tip>Normal text tip</jk-tip>
```

### Custom Position

```html
<div style="width: 200px;">
  <jk-tip>This is a long text, when the container width is insufficient, the full content will be automatically displayed.</jk-tip>
</div>
```

## 🛠 Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/JinMokai/lightweight-tip-component.git
cd lightweight-tip-component

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Build

```bash
# Build library
pnpm run build

```

### Preview

```bash
pnpm run preview
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

If you have any questions or suggestions, feel free to contact us:

- GitHub: [https://github.com/your-username/lightweight-tip-component](https://github.com/your-username/lightweight-tip-component)
- Issues: [GitHub Issues](https://github.com/JinMokai/lightweight-tip-component/issues)

## 🙏 Acknowledgments

Thanks to the [xy-ui](https://github.com/XiaoYimi/xy-ui) project for inspiration and reference.