import { GroupShape, TDShapeType } from '@/types'
import { TLBounds, Point } from '@tldesign/core'
import { TDShapeUtil } from '../TDShapeUtil'
import { GroupComponent } from './GroupComponent'
import Vec from '@tldesign/vec'

export class GroupUtil extends TDShapeUtil<GroupShape> {
  type = TDShapeType.Group

  Component = GroupComponent

  getBounds({ point, size, rotation }: GroupShape): TLBounds {
    const [minX, minY] = point
    const [width, height] = size
    const [maxX, maxY] = Vec.add(point, size)
    return {
      minX,
      minY,
      maxX,
      maxY,
      width,
      height,
      rotation
    }
  }

  getScaleMutation(
    { size }: GroupShape,
    _: TLBounds,
    scale: Point
  ): Partial<GroupShape> {
    return {
      size: Vec.mulV(size, scale)
    }
  }
}
