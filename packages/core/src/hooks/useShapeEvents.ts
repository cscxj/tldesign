import React from 'react'
import { TLShapeEvents } from '..'
import { useRendererContext } from './useRendererContext'

export function useShapeEvents(id: string): TLShapeEvents<Element> {
  const { inputs, callbacks } = useRendererContext()

  return React.useMemo(
    () => ({
      onPointerDown(e) {
        e.stopPropagation()
        const info = inputs.pointerDown(e, id)
        if (e.button === 2) {
          callbacks.onRightPointShape?.(info)
          return
        }
        e.currentTarget.setPointerCapture(e.pointerId)
        callbacks.onPointBounds?.(inputs.pointerDown(e, 'bounds'))
        callbacks.onPointShape?.(info)
        callbacks.onPointerDown?.(info)
      },
      onPointerUp(e) {
        e.stopPropagation()
        const isDoubleClick = inputs.isDoubleClick()
        const info = inputs.pointerUp(e, id)
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId)
        }
        if (isDoubleClick && !(info.altKey || info.metaKey)) {
          callbacks.onDoubleClickShape?.(info)
        }
        callbacks.onReleaseShape?.(info)
        callbacks.onPointerUp?.(info)
      },
      onPointerMove(e) {
        e.stopPropagation()
        const info = inputs.pointerMove(e, id)
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          callbacks.onDragShape?.(info)
        }
        callbacks.onPointerMove?.(info)
      },
      onPointerEnter(e) {
        const info = inputs.pointerEnter(e, id)
        callbacks.onHoverShape?.(info)
      },
      onPointerLeave(e) {
        const info = inputs.pointerEnter(e, id)
        callbacks.onUnHoverShape?.(info)
      }
    }),
    []
  )
}
