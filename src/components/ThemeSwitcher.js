import React from 'react'
import styled, { css } from 'styled-components'
import { ThemeContext } from '../context/ThemeContext'
import { themes } from '../styles/themes'

const SwitcherContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  position: relative;
`

const ThemeOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: ${props => `${props.theme.colors.background}dd`};
  backdrop-filter: blur(8px);
  padding: 0.5rem;
  border-radius: 0.5rem;
  opacity: ${props => props.$isOpen ? 1 : 0};
  transform: translateY(${props => props.$isOpen ? '0' : '10px'});
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  box-shadow: ${props => props.$isOpen ? props.theme.shadows.medium : 'none'};
  margin-bottom: 0.5rem;
`

const buttonStyles = css`
  width: 100%;
  background: ${props => props.$isActive ? props.theme.colors.primary : props.theme.colors.surface};
  color: ${props => props.$isActive ? '#fff' : props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.9rem;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: #fff;
    transform: translateX(5px);
  }
`

const ThemeButton = styled.button`
  ${buttonStyles}
`

const MainButton = styled(ThemeButton)`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  
  &::after {
    content: '▲';
    font-size: 0.8em;
    transition: transform 0.3s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`

const ThemeLabel = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.85em;
  margin-right: auto;
`

const ThemeName = styled.span`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`

const AutoButton = styled(ThemeButton)`
  background: ${props => props.$isActive ? props.theme.colors.accent : props.theme.colors.surface};
`

const ThemeSwitcher = () => {
  const { currentTheme, isAutoTheme, setTheme, toggleAutoTheme } = React.useContext(ThemeContext)
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getCurrentThemeName = () => {
    if (isAutoTheme) return '自动主题'
    return themes[currentTheme]?.name || '主题设置'
  }

  return (
    <SwitcherContainer ref={containerRef}>
      <ThemeOptions $isOpen={isOpen}>
        <AutoButton
          $isActive={isAutoTheme}
          onClick={() => {
            toggleAutoTheme()
            setIsOpen(false)
          }}
        >
          自动主题
        </AutoButton>
        {Object.keys(themes).map(themeName => (
          <ThemeButton
            key={themeName}
            $isActive={!isAutoTheme && currentTheme === themeName}
            onClick={() => {
              setTheme(themeName)
              setIsOpen(false)
            }}
          >
            {themes[themeName].name}
          </ThemeButton>
        ))}
      </ThemeOptions>
      
      <MainButton
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        $isActive={false}
      >
        <ThemeLabel>主题：</ThemeLabel>
        <ThemeName>{getCurrentThemeName()}</ThemeName>
      </MainButton>
    </SwitcherContainer>
  )
}

export default ThemeSwitcher 