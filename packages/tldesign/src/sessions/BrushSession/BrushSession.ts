import { TlDesignApp } from '@/TlDesignApp'
import { SessionType, TlDesignPatch } from '@/types'
import { TLBounds, Utils } from '@tldesign/core'
import { BaseSession } from '../BaseSession'

export class BrushSession extends BaseSession {
  type = SessionType.Brush

  readonly initialSelectedIds: Set<string>
  /**
   * 允许框选的图形
   */
  readonly shapesToTest: {
    id: string
    bounds: TLBounds
    selectId: string
  }[]

  constructor(app: TlDesignApp) {
    super(app)
    const { currentPageId } = app
    this.initialSelectedIds = new Set(this.app.selectedIds)
    this.shapesToTest = this.app.shapes
      .filter(
        (shape) =>
          !(
            shape.parentId !== currentPageId ||
            this.initialSelectedIds.has(shape.id) ||
            this.initialSelectedIds.has(shape.parentId)
          )
      )
      .map((shape) => {
        const util = this.app.getShapeUtil(shape)
        return {
          id: shape.id,
          bounds: util.getBounds(shape),
          selectId: shape.id
        }
      })

    this.update()
  }

  start = (): TlDesignPatch | undefined => void null

  update = (): TlDesignPatch | undefined => {
    const {
      initialSelectedIds,
      app: {
        originPoint,
        currentPoint,
        pageState: {
          camera: { zoom }
        }
      }
    } = this

    const hits = new Set<string>()

    const brush = Utils.getBoundsFromPoints([originPoint, currentPoint])

    const actualBrush: TLBounds = Utils.getZoomBounds(brush, 1 / zoom)

    const selectedIds = new Set(initialSelectedIds)
    // 捕捉框选范围内的图形
    this.shapesToTest.forEach(({ id, selectId }) => {
      const shape = this.app.getShape(id)

      if (!hits.has(selectId)) {
        const util = this.app.getShapeUtil(shape)
        if (util.hitTestBounds(shape, actualBrush)) {
          hits.add(selectId)
          if (!selectedIds.has(selectId)) {
            selectedIds.add(selectId)
          }
        } else if (selectedIds.has(selectId)) {
          selectedIds.delete(selectId)
        }
      }
    })

    const currentSelectedIds = this.app.selectedIds
    // 选择的图形已改变
    const didChange =
      selectedIds.size !== currentSelectedIds.length ||
      currentSelectedIds.some((id) => !selectedIds.has(id))

    const afterSelectedIds = didChange
      ? Array.from(selectedIds.values())
      : currentSelectedIds

    if (!didChange)
      return {
        document: {
          pageStates: {
            [this.app.currentPageId]: {
              brush
            }
          }
        }
      }

    return {
      document: {
        pageStates: {
          [this.app.currentPageId]: {
            brush,
            selectedIds: afterSelectedIds
          }
        }
      }
    }
  }

  complete = (): TlDesignPatch | undefined => {
    return {
      document: {
        pageStates: {
          [this.app.currentPageId]: {
            brush: null,
            selectedIds: [...this.app.selectedIds]
          }
        }
      }
    }
  }

  cancel = (): TlDesignPatch | undefined => {
    return {
      document: {
        pageStates: {
          [this.app.currentPageId]: {
            brush: null,
            selectedIds: Array.from(this.initialSelectedIds.values())
          }
        }
      }
    }
  }
}
