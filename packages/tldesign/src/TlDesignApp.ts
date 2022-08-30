import {
  Point,
  TLBoundsEventHandler,
  TLCanvasEventHandler,
  TLPageState,
  TLPointerEventHandler
} from '@tldesign/core'
import { StateManager } from './StateManager/StateManager'
import {
  TDShapeType,
  TDSnapshot,
  TDDocument,
  TDShape,
  TDPage,
  Status
} from './types'
import { Snapshot, Vec } from './utils'

export class TlDesignApp extends StateManager<TDSnapshot> {
  originPoint: Point = [0, 0]

  constructor() {
    super(TlDesignApp.defaultState)
  }

  get currentPageId(): string {
    return this.state.appState.currentPageId
  }

  get pageState(): TLPageState {
    return this.state.document.pageStates[this.currentPageId]
  }

  get page(): TDPage {
    return this.state.document.pages[this.currentPageId]
  }

  /**
   * 获取指定页面的状态
   * @param pageId
   * @returns
   */
  getPageState(pageId = this.currentPageId) {
    return Snapshot.getPageState(this.state, pageId)
  }

  /**
   * 获取指定页面中的一个图形
   * @param shapeId
   * @param pageId
   */
  getShape<T extends TDShape = TDShape>(
    shapeId: string,
    pageId = this.currentPageId
  ) {
    return Snapshot.getShape<T>(this.state, shapeId, pageId)
  }

  /**
   * 获取屏幕上的点在页面上的坐标
   */
  getPagePoint(point: Point, pageId = this.currentPageId): Point {
    const { camera } = this.getPageState(pageId)
    return Vec.sub(Vec.div(point, camera.zoom), camera.point)
  }

  setHoveredId(id?: string) {
    this.patchState(
      {
        document: {
          pageStates: {
            [this.currentPageId]: {
              hoveredId: id
            }
          }
        }
      },
      'set_hovered_id'
    )
  }

  /**
   * 设置当前选择
   * @param ids
   * @param push
   * @returns
   */
  private setSelectedIds = (ids: string[], push = false): this => {
    const nextIds = push ? [...this.pageState.selectedIds, ...ids] : [...ids]
    return this.patchState(
      {
        document: {
          pageStates: {
            [this.currentPageId]: {
              selectedIds: nextIds
            }
          }
        }
      },
      `selected`
    )
  }

  /**
   * 设置当前状态
   * @param status
   * @private
   * @returns
   */
  setStatus(status: Status) {
    return this.patchState(
      {
        appState: { status }
      },
      `set_status:${status}`
    )
  }

  /**
   * 选择图形
   * @param ids
   * @returns
   */
  select(...ids: string[]): this {
    ids.forEach((id) => {
      if (!this.page.shapes[id]) {
        throw Error(`That shape does not exist on page ${this.currentPageId}`)
      }
    })
    this.setSelectedIds(ids)
    return this
  }

  /**
   * 清空选择
   * @returns
   */
  selectNone = (): this => {
    this.setSelectedIds([])
    return this
  }

  static version = 1.0

  static defaultDocument: TDDocument = {
    id: 'document1',
    name: 'New document',
    version: TlDesignApp.version,
    pages: {
      page1: {
        id: 'page1',
        name: 'Page 1',
        shapes: {
          image1: {
            id: 'image1',
            type: TDShapeType.Image,
            assetId:
              'https://gd-ai-application.dancf.com/temp/3edaf84e08e52a07c852f70725b17ba6.png',
            bounds: {
              width: 100,
              height: 150,
              x: 100,
              y: 100,
              rotation: 0,
              skew: 0
            },
            parentId: 'page1',
            childIndex: 1
          }
        }
      }
    },
    pageStates: {
      page1: {
        id: 'page1',
        selectedIds: [],
        camera: {
          point: [0, 0],
          zoom: 1
        }
      }
    }
  }

  // pointer events
  onPointerUp: TLPointerEventHandler = () => {
    this.setStatus(Status.Idle)
  }
  // shape events
  onPointShape: TLPointerEventHandler = (info) => {
    this.originPoint = this.getPagePoint(info.point)
    this.select(info.target)
  }

  onHoverShape: TLPointerEventHandler = (info) => {
    this.setHoveredId(info.target)
  }

  onUnHoverShape: TLPointerEventHandler = (info) => {
    requestAnimationFrame(() => {
      if (this.pageState.hoveredId === info.target) {
        this.setHoveredId(undefined)
      }
    })
  }

  onPointBounds: TLBoundsEventHandler = () => {
    this.setStatus(Status.PointingBounds)
  }

  onReleaseBounds: TLBoundsEventHandler = () => {
    this.setStatus(Status.Idle)
  }

  onPointCanvas: TLCanvasEventHandler = () => {
    this.selectNone()
  }

  static defaultState: TDSnapshot = {
    appState: {
      currentPageId: 'page1',
      status: Status.Idle
    },
    document: TlDesignApp.defaultDocument
  }
}
