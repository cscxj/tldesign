import * as React from 'react'
import { useRendererContext } from './useRendererContext'

export function useBoundsEvents() {
  const { events, inputs } = useRendererContext()

  return React.useMemo(() => {
    return {
      onPointerDown: (e: React.PointerEvent) => {
        if (e.dead) return
        else e.dead = true
        if (e.button === 2) {
          events.onRightPointBounds?.(inputs.pointerDown(e, 'bounds'))
          return
        }
        if (e.button !== 0) return
        e.currentTarget?.setPointerCapture(e.pointerId)
        const info = inputs.pointerDown(e, 'bounds')
        events.onPointBounds?.(info)
        events.onPointerDown?.(info)
      },
      onPointerUp: (e: React.PointerEvent) => {
        if (e.dead) return
        else e.dead = true
        if (e.button !== 0) return
        inputs.activePointer = undefined
        const isDoubleClick = inputs.isDoubleClick()
        const info = inputs.pointerUp(e, 'bounds')
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget?.releasePointerCapture(e.pointerId)
        }
        if (isDoubleClick && !(info.altKey || info.metaKey)) {
          events.onDoubleClickBounds?.(info)
        }
        events.onReleaseBounds?.(info)
        events.onPointerUp?.(info)
      },
      onPointerMove: (e: React.PointerEvent) => {
        if (e.dead) return
        else e.dead = true
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          events.onDragBounds?.(inputs.pointerMove(e, 'bounds'))
        }
        const info = inputs.pointerMove(e, 'bounds')
        events.onPointerMove?.(info)
      },
      onPointerEnter: (e: React.PointerEvent) => {
        events.onHoverBounds?.(inputs.pointerEnter(e, 'bounds'))
      },
      onPointerLeave: (e: React.PointerEvent) => {
        events.onUnHoverBounds?.(inputs.pointerEnter(e, 'bounds'))
      }
    }
  }, [inputs, events])
}
