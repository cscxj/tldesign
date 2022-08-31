import {
  Point,
  TLBoundsEventHandler,
  TLBoundsHandleEventHandler,
  TLCanvasEventHandler,
  TLPageState,
  TLPointerEventHandler,
  TLShapeEventsHandler
} from '@tldesign/core'
import { DEAD_ZONE } from './constance'
import { getSession, TDSession } from './sessions'
import { getShapeUtil } from './shapes'
import { StateManager } from './StateManager/StateManager'
import {
  TDShapeType,
  TDSnapshot,
  TDDocument,
  TDShape,
  TDPage,
  TDStatus,
  SessionType
} from './types'
import { Snapshot } from './utils'
import Vec from '@tldesign/vec'

export class TlDesignApp extends StateManager<TDSnapshot> {
  session?: TDSession
  /**
   * 鼠标按下时的位置
   */
  originPoint: Point = [0, 0]
  /**
   * 鼠标当前位置
   */
  currentPoint: Point = [0, 0]
  /**
   * 是否按下鼠标
   */
  isPointing = false

  shiftKey = false
  altKey = false
  metaKey = false
  ctrlKey = false
  spaceKey = false

  constructor() {
    super(TlDesignApp.defaultState)
  }

  get appState(): TDSnapshot['appState'] {
    return this.state.appState
  }

  get status() {
    return this.appState.status
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

  get selectedIds(): string[] {
    return this.pageState.selectedIds
  }

  get shapes(): TDShape[] {
    return Object.values(this.page.shapes)
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

  getShapeUtil<T extends TDShape>(shape: T) {
    return getShapeUtil<T>(shape)
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
  setStatus(status: TDStatus) {
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
          },
          image2: {
            id: 'image2',
            type: TDShapeType.Image,
            assetId:
              'https://gd-ai-application.dancf.com/temp/e62fb408085b8a93b9e1edeca31e90af.png',
            bounds: {
              width: 160,
              height: 160,
              x: 200,
              y: 200,
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

  updateInputs: TLPointerEventHandler = (info) => {
    this.currentPoint = this.getPagePoint(info.point)
    this.shiftKey = info.shiftKey
    this.altKey = info.altKey
    this.ctrlKey = info.ctrlKey
    this.metaKey = info.metaKey
  }

  onPointerDown: TLPointerEventHandler = (info) => {
    this.isPointing = true
    this.originPoint = this.getPagePoint(info.point)
  }

  onPointerUp: TLPointerEventHandler = () => {
    this.isPointing = false
    this.setStatus(TDStatus.Idle)
    this.completeSession()
  }

  onPointerMove: TLPointerEventHandler = (info) => {
    this.updateInputs(info)

    if (this.isPointing) {
      if (this.session) {
        this.updateSession()
      } else {
        if (Vec.dist(this.originPoint, this.currentPoint) > DEAD_ZONE) {
          switch (this.status) {
            case TDStatus.PointingCanvas: {
              this.startSession(SessionType.Brush)
              this.setStatus(TDStatus.Brushing)
              break
            }
            case TDStatus.PointingBounds: {
              this.startSession(SessionType.Translate)
              this.setStatus(TDStatus.Translating)
              break
            }
            case TDStatus.PointingBoundsHandle: {
              if (info.target === 'rotate') {
                this.startSession(SessionType.Rotate)
                this.setStatus(TDStatus.Rotating)
              }
              break
            }
          }
        }
      }
    }
  }

  // shape events
  onPointShape: TLShapeEventsHandler = (info) => {
    this.select(info.target)
  }

  onHoverShape: TLShapeEventsHandler = (info) => {
    this.setHoveredId(info.target)
  }

  onUnHoverShape: TLShapeEventsHandler = (info) => {
    requestAnimationFrame(() => {
      if (this.pageState.hoveredId === info.target) {
        this.setHoveredId(undefined)
      }
    })
  }

  // bound events

  onPointBounds: TLBoundsEventHandler = () => {
    this.setStatus(TDStatus.PointingBounds)
  }

  onReleaseBounds: TLBoundsEventHandler = () => {
    this.setStatus(TDStatus.Idle)
  }

  // bounds handle

  onPointBoundsHandle: TLBoundsHandleEventHandler = () => {
    this.setStatus(TDStatus.PointingBoundsHandle)
  }

  // canvas events

  onPointCanvas: TLCanvasEventHandler = (info) => {
    this.updateInputs(info)
    this.selectNone()
    this.setStatus(TDStatus.PointingCanvas)
  }

  /** ---------------------- session start ------------------------------ */
  startSession<T extends SessionType>(type: T): this {
    const Session = getSession(type)
    this.session = new Session(this)

    const result = this.session.start()
    if (result) {
      this.patchState(result, `session:start_${this.session!.constructor.name}`)
    }
    return this
  }

  updateSession(): this {
    const { session } = this
    if (!session) return this

    const patch = session.update()

    if (!patch) return this
    return this.patchState(patch, `session:${session?.constructor.name}`)
  }

  cancelSession(): this {
    const { session } = this
    if (!session) return this
    this.session = undefined

    const result = session.cancel()

    if (result) {
      this.patchState(result, `session:cancel:${session.constructor.name}`)
    }
    return this
  }

  completeSession(): this {
    const { session } = this

    if (!session) return this

    this.session = undefined
    const result = session.complete()

    if (result) {
      this.patchState(result, `session:complete:${session.constructor.name}`)
    }

    return this
  }

  /** ---------------------- session end ------------------------------ */

  static defaultState: TDSnapshot = {
    appState: {
      currentPageId: 'page1',
      status: TDStatus.Idle
    },
    document: TlDesignApp.defaultDocument
  }
}
