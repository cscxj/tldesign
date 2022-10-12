import styled, { css } from 'styled-components'
import { PropsWithChildren, useState } from 'react'
import { OutlinedArrowIcon } from '@/statefulIcons'

interface SideDrawerProps extends PropsWithChildren {
  open?: boolean
}

export function SideDrawer({ open = true, children }: SideDrawerProps) {
  const [opened, setOpen] = useState(open)

  function onClickHandle() {
    setOpen(!opened)
  }

  return (
    <StyledSideDrawer style={{ width: opened ? '320px' : '0' }}>
      <div className="drawer-content">
        <div className="drawer-inner">{children}</div>
      </div>
      <div className="drawer-handle" onClick={onClickHandle}>
        <OutlinedArrowIcon dir={opened ? 'left' : 'right'}></OutlinedArrowIcon>
      </div>
    </StyledSideDrawer>
  )
}

const StyledSideDrawer = styled.div(({ theme: { animDuration } }) => {
  return css`
    height: 100%;
    position: relative;
    z-index: 2;
    transition: all ${animDuration.base} ease-out;

    .drawer-content {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }

    .drawer-inner {
      width: 320px;
      height: 100%;
      position: absolute;
      right: 0;
    }

    .drawer-handle {
      position: absolute;
      width: 20px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;
      cursor: pointer;
      right: -20px;
      top: calc(50% - 30px);
      background-color: #fff;
    }
  `
})
