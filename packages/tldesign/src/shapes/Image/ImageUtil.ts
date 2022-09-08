import { ImageShape, TDShapeType } from '@/types'
import { Point, TLBounds } from '@tldesign/core'
import { TDShapeUtil } from '../TDShapeUtil'
import { ImageComponent } from './ImageComponent'

export class ImageUtil extends TDShapeUtil<ImageShape> {
  type = TDShapeType.Image

  Component = ImageComponent

  getBounds(shape: ImageShape): TLBounds {
    return {
      minX: shape.point[0],
      minY: shape.point[1],
      maxX: shape.point[0] + shape.size[0],
      maxY: shape.point[1] + shape.size[1],
      width: shape.size[0],
      height: shape.size[1],
      rotation: shape.rotation
    }
  }

  getSizeMutation(size: Point): Partial<ImageShape> {
    return { size }
  }
}
