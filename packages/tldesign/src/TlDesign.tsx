import { Renderer } from '@tldesign/core'
import React from 'react'
import { TlDesignContext } from './hooks/useTlDesignApp'
import { shapeUtils } from './shapes'
import { TlDesignApp } from './TlDesignApp'

export function TlDesign() {
  const [app] = React.useState(() => new TlDesignApp())

  const state = app.useStore()

  const { document, appState } = state

  const page = document.pages[appState.currentPageId]
  const pageState = document.pageStates[page.id]

  return (
    <TlDesignContext.Provider value={app}>
      <Renderer
        shapeUtils={shapeUtils}
        page={page}
        pageState={pageState}
        onPointShape={app.onPointShape}
        onHoverShape={app.onHoverShape}
        onUnHoverShape={app.onUnHoverShape}
      ></Renderer>
    </TlDesignContext.Provider>
  )
}
