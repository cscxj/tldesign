import { TLPage, TLPageState } from '@/types'
import { Page } from '../Page/Page'

interface CanvasProps {
  id?: string
  page: TLPage
  pageState: TLPageState
}

export const Canvas = ({ id, page, pageState }: CanvasProps) => {
  console.log(id)

  return (
    <div className="tl-canvas">
      <Page page={page} pageState={pageState}></Page>
    </div>
  )
}
