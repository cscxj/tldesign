import React from 'react'
import { useRendererContext } from './useRendererContext'

export function usePageEvents() {
  const { callbacks, inputs } = useRendererContext()

  return React.useMemo(() => {
    return {
      onPointerDown: (e: React.PointerEvent) => {
        e.stopPropagation()
        e.currentTarget.setPointerCapture(e.pointerId)
        const info = inputs.pointerDown(e, 'page')
        if (e.button === 0 || e.button === 1) {
          callbacks.onPointPage?.(info)
          callbacks.onPointerDown?.(info)
        }
      },
      onPointerMove: (e: React.PointerEvent) => {
        e.stopPropagation()
        const info = inputs.pointerMove(e, 'page')
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          callbacks.onDragPage?.(info)
        }
        callbacks.onPointerMove?.(info)
      },
      onPointerUp: (e: React.PointerEvent) => {
        e.stopPropagation()
        const isDoubleClick = inputs.isDoubleClick()
        const info = inputs.pointerUp(e, 'page')
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget?.releasePointerCapture(e.pointerId)
        }
        if (isDoubleClick && !(info.altKey || info.metaKey)) {
          callbacks.onDoubleClickPage?.(info)
        }
        callbacks.onReleasePage?.(info)
        callbacks.onPointerUp?.(info)
      }
    }
  }, [callbacks, inputs])
}
