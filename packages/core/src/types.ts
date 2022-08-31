import type { Point } from '@tldesign/vec'
export { Point }

export enum TLScaleHandle {
  Left = 1, // 0b0001
  Right = 2, // 0b0010
  Top = 4, // 0b0100
  Bottom = 8, // 0b1000
  TopLeft = 5, // 0b0101
  TopRight = 6, // 0b0110
  BottomLeft = 9, // 0b1001
  BottomRight = 10 // 0b1010
}

export type TLBoundsHandle = TLScaleHandle | 'rotate'

export interface TLBounds {
  x: number
  y: number
  width: number
  height: number
  rotation?: number
  skew?: number
}

export interface TLShape {
  id: string
  parentId: string
  type: string
  childIndex: number
  bounds: TLBounds
  children?: string[]
}

export interface IShapeTreeNode {
  shape: TLShape
  children: IShapeTreeNode[]
  isSelected: boolean
}

export interface TLPage<S extends TLShape = TLShape> {
  id: string
  name?: string
  shapes: Record<string, S>
}

export interface TLPageState {
  id: string
  selectedIds: string[]
  camera: {
    point: Point
    zoom: number
  }
  brush?: TLBounds | null
  pointedId?: string | null
  hoveredId?: string | null
  editingId?: string | null
}

export interface TLComponentProps<S extends TLShape> {
  shape: S
  events: TLShapeEvents
}

export interface TLPointerInfo<T extends TLEventTarget> {
  target: T
  pointerId: number
  origin: Point
  point: Point
  pressure: number
  shiftKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  altKey: boolean
  spaceKey: boolean
}

export interface TLKeyboardInfo {
  origin: Point
  point: Point
  key: string
  keys: string[]
  shiftKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  altKey: boolean
}

export type TLEventTarget = string | number

export type TLPointerEventHandler = (info: TLPointerInfo<TLEventTarget>) => void
export type TLShapeEventsHandler = (info: TLPointerInfo<string>) => void
export type TLCanvasEventHandler = (info: TLPointerInfo<'canvas'>) => void
export type TLBoundsEventHandler = (info: TLPointerInfo<'bounds'>) => void
export type TLBoundsHandleEventHandler = (
  info: TLPointerInfo<TLBoundsHandle>
) => void

export type TLKeyboardEventHandler = (info: TLKeyboardInfo) => void
export type TLDropEventHandler = (e: React.DragEvent<Element>) => void

export interface TLEvents {
  // Shape
  onPointShape: TLShapeEventsHandler
  onHoverShape: TLShapeEventsHandler
  onUnHoverShape: TLShapeEventsHandler
  onDragShape: TLShapeEventsHandler
  onReleaseShape: TLShapeEventsHandler
  onDoubleClickShape: TLShapeEventsHandler
  onRightPointShape: TLShapeEventsHandler

  // bounds
  onPointBounds: TLBoundsEventHandler
  onDoubleClickBounds: TLBoundsEventHandler
  onRightPointBounds: TLBoundsEventHandler
  onDragBounds: TLBoundsEventHandler
  onHoverBounds: TLBoundsEventHandler
  onUnHoverBounds: TLBoundsEventHandler
  onReleaseBounds: TLBoundsEventHandler

  // Bounds handles (corners, edges)
  onPointBoundsHandle: TLBoundsHandleEventHandler
  onDoubleClickBoundsHandle: TLBoundsHandleEventHandler
  onRightPointBoundsHandle: TLBoundsHandleEventHandler
  onDragBoundsHandle: TLBoundsHandleEventHandler
  onHoverBoundsHandle: TLBoundsHandleEventHandler
  onUnHoverBoundsHandle: TLBoundsHandleEventHandler
  onReleaseBoundsHandle: TLBoundsHandleEventHandler

  // canvas
  onPointCanvas: TLCanvasEventHandler
  onDoubleClickCanvas: TLCanvasEventHandler
  onRightPointCanvas: TLCanvasEventHandler
  onDragCanvas: TLCanvasEventHandler
  onReleaseCanvas: TLCanvasEventHandler
  onDragOver: TLDropEventHandler
  onDrop: TLDropEventHandler

  // pointer
  onPointerDown: TLPointerEventHandler
  onPointerMove: TLPointerEventHandler
  onPointerUp: TLPointerEventHandler

  // Keyboard
  onKeyDown: TLKeyboardEventHandler
  onKeyUp: TLKeyboardEventHandler
}

export interface TLShapeEvents<E = any> {
  onPointerDown: (e: React.PointerEvent<E>) => void
  onPointerUp: (e: React.PointerEvent<E>) => void
  onPointerEnter: (e: React.PointerEvent<E>) => void
  onPointerMove: (e: React.PointerEvent<E>) => void
  onPointerLeave: (e: React.PointerEvent<E>) => void
}

export type TLForwardedRef<E> =
  | ((instance: E | null) => void)
  | React.MutableRefObject<E | null>
  | null
