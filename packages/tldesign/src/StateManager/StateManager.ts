import { deepCopy } from './copy'
import create, { UseBoundStore } from 'zustand'
import createVanilla, { StoreApi } from 'zustand/vanilla'

export class StateManager<T extends Record<string, any>> {
  private _state: T
  private _snapshot: T

  private store: StoreApi<T>

  public readonly useStore: UseBoundStore<StoreApi<T>>

  constructor(initialState: T) {
    this._state = deepCopy(initialState)
    this._snapshot = deepCopy(initialState)

    this.store = createVanilla(() => this._state)
    this.useStore = create(this.store)
  }
}
