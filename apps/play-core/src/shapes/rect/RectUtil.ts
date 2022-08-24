import { TLShapeUtil } from '@tldesign/core'
import { RectComponent } from './RectComponent'
import type { RectShape } from './RectShape'

type S = RectShape

export class RectUtil extends TLShapeUtil<S> {
  Component = RectComponent
}
