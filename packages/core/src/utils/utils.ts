import { Patch } from '@/types'
import { Utils } from '.'

export * from './bounds'

/**
 * 合并对象
 * @param target
 * @param patch
 * @returns
 */
export function deepMerge<T>(target: T, patch: Patch<T>): T {
  const result: T = { ...target }

  const entries = Object.entries(patch) as [keyof T, T[keyof T]][]

  for (const [key, value] of entries)
    result[key] =
      value === Object(value) && !Array.isArray(value)
        ? deepMerge(result[key], value)
        : value

  return result
}

/**
 * 递归复制一个对象或数组（数组元素不会深度拷贝）
 * @param obj
 */
export function deepClone<T>(obj: T): T {
  if (obj === null) return obj

  if (Array.isArray(obj)) {
    return [...obj] as unknown as T
  }

  if (typeof obj === 'object') {
    const clone: Record<string, any> = { ...obj }

    for (const key in clone) {
      clone[key] =
        typeof obj[key as keyof T] === 'object'
          ? Utils.deepClone(obj[key as keyof T])
          : obj[key as keyof T]
    }

    return clone as T
  }

  return obj
}

/**
 * 将角度限制在一个周期内.
 * @param r
 */
export function clampRadians(r: number): number {
  return (Math.PI * 2 + r) % (Math.PI * 2)
}
