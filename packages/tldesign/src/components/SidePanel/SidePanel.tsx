import { useTlDesignApp } from '@/hooks/useTlDesignApp'
import styled from 'styled-components'

const StyledSidePanel = styled.div``

export function SidePanel() {
  const { currentSection } = useTlDesignApp()

  return (
    <StyledSidePanel>
      {currentSection && <currentSection.Panel></currentSection.Panel>}
    </StyledSidePanel>
  )
}
