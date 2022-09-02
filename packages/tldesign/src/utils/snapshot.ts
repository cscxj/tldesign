import { TDSnapshot, TDPage, TDShape } from '@/types'
import { TLPageState, Utils } from '@tldesign/core'

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

/**
 * 获取当前分支的所有id
 * @param data
 * @param id
 * @param pageId
 * @returns ids
 */
function getDocumentBranch(
  data: TDSnapshot,
  id: string,
  pageId: string
): string[] {
  const shape = getShape(data, id, pageId)

  if (shape.children === undefined) return [id]

  return [
    id,
    ...shape.children.flatMap((childId) =>
      getDocumentBranch(data, childId, pageId)
    )
  ]
}

/**
 * 获取所有已选分支的拷贝
 * @param data
 * @param pageId
 * @param fn 处理shape的函数
 */
export function getSelectedBranchSnapshot<K>(
  data: TDSnapshot,
  pageId: string,
  fn: (shape: TDShape) => K
): ({ id: string } & K)[]
export function getSelectedBranchSnapshot(
  data: TDSnapshot,
  pageId: string
): TDShape[]
export function getSelectedBranchSnapshot<K>(
  data: TDSnapshot,
  pageId: string,
  fn?: (shape: TDShape) => K
): (TDShape | K)[] {
  const page = getPage(data, pageId)

  const copies = getSelectedIds(data, pageId)
    .flatMap((id) =>
      getDocumentBranch(data, id, pageId).map((id) => page.shapes[id])
    )
    .map(Utils.deepClone)

  if (fn !== undefined) {
    return copies.map((shape) => ({ id: shape.id, ...fn(shape) }))
  }

  return copies
}

/**
 * 获取当前图形的最顶层图形
 * @param data
 * @param id
 */
export function getRootShape(
  data: TDSnapshot,
  id: string,
  pageId: string
): TDShape {
  const page = getPage(data, pageId)
  const shape = getShape(data, id, pageId)
  if (shape.parentId === page.id) {
    return shape
  }
  return getRootShape(data, shape.parentId, pageId)
}
