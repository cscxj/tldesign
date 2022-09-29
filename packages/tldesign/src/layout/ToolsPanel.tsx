import styled from 'styled-components'

type TlToolsPanelProps = React.PropsWithChildren

const StyledToolsPanel = styled.div`
  flex-shrink: 0;
  width: 270px;
  height: 100%;
`

export function TlToolsPanel({ children }: TlToolsPanelProps) {
  return <StyledToolsPanel>{children}</StyledToolsPanel>
}
