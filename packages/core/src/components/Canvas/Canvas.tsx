import { useCanvasEvents } from '@/hooks/useCanvasEvents'
import { useGlobalEvents } from '@/hooks/useGlobalEvents'
import { useRendererContext } from '@/hooks/useRendererContext'
import { useSelection } from '@/hooks/useSelection'
import { TLPage, TLPageState } from '@/types'
import { Bounds } from '../Bounds'
import { BoundsBg } from '../Bounds/BoundsBg'
import { Brush } from '../Brush'
import { Page } from '../Page/Page'
import { ShapeIndicator } from '../ShapeIndicator'

interface CanvasProps {
  id?: string
  page: TLPage
  pageState: TLPageState
}

export const Canvas = ({ page, pageState }: CanvasProps) => {
  useGlobalEvents()
  const events = useCanvasEvents()

  const { shapeUtils } = useRendererContext()
  const { bounds } = useSelection(page, pageState, shapeUtils)

  const { hoveredId, selectedIds } = pageState
  const selectShapes = selectedIds.map((id) => page.shapes[id])

  return (
    <div
      className="tl-canvas"
      {...events}
      style={{ width: `${page.size[0]}px`, height: `${page.size[1]}px` }}
    >
      {bounds && <BoundsBg bounds={bounds} />}
      <Page page={page} pageState={pageState}></Page>
      {selectShapes.map((shape) => (
        <ShapeIndicator shape={shape} key={'selected_' + shape.id} />
      ))}
      {hoveredId && <ShapeIndicator shape={page.shapes[hoveredId]} />}
      {bounds && <Bounds bounds={bounds} />}

      {pageState.brush && <Brush brush={pageState.brush} />}
    </div>
  )
}
