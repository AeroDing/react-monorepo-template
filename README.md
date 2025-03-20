# React Monorepo Template

这是一个基于 React 的 Monorepo 项目模板，使用现代化的前端技术栈和工具链。

## 1. 技术栈
### 1.1 核心技术
- **框架**：React 18
- **构建工具**：Vite 6
- **包管理器**：pnpm 10.5.2
- **语言**：TypeScript
- **状态管理**：Zustand
- **UI 组件库**：Ant Design (antd 5.x)

### 1.2 工具链
- **代码规范**：ESLint
- **Git Hooks**：simple-git-hooks
- **测试框架**：Vitest
- **文档工具**：VitePress

### 1.3 主要依赖
- **路由**：react-router-dom 7
- **HTTP 请求**：axios
- **国际化**：react-i18next
- **CSS 预处理器**：Sass
- **原子化 CSS**：UnoCSS
- **Hooks 库**：ahooks
- **表单处理**：react-hook-form

## 2. 项目结构
```
.
├── app/                # 应用目录
│   └── app-site/      # 主应用
├── packages/          # 共享包目录
├── docs/             # 文档目录
├── examples/         # 示例目录
├── playground/       # 开发调试目录
└── node_modules/     # 依赖包
```

## 3. 项目管理
### 3.1 Monorepo 管理
- 使用 pnpm workspace 进行多包管理
- 统一的依赖版本管理（通过 catalog 配置）
- 支持包之间的相互引用

### 3.2 开发脚本
```bash
# 开发命令
pnpm dev           # 开发所有项目
pnpm dev:app-site  # 开发主应用

# 构建命令
pnpm build         # 构建所有项目

# 代码检查
pnpm lint         # ESLint 检查
pnpm typecheck    # TypeScript 类型检查

# 测试
pnpm test         # 运行测试

# 清理
pnpm clean        # 清理所有 node_modules
```

## 4. 下载和安装
1. **克隆项目**
```bash
git clone https://github.com/AeroDing/react-monorepo-template.git
cd react-monorepo-template
```

2. **安装依赖**
```bash
# 安装 pnpm（如果未安装）
npm install -g pnpm

# 安装项目依赖
pnpm install
```

## 5. 特点和优势
1. **现代化技术栈**：使用最新的 React 18 和 Vite 6
2. **类型安全**：完整的 TypeScript 支持
3. **开发体验**：
   - 热更新
   - 自动导入
   - ESLint 配置
   - Git hooks
4. **可扩展性**：Monorepo 结构便于管理多个相关项目
5. **规范化**：内置代码规范和提交规范

## 6. 开发规范
- 使用 ESLint 进行代码规范检查
- 提交前自动运行 lint-staged
- TypeScript 严格模式
- 统一的依赖版本管理

## Git Commit 规范

提交信息格式: `<type>(<scope>): <subject>`

type 类型:
- feat: 新功能
- fix: 修复 bug
- docs: 文档变更
- style: 代码格式改变
- refactor: 代码重构
- perf: 性能优化
- test: 测试相关
- build: 构建系统或外部依赖项的更改
- ci: CI/CD 相关变更
- chore: 其他修改
- revert: 回退提交

scope 影响范围:
- 表示 commit 影响的范围
- 比如: route, component, utils, build...

subject 提交说明: ......

## 7. 许可证
MIT License
