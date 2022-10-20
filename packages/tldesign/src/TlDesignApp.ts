import {
  Point,
  TLBoundsEventHandler,
  TLBoundsHandleEventHandler,
  TLCanvasEventHandler,
  TLPageEventHandler,
  TLPageState,
  TLPointerEventHandler,
  TLScaleHandle,
  TLShapeChangeHandler,
  TLShapeEventsHandler
} from '@tldesign/core'
import { DEAD_ZONE, PAGE_MARGIN } from './constance'
import { getSession, SessionArgsOfType, TDSession } from './sessions'
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
import { BaseSection } from './sections/BaseSection'
import { defaultSections } from './sections'

export class TlDesignApp extends StateManager<TDSnapshot> {
  sections: Map<string, BaseSection>

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
  /**
   * 当前按下的缩放控制点
   */
  pointedScaleHandle?: TLScaleHandle

  shiftKey = false
  altKey = false
  metaKey = false
  ctrlKey = false
  spaceKey = false

  screen: Point = [0, 0]

  constructor() {
    super(TlDesignApp.defaultState)
    this.sections = new Map(
      defaultSections.map((section) => [section.name, section])
    )
    this.state.appState.currentSectionName = defaultSections[0].name
  }

  get currentSection() {
    return this.sections.get(this.state.appState.currentSectionName)
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

  get hoveredId(): string | undefined | null {
    return this.pageState.hoveredId
  }

  get editingId(): string | undefined | null {
    return this.pageState.editingId
  }

  get shapes(): TDShape[] {
    return Object.values(this.page.shapes)
  }

  get zoom(): number {
    return this.pageState.camera.zoom
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

  getRootShape(shapeId: string, pageId = this.currentPageId) {
    return Snapshot.getRootShape(this.state, shapeId, pageId)
  }

  getShapeUtil<T extends TDShape>(shape: T) {
    return getShapeUtil<T>(shape)
  }

  /**
   * 获取屏幕上的点在页面上的坐标
   */
  getPagePoint(point: Point): Point {
    const pageElm = document.getElementById(`tl-page-${this.currentPageId}`)
    const { x, y } = pageElm!.getBoundingClientRect()
    return Vec.sub(point, [x, y])
  }

  /**
   * 缩放
   * @param id
   */
  zoomTo(next: number) {
    return this.setCamera(next, `zoomed_camera`)
  }

  selectSection(name: string) {
    this.patchState(
      {
        appState: {
          currentSectionName: name
        }
      },
      `select_section:${name}`
    )
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

  setEditingId(id?: string) {
    this.patchState(
      {
        document: {
          pageStates: {
            [this.currentPageId]: {
              editingId: id
            }
          }
        }
      },
      `set_editing_id`
    )
  }

  setCamera = (zoom: number, reason: string): this => {
    this.patchState(
      {
        document: {
          pageStates: {
            [this.currentPageId]: { camera: { zoom } }
          }
        }
      },
      reason
    )
    return this
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
        size: [720, 600],
        shapes: {
          group1: {
            id: 'group1',
            type: TDShapeType.Group,
            point: [100, 100],
            size: [200, 200],
            parentId: 'page1',
            childIndex: 1,
            children: ['image1', 'image2']
          },
          image1: {
            id: 'image1',
            type: TDShapeType.Image,
            assetId:
              'https://gd-ai-application.dancf.com/temp/3edaf84e08e52a07c852f70725b17ba6.png',
            point: [100, 100],
            size: [100, 100],
            parentId: 'group1',
            childIndex: 1
          },
          image2: {
            id: 'image2',
            type: TDShapeType.Image,
            assetId:
              'https://gd-ai-application.dancf.com/temp/e62fb408085b8a93b9e1edeca31e90af.png',
            point: [200, 200],
            size: [100, 100],
            parentId: 'group1',
            childIndex: 1
          },
          image3: {
            id: 'image3',
            type: TDShapeType.Image,
            assetId:
              'https://img.tusij.com/ips_asset/btw/01/00/44/5bc2cd6000692/5bc2cd600761f.png!w700?auth_key=1687392000-0-0-5014bfff814ed086d1e84ae6bcbd4638',
            point: [400, 100],
            size: [100, 100],
            parentId: 'page1',
            childIndex: 1
          },
          image4: {
            id: 'image4',
            type: TDShapeType.Image,
            assetId:
              'https://img.tusij.com/ips_asset/ibt/18/43/03/5d4c1f3806c40.png!w700?auth_key=1687392000-0-0-e0a9e22d7d79a054c3c89af8b5a6d6ad',
            point: [600, 100],
            size: [100, 100],
            parentId: 'page1',
            childIndex: 1
          },
          text1: {
            id: 'text1',
            type: TDShapeType.Text,
            text: '输入文字',
            width: 300,
            point: [400, 300],
            parentId: 'page1',
            childIndex: 1,
            // 颜色
            color: '#000000ff',
            // 背景色
            backgroundColor: null,
            // 字体
            fontFamily: 'TitanOne',
            // 字体样式，斜体等等
            fontStyle: 'italic',
            // 粗细
            fontWeight: 700,
            // 字体大小
            fontSize: 40,
            // 行高
            lineHeight: 1,
            // 行距
            letterSpacing: 0,
            // 文本方向
            textDecoration: 'underline',
            // 写入模式
            writingMode: 'horizontal-tb',
            // 对齐方式
            textAlign: 'center',
            // 垂直对齐方式
            verticalAlign: 'middle',
            // 文字阴影
            textShadow: null
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
            case TDStatus.PointingRotateHandle: {
              this.startSession(SessionType.Rotate)
              this.setStatus(TDStatus.Rotating)
              break
            }
            case TDStatus.PointingScaleHandle: {
              this.startSession(SessionType.Scale, this.pointedScaleHandle!)
              this.setStatus(TDStatus.Scaling)
              break
            }
          }
        }
      }
    }
  }

  // shape events
  onPointShape: TLShapeEventsHandler = (info) => {
    const selectedIds = new Set(this.selectedIds)
    const rootId = this.getRootShape(info.target).id

    if (!selectedIds.has(rootId)) {
      this.select(rootId)
    }
  }

  onHoverShape: TLShapeEventsHandler = (info) => {
    this.setHoveredId(info.target)
  }

  onUnHoverShape: TLShapeEventsHandler = () => {
    this.setHoveredId(undefined)
  }

  onDoubleClickShape: TLShapeEventsHandler = (info) => {
    if (this.editingId !== info.target) {
      this.setEditingId(info.target)
    }
  }

  // bound events

  onPointBounds: TLBoundsEventHandler = () => {
    this.setStatus(TDStatus.PointingBounds)
  }

  onReleaseBounds: TLBoundsEventHandler = () => {
    this.setStatus(TDStatus.Idle)
  }

  // bounds handle

  onPointBoundsHandle: TLBoundsHandleEventHandler = (info) => {
    if (info.target === 'rotate') {
      this.setStatus(TDStatus.PointingRotateHandle)
    } else {
      this.setStatus(TDStatus.PointingScaleHandle)
      this.pointedScaleHandle = info.target
    }
  }

  // canvas events
  onPointCanvas: TLCanvasEventHandler = (info) => {
    this.updateInputs(info)
    this.selectNone()
    if (this.editingId) {
      this.setEditingId(undefined)
    }
    this.setStatus(TDStatus.PointingCanvas)
  }

  // page events
  onPointPage: TLPageEventHandler = (info) => {
    this.updateInputs(info)
    this.selectNone()
    if (this.editingId) {
      this.setEditingId(undefined)
    }
    this.setStatus(TDStatus.PointingCanvas)
  }

  // other
  onShapeChange: TLShapeChangeHandler<TDShape> = (shapePatch) => {
    const shape = this.getShape(shapePatch.id)
    const shapeToUpdate = { ...shape, ...shapePatch }
    return this.patchState(
      {
        document: {
          pages: {
            [this.currentPageId]: {
              shapes: {
                [shape.id]: shapeToUpdate
              }
            }
          }
        }
      },
      'patched_shapes'
    )
  }

  /** ---------------------- session start ------------------------------ */
  startSession<T extends SessionType>(
    type: T,
    ...args: SessionArgsOfType<T>
  ): this {
    const Session = getSession(type)
    // @ts-ignore
    this.session = new Session(this, ...args)

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

  /**
   * 缩放到填充编辑器区域
   */
  zoomToFill = () => {
    const [width, height] = this.screen.map((len) => len - PAGE_MARGIN * 2)
    const [pageWidth, pageHeight] = this.page.size

    const zoomX = width / pageWidth
    const zoomY = height / pageHeight
    this.setCamera(Math.min(1, zoomX, zoomY), 'zoomed_fill')
  }

  onScreenResize = (size: Point) => {
    this.screen = size
    this.zoomToFill()
  }

  static defaultState: TDSnapshot = {
    appState: {
      currentPageId: 'page1',
      status: TDStatus.Idle,
      currentSectionName: ''
    },
    document: TlDesignApp.defaultDocument
  }
}
