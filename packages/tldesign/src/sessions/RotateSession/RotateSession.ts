import { TlDesignApp } from '@/TlDesignApp'
import { SessionType, TDShape, TlDesignPatch } from '@/types'
import { Point } from '@tldesign/core'
import { BaseSession } from '../BaseSession'

export class RotateSession extends BaseSession {
  type = SessionType.Rotate
  /**
   * 鼠标偏移量
   */
  delta: Point = [0, 0]
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
    this.initialAngle = 0
    this.initialShapes = []
  }

  start = (): TlDesignPatch | undefined => void null
  update = (): TlDesignPatch | undefined => {
    console.log('rotate')
    return void null
  }
  cancel = (): TlDesignPatch | undefined => void null
  complete = (): TlDesignPatch | undefined => void null
}
