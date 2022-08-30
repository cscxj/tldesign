import React from 'react'
import { TLShapeEvents } from '..'
import { useRendererContext } from './useRendererContext'

export function useShapeEvents(id: string): TLShapeEvents<Element> {
  const { inputs, events } = useRendererContext()

  return React.useMemo(
    () => ({
      onPointerDown(e) {
        const info = inputs.pointerDown(e, id)
        if (e.button === 2) {
          events.onRightPointShape?.(info)
          return
        }
        e.currentTarget.setPointerCapture(e.pointerId)
        events.onPointBounds?.(inputs.pointerDown(e, 'bounds'))
        events.onPointShape?.(info)
        events.onPointerDown?.(info)
      },
      onPointerUp(e) {
        const isDoubleClick = inputs.isDoubleClick()
        const info = inputs.pointerUp(e, id)
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId)
        }
        if (isDoubleClick && !(info.altKey || info.metaKey)) {
          events.onDoubleClickShape?.(info)
        }
        events.onReleaseShape?.(info)
        events.onPointerUp?.(info)
      },
      onPointerMove(e) {
        const info = inputs.pointerMove(e, id)
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          events.onDragShape?.(info)
        }
        events.onPointerMove?.(info)
      },
      onPointerEnter(e) {
        const info = inputs.pointerEnter(e, id)
        events.onHoverShape?.(info)
      },
      onPointerLeave(e) {
        const info = inputs.pointerEnter(e, id)
        events.onUnHoverShape?.(info)
      }
    }),
    []
  )
}
