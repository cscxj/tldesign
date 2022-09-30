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

  const [canvasSize, updateCanvasSize] = React.useState<Point>([0, 0])

  const { callbacks } = useRendererContext()
  const { targetRef } = useSizeObserver((size) => {
    updateCanvasSize(size)
    callbacks.onResize?.(size)
  })

  // 页面中点在画布中的位置
  const pageCenter = Vec.div(canvasSize, 2)

  // 页面在画布中的位置
  const [left, top] = Vec.sub(
    pageCenter,
    Vec.mul(page.size, pageState.camera.zoom / 2)
  )

  return (
    <div className="tl-canvas" {...events} ref={targetRef}>
      <div
        className="tl-page-wrap"
        style={{ left: `${left}px`, top: `${top}px` }}
      >
        <Page id={id} page={page} pageState={pageState}></Page>
      </div>
    </div>
  )
}
