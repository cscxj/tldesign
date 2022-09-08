import { TDShape, TDShapeType } from '@/types'
import { TLShapeUtil } from '@tldesign/core'
import { GroupUtil } from './Group'
import { ImageUtil } from './Image'
import { TDShapeUtil } from './TDShapeUtil'
import { TextUtil } from './Text'

export const Image = new ImageUtil()
export const Text = new TextUtil()
export const Group = new GroupUtil()

export type TDShapeUtilsMap = {
  [key in TDShape['type']]: TLShapeUtil<Extract<TDShape, { type: key }>>
}

export const shapeUtils: TDShapeUtilsMap = {
  [TDShapeType.Image]: Image,
  [TDShapeType.Text]: Text,
  [TDShapeType.Group]: Group
}

export function getShapeUtil<S extends TDShape>(shape: S | S['type']) {
  if (typeof shape === 'string')
    return shapeUtils[shape] as unknown as TDShapeUtil<S>
  return shapeUtils[shape.type] as unknown as TDShapeUtil<S>
}
