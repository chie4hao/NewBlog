import React from 'react'
import { ThemeProvider } from './src/context/ThemeContext'
import { createGlobalStyle } from 'styled-components'
import { fonts } from './src/styles/themes'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${fonts.body};
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    transition: all 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${fonts.heading};
    color: ${props => props.theme.colors.text};
  }

  code {
    font-family: ${fonts.mono};
  }
`

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "zh-CN" })
}

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <>
      <GlobalStyle />
      {element}
    </>
  </ThemeProvider>
) 