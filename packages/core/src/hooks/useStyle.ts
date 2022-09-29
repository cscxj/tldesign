import React from 'react'
import { TLTheme } from '..'

const css = (strings: TemplateStringsArray, ...args: unknown[]) =>
  strings.reduce(
    (acc, string, index) =>
      acc + string + (index < args.length ? String(args[index]) : ''),
    ''
  )

function makeCssTheme<T extends object>(prefix: string, theme: T) {
  return Object.keys(theme).reduce((acc, key) => {
    const value = theme[key as keyof T]
    if (value) {
      return acc + `${`--${prefix}-${key}`}: ${value as string};\n`
    }
    return acc
  }, '')
}

const defaultTheme: TLTheme = {
  brushFill: 'rgba(0,0,0,.05)',
  brushStroke: 'rgba(0,0,0,.25)',
  selectStroke: 'rgb(66, 133, 244)',
  selectFill: 'rgba(65, 132, 244, 0.05)',
  background: 'rgb(248, 249, 250)',
  foreground: 'rgb(51, 51, 51)'
}

const TLCSS = css`
  .tl-canvas {
    --tl-zoom: 1;
    --tl-scale: calc(1 / var(--tl-zoom));
    --tl-padding: calc(64px * max(1, var(--tl-scale)));

    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    background-color: #ffffff;
    box-sizing: border-box;
  }

  .tl-canvas * {
    box-sizing: border-box;
  }

  .tl-page {
    background-color: #ffffff;
  }

  .tl-container {
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: center center;
    display: flex;
    align-items: center;
    justify-content: center;
    contain: layout style size;
    pointer-events: none;
  }

  .tl-svg-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    contain: layout style size;
  }

  .tl-centered-g {
    transform: translate(var(--tl-padding), var(--tl-padding));
  }

  .tl-html-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    contain: layout style size;
    padding: var(--tl-padding);
  }

  .tl-inner-div {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .tl-bounds-bg {
    stroke: var(--tl-selectStroke);
    stroke-width: calc(2px * var(--tl-scale));
    fill: var(--tl-selectFill);
    pointer-events: all;
    contain: layout style size;
  }

  .tl-indicator {
    stroke: var(--tl-selectStroke);
    stroke-width: calc(0.5px * var(--tl-scale));
  }

  .tl-scale-handle {
    stroke: var(--tl-selectStroke);
    stroke-width: calc(1.5px * var(--tl-scale));
    fill: white;
  }

  .tl-rotate-handle {
    position: absolute;
    cursor: grab;
    pointer-events: all;
  }

  .tl-brush {
    fill: var(--tl-brushFill);
    stroke: var(--tl-brushStroke);
    stroke-width: calc(1px * var(--tl-scale));
    pointer-events: none;
    contain: layout style size;
  }
`

function useStyle(rules: string = TLCSS) {
  React.useLayoutEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = rules
    document.head.appendChild(style)

    return () => {
      if (style && document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [rules])
}

function useTheme<T extends object>(
  prefix: string,
  theme: T,
  selector = ':root'
) {
  React.useLayoutEffect(() => {
    const style = document.createElement('style')
    const cssTheme = makeCssTheme(prefix, theme)

    style.setAttribute('id', `${prefix}-theme`)
    style.setAttribute('data-selector', selector)
    style.innerHTML = `
        ${selector} {
          ${cssTheme}
        }
      `

    document.head.appendChild(style)

    return () => {
      if (style && document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [prefix, theme, selector])
}

export function useTLTheme(theme?: Partial<TLTheme>, selector?: string) {
  const tltheme = React.useMemo<TLTheme>(
    () => ({
      ...defaultTheme,
      ...theme
    }),
    [theme]
  )

  useTheme('tl', tltheme, selector)

  useStyle()
}
