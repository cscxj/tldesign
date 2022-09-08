import { TDShapeType, TextShape } from '@/types'
import { Point, TLBounds } from '@tldesign/core'
import { TDShapeUtil } from '../TDShapeUtil'
import { TextComponent } from './TextComponent'

export class TextUtil extends TDShapeUtil<TextShape> {
  type = TDShapeType.Text

  Component = TextComponent

  getBounds(shape: TextShape): TLBounds {
    const { fontSize, lineHeight, text } = shape
    const height = fontSize * lineHeight
    const width = fontSize * text.length

    return {
      minX: shape.point[0],
      minY: shape.point[1],
      maxX: shape.point[0] + width,
      maxY: shape.point[1] + height,
      width,
      height,
      rotation: shape.rotation
    }
  }

  getSizeMutation(size: Point): Partial<TextShape> {
    return {
      fontSize: size[1]
    }
  }
}
