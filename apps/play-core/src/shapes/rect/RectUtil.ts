import { TLBounds, TLShapeUtil } from '@tldesign/core'
import { RectComponent } from './RectComponent'
import type { RectShape } from './RectShape'

type S = RectShape

export class RectUtil extends TLShapeUtil<S> {
  getBounds(shape: RectShape): TLBounds {
    return {
      minX: shape.point[0],
      minY: shape.point[1],
      maxX: shape.point[0] + shape.size[0],
      maxY: shape.point[1] + shape.size[1],
      width: shape.size[0],
      height: shape.size[1],
      rotation: shape.rotation
    }
  }

  Component = RectComponent
}
