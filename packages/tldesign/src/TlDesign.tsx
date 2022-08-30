import { Renderer } from '@tldesign/core'
import React from 'react'
import { TlDesignContext } from './hooks/useTlDesignApp'
import { shapeUtils } from './shapes'
import { TlDesignApp } from './TlDesignApp'

export function TlDesign() {
  const [app] = React.useState(() => new TlDesignApp())

  const state = app.useStore()

  const { document, runtime } = state

  const page = document.pages[runtime.currentPageId]
  const pageState = document.pageStates[page.id]

  return (
    <TlDesignContext.Provider value={app}>
      <Renderer
        shapeUtils={shapeUtils}
        page={page}
        pageState={pageState}
      ></Renderer>
    </TlDesignContext.Provider>
  )
}
