import React from 'react'
import { useRendererContext } from './useRendererContext'

export function useGlobalEvents() {
  const { callbacks, inputs } = useRendererContext()

  React.useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      e.stopPropagation()
      const info = inputs.pointerDown(e, 'global')
      if (e.button === 0 || e.button === 1) {
        callbacks.onPointerDown?.(info)
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      e.stopPropagation()
      const info = inputs.pointerMove(e, 'global')
      callbacks.onPointerMove?.(info)
    }

    const onPointerUp = (e: PointerEvent) => {
      e.stopPropagation()
      const info = inputs.pointerUp(e, 'global')
      callbacks.onPointerUp?.(info)
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
