import { Point, TLPageState, TLPointerEventHandler } from '@tldesign/core'
import { StateManager } from './StateManager/StateManager'
import { TDShapeType, TDSnapshot, TDDocument, TDShape } from './types'
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

  onPointShape: TLPointerEventHandler = (info) => {
    this.originPoint = this.getPagePoint(info.point)
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

  static defaultState: TDSnapshot = {
    appState: {
      currentPageId: 'page1'
    },
    document: TlDesignApp.defaultDocument
  }
}
