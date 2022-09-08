import { TLBounds, TLPage, TLPageState, TLShape } from '@/types'
import { Utils } from '@/utils'
import { TLShapeUtil, TLShapeUtilsMap } from '..'

function getShapeUtils<T extends TLShape>(
  shapeUtils: TLShapeUtilsMap<T>,
  shape: T
) {
  return shapeUtils[shape.type as T['type']] as unknown as TLShapeUtil<T>
}

export function useSelection<S extends TLShape>(
  page: TLPage<S>,
  pageState: TLPageState,
  shapeUtils: TLShapeUtilsMap<S>
) {
  const { selectedIds } = pageState

  let bounds: TLBounds | undefined = undefined
  if (selectedIds.length === 1) {
    const id = selectedIds[0]
    const shape = page.shapes[id]

    if (!shape) {
      throw Error(
        `selectedIds is set to the id of a shape that doesn't exist: ${id}`
      )
    }

    bounds = getShapeUtils(shapeUtils, shape).getBounds(shape)
  } else if (selectedIds.length > 1) {
    const selectedShapes = selectedIds.map((id) => page.shapes[id])

    bounds = selectedShapes.reduce((acc, shape, i) => {
      const bounds = getShapeUtils(shapeUtils, shape).getBounds(shape)
      const warpBounds = Utils.getBoundsFromPoints(
        Utils.getRotatedCorners(bounds)
      )
      if (i === 0) {
        return warpBounds
      }
      return Utils.getExpandedBounds(acc, warpBounds)
    }, {} as TLBounds)
  }
  return { bounds }
}
