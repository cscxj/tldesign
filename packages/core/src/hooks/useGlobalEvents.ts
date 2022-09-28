import React from 'react'
import { useRendererContext } from './useRendererContext'

export function useGlobalEvents() {
  const { events, inputs } = useRendererContext()

  React.useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      e.stopPropagation()
      const info = inputs.pointerDown(e, 'global')
      if (e.button === 0 || e.button === 1) {
        events.onPointerDown?.(info)
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      e.stopPropagation()
      const info = inputs.pointerMove(e, 'global')
      events.onPointerMove?.(info)
    }

    const onPointerUp = (e: PointerEvent) => {
      e.stopPropagation()
      const info = inputs.pointerUp(e, 'global')
      events.onPointerUp?.(info)
    }

    document.addEventListener('pointerdown', onPointerDown)

    document.addEventListener('pointermove', onPointerMove)

    document.addEventListener('pointerup', onPointerUp)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }
  }, [])
}
