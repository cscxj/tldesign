import styled, { css } from 'styled-components'

type TlSideBarProps = React.PropsWithChildren

const StyledSideBar = styled.aside(({ theme: { border } }) => {
  return css`
    flex-shrink: 0;
    width: 65px;
    height: 100%;
    border-right: ${border.base};
  `
})

export function TlSideBar({ children }: TlSideBarProps) {
  return <StyledSideBar>{children}</StyledSideBar>
}
