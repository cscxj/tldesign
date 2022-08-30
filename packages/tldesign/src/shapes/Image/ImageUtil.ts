import { ImageShape, TDShapeType } from '@/types'
import { TDShapeUtil } from '../TDShapeUtil'
import { ImageComponent } from './ImageComponent'

export class ImageUtil extends TDShapeUtil<ImageShape> {
  type = TDShapeType.Image

  Component = ImageComponent
}
