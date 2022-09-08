import { TlDesignApp } from '@/TlDesignApp'
import { SessionType, TDShape, TlDesignPatch } from '@/types'
import { Snapshot } from '@/utils'
import { Point, Utils } from '@tldesign/core'
import { BaseSession } from '../BaseSession'
import Vec from '@tldesign/vec'

export class RotateSession extends BaseSession {
  type = SessionType.Rotate
  /**
   * 公共边界中心点
   */
  readonly commonBoundsCenter: Point
  /**
   * 初始角度
   */
  readonly initialAngle: number
  /**
   * 要旋转的图形
   */
  readonly initialShapes: TDShape[]

  constructor(app: TlDesignApp) {
    super(app)

    const {
      app: { currentPageId, originPoint }
    } = this

    const initialShapes = Snapshot.getSelectedBranchSnapshot(
      app.state,
      currentPageId
    )
    this.commonBoundsCenter = Utils.getBoundsCenter(
      Utils.getCommonBounds(
        initialShapes.map((shape) => {
          const bounds = this.app.getShapeUtil(shape).getBounds(shape)
          return Utils.getBoundsFromPoints(Utils.getRotatedCorners(bounds))
        })
      )
    )

    this.initialShapes = initialShapes

    this.initialAngle = Vec.angle(this.commonBoundsCenter, originPoint)
  }

  start = (): TlDesignPatch | undefined => void null
  update = (): TlDesignPatch | undefined => {
    const {
      commonBoundsCenter,
      initialShapes,
      app: { currentPageId, currentPoint }
    } = this

    // 鼠标拉拽的角度
    const angleDelta =
      Vec.angle(commonBoundsCenter, currentPoint) - this.initialAngle

    const shapes: Record<string, Partial<TDShape>> = {}
    // 更新图形
    initialShapes.forEach((shape) => {
      const bounds = this.app.getShapeUtil(shape).getBounds(shape)
      const changed = Utils.getRotatedBounds(
        bounds,
        commonBoundsCenter,
        angleDelta
      )
      shapes[shape.id] = {
        point: [changed.minX, changed.minY],
        rotation: changed.rotation
      }
    })

    return {
      document: {
        pages: {
          [currentPageId]: {
            shapes
          }
        }
      }
    }
  }
  cancel = (): TlDesignPatch | undefined => void null
  complete = (): TlDesignPatch | undefined => void null
}
