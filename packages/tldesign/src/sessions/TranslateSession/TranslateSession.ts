import { TlDesignApp } from '@/TlDesignApp'
import { Patch, SessionType, TDShape, TlDesignPatch } from '@/types'
import Vec from '@tldesign/vec'
import { Point } from '@tldesign/core'
import { BaseSession } from '../BaseSession'
import { Snapshot } from '@/utils'

export class TranslateSession extends BaseSession {
  type = SessionType.Translate

  initialShapes: TDShape[]

  constructor(app: TlDesignApp) {
    super(app)

    this.initialShapes = Snapshot.getSelectedBranchSnapshot(
      this.app.state,
      this.app.currentPageId
    )
  }

  start = (): TlDesignPatch | undefined => void null
  update = (): TlDesignPatch | undefined => {
    const { currentPageId, currentPoint, originPoint } = this.app

    const nextShapes: Patch<Record<string, TDShape>> = {}

    const delta: Point = Vec.sub(currentPoint, originPoint)

    this.initialShapes.forEach((shape) => {
      const point = Vec.toFixed(Vec.add(shape.point, delta))
      nextShapes[shape.id] = {
        point
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
