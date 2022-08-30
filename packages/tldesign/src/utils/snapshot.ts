import { TDSnapshot, TDPage, TDShape } from '@/types'
import { TLPageState } from '@tldesign/core'

export function getSelectedShapes(data: TDSnapshot, pageId: string) {
  const page = getPage(data, pageId)
  const selectedIds = getSelectedIds(data, pageId)
  return selectedIds.map((id) => page.shapes[id])
}

export function getPage(data: TDSnapshot, pageId: string): TDPage {
  return data.document.pages[pageId]
}

export function getSelectedIds(data: TDSnapshot, pageId: string): string[] {
  return getPageState(data, pageId).selectedIds
}

export function getPageState(data: TDSnapshot, pageId: string): TLPageState {
  return data.document.pageStates[pageId]
}

export function getShape<T extends TDShape = TDShape>(
  data: TDSnapshot,
  shapeId: string,
  pageId: string
): T {
  return getPage(data, pageId).shapes[shapeId] as T
}
