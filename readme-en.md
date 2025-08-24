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
    <button data-tip="This is a tooltip">Hover me</button>
    
    <script type="module">
        import { TipWebComponent } from './dist/lightweight-tip-component.es.js';
        
        // Initialize tooltip
        const tip = new TipWebComponent();
        tip.init();
    </script>
</body>
</html>
```

### Module Usage

```javascript
import { TipWebComponent } from 'lightweight-tip-component';

// Create tooltip instance
const tip = new TipWebComponent({
    // Configuration options
    theme: 'dark',
    position: 'top',
    delay: 200
});

// Initialize
tip.init();
```

## 📖 Usage Examples

### Basic Tooltip

```html
<span data-tip="This is a basic tooltip">Basic tooltip</span>
```

### Custom Position

```html
<span data-tip="Top tooltip" data-tip-position="top">Top</span>
<span data-tip="Bottom tooltip" data-tip-position="bottom">Bottom</span>
<span data-tip="Left tooltip" data-tip-position="left">Left</span>
<span data-tip="Right tooltip" data-tip-position="right">Right</span>
```

### Custom Theme

```html
<span data-tip="Dark theme tooltip" data-tip-theme="dark">Dark theme</span>
<span data-tip="Light theme tooltip" data-tip-theme="light">Light theme</span>
```

### Dynamic Content

```javascript
// Update tooltip content dynamically
const element = document.querySelector('[data-tip]');
element.setAttribute('data-tip', 'New tooltip content');
```

## 🛠 Development

### Local Development

```bash
# Clone the repository
git clone <repository-url>
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

# Build demo
pnpm run build:demo
```

### Preview

```bash
# Preview demo
pnpm run demo:preview
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

## 🙏 Acknowledgments

Thanks to the [xy-ui](https://github.com/XiaoYimi/xy-ui) project for inspiration and reference.