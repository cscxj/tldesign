import { TLPage, TLPageState, TLShape } from '@tldesign/core'

// shapes

export enum TDShapeType {
  Image = 'image',
  Text = 'text',
  Group = 'group'
}

export enum SessionType {
  Brush = 'brush',
  Translate = 'translate',
  Rotate = 'rotate',
  Scale = 'scale'
}

export enum TDStatus {
  Idle = 'idle',
  PointingBounds = 'pointing_bounds',
  PointingCanvas = 'pointing_canvas',
  PointingRotateHandle = 'pointing_rotate_handle',
  PointingScaleHandle = 'pointing_scale_handle',
  Brushing = 'brushing',
  Translating = 'translating',
  Rotating = 'rotating',
  Scaling = 'scaling'
}

export interface TDBaseShape extends TLShape {
  type: TDShapeType
}

export interface ImageShape extends TDBaseShape {
  type: TDShapeType.Image
  assetId: string
}

export interface TextShape extends TDBaseShape {
  type: TDShapeType.Text
  text: string
  // 颜色
  color: string
  // 背景色
  backgroundColor: string | null
  // 字体
  fontFamily: string
  // 字体样式，斜体等等
  fontStyle: string
  // 粗细
  fontWeight: number
  // 字体大小
  fontSize: number
  // 行高
  lineHeight: number
  // 行距
  letterSpacing: number
  // 文本方向
  textDecoration: string
  // 写入模式
  writingMode:
    | 'horizontal-tb'
    | 'vertical-rl'
    | 'vertical-lr'
    | 'sideways-rl'
    | 'sideways-lr'
  // 对齐方式
  textAlign:
    | 'center'
    | 'end'
    | 'justify'
    | 'left'
    | 'match-parent'
    | 'right'
    | 'start'
  // 垂直对齐方式
  verticalAlign: string
  // 文字阴影
  textShadow: string | null
}

export interface GroupShape extends TDBaseShape {
  type: TDShapeType.Group
}

export type TDShape = ImageShape | TextShape | GroupShape

// page

export type TDPage = TLPage<TDShape>

// document

export interface TDDocument {
  id: string
  name: string
  version: number
  pages: Record<string, TDPage>
  pageStates: Record<string, TLPageState>
}

// app state

export interface TDSnapshot {
  appState: {
    currentPageId: string
    status: TDStatus
  }
  document: TDDocument
}

export type TlDesignPatch = Patch<TDSnapshot>

export interface Command<T extends { [key: string]: any }> {
  id?: string
  before: Patch<T>
  after: Patch<T>
}

export type TlDesignCommand = Command<TDSnapshot>

export type Patch<T> = Partial<{ [P in keyof T]: Patch<T[P]> }>

export type ExceptFirst<T extends unknown[]> = T extends [any, ...infer U]
  ? U
  : never
