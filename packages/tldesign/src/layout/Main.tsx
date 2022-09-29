import React from 'react'
import styled from 'styled-components'

type TlMainProps = React.PropsWithChildren

const StyledMain = styled.div`
  flex-grow: 1;
  height: 100%;
`

export function TlMain({ children }: TlMainProps) {
  return <StyledMain>{children}</StyledMain>
}
