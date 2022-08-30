import React from 'react'
import { useRendererContext } from './useRendererContext'

export function useCanvasEvents() {
  const { events, inputs } = useRendererContext()

  return React.useMemo(() => {
    return {
      onPointerDownCapture: (e: React.PointerEvent) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        const info = inputs.pointerDown(e, 'canvas')
        if (e.button === 0 || e.button === 1) {
          events.onPointCanvas?.(info)
          events.onPointerDown?.(info)
        }
      },
      onPointerMoveCapture: (e: React.PointerEvent) => {
        const info = inputs.pointerMove(e, 'canvas')
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          events.onDragCanvas?.(info)
        }
        events.onPointerMove?.(info)
      },
      onPointerUpCapture: (e: React.PointerEvent) => {
        const isDoubleClick = inputs.isDoubleClick()
        const info = inputs.pointerUp(e, 'canvas')
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget?.releasePointerCapture(e.pointerId)
        }
        if (isDoubleClick && !(info.altKey || info.metaKey)) {
          events.onDoubleClickCanvas?.(info)
        }
        events.onReleaseCanvas?.(info)
        events.onPointerUp?.(info)
      },
      onDrop: events.onDrop,
      onDragOver: events.onDragOver
    }
  }, [events, inputs])
}
