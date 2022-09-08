import { TDShape, TDShapeType } from '@/types'
import Intersect from '@tldesign/intersect'
import { Point, TLBounds, TLShapeUtil, Utils } from '@tldesign/core'

export abstract class TDShapeUtil<S extends TDShape> extends TLShapeUtil<S> {
  abstract type: TDShapeType

  abstract getSizeMutation(size: Point): Partial<S>

  /**
   * 是否命中框选的区域
   */
  public hitTestBounds = (shape: S, bounds: TLBounds) => {
    const shapeBounds = this.getBounds(shape)
    const corners = Utils.getRotatedCorners(shapeBounds)

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
    [bounds.minX, bounds.minY],
    [bounds.width, bounds.height],
    points
  )
}
