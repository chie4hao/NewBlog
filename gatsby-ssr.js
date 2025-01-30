import React from 'react'
import { ThemeProvider } from './src/context/ThemeContext'

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "zh-CN" })
}

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    {element}
  </ThemeProvider>
) 