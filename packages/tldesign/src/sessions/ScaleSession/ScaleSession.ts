import { TlDesignApp } from '@/TlDesignApp'
import { SessionType, TDShape, TlDesignPatch } from '@/types'
import { Snapshot } from '@/utils'
import { Point, TLBounds, TLScaleHandle, Utils } from '@tldesign/core'
import { BaseSession } from '../BaseSession'
import Vec from '@tldesign/vec'

export class ScaleSession extends BaseSession {
  type = SessionType.Rotate
  /**
   * 图形初始状态、
   */
  readonly initialShapes: {
    shape: TDShape
    // 相对于缩放原点的位置
    relativeOrigin: Point
  }[]
  /**
   * 需要缩放的图形id
   */
  readonly initialShapeIds: string[]
  /**
   * 缩放类型
   */
  readonly scaleType: TLScaleHandle
  /**
   * 公共边界
   */
  readonly initialCommonBounds: TLBounds
  /**
   * 缩放原点
   */
  readonly scaleOrigin: Point

  constructor(app: TlDesignApp, handleId: TLScaleHandle) {
    super(app)
    this.scaleType = handleId
    const initialShapes = Snapshot.getSelectedBranchSnapshot(
      this.app.state,
      this.app.currentPageId
    )
    this.initialShapeIds = initialShapes.map((shape) => shape.id)

    this.initialCommonBounds = Utils.getCommonBounds(
      initialShapes.map((shape) =>
        Utils.getBoundsFromPoints(Utils.getRotatedCorners(shape.bounds))
      )
    )

    // 计算缩放原点
    const { x, y, width, height } = this.initialCommonBounds
    const rX = width / 2
    const rH = height / 2
    let originX = x + rX
    let originY = y + rH
    if (handleId & TLScaleHandle.Left) {
      originX += rX
    }
    if (handleId & TLScaleHandle.Right) {
      originX -= rX
    }
    if (handleId & TLScaleHandle.Top) {
      originY += rH
    }
    if (handleId & TLScaleHandle.Bottom) {
      originY -= rH
    }
    this.scaleOrigin = [originX, originY]

    // 计算所选图形的初始信息
    this.initialShapes = initialShapes.map((shape) => {
      return {
        shape,
        relativeOrigin: Vec.sub(
          Utils.getBoundsCenter(shape.bounds),
          this.scaleOrigin
        )
      }
    })
  }

  start = (): TlDesignPatch | undefined => void null
  update = (): TlDesignPatch | undefined => {
    const {
      scaleType,
      initialShapes,
      initialCommonBounds,
      scaleOrigin,
      app: { currentPageId, currentPoint, originPoint }
    } = this

    // 鼠标移动量
    const delta: Point = Vec.sub(currentPoint, originPoint)

    /**
     * 缩放所选的图形
     * 思路：
     * 1. 计算整体缩放比例
     * 2. 根据缩放比例缩放图形
     * 3. 根据公共比例缩放图形相对于缩放原点的距离
     * 4. 得出新图形的 x y width height
     */

    /**
     * 1. 计算整体缩放比例
     */
    let { width, height } = initialCommonBounds

    // 宽度改变值
    let dw = 0
    // 高度改变值
    let dh = 0
    // 左边的控制点：x 轴正方向移动 宽度增加
    if (scaleType & TLScaleHandle.Left) {
      dw = -delta[0]
    }
    // 右边的控制点: x 轴反方向移动 宽度增加
    if (scaleType & TLScaleHandle.Right) {
      dw = delta[0]
    }
    // 顶部的控制点：y 轴反方向移动 高度增加
    if (scaleType & TLScaleHandle.Top) {
      dh = -delta[1]
    }
    // 底部的控制点：y 轴正方向移动 高度增加
    if (scaleType & TLScaleHandle.Bottom) {
      dh = delta[1]
    }
    width += dw
    height += dh

    // 宽度缩放比例
    const scaleXDelta = width / initialCommonBounds.width
    // 高度缩放比例
    let scaleYDelta = height / initialCommonBounds.height

    // 四个角拖拽，保持比例宽高缩放比例一致
    if (
      scaleType & (TLScaleHandle.Left | TLScaleHandle.Right) &&
      scaleType & (TLScaleHandle.Top | TLScaleHandle.Bottom)
    ) {
      scaleYDelta = scaleXDelta
    }

    /**
     * 2. 缩放图形
     */
    const shapes: Record<string, Partial<TDShape>> = {}
    initialShapes.forEach(({ shape, relativeOrigin }) => {
      let { x, y } = shape.bounds
      const { width, height } = shape.bounds
      const [w, h] = Vec.mulV([width, height], [scaleXDelta, scaleYDelta])
      relativeOrigin = Vec.mulV(relativeOrigin, [scaleXDelta, scaleYDelta])
      const shapeCenter = Vec.add(scaleOrigin, relativeOrigin)
      ;[x, y] = Vec.sub(shapeCenter, [w / 2, h / 2])

      const newBounds: TLBounds = {
        ...shape.bounds,
        width: w,
        height: h,
        x,
        y
      }

      shapes[shape.id] = {
        ...shape,
        bounds: newBounds
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
