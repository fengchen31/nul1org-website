# NUL1 Integrated Website

三個互動式網頁專案的整合展示網站，通過單一 Next.js 應用統一訪問。

## 🎯 整合方案

### 完全整合的專案
✅ **Fluid Glass** - 已編譯為靜態文件，完全整合在 `/public/fluidglass`
✅ **Tutorial Grid** - 已編譯為靜態文件，完全整合在 `/public/grid`
✅ **Draggable Grid** - 靜態文件，完全整合在 `/public/draggable`

## 📁 專案結構

```
integrated-website/
├── src/app/
│   ├── page.tsx              # 首頁（Fluid Glass）
│   ├── grid/page.tsx         # Tutorial Grid 頁面
│   └── draggable/page.tsx    # Draggable Grid 頁面
└── public/
    ├── fluidglass/           # Fluid Glass 靜態文件（已編譯）
    ├── grid/                 # Tutorial Grid 靜態文件（已編譯）
    └── draggable/            # Draggable Grid 靜態文件
```

## 🚀 快速開始

只需一個命令即可啟動：

```bash
cd /Users/feng/Documents/nul1-website/integrated-website
npm run dev
```

然後訪問：**http://localhost:3001**

所有三個專案都已完全整合為靜態文件，無需額外啟動其他服務器！

## 🌐 訪問方式

打開瀏覽器訪問：**http://localhost:3001**

### 導航
- **首頁** - Fluid Glass（全螢幕展示，右上角有小連結）
- **Grid** - 點擊右上角 "Grid" 按鈕
- **Draggable** - 點擊右上角 "Draggable" 按鈕

每個頁面都有導航連結可以快速切換。

## 📦 包含的專案

### 1. Fluid Glass (首頁)
- **技術**: Vue 3 + OGL (WebGL) + Vite
- **展示**: 流體玻璃效果 WebGL 展示
- **整合方式**: ✅ 完全整合（靜態文件）
- **說明**: 已通過 Vite 編譯成靜態文件

### 2. Tutorial Grid (/grid)
- **技術**: Vanilla JS + Three.js + Vite
- **展示**: 互動式 3D 卡片網格
- **整合方式**: ✅ 完全整合（靜態文件）
- **說明**: 已通過 Vite 編譯成靜態文件

### 3. Draggable Grid (/draggable)
- **技術**: Vanilla JS + GSAP
- **展示**: 可拖曳產品網格 + 流暢動畫
- **整合方式**: ✅ 完全整合（靜態文件）
- **說明**: 純靜態文件，無需編譯

## 🛠 技術細節

### 主網站
- **框架**: Next.js 15 + TypeScript
- **樣式**: Tailwind CSS
- **路由**: App Router (Next.js)

### 整合策略
所有三個專案都已完全整合為靜態文件：
1. **Fluid Glass**:
   - 使用 Vite 編譯為靜態文件
   - 放置在 Next.js `public/fluidglass/` 目錄
   - 通過 iframe 嵌入首頁

2. **Tutorial Grid**:
   - 使用 Vite 編譯為靜態文件
   - 放置在 Next.js `public/grid/` 目錄
   - 通過 iframe 嵌入頁面

3. **Draggable Grid**:
   - 純靜態文件，無需編譯
   - 放置在 Next.js `public/draggable/` 目錄
   - 通過 iframe 嵌入頁面

## 📝 注意事項

- **端口佔用**: 確保 3001 端口未被佔用
- **開發模式**: 使用的是開發服務器，生產環境需要額外配置
- **靜態文件**: 所有專案都已編譯為靜態文件，無需額外服務器

## 🎉 完成狀態

✅ Fluid Glass - 100% 整合
✅ Tutorial Grid - 100% 整合
✅ Draggable Grid - 100% 整合

所有專案都可以通過單一 URL (localhost:3001) 訪問，並且保持完整的原有功能。
