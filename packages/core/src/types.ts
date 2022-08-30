export interface Point {
  0: number
  1: number
}

export interface TLBounds {
  x: number
  y: number
  width: number
  height: number
  rotation: number
  skew: number
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
  pointedId?: string | null
  hoveredId?: string | null
  editingId?: string | null
}

export interface TLComponentProps<S extends TLShape> {
  shape: S
  events: TLShapeEvents
}

export interface TLPointerInfo<T extends string> {
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

export type TLPointerEventHandler = (info: TLPointerInfo<string>) => void
export type TLCanvasEventHandler = (info: TLPointerInfo<'canvas'>) => void

export type TLKeyboardEventHandler = (info: TLKeyboardInfo) => void
export type TLDropEventHandler = (e: React.DragEvent<Element>) => void

export interface TLEvents {
  // Shape
  onPointShape: TLPointerEventHandler
  onHoverShape: TLPointerEventHandler
  onUnHoverShape: TLPointerEventHandler
  onDragShape: TLPointerEventHandler
  onReleaseShape: TLPointerEventHandler
  onDoubleClickShape: TLPointerEventHandler
  onRightPointShape: TLPointerEventHandler

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
