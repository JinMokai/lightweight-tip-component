# Lightweight Tip Component

一个轻量级的提示组件，基于 Web Components 技术构建，零依赖、体积小、使用简单。

## ✨ 特性

- 🚀 **零依赖** - 不依赖任何第三方库
- 📦 **轻量级** - 体积小，性能优秀
- 🔧 **易于使用** - 简单的 API，开箱即用
- 🎯 **智能定位** - 自动检测文本溢出并显示提示
- 🎨 **可定制** - 支持自定义样式和行为
- 🌐 **现代浏览器支持** - 基于 Web Components 标准
- ⚡ **性能优化** - 使用 AbortController 进行事件管理
- 🔄 **延迟隐藏** - 智能的鼠标交互体验

## 📦 安装

```bash
npm install lightweight-tip-component
# 或
pnpm install lightweight-tip-component
# 或
yarn add lightweight-tip-component
```

## 🚀 快速开始

### 基本使用

```html
<!DOCTYPE html>
<html>
<head>
  <title>Tip Component Demo</title>
</head>
<body>
  <!-- 直接在 HTML 中使用 -->
  <jk-tip>这是一个很长的文本，当容器宽度不足时会自动显示提示</jk-tip>
  
  <script type="module">
    import './src/main.js';
  </script>
</body>
</html>
```

### 在模块中使用

```javascript
// ES模块方式导入
import 'lightweight-tip-component';

// 或者导入具体的类
import { TipWebComponent } from 'lightweight-tip-component';

// 组件会自动注册为 <jk-tip> 标签
// 或者手动注册为自定义标签名
TipWebComponent.define('my-tip');
```

## 🌟 使用示例

### 基础示例

```html
<jk-tip>普通文本提示</jk-tip>
```

### 限制宽度的容器

```html
<div style="width: 200px;">
  <jk-tip>这是一个很长的文本，当容器宽度不足时会自动显示完整内容的提示</jk-tip>
</div>
```

### 表格中使用

```html
<table>
  <tr>
    <td style="width: 100px;">
      <jk-tip>很长的表格内容会被自动处理</jk-tip>
    </td>
  </tr>
</table>
```

### 禁用自动提示

```html
<jk-tip disabled>这个文本不会显示提示</jk-tip>
```

## 🔧 开发

### 本地开发

```bash
# 克隆项目
git clone https://github.com/JinMokai/lightweight-tip-component.git
cd lightweight-tip-component

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev
```

### 构建

```bash
# 构建生产版本
pnpm run build

# 构建后会在 dist 目录生成以下文件：
# - lightweight-tip-component.es.js (ES模块版本)
# - lightweight-tip-component.umd.js (UMD版本，支持浏览器直接引用)
# - 对应的 .map 文件用于调试
```

### 预览

```bash
pnpm run preview
```


## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📞 联系

- GitHub: [@JinMokai](https://github.com/JinMokai)
- Issues: [GitHub Issues](https://github.com/JinMokai/lightweight-tip-component/issues)

## 🙏 致谢

本项目的弹窗控件部分借鉴了 [xy-ui](https://github.com/XboxYan/xy-ui/tree/master/components/pop) 的设计思路，在此表示感谢。

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！