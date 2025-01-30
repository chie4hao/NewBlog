import React from 'react'
import { themes, getSeasonTheme } from '../styles/themes'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

export const ThemeContext = React.createContext()

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = React.useState('light')
  const [isAutoTheme, setIsAutoTheme] = React.useState(true)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    // 从 localStorage 恢复主题设置
    const savedTheme = localStorage.getItem('theme')
    const savedAutoTheme = localStorage.getItem('autoTheme')
    
    if (savedTheme) {
      setCurrentTheme(savedTheme)
    }
    
    if (savedAutoTheme !== null) {
      setIsAutoTheme(JSON.parse(savedAutoTheme))
    }
    
    // 检测系统主题偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (isAutoTheme) {
        setCurrentTheme(e.matches ? 'dark' : 'light')
      }
    }
    
    prefersDark.addEventListener('change', handleChange)
    return () => prefersDark.removeEventListener('change', handleChange)
  }, [isAutoTheme])

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    // 自动切换季节主题
    if (isAutoTheme) {
      const season = getSeasonTheme()
      setCurrentTheme(season)
    }
  }, [isAutoTheme])

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setCurrentTheme(newTheme)
    setIsAutoTheme(false)
    localStorage.setItem('theme', newTheme)
    localStorage.setItem('autoTheme', 'false')
  }

  const setTheme = (themeName) => {
    setCurrentTheme(themeName)
    setIsAutoTheme(false)
    localStorage.setItem('theme', themeName)
    localStorage.setItem('autoTheme', 'false')
  }

  const toggleAutoTheme = () => {
    setIsAutoTheme(!isAutoTheme)
    localStorage.setItem('autoTheme', (!isAutoTheme).toString())
  }

  const theme = themes[currentTheme]

  return (
    <ThemeContext.Provider
      value={{
        theme,
        currentTheme,
        isAutoTheme,
        toggleTheme,
        setTheme,
        toggleAutoTheme
      }}
    >
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
} 