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
