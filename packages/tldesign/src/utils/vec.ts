import { Point } from '@tldesign/core'

/**
 * 向量除以标量
 * @param A
 * @param n
 * @returns
 */
export function div(A: Point, n: number): Point {
  return [A[0] / n, A[1] / n]
}

/**
 * 向量A减向量B
 * @param A
 * @param B
 * @returns
 */
export function sub(A: Point, B: Point): Point {
  return [A[0] - B[0], A[1] - B[1]]
}

/**
 * 向量A绕向量C旋转r (radians)
 * @param A vector
 * @param C center
 * @param r rotation in radians
 */
export function rotWith(A: Point, C: Point, r = 0): Point {
  if (r === 0) return A

  const s = Math.sin(r)
  const c = Math.cos(r)

  const px = A[0] - C[0]
  const py = A[1] - C[1]

  const nx = px * c - py * s
  const ny = px * s + py * c

  return [nx + C[0], ny + C[1]]
}

/**
 * 向量相加
 * @param A
 * @param B
 */
export function add(A: Point, B: Point): Point {
  return [A[0] + B[0], A[1] + B[1]]
}

/**
 * 向量乘标量
 * @param A
 * @param n
 * @returns
 */
export function mul(A: Point, n: number): Point {
  return [A[0] * n, A[1] * n]
}

/**
 * 点A到点B的长度
 * @param A
 * @param B
 * @returns
 */
export function dist(A: Point, B: Point): number {
  return Math.hypot(A[1] - B[1], A[0] - B[0])
}
