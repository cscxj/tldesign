import { useCanvasEvents } from '@/hooks/useCanvasEvents'
import { TLPage, TLPageState } from '@/types'
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
    </div>
  )
}
