import * as React from 'react'
import { useRendererContext } from './useRendererContext'

export function useBoundsEvents() {
  const { callbacks, inputs } = useRendererContext()

  return React.useMemo(() => {
    return {
      onPointerDown: (e: React.PointerEvent) => {
        e.stopPropagation()
        if (e.button === 2) {
          callbacks.onRightPointBounds?.(inputs.pointerDown(e, 'bounds'))
          return
        }
        if (e.button !== 0) return
        e.currentTarget?.setPointerCapture(e.pointerId)
        const info = inputs.pointerDown(e, 'bounds')
        callbacks.onPointBounds?.(info)
        callbacks.onPointerDown?.(info)
      },
      onPointerUp: (e: React.PointerEvent) => {
        e.stopPropagation()
        if (e.button !== 0) return
        inputs.activePointer = undefined
        const isDoubleClick = inputs.isDoubleClick()
        const info = inputs.pointerUp(e, 'bounds')
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget?.releasePointerCapture(e.pointerId)
        }
        if (isDoubleClick && !(info.altKey || info.metaKey)) {
          callbacks.onDoubleClickBounds?.(info)
        }
        callbacks.onReleaseBounds?.(info)
        callbacks.onPointerUp?.(info)
      },
      onPointerMove: (e: React.PointerEvent) => {
        e.stopPropagation()
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          callbacks.onDragBounds?.(inputs.pointerMove(e, 'bounds'))
        }
        const info = inputs.pointerMove(e, 'bounds')
        callbacks.onPointerMove?.(info)
      },
      onPointerEnter: (e: React.PointerEvent) => {
        callbacks.onHoverBounds?.(inputs.pointerEnter(e, 'bounds'))
      },
      onPointerLeave: (e: React.PointerEvent) => {
        callbacks.onUnHoverBounds?.(inputs.pointerEnter(e, 'bounds'))
      }
    }
  }, [inputs, callbacks])
}
