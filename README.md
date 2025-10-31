# 问答后台管理系统

这是一个基于 Vue.js 和 Element UI 构建的简单后台管理系统，用于管理问答应用中的题目和用户。

## ✨ 功能

- 用户管理：查看和管理用户信息。
- 题目管理：查看、创建、编辑和删除题目。

## 🚀 技术栈

- [Vue.js](https://vuejs.org/) (v2)
- [Vue Router](https://router.vuejs.org/)
- [Element UI](https://element.eleme.io/)
- [Vue CLI](https://cli.vuejs.org/)

## 📦 快速开始

### 1. 克隆项目

```bash
git clone <your-repository-url>
cd quiz-backstage-management
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

运行此命令后，项目将在 `http://localhost:8080` 上可用。

```bash
npm run serve
```

### 4. 构建生产版本

此命令会将项目打包到 `dist` 目录中，用于生产部署。

```bash
npm run build
```

### 5. 代码格式检查和修复

```bash
npm run lint
```

## 📁 项目结构

```
.
├── public/
│   └── index.html      # HTML 入口文件
├── src/
│   ├── assets/         # 静态资源 (图片, 样式)
│   ├── components/     # 可复用的 Vue 组件
│   ├── router/         # 路由配置
│   │   └── index.js
│   ├── views/          # 页面视图组件
│   │   └── element/
│   │       ├── QuestionView.vue # 题目管理页面
│   │       └── UserView.vue     # 用户管理页面
│   ├── App.vue         # 根组件
│   └── main.js         # 应用入口文件
├── babel.config.js     # Babel 配置文件
├── package.json        # 项目依赖和脚本
└── vue.config.js       # Vue CLI 配置文件
```
