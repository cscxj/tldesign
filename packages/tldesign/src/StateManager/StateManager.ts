/* eslint-disable @typescript-eslint/no-unused-vars */
import { deepCopy } from './copy'
import create, { UseBoundStore } from 'zustand'
import createVanilla, { StoreApi } from 'zustand/vanilla'
import { Utils } from '@tldesign/core'
import { Patch } from '@/types'

export class StateManager<T extends Record<string, any>> {
  private _state: T
  private _snapshot: T

  private store: StoreApi<T>

  public readonly useStore: UseBoundStore<StoreApi<T>>

  get state() {
    return this._state
  }

  constructor(initialState: T) {
    this._state = deepCopy(initialState)
    this._snapshot = deepCopy(initialState)

    this.store = createVanilla(() => this._state)
    this.useStore = create(this.store)
  }

  /**
   * 将修补数据应用到当前状态
   * @param patch
   * @param id
   * @returns
   */
  private applyPatch = (patch: Patch<T>, id?: string) => {
    const prev = this._state
    const next = Utils.deepMerge(this._state, patch)
    const final = this.cleanup(next, prev, patch, id)
    if (this.onStateWillChange) {
      this.onStateWillChange(final, id)
    }
    this._state = final
    this.store.setState(this._state, true)
    if (this.onStateDidChange) {
      this.onStateDidChange(this._state, id)
    }
    return this
  }

  /**
   * 修改状态
   * 这不会影响撤消/重做堆栈。
   * @param patch
   * @param id
   * @returns
   */
  patchState = (patch: Patch<T>, id?: string): this => {
    this.applyPatch(patch, id)
    if (this.onPatch) {
      this.onPatch(this._state, patch, id)
    }
    return this
  }

  /**
   * 状态更改回调
   */
  public onPatch?: (state: T, patch: Patch<T>, id?: string) => void
  protected onStateWillChange?: (state: T, id?: string) => void
  protected onStateDidChange?: (state: T, id?: string) => void

  /**
   * 在更新之前对状态做最后的修改
   * @param nextState
   * @param _prevState
   * @param _patch
   * @param _id
   * @returns
   */
  protected cleanup = (
    nextState: T,
    _prevState: T,
    _patch: Patch<T>,
    _id?: string
  ): T => nextState
}
