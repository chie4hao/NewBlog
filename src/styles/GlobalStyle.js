import { createGlobalStyle } from 'styled-components'
import { fonts } from './themes'

const GlobalStyle = createGlobalStyle`
  html {
    min-height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: ${props => {
      const theme = props.theme.name;
      const bgImage = theme === '浅色' ? '/themes/light-pattern.avif'
        : theme === '深色' ? '/themes/dark-starry.avif'
        : theme === '春季' ? '/themes/spring-cherry.avif'
        : theme === '夏季' ? '/themes/summer-tropical.avif'
        : theme === '秋季' ? '/themes/autumn-leaves.avif'
        : '/themes/winter-snow.avif';
      return `${props.theme.colors.background},
              url(${bgImage}) center/cover fixed no-repeat`;
    }};
    background-attachment: fixed;
    color: ${props => props.theme.colors.text};
    font-family: ${fonts.base};
    font-size: 16px;
    line-height: 1.8;
    transition: color 0.3s ease, background-color 0.3s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  ::selection {
    background: ${props => props.theme.colors.primary};
    color: white;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.secondary};
    border-radius: 4px;
    
    &:hover {
      background: ${props => props.theme.colors.primary};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.colors.text};
    font-family: ${fonts.heading};
    margin: 2rem 0 1rem;
    line-height: 1.3;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.7em;
  }

  h3 {
    font-size: 1.4em;
  }

  h4 {
    font-size: 1.2em;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  code {
    font-family: ${fonts.code};
    font-size: 0.9em;
  }

  pre {
    overflow-x: auto;
    background: ${props => props.theme.colors.surface};
    border-radius: 4px;
    padding: 1rem;
    box-shadow: ${props => props.theme.shadows.small};
    
    code {
      font-size: 0.9em;
      line-height: 1.6;
    }
  }

  article {
    font-size: 1.05em;
    line-height: 1.8;
    letter-spacing: 0.01em;
  }
`

export default GlobalStyle 