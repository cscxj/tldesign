import { Point, TLBounds } from '@/types'
import Vec from '@tldesign/vec'

/**
 * 根据多个点确定一个bounds区域
 * @param points
 * @param rotation (optional) The bounding box's rotation.
 */
export function getBoundsFromPoints(
  points: Point[],
  rotation?: number
): TLBounds {
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

  return {
    x: x0,
    y: y0,
    width: Math.max(1, x1 - x0),
    height: Math.max(1, y1 - y0),
    rotation
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

/**
 * Get a bounding box that includes two bounding boxes.
 * @param a Bounding box
 * @param b Bounding box
 * @returns
 */
export function getExpandedBounds(a: TLBounds, b: TLBounds): TLBounds {
  const x = Math.min(a.x, b.x)
  const y = Math.min(a.y, b.y)
  const maxX = Math.max(a.x + a.width, b.x + b.width)
  const maxY = Math.max(a.y + a.height, b.y + b.height)
  const width = Math.abs(maxX - x)
  const height = Math.abs(maxY - y)

  return { x, y, width, height }
}

/**
 * 获取边界中心点
 * @param bounds
 */
export function getBoundsCenter(bounds: TLBounds): Point {
  return [bounds.x + bounds.width / 2, bounds.y + bounds.height / 2]
}

/**
 * 获取一组边界的公共边界
 * @returns
 */
export function getCommonBounds(bounds: TLBounds[]): TLBounds {
  if (bounds.length < 2) return bounds[0]

  let result = bounds[0]

  for (let i = 1; i < bounds.length; i++) {
    result = getExpandedBounds(result, bounds[i])
  }

  return result
}
