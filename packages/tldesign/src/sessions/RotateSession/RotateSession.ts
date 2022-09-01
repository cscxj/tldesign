import { TlDesignApp } from '@/TlDesignApp'
import { SessionType, TDShape, TlDesignPatch } from '@/types'
import { Snapshot } from '@/utils'
import { Point, TLBounds, Utils } from '@tldesign/core'
import { BaseSession } from '../BaseSession'
import Vec from '@tldesign/vec'

export class RotateSession extends BaseSession {
  type = SessionType.Rotate
  /**
   * 鼠标偏移量
   */
  delta: Point = [0, 0]
  /**
   * 公共边界中心点
   */
  commonBoundsCenter: Point
  /**
   * 初始角度
   */
  initialAngle: number
  /**
   * 要旋转的图形
   */
  initialShapes: {
    shape: TDShape
    center: Point
  }[]

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
        initialShapes.map((shape) =>
          Utils.getBoundsFromPoints(Utils.getRotatedCorners(shape.bounds))
        )
      )
    )

    this.initialShapes = initialShapes.map((shape) => {
      return {
        shape,
        center: Utils.getBoundsCenter(shape.bounds)
      }
    })
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
    initialShapes.forEach(({ center, shape }) => {
      const changed = getRotatedBoundsMutation(
        shape.bounds,
        center,
        commonBoundsCenter,
        angleDelta
      )
      shapes[shape.id] = {
        ...shape,
        bounds: changed
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

/**
 * 旋转图形
 * @param bounds
 * @param center 图形中点
 * @param origin 旋转原点
 * @param delta 旋转角度
 * @returns 旋转之后的图形
 */
function getRotatedBoundsMutation(
  bounds: TLBounds,
  center: Point,
  origin: Point,
  delta: number
): TLBounds {
  // 相对中心的位置
  const relativeCenter = Vec.sub(center, [bounds.x, bounds.y])
  // 中心旋转之后的位置
  const rotatedCenter = Vec.rotWith(center, origin, delta)
  // 旋转之后的位置
  const [x, y] = Vec.toFixed(Vec.sub(rotatedCenter, relativeCenter))

  const nextRotation = Utils.clampRadians((bounds.rotation || 0) + delta)

  return {
    ...bounds,
    x,
    y,
    rotation: nextRotation
  }
}
