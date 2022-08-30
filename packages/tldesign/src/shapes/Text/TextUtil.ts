import { TDShapeType, TextShape } from '@/types'
import { TDShapeUtil } from '../TDShapeUtil'
import { TextComponent } from './TextComponent'

export class TextUtil extends TDShapeUtil<TextShape> {
  type = TDShapeType.Text

  Component = TextComponent
}
