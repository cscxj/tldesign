import React from 'react'
import { useRendererContext } from './useRendererContext'

export function useCanvasEvents() {
  const { callbacks, inputs } = useRendererContext()

  return React.useMemo(() => {
    return {
      onPointerDown: (e: React.PointerEvent) => {
        e.stopPropagation()
        e.currentTarget.setPointerCapture(e.pointerId)
        const info = inputs.pointerDown(e, 'canvas')
        if (e.button === 0 || e.button === 1) {
          callbacks.onPointCanvas?.(info)
          callbacks.onPointerDown?.(info)
        }
      },
      onPointerMove: (e: React.PointerEvent) => {
        e.stopPropagation()
        const info = inputs.pointerMove(e, 'canvas')
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          callbacks.onDragCanvas?.(info)
        }
        callbacks.onPointerMove?.(info)
      },
      onPointerUp: (e: React.PointerEvent) => {
        e.stopPropagation()
        const isDoubleClick = inputs.isDoubleClick()
        const info = inputs.pointerUp(e, 'canvas')
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget?.releasePointerCapture(e.pointerId)
        }
        if (isDoubleClick && !(info.altKey || info.metaKey)) {
          callbacks.onDoubleClickCanvas?.(info)
        }
        callbacks.onReleaseCanvas?.(info)
        callbacks.onPointerUp?.(info)
      },
      onDrop: callbacks.onDrop,
      onDragOver: callbacks.onDragOver
    }
  }, [callbacks, inputs])
}
