import { TLBounds, TLPage, TLPageState } from '@/types'

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
  }
  return { bounds }
}
