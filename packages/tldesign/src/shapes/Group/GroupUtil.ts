import { GroupShape, TDShapeType } from '@/types'
import { TDShapeUtil } from '../TDShapeUtil'
import { GroupComponent } from './GroupComponent'

export class GroupUtil extends TDShapeUtil<GroupShape> {
  type = TDShapeType.Group

  Component = GroupComponent
}
