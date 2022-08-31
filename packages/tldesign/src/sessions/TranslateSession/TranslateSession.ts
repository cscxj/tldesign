import { TlDesignApp } from '@/TlDesignApp'
import { Patch, SessionType, TDShape, TlDesignPatch } from '@/types'
import { Vec } from '@/utils'
import { Point } from '@tldesign/core'
import { BaseSession } from '../BaseSession'

export class TranslateSession extends BaseSession {
  type = SessionType.Translate

  initialSelectedIds: string[]

  initialShapes: TDShape[]
  initialIds: Set<string>

  constructor(app: TlDesignApp) {
    super(app)
    const { selectedIds } = this.app
    this.initialSelectedIds = [...selectedIds]
    // 过滤不能移动的
    const shapes = selectedIds.map((id) => this.app.getShape(id))
    const shapeIds = new Set(shapes.map((shape) => shape.id))

    this.initialShapes = shapes
    this.initialIds = shapeIds
  }

  start = (): TlDesignPatch | undefined => void null
  update = (): TlDesignPatch | undefined => {
    const { currentPageId, currentPoint, originPoint } = this.app

    const nextShapes: Patch<Record<string, TDShape>> = {}

    const delta: Point = Vec.sub(currentPoint, originPoint)

    this.initialShapes.forEach((shape) => {
      const [x, y] = Vec.toFixed(
        Vec.add([shape.bounds.x, shape.bounds.y], delta)
      )
      nextShapes[shape.id] = {
        bounds: {
          ...shape.bounds,
          x,
          y
        }
      }
    })

    return {
      document: {
        pages: {
          [currentPageId]: {
            shapes: nextShapes
          }
        }
      }
    }
    return void null
  }
  cancel = (): TlDesignPatch | undefined => void null
  complete = (): TlDesignPatch | undefined => void null
}
