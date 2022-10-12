import styled, { css } from 'styled-components'
import { IconProps } from './types'

type ArrowDirection = 'left' | 'right'

export interface OutlinedArrowIconProps extends IconProps {
  dir?: ArrowDirection
}

const StyledOutlinedArrowIcon = styled.svg(({ theme: { animDuration } }) => {
  return css`
    fill: none;
    path {
      transition: ${animDuration.base} ease-out;
    }
  `
})

export function OutlinedArrowIcon({ dir, ...rest }: OutlinedArrowIconProps) {
  const drawPath = (
    {
      right: 'M5,2 L11,8 L5,14',
      left: 'M11,2 L5,8 L11,14'
    } as Record<ArrowDirection, string>
  )[dir || 'right']
  return (
    <StyledOutlinedArrowIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d={drawPath}
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledOutlinedArrowIcon>
  )
}
