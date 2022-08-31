import { useCanvasEvents } from '@/hooks/useCanvasEvents'
import { TLPage, TLPageState } from '@/types'
import { Brush } from '../Brush'
import { Page } from '../Page/Page'

interface CanvasProps {
  id?: string
  page: TLPage
  pageState: TLPageState
}

export const Canvas = ({ page, pageState }: CanvasProps) => {
  const events = useCanvasEvents()

  return (
    <div className="tl-canvas" {...events}>
      <Page page={page} pageState={pageState}></Page>
      {pageState.brush && <Brush brush={pageState.brush} />}
    </div>
  )
}
