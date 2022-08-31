import { TDShape, TDShapeType } from '@/types'
import { Intersect, Utils } from '@/utils'
import { TLBounds, TLShapeUtil } from '@tldesign/core'

export abstract class TDShapeUtil<S extends TDShape> extends TLShapeUtil<S> {
  abstract type: TDShapeType

  /**
   * 是否命中框选的区域
   */
  public hitTestBounds = (shape: TDShape, bounds: TLBounds) => {
    const corners = Utils.getRotatedCorners(shape.bounds)

    return corners.every((point) => {
      return (
        Utils.pointInBounds(point, bounds) ||
        Intersect.intersectPolygonBounds(corners, bounds).length > 0
      )
    })
  }
}
