import React from 'react'
import { useRendererContext } from './useRendererContext'

export function useCanvasEvents() {
  const { events, inputs } = useRendererContext()

  return React.useMemo(() => {
    return {
      onPointerDown: (e: React.PointerEvent) => {
        if (e.dead) return
        else e.dead = true
        e.currentTarget.setPointerCapture(e.pointerId)
        const info = inputs.pointerDown(e, 'canvas')
        if (e.button === 0 || e.button === 1) {
          events.onPointCanvas?.(info)
          events.onPointerDown?.(info)
        }
      },
      onPointerMove: (e: React.PointerEvent) => {
        if (e.dead) return
        else e.dead = true
        const info = inputs.pointerMove(e, 'canvas')
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          events.onDragCanvas?.(info)
        }
        events.onPointerMove?.(info)
      },
      onPointerUp: (e: React.PointerEvent) => {
        if (e.dead) return
        else e.dead = true
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
