import { TDShape, TDShapeType } from '@/types'
import { TLShapeUtilsMap } from '@tldesign/core'
import { ImageUtil } from './Image'
import { TextUtil } from './Text'

export const Image = new ImageUtil()
export const Text = new TextUtil()

export const shapeUtils: TLShapeUtilsMap<TDShape> = {
  [TDShapeType.Image]: Image,
  [TDShapeType.Text]: Text
}

export function getShapeUtil<S extends TDShape>(shape: S) {
  return shapeUtils[shape.type]
}
