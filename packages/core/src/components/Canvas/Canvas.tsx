import { useCanvasEvents } from '@/hooks/useCanvasEvents'
import { useGlobalEvents } from '@/hooks/useGlobalEvents'
import { useRendererContext } from '@/hooks/useRendererContext'
import { useSizeObserver } from '@/hooks/useSizeObserver'
import { TLPage, TLPageState } from '@/types'
import React from 'react'
import { Page } from '../Page'
import Vec, { Point } from '@tldesign/vec'

interface CanvasProps {
  id?: string
  page: TLPage
  pageState: TLPageState
}

export function Canvas({ page, pageState, id }: CanvasProps) {
  useGlobalEvents()
  const events = useCanvasEvents()

  const [screen, updateScreen] = React.useState<Point>([0, 0])

  const { callbacks } = useRendererContext()
  const { targetRef } = useSizeObserver((size) => {
    updateScreen(size)
    callbacks.onResize?.(size)
  })

  // 页面中点在画布中的位置
  const pageCenter = Vec.div(screen, 2)

  // 上边距
  const top = Math.max(
    40,
    pageCenter[1] - (page.size[1] * pageState.camera.zoom) / 2
  )

  return (
    <div className="tl-canvas" ref={targetRef}>
      <div
        className="tl-canvas-screen"
        style={{
          width: `${screen[0]}px`,
          height: `${screen[1]}px`,
          paddingTop: `${top}px`
        }}
        {...events}
      >
        <Page id={id} page={page} pageState={pageState}></Page>
      </div>
    </div>
  )
}
