import type { TLPage, TLPageState, TLShape, IShapeTreeNode } from '@/types'

function addToShapeTree(
  shape: TLShape,
  branch: IShapeTreeNode[],
  shapes: TLPage['shapes'],
  pageState: TLPageState
) {
  const node: IShapeTreeNode = {
    shape,
    children: [],
    isSelected: pageState.selectedIds.includes(shape.id),
    isEditing: pageState.editingId === shape.id,
    isHovered: pageState.hoveredId === shape.id
  }
  branch.push(node)
  if (shape.children) {
    shape.children
      .map((id) => shapes[id])
      .filter(Boolean)
      .sort((a, b) => a.childIndex - b.childIndex)
      .forEach((childShape) => {
        addToShapeTree(childShape, node.children, shapes, pageState)
      })
  }
}

export function useShapeTree(
  page: TLPage,
  pageState: TLPageState
): IShapeTreeNode[] {
  const allShapes = Object.values(page.shapes)
  const rootShapes = new Set<TLShape>()

  allShapes.forEach((shape) => {
    if (shape.parentId === page.id) {
      rootShapes.add(shape)
      return
    }
    const parent = page.shapes[shape.parentId]
    if (parent === undefined) {
      throw Error(
        `A shape (${shape.id}) has a parent (${shape.parentId}) that does not exist!`
      )
    } else {
      rootShapes.add(parent)
    }
  })

  const tree: IShapeTreeNode[] = []

  rootShapes.forEach((shape) => {
    if (shape === undefined) {
      throw Error('Rendered shapes included a missing shape')
    }

    addToShapeTree(shape, tree, page.shapes, pageState)
  })

  tree.sort((a, b) => a.shape.childIndex - b.shape.childIndex)

  return tree
}
