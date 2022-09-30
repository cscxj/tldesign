import React from 'react'
import { TLBoundsHandle } from '..'
import { useRendererContext } from './useRendererContext'

export function useBoundsHandleEvents(id: TLBoundsHandle) {
  const { callbacks, inputs } = useRendererContext()
  return React.useMemo(() => {
    return {
      onPointerDown(e: React.PointerEvent) {
        e.stopPropagation()
        if (e.button !== 0) return
        const info = inputs.pointerDown(e, id)
        if (inputs.isDoubleClick() && !(info.altKey || info.metaKey)) {
          callbacks.onDoubleClickBoundsHandle?.(info)
        }
        callbacks.onPointBoundsHandle?.(info)
        callbacks.onPointerDown?.(info)
      },
      onPointerUp(e: React.PointerEvent) {
        e.stopPropagation()
        if (e.button !== 0) return
        const info = inputs.pointerUp(e, id)
        callbacks.onReleaseBoundsHandle?.(info)
        callbacks.onPointerUp?.(info)
      },
      onPointerMove(e: React.PointerEvent) {
        e.stopPropagation()
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          callbacks.onDragBoundsHandle?.(inputs.pointerMove(e, id))
        }
        const info = inputs.pointerMove(e, id)
        callbacks.onPointerMove?.(info)
      },
      onPointerEnter(e: React.PointerEvent) {
        callbacks.onHoverBoundsHandle?.(inputs.pointerEnter(e, id))
      },
      onPointerLeave(e: React.PointerEvent) {
        callbacks.onUnHoverBoundsHandle?.(inputs.pointerEnter(e, id))
      }
    }
  }, [callbacks, inputs])
}
