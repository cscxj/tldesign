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
    const initialShapes = Snapshot.getSelectedBranchSnapshot(
      this.app.state,
      this.app.currentPageId
    )
    this.initialShapeIds = initialShapes.map((shape) => shape.id)

    const isSingle = initialShapes.length === 1

    this.initialCommonBounds = isSingle
      ? initialShapes[0].bounds
      : Utils.getCommonBounds(
          initialShapes.map((shape) =>
            Utils.getBoundsFromPoints(Utils.getRotatedCorners(shape.bounds))
          )
        )

    // 计算缩放原点
    const { x, y, width, height, rotation } = this.initialCommonBounds
    const rX = width / 2
    const rH = height / 2
    let originX = x + rX
    let originY = y + rH
    const center: Point = [originX, originY]
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

    this.scaleOrigin = Vec.rotWith(origin, center, rotation)

    // 计算所选图形的初始信息
    this.initialShapes = initialShapes.map((shape) => {
      return {
        shape,
        relativeOrigin: Vec.sub(Utils.getBoundsCenter(shape.bounds), origin)
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
    initialShapes.forEach(({ shape, relativeOrigin }) => {
      let { x, y } = shape.bounds
      const { width, height } = shape.bounds

      // 缩放宽和高
      const [w, h] = Vec.mulV([width, height], [scaleW, scaleH])

      // 缩放相对距离
      relativeOrigin = Vec.mulV(relativeOrigin, [scaleW, scaleH])

      // 新的图形中心位置
      const shapeCenter = Vec.add(
        scaleOrigin,
        Vec.rotWith(relativeOrigin, [0, 0], rotation) // 坐标系再转回去
      )
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
