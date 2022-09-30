import { Point } from '../types'
import React from 'react'

type SizeChangeCallback = (size: Point) => void

export function useSizeObserver(callback: SizeChangeCallback) {
  const targetRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      callback([entry.contentRect.width, entry.contentRect.height])
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
