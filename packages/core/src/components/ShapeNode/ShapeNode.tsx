import { TLShapeUtilsMap } from '@/TLShapeUtil'
import { IShapeTreeNode } from '@/types'
import { Shape } from './Shape'

interface ShapeNodeProps extends IShapeTreeNode {
  utils: TLShapeUtilsMap
}

export const ShapeNode = function ShapeNode({
  utils,
  children,
  shape,
  ...rest
}: ShapeNodeProps) {
  return (
    <>
      <Shape util={utils[shape.type]} shape={shape} {...rest}></Shape>
      {children.map((childNode) => (
        <ShapeNode
          key={childNode.shape.id}
          utils={utils}
          {...childNode}
        ></ShapeNode>
      ))}
    </>
  )
}
