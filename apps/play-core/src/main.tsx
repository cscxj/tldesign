import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  Renderer,
  TLPage,
  TLPageState,
  TLPointerInfo,
  TLShapeUtilsMap
} from '@tldesign/core'
import { RectUtil, Shape } from './shapes'
import './index.css'

const page: TLPage<Shape> = {
  id: 'page1',
  shapes: {
    rect1: {
      id: 'rect1',
      type: 'rect',
      color: 'red',
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

const pageState: TLPageState = {
  id: 'page1',
  selectedIds: []
}

const shapeUtils: TLShapeUtilsMap<Shape> = {
  rect: new RectUtil()
}

function onPointerDown(info: TLPointerInfo<string>) {
  console.log(info)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Renderer
      onPointerDown={onPointerDown}
      page={page}
      pageState={pageState}
      shapeUtils={shapeUtils}
    ></Renderer>
  </React.StrictMode>
)
