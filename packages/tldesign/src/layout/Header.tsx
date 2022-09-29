import styled, { css } from 'styled-components'

type TlHeaderProps = React.PropsWithChildren

const StyledHeader = styled.header(({ theme: { border } }) => {
  return css`
    flex-shrink: 0;
    height: 60px;
    width: 100%;
    border-bottom: ${border.base};
  `
})

export function TlHeader({ children }: TlHeaderProps) {
  return <StyledHeader>{children}</StyledHeader>
}
