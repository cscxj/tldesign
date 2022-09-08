import { useRendererContext } from '@/hooks/useRendererContext'
import { useShapeEvents } from '@/hooks/useShapeEvents'
import { TLShapeUtil } from '@/TLShapeUtil'
import { IShapeTreeNode, TLComponentProps, TLShape } from '@/types'
import { Container } from '../Container'

interface ShapeProps extends Omit<IShapeTreeNode, 'children'> {
  util: TLShapeUtil<TLShape>
}

export const Shape = function Shape({ util, shape, ...rest }: ShapeProps) {
  const events = useShapeEvents(shape.id)

  const context = useRendererContext()

  return (
    <Container bounds={shape.bounds}>
      <RenderedShape
        util={util}
        shape={shape}
        events={events}
        {...rest}
        onShapeChange={context.events.onShapeChange}
      ></RenderedShape>
    </Container>
  )
}

interface RenderedShapeProps extends TLComponentProps<TLShape> {
  util: TLShapeUtil<TLShape>
}

const RenderedShape = function RenderedShape({
  util,
  ...rest
}: RenderedShapeProps) {
  return <util.Component {...rest} />
}
