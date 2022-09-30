import { Point } from '@tldesign/core'
import React from 'react'

type SizeChangeCallback = (point: Point, size: Point) => void

export function useSizeObserver(callback: SizeChangeCallback) {
  const targetRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height, left, top } = entry.target.getBoundingClientRect()
      callback([left, top], [width, height])
    })

    resizeObserver.observe(targetRef.current!)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return {
    targetRef
  }
}
