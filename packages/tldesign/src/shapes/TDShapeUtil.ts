import { TDShape, TDShapeType } from '@/types'
import { TLShapeUtil } from '@tldesign/core'

export abstract class TDShapeUtil<S extends TDShape> extends TLShapeUtil<S> {
  abstract type: TDShapeType
}
