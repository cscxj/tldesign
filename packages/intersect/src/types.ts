import type { Point } from '@tldesign/vec'

export type LineSegment = [Point, Point]
export type RectangleSides = [
  top: LineSegment,
  right: LineSegment,
  bottom: LineSegment,
  left: LineSegment
]

/**
 * 平面关系
 */
export enum LineSegmentRelationships {
  /**
   * 平行
   */
  Parallel = 'parallel',
  /**
   * 重合
   */
  Coincident = 'coincident',
  /**
   * 相交
   */
  Intersection = 'intersection',
  /**
   * 不相交
   */
  NoIntersection = 'intersection'
}
