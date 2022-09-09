import { ImageShape, TDShapeType } from '@/types'
import { TLBounds, Point } from '@tldesign/core'
import { TDShapeUtil } from '../TDShapeUtil'
import { ImageComponent } from './ImageComponent'
import Vec from '@tldesign/vec'

export class ImageUtil extends TDShapeUtil<ImageShape> {
  type = TDShapeType.Image

  Component = ImageComponent

  getBounds({ point, size, rotation }: ImageShape): TLBounds {
    const [minX, minY] = point
    const [width, height] = size
    const [maxX, maxY] = Vec.add(point, size)
    return {
      minX,
      minY,
      maxX,
      maxY,
      width,
      height,
      rotation
    }
  }

  getScaleMutation(
    { size }: ImageShape,
    _: TLBounds,
    scale: Point
  ): Partial<ImageShape> {
    return {
      size: Vec.mulV(size, scale)
    }
  }
}
