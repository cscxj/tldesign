import { SideDrawer } from './SideDrawer'
import styled from 'styled-components'
import { TlHeader } from './Header'
import { TlMain } from './Main'
import { TlSideBar } from './SideBar'
import { TlToolsPanel } from './ToolsPanel'

export type TlLayoutProps = React.PropsWithChildren<{
  header?: React.ReactNode
  sidebar?: React.ReactNode
  toolsPanel?: React.ReactNode
}>

const StyledLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const StyledBody = styled.div`
  flex-grow: 1;
  display: flex;
`

export function TlLayout({
  header,
  sidebar,
  toolsPanel,
  children
}: TlLayoutProps) {
  return (
    <StyledLayout>
      <TlHeader>{header}</TlHeader>
      <StyledBody>
        <TlSideBar>{sidebar}</TlSideBar>
        <SideDrawer></SideDrawer>
        <TlMain>{children}</TlMain>
        <TlToolsPanel>{toolsPanel}</TlToolsPanel>
      </StyledBody>
    </StyledLayout>
  )
}
