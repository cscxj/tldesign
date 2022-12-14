import { DefaultTheme } from 'styled-components'

export const DEAD_ZONE = 3
export const TEXT_SHAPE_PADDING = 4

export const ZOOM_GRADIENT = 25

// 图像到工作区的外边距
export const PAGE_MARGIN = 40

export const DEFAULT_THEME: DefaultTheme = {
  color: {
    primary: '#1890ff',
    link: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  },

  fontSize: {
    small: '12px',
    medium: '14px',
    large: '16px'
  },
  spacing: {
    medium: '16px',
    small: '12px',
    large: '24px'
  },
  borderRadius: {
    base: '2px',
    small: '2px'
  },
  border: {
    base: '1px solid #eef2f8'
  },
  shadow: {
    base: `0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05)`
  },
  animDuration: {
    slow: '0.3s',
    base: '0.2s',
    fast: '0.1s'
  }
}
