import styled, { css } from 'styled-components'
import { PropsWithChildren, ReactNode, HTMLAttributes } from 'react'
import { Tooltip } from 'antd'
import {
  PlusCircledIcon,
  MinusCircledIcon,
  EnterFullScreenIcon,
  ExitFullScreenIcon
} from '@radix-ui/react-icons'
import { useTlDesignApp } from '@/hooks/useTlDesignApp'
import { ZOOM_GRADIENT } from '@/constance'

interface ToolbarButtonProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  tooltip?: ReactNode | (() => ReactNode)
}

function ToolbarButton({ tooltip, children, ...rest }: ToolbarButtonProps) {
  return (
    <Tooltip title={tooltip} mouseEnterDelay={0} mouseLeaveDelay={0}>
      <div {...rest}>{children}</div>
    </Tooltip>
  )
}

export function Toolbar() {
  const app = useTlDesignApp()
  const { zoom } = app

  const zoomRate = Math.round(zoom * 100)

  const isActualSize = zoomRate === 100

  // 放大
  const handleEnlarge = () => {
    const next = (Math.floor(zoomRate / ZOOM_GRADIENT) + 1) * ZOOM_GRADIENT
    app.zoomTo(next / 100)
  }

  // 缩小
  const handleNarrow = () => {
    const next = (Math.ceil(zoomRate / ZOOM_GRADIENT) - 1) * ZOOM_GRADIENT
    app.zoomTo(next / 100)
  }

  // 实际大小
  const handleRestore = () => {
    app.zoomTo(1)
  }

  // 填充屏幕
  const handleFillScreen = () => {
    app.zoomToFill()
  }

  return (
    <StyledToolbar>
      <ToolbarButton tooltip="缩小" onClick={handleNarrow}>
        <MinusCircledIcon></MinusCircledIcon>
      </ToolbarButton>
      <div>
        <div className="zoom-rate">
          <span>{zoomRate}%</span>
          <div className="zoom-hovered">
            {isActualSize ? (
              <ToolbarButton tooltip="适应屏幕" onClick={handleFillScreen}>
                <EnterFullScreenIcon></EnterFullScreenIcon>
              </ToolbarButton>
            ) : (
              <ToolbarButton tooltip="实际大小" onClick={handleRestore}>
                <ExitFullScreenIcon></ExitFullScreenIcon>
              </ToolbarButton>
            )}
          </div>
        </div>
      </div>
      <ToolbarButton tooltip="放大" onClick={handleEnlarge}>
        <PlusCircledIcon></PlusCircledIcon>
      </ToolbarButton>
    </StyledToolbar>
  )
}

const StyledToolbar = styled.div(
  ({ theme: { spacing, borderRadius, shadow } }) => {
    return css`
      border-radius: ${borderRadius.base};
      padding: ${spacing.small};
      background-color: #ffffff;
      line-height: 15px;
      display: flex;
      align-items: center;
      box-shadow: ${shadow.base};
      user-select: none;

      .zoom-rate {
        cursor: pointer;
        position: relative;
        width: 40px;
        text-align: center;
      }

      .zoom-rate:hover {
        .zoom-hovered {
          display: block;
        }
      }

      .zoom-hovered {
        display: none;
        position: absolute;
        background-color: #ffffff;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }

      svg {
        cursor: pointer;
        margin: 0 ${spacing.small};
      }
    `
  }
)
