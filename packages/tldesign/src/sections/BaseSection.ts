export abstract class BaseSection {
  abstract name: string
  // 侧边tab组件
  abstract Tab: () => React.ReactElement | null
  // 侧边栏内容组件
  abstract Panel: () => React.ReactElement | null
}
