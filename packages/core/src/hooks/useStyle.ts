import React from 'react'

const css = (strings: TemplateStringsArray, ...args: unknown[]) =>
  strings.reduce(
    (acc, string, index) =>
      acc + string + (index < args.length ? String(args[index]) : ''),
    ''
  )

const TLCSS = css`
  .tl-canvas {
    --tl-zoom: 1;
    --tl-scale: calc(1 / var(--tl-zoom));
    --tl-padding: calc(64px * max(1, var(--tl-scale)));

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    background-color: var(--tl-canvas-background);
    box-sizing: border-box;
  }

  .tl-canvas * {
    box-sizing: border-box;
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
`

export function useStyle(rules: string = TLCSS) {
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
