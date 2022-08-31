import type { Point, TLEventTarget, TLPointerInfo } from '@/types'

const DOUBLE_CLICK_DURATION = 250

export class Inputs {
  pointer?: TLPointerInfo<TLEventTarget>
  activePointer?: number
  pointerUpTime = 0

  pointerEnter<T extends TLEventTarget>(e: React.PointerEvent, target: T) {
    const { shiftKey, ctrlKey, metaKey, altKey } = e

    const point: Point = [e.clientX, e.clientY]

    const info: TLPointerInfo<T> = {
      target,
      pointerId: e.pointerId,
      origin: point,
      point: point,
      pressure: e.pressure,
      shiftKey,
      ctrlKey,
      metaKey,
      altKey,
      spaceKey: false
    }

    this.pointer = info

    return info
  }

  pointerDown<T extends TLEventTarget>(e: React.PointerEvent, target: T) {
    const { shiftKey, ctrlKey, metaKey, altKey } = e

    const point: Point = [e.clientX, e.clientY]

    this.activePointer = e.pointerId

    const info: TLPointerInfo<T> = {
      target,
      pointerId: e.pointerId,
      origin: point,
      point: point,
      pressure: e.pressure,
      shiftKey,
      ctrlKey,
      metaKey,
      altKey,
      spaceKey: false
    }

    this.pointer = info

    return info
  }

  isDoubleClick() {
    if (!this.pointer) return false

    const isDoubleClick =
      performance.now() - this.pointerUpTime < DOUBLE_CLICK_DURATION

    // Reset the active pointer, in case it got stuck
    if (isDoubleClick) this.activePointer = undefined

    return isDoubleClick
  }

  pointerUp<T extends TLEventTarget>(e: React.PointerEvent, target: T) {
    const { shiftKey, ctrlKey, metaKey, altKey } = e

    const prev = this.pointer

    const point: Point = [e.clientX, e.clientY]

    this.activePointer = undefined

    const info: TLPointerInfo<T> = {
      origin: point,
      ...prev,
      target,
      pointerId: e.pointerId,
      point,
      pressure: e.pressure,
      shiftKey,
      ctrlKey,
      metaKey,
      altKey,
      spaceKey: false
    }

    this.pointer = info

    this.pointerUpTime = performance.now()

    return info
  }

  pointerMove<T extends TLEventTarget>(e: React.PointerEvent, target: T) {
    const { shiftKey, ctrlKey, metaKey, altKey } = e

    const point: Point = [e.clientX, e.clientY]

    const prev = this.pointer

    const info: TLPointerInfo<T> = {
      origin: point,
      ...prev,
      target,
      pointerId: e.pointerId,
      point,
      pressure: e.pressure,
      shiftKey,
      ctrlKey,
      metaKey,
      altKey,
      spaceKey: false
    }

    this.pointer = info

    return info
  }
}
