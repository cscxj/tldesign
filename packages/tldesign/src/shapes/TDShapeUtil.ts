import { TDShape, TDShapeType } from '@/types'
import { Utils } from '@/utils'
import Intersect from '@tldesign/intersect'
import { Point, TLBounds, TLShapeUtil } from '@tldesign/core'

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
        intersectPolygonBounds(corners, bounds).length > 0
      )
    })
  }
}

/**
 * 查找多边形和bounds的交点
 * @param points
 * @param bounds
 * @return 所有交点
 */
export function intersectPolygonBounds(
  points: Point[],
  bounds: TLBounds
): Point[] {
  return Intersect.intersectRectanglePolygon(
    [bounds.x, bounds.y],
    [bounds.width, bounds.height],
    points
  )
}
