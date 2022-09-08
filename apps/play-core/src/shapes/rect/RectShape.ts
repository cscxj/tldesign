import type { Point, TLShape } from '@tldesign/core'

export interface RectShape extends TLShape {
  type: 'rect'
  size: Point
  color: string
}
