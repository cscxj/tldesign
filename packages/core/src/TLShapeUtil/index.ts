import { TLShape } from '@/types'
import type { TLShapeUtil } from './TLShapeUtil'

export type TLShapeUtilsMap<S extends TLShape = TLShape> = {
  [key in S['type']]: TLShapeUtil<Extract<S, { type: key }>>
}

export * from './TLShapeUtil'
