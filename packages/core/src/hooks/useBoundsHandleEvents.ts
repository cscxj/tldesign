import React from 'react'
import { TLBoundsHandle } from '..'
import { useRendererContext } from './useRendererContext'

export function useBoundsHandleEvents(id: TLBoundsHandle) {
  const { events, inputs } = useRendererContext()
  return React.useMemo(() => {
    return {
      onPointerDown(e: React.PointerEvent) {
        if (e.dead) return
        else e.dead = true
        if (e.button !== 0) return
        const info = inputs.pointerDown(e, id)
        if (inputs.isDoubleClick() && !(info.altKey || info.metaKey)) {
          events.onDoubleClickBoundsHandle?.(info)
        }
        events.onPointBoundsHandle?.(info)
        events.onPointerDown?.(info)
      },
      onPointerUp(e: React.PointerEvent) {
        if (e.dead) return
        else e.dead = true
        if (e.button !== 0) return
        const info = inputs.pointerUp(e, id)
        events.onReleaseBoundsHandle?.(info)
        events.onPointerUp?.(info)
      },
      onPointerMove(e: React.PointerEvent) {
        if (e.dead) return
        else e.dead = true
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          events.onDragBoundsHandle?.(inputs.pointerMove(e, id))
        }
        const info = inputs.pointerMove(e, id)
        events.onPointerMove?.(info)
      },
      onPointerEnter(e: React.PointerEvent) {
        events.onHoverBoundsHandle?.(inputs.pointerEnter(e, id))
      },
      onPointerLeave(e: React.PointerEvent) {
        events.onUnHoverBoundsHandle?.(inputs.pointerEnter(e, id))
      }
    }
  }, [events, inputs])
}
