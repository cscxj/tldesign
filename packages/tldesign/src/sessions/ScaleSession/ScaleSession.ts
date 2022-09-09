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
    bounds: TLBounds
    // 相对于缩放原点的位置,
    // 以commonBounds的宽和高分别为x、y轴，scaleOrigin为坐标原点
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

    const { selectedIds } = this.app

    const initialShapes = Snapshot.getSelectedBranchSnapshot(
      this.app.state,
      this.app.currentPageId
    )

    this.initialShapeIds = initialShapes.map((shape) => shape.id)

    const isSingle = selectedIds.length === 1

    let commonBounds: TLBounds
    if (isSingle) {
      const targetShape = this.app.getShape(selectedIds[0])
      commonBounds = this.app.getShapeUtil(targetShape).getBounds(targetShape)
    } else {
      commonBounds = Utils.getCommonBounds(
        initialShapes.map((shape) => {
          const bounds = this.app.getShapeUtil(shape).getBounds(shape)
          return Utils.getBoundsFromPoints(Utils.getRotatedCorners(bounds))
        })
      )
    }
    this.initialCommonBounds = commonBounds

    // 计算缩放原点
    const { minX, minY, width, height, rotation } = this.initialCommonBounds
    const rX = width / 2
    const rH = height / 2
    let originX = minX + rX
    let originY = minY + rH
    // 公共边界中点
    const commonBoundsCenter: Point = [originX, originY]
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

    const origin: Point = [originX, originY]

    this.scaleOrigin = Vec.rotWith(origin, commonBoundsCenter, rotation)

    // 计算所选图形的初始信息
    this.initialShapes = initialShapes.map((shape) => {
      const bounds = this.app.getShapeUtil(shape).getBounds(shape)
      // 当前图形的位置被设为是已经旋转过的，所以初始位置应该做一次反旋转
      const unRotatedShapeBounds = Utils.getRotatedBounds(
        bounds,
        commonBoundsCenter,
        -(rotation || 0)
      )

      return {
        shape,
        bounds: unRotatedShapeBounds,
        relativeOrigin: Vec.sub(
          Utils.getBoundsCenter(unRotatedShapeBounds),
          origin
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
    const { width, height, rotation } = initialCommonBounds

    // 鼠标偏移量转化为在宽度和高度上的偏移量
    // 坐标轴旋转theta, 相当于实际的向量旋转-theta
    const sizeDelta = Vec.rotWith(delta, [0, 0], -(rotation ?? 0))

    let newWidth = width
    let newHeight = height
    // 宽度改变值
    let dw = 0
    // 高度改变值
    let dh = 0

    if (scaleType & TLScaleHandle.Left) {
      dw = -sizeDelta[0]
    }

    if (scaleType & TLScaleHandle.Right) {
      dw = sizeDelta[0]
    }

    if (scaleType & TLScaleHandle.Top) {
      dh = -sizeDelta[1]
    }

    if (scaleType & TLScaleHandle.Bottom) {
      dh = sizeDelta[1]
    }
    newWidth += dw
    newHeight += dh

    // 宽度缩放比例
    const scaleW = newWidth / width
    // 高度缩放比例
    let scaleH = newHeight / height

    // 四个角拖拽，保持比例宽高缩放比例一致
    if (
      scaleType & (TLScaleHandle.Left | TLScaleHandle.Right) &&
      scaleType & (TLScaleHandle.Top | TLScaleHandle.Bottom)
    ) {
      scaleH = scaleW
    }

    /**
     * 2. 缩放图形
     */
    const shapes: Record<string, Partial<TDShape>> = {}
    initialShapes.forEach(({ shape, bounds, relativeOrigin }) => {
      const util = this.app.getShapeUtil(shape)

      // 大小变化
      const sizeMutation = util.getScaleMutation(shape, bounds, [
        scaleW,
        scaleH
      ])

      const scaledBounds = util.getBounds({ ...shape, ...sizeMutation })

      // 计算图形的宽高缩放比例
      const shapeScale = Vec.divV(
        [scaledBounds.width, scaledBounds.height],
        [bounds.width, bounds.height]
      )

      // 旋转原点 -> 图形中心点
      relativeOrigin = Vec.mulV(relativeOrigin, shapeScale)

      // 新的图形中心位置
      const shapeCenter = Vec.add(
        scaleOrigin,
        Vec.rotWith(relativeOrigin, [0, 0], rotation) // 坐标系再转回去
      )
      const newPoint = Vec.sub(shapeCenter, [
        scaledBounds.width / 2,
        scaledBounds.height / 2
      ])

      shapes[shape.id] = {
        ...sizeMutation,
        point: newPoint
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
