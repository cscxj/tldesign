import { TLBounds, TLPage, TLPageState } from '@/types'
import { Utils } from '@/utils'

export function useSelection(page: TLPage, pageState: TLPageState) {
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

    bounds = shape.bounds
  } else if (selectedIds.length > 1) {
    const selectedShapes = selectedIds.map((id) => page.shapes[id])

    bounds = selectedShapes.reduce((acc, { bounds }, i) => {
      bounds = Utils.getBoundsFromPoints(Utils.getRotatedCorners(bounds))
      if (i === 0) {
        return bounds
      }
      return Utils.getExpandedBounds(acc, bounds)
    }, {} as TLBounds)
  }
  return { bounds }
}
