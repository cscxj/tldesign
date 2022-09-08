import { GroupShape, TDShapeType } from '@/types'
import { Point, TLBounds } from '@tldesign/core'
import { TDShapeUtil } from '../TDShapeUtil'
import { GroupComponent } from './GroupComponent'

export class GroupUtil extends TDShapeUtil<GroupShape> {
  type = TDShapeType.Group

  Component = GroupComponent

  getBounds(shape: GroupShape): TLBounds {
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

  getSizeMutation(size: Point): Partial<GroupShape> {
    return { size }
  }
}
