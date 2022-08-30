import { StateManager } from './StateManager/StateManager'
import { TDShapeType, TDAppState, TDDocument } from './types'

export class TlDesignApp extends StateManager<TDAppState> {
  constructor() {
    super(TlDesignApp.defaultState)
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
        selectedIds: ['image1']
      }
    }
  }

  static defaultState: TDAppState = {
    runtime: {
      currentPageId: 'page1'
    },
    document: TlDesignApp.defaultDocument
  }
}
