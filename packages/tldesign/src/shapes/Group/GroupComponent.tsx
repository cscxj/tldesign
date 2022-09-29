import { GroupShape } from '@/types'
import styled from 'styled-components'
import { HtmlContainer, TLShapeUtil } from '@tldesign/core'

const StyledGroup = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: all;
`

export const GroupComponent = TLShapeUtil.Component<GroupShape, HTMLDivElement>(
  ({ events }, ref) => {
    return (
      <HtmlContainer ref={ref} {...events}>
        <StyledGroup />
      </HtmlContainer>
    )
  }
)
