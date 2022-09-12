import React from 'react'
import ReactDOM from 'react-dom/client'
import { Renderer, TLPage, TLPageState, TLShapeUtilsMap } from '@tldesign/core'
import { RectUtil, Shape } from './shapes'
import './index.css'

const page: TLPage<Shape> = {
  id: 'page1',
  shapes: {
    rect1: {
      id: 'rect1',
      type: 'rect',
      color: 'red',
      point: [100, 100],
      size: [100, 150],
      parentId: 'page1',
      childIndex: 1
    }
  }
}

const pageState: TLPageState = {
  id: 'page1',
  selectedIds: [],
  camera: {
    point: [0, 0],
    zoom: 1
  }
}

const shapeUtils: TLShapeUtilsMap<Shape> = {
  rect: new RectUtil()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Renderer
      page={page}
      pageState={pageState}
      shapeUtils={shapeUtils}
    ></Renderer>
  </React.StrictMode>
)
