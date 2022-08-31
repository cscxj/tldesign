import { Point, TLBounds } from '@/types'
import Vec from '@tldesign/vec'

/**
 * 根据多个点确定一个bounds区域
 * @param points
 * @param rotation (optional) The bounding box's rotation.
 */
export function getBoundsFromPoints(points: Point[], rotation = 0): TLBounds {
  let x0 = Infinity
  let y0 = Infinity
  let x1 = -Infinity
  let y1 = -Infinity

  if (points.length < 2) {
    x0 = 0
    y0 = 0
  } else {
    for (const [x, y] of points) {
      x0 = Math.min(x, x0)
      y0 = Math.min(y, y0)
      x1 = Math.max(x, x1)
      y1 = Math.max(y, y1)
    }
  }

  if (rotation !== 0) {
    return getBoundsFromPoints(
      points.map((pt: Point) => {
        const center: Point = [(x1 - x0) / 2, (y1 - y0) / 2]
        return Vec.rotWith(pt, center, rotation)
      })
    )
  }

  return {
    x: x0,
    y: y0,
    width: Math.max(1, x1 - x0),
    height: Math.max(1, y1 - y0)
  }
}

/**
 * 获取bounds旋转后的四个角
 * @param b
 * @param rotation
 * @returns
 */
export function getRotatedCorners(b: TLBounds): Point[] {
  const center: Point = [b.x + b.width / 2, b.y + b.height / 2]

  return (<Point[]>[
    [b.x, b.y],
    [b.x + b.width, b.y],
    [b.x + b.width, b.y + b.height],
    [b.x, b.y + b.height]
  ]).map((point) => Vec.rotWith(point, center, b.rotation))
}

/**
 * 点A是否在Bounds区域内
 * @param A
 * @param b
 * @returns
 */
export function pointInBounds(A: Point, b: TLBounds): boolean {
  return (
    A[0] > b.x && A[0] < b.x + b.width && A[1] > b.y && A[1] < b.y + b.height
  )
}
