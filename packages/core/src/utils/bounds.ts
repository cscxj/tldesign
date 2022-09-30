import { Point, TLBounds } from '@/types'
import Vec from '@tldesign/vec'
import { clampRadians } from './utils'

/**
 * 根据多个点确定一个bounds区域
 * @param points
 * @param rotation (optional) The bounding box's rotation.
 */
export function getBoundsFromPoints(
  points: Point[],
  rotation?: number
): TLBounds {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  if (points.length < 2) {
    minX = 0
    minY = 0
  } else {
    for (const [x, y] of points) {
      minX = Math.min(x, minX)
      minY = Math.min(y, minY)
      maxX = Math.max(x, maxX)
      maxY = Math.max(y, maxY)
    }
  }

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: Math.max(1, maxX - minX),
    height: Math.max(1, maxY - minY),
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
  const center: Point = getBoundsCenter(b)

  return (<Point[]>[
    [b.minX, b.minY],
    [b.maxX, b.minY],
    [b.maxX, b.maxY],
    [b.minX, b.maxY]
  ]).map((point) => Vec.rotWith(point, center, b.rotation))
}

/**
 * 点A是否在Bounds区域内
 * @param A
 * @param b
 * @returns
 */
export function pointInBounds(A: Point, b: TLBounds): boolean {
  return A[0] > b.minX && A[0] < b.maxX && A[1] > b.minY && A[1] < b.maxY
}

/**
 * Get a bounding box that includes two bounding boxes.
 * @param a Bounding box
 * @param b Bounding box
 * @returns
 */
export function getExpandedBounds(a: TLBounds, b: TLBounds): TLBounds {
  const minX = Math.min(a.minX, b.minX)
  const minY = Math.min(a.minY, b.minY)
  const maxX = Math.max(a.maxX, b.maxX)
  const maxY = Math.max(a.maxY, b.maxY)
  const width = Math.abs(maxX - minX)
  const height = Math.abs(maxY - minY)

  return { minX, minY, maxX, maxY, width, height }
}

/**
 * 获取边界中心点
 * @param bounds
 */
export function getBoundsCenter(b: TLBounds): Point {
  return [b.minX + b.width / 2, b.minY + b.height / 2]
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

/**
 * 旋转图形
 * @param bounds
 * @param origin 旋转原点
 * @param delta 旋转角度
 * @returns 旋转之后的边界
 */
export function getRotatedBounds(
  bounds: TLBounds,
  origin: Point,
  theta = 0
): TLBounds {
  if (theta === 0) return bounds

  const center = getBoundsCenter(bounds)
  // 相对中心的位置
  const startPointRelativeCenter = Vec.sub(center, [bounds.minX, bounds.minY])
  const endPointRelativeCenter = Vec.sub(center, [bounds.maxX, bounds.maxY])
  // 中心旋转之后的位置
  const rotatedCenter = Vec.rotWith(center, origin, theta)
  // 旋转之后的位置
  const [minX, minY] = Vec.toFixed(
    Vec.sub(rotatedCenter, startPointRelativeCenter)
  )
  const [maxX, maxY] = Vec.toFixed(
    Vec.sub(rotatedCenter, endPointRelativeCenter)
  )

  const nextRotation = clampRadians((bounds.rotation || 0) + theta)

  return {
    ...bounds,
    minX,
    minY,
    maxX,
    maxY,
    rotation: nextRotation
  }
}

/**
 * 获取缩放后的bounds
 */
export function getZoomBounds(bounds: TLBounds, zoom: number) {
  return <TLBounds>{
    minX: bounds.minX * zoom,
    minY: bounds.minY * zoom,
    maxX: bounds.maxX * zoom,
    maxY: bounds.maxY * zoom,
    height: bounds.height * zoom,
    width: bounds.width * zoom,
    rotation: bounds.rotation,
    skew: bounds.skew
  }
}
