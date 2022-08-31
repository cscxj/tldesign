import { Patch } from '@/types'

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
