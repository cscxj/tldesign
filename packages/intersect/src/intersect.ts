import Vec, { Point } from '@tldesign/vec'
import { LineSegment, RectangleSides } from './types'

/**
 * 查找多边形和矩形的交点
 * @param point 矩形起点
 * @param size 矩形大小
 * @param points 多边形所有顶点
 * @return 所有交点
 */
export function intersectRectanglePolygon(
  point: Point,
  size: [width: number, height: number],
  points: Point[]
): Point[] {
  return getRectangleSides(point, size).reduce<Point[]>((intPoints, side) => {
    // 某条边与多边形的交点
    const cutPoints = intersectLineSegmentPolygon(side, points)

    intPoints.push(...cutPoints)

    return intPoints
  }, [])
}

/**
 * 获取矩形的边
 * @param point
 * @param size
 * @param rotation
 * @internal
 */
function getRectangleSides(
  point: Point,
  size: [width: number, height: number],
  rotation = 0
): RectangleSides {
  const center: Point = [point[0] + size[0] / 2, point[1] + size[1] / 2]
  const tl = Vec.rotWith(point, center, rotation)
  const tr = Vec.rotWith(Vec.add(point, [size[0], 0]), center, rotation)
  const br = Vec.rotWith(Vec.add(point, size), center, rotation)
  const bl = Vec.rotWith(Vec.add(point, [0, size[1]]), center, rotation)

  return [
    [tl, tr],
    [tr, br],
    [br, bl],
    [bl, tl]
  ]
}

/**
 * 线段与闭合多边形的的交点
 * @param line 线段
 * @param points 多边形的所有顶点
 * @return 所有交点
 */
export function intersectLineSegmentPolygon(
  line: LineSegment,
  points: Point[]
): Point[] {
  const pts: Point[] = []

  for (let i = 1; i < points.length + 1; i++) {
    const [a1, a2] = line
    const intPoint = intersectLineSegmentLineSegment(
      [a1, a2],
      [points[i - 1], points[i % points.length]]
    )
    // 相交了
    if (intPoint) {
      pts.push(intPoint)
    }
  }
  return pts
}

/**
 * 查找线段与线段的交点
 * @param l1
 * @param l2
 * @return 相交返回交点，不相交返回null
 */
export function intersectLineSegmentLineSegment(
  l1: LineSegment,
  l2: LineSegment
): Point | null {
  const [a1, a2] = l1
  const [b1, b2] = l2
  const AB: Point = Vec.sub(a1, b1)
  const BV: Point = Vec.sub(b2, b1)
  const AV: Point = Vec.sub(a2, a1)

  const ua_t = BV[0] * AB[1] - BV[1] * AB[0]
  const ub_t = AV[0] * AB[1] - AV[1] * AB[0]
  const u_b = BV[1] * AV[0] - BV[0] * AV[1]

  // 重合
  if (ua_t === 0 || ub_t === 0) {
    return null
  }

  // 平行
  if (u_b === 0) {
    return null
  }

  // 相交
  if (u_b !== 0) {
    const ua = ua_t / u_b
    const ub = ub_t / u_b
    if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
      return Vec.add(a1, Vec.mul(AV, ua))
    }
  }

  // 不相交
  return null
}
