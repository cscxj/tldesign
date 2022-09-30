import { usePageEvents } from '@/hooks/usePageEvents'
import { useRendererContext } from '@/hooks/useRendererContext'
import { useSelection } from '@/hooks/useSelection'
import { useShapeTree } from '@/hooks/useShapeTree'
import { TLPage, TLPageState } from '@/types'
import { Utils } from '@/utils'
import { Bounds } from '../Bounds'
import { BoundsBg } from '../Bounds/BoundsBg'
import { Brush } from '../Brush'
import { ShapeIndicator } from '../ShapeIndicator'
import { ShapeNode } from '../ShapeNode'

interface PageProps {
  id?: string
  page: TLPage
  pageState: TLPageState
}

export const Page = ({ page, pageState }: PageProps) => {
  const { zoom } = pageState.camera

  const width = page.size[0] * zoom
  const height = page.size[1] * zoom
  const events = usePageEvents()

  const { shapeUtils } = useRendererContext()
  const { bounds } = useSelection(page, pageState, shapeUtils)
  const zoomedBounds = bounds ? Utils.getZoomBounds(bounds, zoom) : bounds

  const { hoveredId, selectedIds } = pageState
  const selectShapes = selectedIds.map((id) => page.shapes[id])

  const shapeTree = useShapeTree(page, pageState)

  return (
    <div
      id={`tl-page-${page.id}`}
      className="tl-page"
      style={{ width: `${width}px`, height: `${height}px` }}
      {...events}
    >
      {zoomedBounds && <BoundsBg bounds={zoomedBounds} />}
      <div
        className="tl-page-content"
        style={{
          width: `${page.size[0]}px`,
          height: `${page.size[1]}px`,
          transform: `scale(${zoom})`
        }}
      >
        {shapeTree.map((node) => (
          <ShapeNode
            key={node.shape.id}
            utils={shapeUtils}
            {...node}
          ></ShapeNode>
        ))}
      </div>
      {selectShapes.map((shape) => (
        <ShapeIndicator
          zoom={zoom}
          shape={shape}
          key={'selected_' + shape.id}
        />
      ))}
      {hoveredId && (
        <ShapeIndicator zoom={zoom} shape={page.shapes[hoveredId]} />
      )}
      {zoomedBounds && <Bounds bounds={zoomedBounds} />}
      {pageState.brush && <Brush brush={pageState.brush} />}
    </div>
  )
}
